#!/usr/bin/env python3
"""
AGIA — Script d'orchestration, de test et de qualification automatique.
Permet d'ingérer un lead, de qualifier son besoin, d'insérer dans Sheets et de déclencher les alertes.
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
    if len(lead.get("telephone", "")) >= 8:
        score += 1
    if len(lead.get("description", "")) > 30:
        score += 1
    return min(score, 10)

def ingest_lead(lead_data):
    now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    id_lead = "LEAD-" + datetime.datetime.now().strftime("%Y%m%d-%H%M%S")
    score = calculate_score(lead_data)
    
    row_values = [
        id_lead,
        now,
        lead_data.get("marche", "France"),
        lead_data.get("entreprise", "Inconnu"),
        lead_data.get("nom", "Inconnu"),
        lead_data.get("email", ""),
        lead_data.get("telephone", ""),
        lead_data.get("besoin", ""),
        lead_data.get("maturite", "Moyenne"),
        lead_data.get("budget", ""),
        str(score),
        "QUALIFIE" if score >= 7 else "NOUVEAU",
        f"Auto-qualifié. Score {score}/10. {lead_data.get('description', '')}"
    ]
    
    # Écriture dans le CRM Google Sheets via CLI
    row_str = ",".join(['"' + v.replace('"', '""') + '"' for v in row_values])
    cmd = ["gsheets", "mutate", "append", SHEET_ID, "01_PROSPECTS_LEADS", row_str]
    res = subprocess.run(cmd, capture_output=True, text=True)
    
    if res.returncode == 0:
        print(f"[CRM INGESTION] Lead inséré avec succès : {id_lead} ({lead_data.get('entreprise')}) | Score: {score}/10")
        return {"status": "success", "id_lead": id_lead, "score": score}
    else:
        print(f"[CRM INGESTION ERROR] {res.stderr}")
        return {"status": "error", "error": res.stderr}

if __name__ == "__main__":
    test_lead = {
        "marche": "France",
        "entreprise": "Transports LogiRapid SAS",
        "nom": "Marc Vauthier",
        "email": "m.vauthier@logirapid.fr",
        "telephone": "06 45 89 12 30",
        "besoin": "Automatisation des flux et facturation",
        "maturite": "Intermédiaire (CRM ou ERP standard)",
        "budget": "5 000 € - 15 000 €",
        "description": "Nous devons automatiser le rapprochement des bordereaux de livraison avec nos factures Sage."
    }
    print("Exécution du test d'ingestion CRM...")
    ingest_lead(test_lead)
