#!/usr/bin/env python3
"""
WS-AMB-002 — Audit visuel & fonctionnel complet (PC 1440x900 + Mobile 390x844)
via Google Chrome headless + Playwright.

Mesure sur chaque page :
  - Débordement horizontal (scrollWidth > innerWidth)
  - Images cassées (naturalWidth == 0)
  - Erreurs console JS & requêtes réseau >= 400
  - Boutons / liens cassés, vides, ou zones tactiles trop petites sur mobile (< 36px)
  - Éléments débordant hors de l'écran (right > innerWidth)
  - Captures d'écran PC & Mobile
"""

import json
import os
from playwright.sync_api import sync_playwright

URLS = [
    ("accueil", "https://ambressence.com/"),
    ("univers_ambre", "https://ambressence.com/univers/ambre/"),
    ("univers_floral", "https://ambressence.com/univers/floral/"),
    ("univers_boise", "https://ambressence.com/univers/boise/"),
    ("univers_frais", "https://ambressence.com/univers/frais/"),
    ("recherche", "https://ambressence.com/recherche/"),
    ("produit_pdp", "https://ambressence.com/produit/lattafa-adeeb-eau-de-parfum-80ml-spray/"),
    ("panier", "https://ambressence.com/panier/"),
    ("la_maison", "https://ambressence.com/la-maison/"),
    ("guide_sillage", "https://ambressence.com/guide-sillage/"),
]

VIEWPORTS = [
    ("pc", {"width": 1440, "height": 900}),
    ("mobile", {"width": 390, "height": 844}),
]

OUT_DIR = "/tmp/ambressence_audit/screenshots"
os.makedirs(OUT_DIR, exist_ok=True)


def run_audit():
    report = []
    with sync_playwright() as p:
        browser = p.chromium.launch(
            executable_path="/usr/bin/google-chrome",
            headless=True,
            args=["--no-sandbox", "--disable-dev-shm-usage"],
        )
        for vp_name, vp_size in VIEWPORTS:
            context = browser.new_context(viewport=vp_size, locale="fr-FR", ignore_https_errors=True)
            page = context.new_page()

            for slug, url in URLS:
                console_errors = []
                failed_reqs = []

                def on_console(msg):
                    if msg.type == "error":
                        console_errors.append(msg.text[:160])

                def on_resp(resp):
                    if resp.status >= 400 and "favicon" not in resp.url:
                        failed_reqs.append(f"{resp.status} {resp.url[:120]}")

                page.on("console", on_console)
                page.on("response", on_resp)

                import time
                time.sleep(2.5)
                try:
                    page.goto(url, wait_until="networkidle", timeout=30000)
                except Exception:
                    page.goto(url, wait_until="domcontentloaded", timeout=30000)
                page.wait_for_timeout(1200)

                metrics = page.evaluate("""() => {
                    const vw = window.innerWidth;
                    const docW = document.documentElement.scrollWidth;
                    const bodyW = document.body ? document.body.scrollWidth : 0;
                    const overflowX = Math.max(docW, bodyW) - vw;

                    // Images cassées
                    const brokenImgs = [];
                    document.querySelectorAll('img').forEach(img => {
                        const cs = getComputedStyle(img);
                        if (cs.display !== 'none' && img.complete && img.naturalWidth === 0) {
                            brokenImgs.push(img.getAttribute('src') || img.alt || 'img');
                        }
                    });

                    // Liens & boutons cassés ou hors écran
                    const badLinks = [];
                    const overflowEls = [];
                    const smallTapTargets = [];
                    document.querySelectorAll('a, button').forEach(el => {
                        const cs = getComputedStyle(el);
                        if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') return;
                        const rect = el.getBoundingClientRect();
                        if (rect.width === 0 || rect.height === 0) return;

                        if (el.tagName === 'A') {
                            const href = (el.getAttribute('href') || '').trim();
                            if (!href || href === '#' || href.startsWith('javascript:')) {
                                badLinks.push((el.textContent || '').trim().slice(0, 40) || href);
                            }
                        }
                        if (rect.right > vw + 2) {
                            overflowEls.push({
                                tag: el.tagName,
                                text: (el.textContent || '').trim().slice(0, 35),
                                right: Math.round(rect.right),
                                vw: vw
                            });
                        }
                        if (vw <= 450 && rect.height < 34 && rect.width > 10) {
                            smallTapTargets.push({
                                tag: el.tagName,
                                text: (el.textContent || '').trim().slice(0, 30),
                                h: Math.round(rect.height),
                                w: Math.round(rect.width)
                            });
                        }
                    });

                    // Éléments généraux qui débordent
                    const wideBlocks = [];
                    document.querySelectorAll('section, div, header, nav, footer, main, h1, h2, table').forEach(el => {
                        const rect = el.getBoundingClientRect();
                        if (rect.width > vw + 4) {
                            wideBlocks.push({
                                tag: el.tagName,
                                id: el.id || '',
                                cls: (el.className || '').toString().slice(0, 40),
                                w: Math.round(rect.width)
                            });
                        }
                    });

                    return {
                        vw,
                        scrollWidth: Math.max(docW, bodyW),
                        overflowX,
                        brokenImgs: brokenImgs.slice(0, 10),
                        brokenImgsCount: brokenImgs.length,
                        badLinks: badLinks.slice(0, 10),
                        overflowEls: overflowEls.slice(0, 8),
                        wideBlocks: wideBlocks.slice(0, 8),
                        smallTapCount: smallTapTargets.length,
                        smallTapSample: smallTapTargets.slice(0, 6),
                        hasHeader: !!document.querySelector('header'),
                        h1Text: (document.querySelector('h1') ? document.querySelector('h1').textContent.trim().slice(0, 60) : ''),
                        title: document.title
                    };
                }""")

                shot_path = f"{OUT_DIR}/{vp_name}_{slug}.png"
                page.screenshot(path=shot_path, full_page=False)

                page.remove_listener("console", on_console)
                page.remove_listener("response", on_resp)

                report.append({
                    "viewport": vp_name,
                    "slug": slug,
                    "url": url,
                    "metrics": metrics,
                    "console_errors": console_errors[:5],
                    "failed_reqs": failed_reqs[:5],
                    "screenshot": shot_path,
                })

            context.close()
        browser.close()

    with open("/tmp/ambressence_audit/pixel_ux_report.json", "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2, ensure_ascii=False)
    print(f"Audit terminé : {len(report)} vues analysées.")


if __name__ == "__main__":
    run_audit()
