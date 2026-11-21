#!/usr/bin/env python3
"""
AGIA — Générateur automatisé de devis et propositions commerciales.
Clone le template Google Docs officiel, substitue les variables du prospect et enregistre dans le CRM.
"""

import sys
import datetime
import subprocess

TEMPLATE_DOC_ID = "1OGaqATY0N8qwYeS82Gzjxtkb0vZ_t3Q5-HRqLLnD66s"
FOLDER_PRODUCTIONS = "1-CPelCHXcmbk4cBlbsbTE77inFWcfUeb"
SHEET_ID = "1EmC6f4ljLU2GZmD9HEBt50WdTlVXoQtPQ64vFQL1I_0"

def generate_proposal(lead_id, nom_client, entreprise, marche, montant_ht, mission_desc):
    ref_devis = "DEV-" + datetime.datetime.now().strftime("%Y%m%d-%H%M")
    date_jour = datetime.datetime.now().strftime("%d/%m/%Y")
    devise = "EUR" if marche == "France" else "DZD"
    doc_title = f"Proposition Commerciale — {entreprise} ({ref_devis})"
    
    print(f"[PROPOSAL ENGINE] Copie du template pour {entreprise}...")
    cp_cmd = ["gdrive", "mutate", "cp", TEMPLATE_DOC_ID, doc_title]
    cp_res = subprocess.run(cp_cmd, capture_output=True, text=True)
    
    if cp_res.returncode != 0:
        print(f"Error copying template: {cp_res.stderr}")
        return None
        
    # Extraire l'ID du nouveau document
    new_doc_id = None
    for line in cp_res.stdout.splitlines():
        if "ID:" in line:
            new_doc_id = line.split("ID:")[1].strip().replace(")", "")
            break
            
    if not new_doc_id:
        print(f"Could not extract doc ID from output: {cp_res.stdout}")
        return None
        
    print(f"[PROPOSAL ENGINE] Nouveau document créé : {new_doc_id}")
    
    # Déplacement dans le dossier des productions clients
    subprocess.run(["gdrive", "mutate", "mv", new_doc_id, FOLDER_PRODUCTIONS], capture_output=True)
    
    # Remplacer les variables dans le nouveau document
    replacements = [
        ("{{REF_DEVIS}}", ref_devis),
        ("{{DATE_EMISSION}}", date_jour),
        ("{{NOM_CLIENT}}", nom_client),
        ("{{ENTREPRISE}}", entreprise),
        ("{{MARCHE}}", marche),
        ("{{MONTANT_HT}}", f"{montant_ht:,}".replace(",", " ")),
        ("{{DEVISE}}", devise)
    ]
    
    for placeholder, val in replacements:
        subprocess.run(["gdocs", "mutate", "replace", new_doc_id, placeholder, val], capture_output=True)
        
    doc_url = f"https://docs.google.com/document/d/{new_doc_id}/edit"
    print(f"[PROPOSAL ENGINE] Variables substituées. Lien : {doc_url}")
    
    # Enregistrement dans l'onglet 02_OPPORTUNITES_DEVIS du CRM Sheets
    relance1 = (datetime.datetime.now() + datetime.timedelta(days=3)).strftime("%Y-%m-%d")
    relance2 = (datetime.datetime.now() + datetime.timedelta(days=7)).strftime("%Y-%m-%d")
    
    devis_row = [
        ref_devis,
        lead_id,
        date_jour,
        "30 jours",
        marche,
        mission_desc,
        str(montant_ht),
        devise,
        "EMIS",
        doc_url,
        relance1,
        relance2
    ]
    row_str = ",".join(['"' + v.replace('"', '""') + '"' for v in devis_row])
    subprocess.run(["gsheets", "mutate", "append", SHEET_ID, "02_OPPORTUNITES_DEVIS", row_str], capture_output=True)
    print(f"[PROPOSAL ENGINE] Enregistré dans le CRM onglet Devis.")
    return {"ref_devis": ref_devis, "doc_url": doc_url}

if __name__ == "__main__":
    print("Test de génération de proposition...")
    generate_proposal(
        lead_id="LEAD-20261121-063311",
        nom_client="Marc Vauthier",
        entreprise="Transports LogiRapid SAS",
        marche="France",
        montant_ht=6800,
        mission_desc="Automatisation flux Sage & facturation dématérialisée"
    )
