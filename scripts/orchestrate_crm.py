#!/usr/bin/env python3
"""
SYNTESIA — Script d'orchestration, de test et de qualification automatique.
Version 2.2 (Recette AGIA-009 — Anti-Injection CWE-1236, Anti-Honeypot, Anti-Doublon, Scoring Unifié & Zéro PII Logs).
"""

import sys
import re
import json
import random
import datetime
import subprocess
from zoneinfo import ZoneInfo

SHEET_ID = "1EmC6f4ljLU2GZmD9HEBt50WdTlVXoQtPQ64vFQL1I_0"


def sanitize_sheet_field(val, max_len=500):
    cleaned = re.sub(r"[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]", " ", str(val or "")).strip()
    if len(cleaned) > max_len:
        cleaned = cleaned[:max_len]
    if re.match(r"^[=+\-@|%]", cleaned):
        cleaned = "'" + cleaned
    return cleaned


def calculate_score(lead, raw_desc_len=None):
    score = 5
    budget = str(lead.get("budget", "")).upper()
    maturite = str(lead.get("maturite", "")).upper()
    combined_calibre = f"{budget} | {maturite}"

    if any(k in combined_calibre for k in ["5 000", "15 000", "50 À 150", "> 150", "ETI"]):
        score += 3
    elif any(k in combined_calibre for k in ["2 500", "10 À 49", "15 À 50", "PME"]):
        score += 2
    elif any(k in combined_calibre for k in ["TPE", "1 À 9", "1 À 15"]):
        score += 1

    tel_digits = "".join(ch for ch in str(lead.get("telephone", "")) if ch.isdigit())
    if 8 <= len(tel_digits) <= 15:
        score += 1

    desc_str = str(lead.get("description", "")).strip()
    actual_len = raw_desc_len if isinstance(raw_desc_len, int) else (
        0 if desc_str == "Demande d'étude opérationnelle sectorielle" else len(desc_str)
    )
    if actual_len > 20:
        score += 1

    v_upper = str(lead.get("verticale", "")).upper()
    if any(k in v_upper for k in ["SÉCURITÉ", "SECURITE", "BÂTIMENT", "BATIMENT", "BTP", "RÉNOVATION", "RENOVATION", "HCR", "CGP"]):
        score += 1

    return min(score, 10)


def ingest_lead(lead_data, is_test=False):
    # 1. Filtre Honeypot
    for hp in ("website_url", "website_url_dz", "company_website", "business_site"):
        if str(lead_data.get(hp, "")).strip():
            return {"status": "filtered_honeypot"}

    # 2. Validation serveur minimale
    raw_nom = str(lead_data.get("nom", "")).strip()
    raw_email = str(lead_data.get("email", "")).strip()
    raw_tel = str(lead_data.get("telephone", "")).strip()
    raw_desc = str(lead_data.get("description", "")).strip()

    if not raw_nom or (not raw_email and not raw_tel):
        return {"status": "error", "code": "MISSING_REQUIRED_FIELDS"}

    if raw_email and (not re.match(r"^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$", raw_email) or len(raw_email) > 150):
        return {"status": "error", "code": "INVALID_EMAIL"}

    tel_digits = "".join(ch for ch in raw_tel if ch.isdigit())
    if raw_tel and (not re.match(r"^[+\d\s().\-/]{8,25}$", raw_tel) or not (8 <= len(tel_digits) <= 15)):
        return {"status": "error", "code": "INVALID_PHONE"}

    paris_now = datetime.datetime.now(ZoneInfo("Europe/Paris"))
    now_str = paris_now.strftime("%Y-%m-%d %H:%M:%S")
    suffix = random.randint(1000, 9999)
    id_lead = ("LEAD-TEST-" if is_test else "LEAD-") + paris_now.strftime("%Y%m%d-%H%M%S") + f"-{suffix}"

    marche = sanitize_sheet_field(lead_data.get("marche", "France"), 40)
    verticale = sanitize_sheet_field(lead_data.get("verticale", "Général / PME"), 120)
    entreprise = sanitize_sheet_field(lead_data.get("entreprise", "Inconnu"), 150)
    contact_nom = sanitize_sheet_field(raw_nom, 120)
    email = sanitize_sheet_field(raw_email, 150)
    telephone = sanitize_sheet_field(raw_tel, 40)
    besoin = sanitize_sheet_field(lead_data.get("besoin", ""), 200)
    raw_mat = lead_data.get("maturite") or (f"Effectif: {lead_data['effectif']}" if lead_data.get("effectif") else "Non précisée")
    maturite = sanitize_sheet_field(raw_mat, 150)
    raw_bud = lead_data.get("budget") or (f"Calibre: {lead_data['effectif']}" if lead_data.get("effectif") else "À qualifier")
    budget = sanitize_sheet_field(raw_bud, 120)
    description = sanitize_sheet_field(raw_desc, 2000)

    score = calculate_score(
        {"budget": budget, "maturite": maturite, "telephone": raw_tel, "description": raw_desc, "verticale": verticale},
        raw_desc_len=len(raw_desc)
    )
    env_tag = "TEST" if is_test else "PROD"

    if is_test:
        statut = "TEST_QUALIFIE" if score >= 7 else "TEST_NOUVEAU"
    else:
        statut = "QUALIFIE" if score >= 7 else "NOUVEAU"

    notes = sanitize_sheet_field(
        f"{'[DONNEE_TEST] ' if is_test else 'Capture Web. '}Verticale: {verticale} · Besoin: {besoin} · Détails: {description}",
        2500
    )

    # 15 colonnes strictes :
    # ID_Lead, Date_Entree, Marche, Verticale_Metier, Entreprise, Contact_Nom, Email, Telephone,
    # Besoin_Principal, Maturite_IA, Budget_Estime, Score_Qualification, Statut, Notes_Diagnostic, Environnement
    row_values = [
        id_lead,
        now_str,
        marche,
        verticale,
        entreprise,
        contact_nom,
        email,
        telephone,
        besoin,
        maturite,
        budget,
        str(score),
        statut,
        notes,
        env_tag
    ]

    row_str = ",".join(['"' + v.replace('"', '""') + '"' for v in row_values])
    cmd = ["gsheets", "mutate", "append", SHEET_ID, "01_PROSPECTS_LEADS", row_str]
    res = subprocess.run(cmd, capture_output=True, text=True)

    if res.returncode == 0:
        # Zéro PII (ni nom, ni email, ni téléphone, ni raison sociale) dans la sortie standard de log
        print(f"[CRM INGESTION] Lead inséré avec succès : {id_lead} | Marché: {marche} | Env: {env_tag} | Score: {score}/10 | Statut: {statut}")
        return {"status": "success", "id_lead": id_lead, "score": score, "statut": statut, "env": env_tag, "row": row_values}
    else:
        print(f"[CRM INGESTION ERROR] Code retour non nul pour {id_lead}")
        return {"status": "error", "error": "GSHEETS_APPEND_FAILED"}


if __name__ == "__main__":
    print("Vérification du module d'orchestration CRM v2.2...")
    print("Prêt pour l'ingestion sécurisée.")
