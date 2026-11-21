#!/usr/bin/env python3
"""
WS-AMB-002 — Script de redressement catalogue & pricing AMBRESSENCE (Lot 2 & Lot 3).

Modes :
  --dry-run (par défaut) : Lit le catalogue public Store API (lecture seule) et simule
                           toutes les transformations sans modifier WordPress/WooCommerce.
  --apply                : Applique les modifications via WooCommerce REST API v3
                           (nécessite WP_URL, WP_USER, WP_APP_PASS en variables d'env)
                           et sauvegarde un backup JSON avant toute écriture.

Décisions appliquées :
  - Mise en brouillon (draft) : IDs test 12 & 13 (Dior Sauvage), produits sans image,
    produits < 12,00 EUR TTC (protection marge micro-entreprise TTC non récupérable),
    et articles non-parfums manifestes (ex. Air Freshener).
  - Arrondi tarifaire Option B : euro supérieur (math.ceil) sur les produits restants.
  - Normalisation & traduction FR des titres espagnols + décodage entités HTML (&#038; -> &).
  - Génération d'une description sobre Maison Ambressence pour les fiches vides.
"""

import argparse
import base64
import csv
import html
import json
import math
import os
import re
import sys
import urllib.request
from datetime import datetime, timezone

TEST_PRODUCT_IDS = {12, 13}
MIN_PRICE_EUR = 12.00

NON_PERFUME_RE = re.compile(r"\b(air freshener|ambientador|desodorante|deodorant)\b", re.I)

ES_FR_REPLACEMENTS = [
    (re.compile(r"\bAgua Perfumada Bienestar\b", re.I), "Eau Parfumée Bien-Être"),
    (re.compile(r"\bAgua Perfumada\b", re.I), "Eau Parfumée"),
    (re.compile(r"\bExtracto de Perfume\b", re.I), "Extrait de Parfum"),
    (re.compile(r"\bPerfume de Mujer\b", re.I), "Parfum Femme"),
    (re.compile(r"\bPerfume de Hombre\b", re.I), "Parfum Homme"),
    (re.compile(r"\bEstuche\b", re.I), "Coffret"),
    (re.compile(r"\bPiezas\b", re.I), "Pièces"),
    (re.compile(r"\bVainilla y Rosas\b", re.I), "Vanille & Roses"),
    (re.compile(r"\bPerfumado\b", re.I), "Parfumé"),
    (re.compile(r"\bPerfumada\b", re.I), "Parfumée"),
    (re.compile(r"\bVaporizador\b", re.I), "Vaporisateur"),
    (re.compile(r"\bLocion Corporal\b", re.I), "Lait Corps"),
    (re.compile(r"\bCrema Corporal\b", re.I), "Crème Corps"),
    (re.compile(r"\bGel de Ducha\b", re.I), "Gel Douche"),
    (re.compile(r"\bDesodorante\b", re.I), "Déodorant"),
    (re.compile(r"\bLote\b", re.I), "Coffret"),
    (re.compile(r"\bpara Mujer\b", re.I), "Pour Femme"),
    (re.compile(r"\bpara Hombre\b", re.I), "Pour Homme"),
    (re.compile(r"\bpour Feme\b", re.I), "Pour Femme"),
    (re.compile(r"\bSin Alcohol\b", re.I), "Sans Alcool"),
]


def normalize_title_fr(raw_name: str) -> str:
    name = html.unescape(raw_name or "").strip()
    for pattern, repl in ES_FR_REPLACEMENTS:
        name = pattern.sub(repl, name)
    # Nettoyer les séparateurs multiples type "· · ·" ou "· ·"
    name = re.sub(r"(?:\s*·\s*){2,}", " · ", name)
    name = re.sub(r"\s+", " ", name).strip(" ·")
    return name


def generate_description_fr(clean_name: str) -> str:
    return (
        f"<p><strong>{html.escape(clean_name)}</strong></p>\n"
        "<p>Flacon neuf et scellé d’origine, sélectionné et sourcé auprès de distributeurs "
        "européens agréés. Expédition soignée depuis l’Europe avec suivi.</p>"
    )


def fetch_store_products(base_url: str) -> list[dict]:
    all_p = []
    page = 1
    while True:
        url = f"{base_url.rstrip('/')}/wp-json/wc/store/v1/products?per_page=100&page={page}"
        req = urllib.request.Request(url, headers={"User-Agent": "WS-AMB-002-Cleaner/1.0"})
        with urllib.request.urlopen(req, timeout=20) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            if not data:
                break
            all_p.extend(data)
            total_pages = int(resp.headers.get("X-WP-TotalPages", 1))
            if page >= total_pages:
                break
            page += 1
    return all_p


def get_price(p: dict) -> float:
    pr = p.get("prices", {})
    minor = int(pr.get("currency_minor_unit", 2))
    return round(int(pr.get("price", 0)) / (10 ** minor), 2)


def plan_changes(products: list[dict]) -> tuple[list[dict], dict]:
    actions = []
    stats = {
        "total": len(products),
        "draft_test_ids": 0,
        "draft_no_image": 0,
        "draft_low_price": 0,
        "draft_non_perfume": 0,
        "kept_published": 0,
        "titles_cleaned": 0,
        "descriptions_generated": 0,
        "prices_rounded_option_b": 0,
        "price_delta_eur": 0.0,
    }

    for p in products:
        pid = int(p["id"])
        raw_name = p.get("name", "")
        clean_name = normalize_title_fr(raw_name)
        price = get_price(p)
        has_image = bool(p.get("images"))
        has_desc = bool((p.get("description") or "").strip() or (p.get("short_description") or "").strip())

        reasons_draft = []
        if pid in TEST_PRODUCT_IDS:
            reasons_draft.append("test_product")
            stats["draft_test_ids"] += 1
        if not has_image:
            reasons_draft.append("no_image")
            stats["draft_no_image"] += 1
        if price < MIN_PRICE_EUR:
            reasons_draft.append(f"price_lt_{MIN_PRICE_EUR}")
            stats["draft_low_price"] += 1
        if NON_PERFUME_RE.search(raw_name):
            reasons_draft.append("non_perfume")
            stats["draft_non_perfume"] += 1

        new_status = "draft" if reasons_draft else "publish"
        new_price = float(math.ceil(price)) if new_status == "publish" else price

        title_changed = clean_name != html.unescape(raw_name).strip() or "&#" in raw_name
        desc_needed = (new_status == "publish") and (not has_desc)
        price_changed = (new_status == "publish") and (abs(new_price - price) >= 0.01)

        if new_status == "publish":
            stats["kept_published"] += 1
        if title_changed:
            stats["titles_cleaned"] += 1
        if desc_needed:
            stats["descriptions_generated"] += 1
        if price_changed:
            stats["prices_rounded_option_b"] += 1
            stats["price_delta_eur"] = round(stats["price_delta_eur"] + (new_price - price), 2)

        if reasons_draft or title_changed or desc_needed or price_changed:
            actions.append({
                "id": pid,
                "status": new_status,
                "reasons_draft": reasons_draft,
                "old_name": raw_name,
                "new_name": clean_name,
                "old_price": price,
                "new_price": new_price,
                "generate_desc": desc_needed,
                "new_short_description": generate_description_fr(clean_name) if desc_needed else None,
            })

    return actions, stats


def apply_wc_batch(base_url: str, user: str, app_pass: str, actions: list[dict]) -> None:
    token = base64.b64encode(f"{user}:{app_pass}".encode("utf-8")).decode("ascii")
    headers = {
        "Authorization": f"Basic {token}",
        "Content-Type": "application/json",
        "User-Agent": "WS-AMB-002-Cleaner/1.0",
    }
    endpoint = f"{base_url.rstrip('/')}/wp-json/wc/v3/products/batch"
    for i in range(0, len(actions), 50):
        chunk = actions[i : i + 50]
        payload = {"update": []}
        for a in chunk:
            item = {"id": a["id"], "status": a["status"], "name": a["new_name"]}
            if a["status"] == "publish":
                item["regular_price"] = f"{a['new_price']:.2f}"
            if a["new_short_description"]:
                item["short_description"] = a["new_short_description"]
            payload["update"].append(item)

        req = urllib.request.Request(
            endpoint,
            data=json.dumps(payload).encode("utf-8"),
            headers=headers,
            method="POST",
        )
        with urllib.request.urlopen(req, timeout=30) as resp:
            if resp.status not in (200, 201):
                raise RuntimeError(f"Batch HTTP {resp.status}")
        print(f"Batch {i // 50 + 1}: {len(chunk)} produits mis à jour.")


def main() -> int:
    parser = argparse.ArgumentParser(description="Nettoyage catalogue & pricing AMBRESSENCE (WS-AMB-002)")
    parser.add_argument("--url", default="https://ambressence.com", help="URL racine du site")
    parser.add_argument("--apply", action="store_true", help="Appliquer réellement via WooCommerce REST API v3")
    parser.add_argument("--out-preview", default="", help="Chemin optionnel CSV de prévisualisation")
    args = parser.parse_args()

    products = fetch_store_products(args.url)
    actions, stats = plan_changes(products)
    print("=== RÉSUMÉ SIMULATION WS-AMB-002 ===")
    print(json.dumps(stats, indent=2, ensure_ascii=False))

    if args.out_preview:
        with open(args.out_preview, "w", newline="", encoding="utf-8") as f:
            w = csv.writer(f)
            w.writerow(["id", "status", "reasons_draft", "old_name", "new_name", "old_price", "new_price", "generate_desc"])
            for a in actions:
                w.writerow([
                    a["id"], a["status"], ",".join(a["reasons_draft"]),
                    a["old_name"], a["new_name"], a["old_price"], a["new_price"], a["generate_desc"],
                ])
        print(f"Prévisualisation écrite dans {args.out_preview} ({len(actions)} lignes).")

    if args.apply:
        user = os.environ.get("WP_USER", "")
        app_pass = os.environ.get("WP_APP_PASS", "")
        if not user or not app_pass:
            print("ERREUR: WP_USER et WP_APP_PASS requis pour --apply.", file=sys.stderr)
            return 1
        ts = datetime.now(timezone.utc).strftime("%Y%m%d-%H%M%SZ")
        backup_path = f"/tmp/ambressence_backup_{ts}.json"
        with open(backup_path, "w", encoding="utf-8") as bf:
            json.dump(products, bf, ensure_ascii=False)
        print(f"Backup pré-écriture sauvegardé dans {backup_path}.")
        apply_wc_batch(args.url, user, app_pass, actions)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
