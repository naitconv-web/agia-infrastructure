#!/usr/bin/env python3
"""
SYNTESIA — Script d'orchestration, de test et de qualification automatique.
Version 2.0 (Alignée sur le schéma 15 colonnes, les verticales et l'étanchéité TEST/PROD).
"""

import sys
import json
import datetime
import subprocess

SHEET_ID = "1EmC6f4ljLU2GZmD9HEBt50WdTlVXoQtPQ64vFQL1I_0"

def calculate_score(lead):
    score = 5
    budget = lead.get("budget", "")
    if "5 000" in budget or "15 000" in budget:
        score += 3
    elif "2 500" in budget:
        score += 2
    tel_digits = "".join(ch for ch in lead.get("telephone", "") if ch.isdigit())
    if len(tel_digits) >= 8:
        score += 1
    if len(lead.get("description", "")) > 20:
        score += 1
    v_upper = lead.get("verticale", "").upper()
    if any(k in v_upper for k in ["SÉCURITÉ", "SECURITE", "BÂTIMENT", "BATIMENT", "BTP", "RÉNOVATION", "RENOVATION", "HCR", "CGP"]):
        score += 1
    return min(score, 10)

def ingest_lead(lead_data, is_test=False):
    now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    id_lead = ("LEAD-TEST-" if is_test else "LEAD-") + datetime.datetime.now().strftime("%Y%m%d-%H%M%S")
    score = calculate_score(lead_data)
    env_tag = "TEST" if is_test else "PROD"
    
    # Statut
    if is_test:
        statut = "TEST_QUALIFIE" if score >= 7 else "TEST_NOUVEAU"
    else:
        statut = "QUALIFIE" if score >= 7 else "NOUVEAU"

    # 15 colonnes strictes :
    # ID_Lead, Date_Entree, Marche, Verticale_Metier, Entreprise, Contact_Nom, Email, Telephone,
    # Besoin_Principal, Maturite_IA, Budget_Estime, Score_Qualification, Statut, Notes_Diagnostic, Environnement
    row_values = [
        id_lead,
        now,
        lead_data.get("marche", "France"),
        lead_data.get("verticale", "Général / PME"),
        lead_data.get("entreprise", "Inconnu"),
        lead_data.get("nom", "Inconnu"),
        lead_data.get("email", ""),
        lead_data.get("telephone", ""),
        lead_data.get("besoin", ""),
        lead_data.get("maturite", "Moyenne"),
        lead_data.get("budget", "À qualifier"),
        str(score),
        statut,
        f"{'[DONNEE_TEST] ' if is_test else ''}Score {score}/10. {lead_data.get('description', '')}",
        env_tag
    ]
    
    row_str = ",".join(['"' + v.replace('"', '""') + '"' for v in row_values])
    cmd = ["gsheets", "mutate", "append", SHEET_ID, "01_PROSPECTS_LEADS", row_str]
    res = subprocess.run(cmd, capture_output=True, text=True)
    
    if res.returncode == 0:
        print(f"[CRM INGESTION] Lead inséré avec succès : {id_lead} ({lead_data.get('entreprise')}) | Env: {env_tag} | Score: {score}/10")
        return {"status": "success", "id_lead": id_lead, "score": score, "env": env_tag}
    else:
        print(f"[CRM INGESTION ERROR] {res.stderr}")
        return {"status": "error", "error": res.stderr}

if __name__ == "__main__":
    print("Vérification du module d'orchestration CRM...")
    print("Prêt pour l'ingestion.")
