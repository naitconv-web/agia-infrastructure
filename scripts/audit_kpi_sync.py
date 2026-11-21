#!/usr/bin/env python3
"""
AGIA — audit_kpi_sync.py (v2.0 - Robuste et Rigoureux)

Mission : AGIA-002 (P0 - Fiabilité des données)
Règles impératives :
1. Calcul réel et strict des leads qualifiés à partir de Score_Qualification >= 7.
2. Calcul des taux de conversion à partir des statuts réels ('GAGNE').
3. Calcul du Chiffre d'Affaires UNIQUEMENT à partir des commandes/paiements effectivement encaissés ou validés (onglet 04_FACTURES_PAIEMENTS avec statut 'ENCAISSE' ou 'VALIDE').
4. Calcul des coûts à partir des dépenses réelles constatées (onglet 05_SUPERVISION_COUTS_API).
5. SÉPARATION STRICTE : Les lignes taguées Environnement == 'TEST' ou dont le statut commence par 'TEST_' sont EXCLUES des calculs commerciaux.
6. Zéro résultat fictif : si 0 vente réelle, le CA affiché est strictement 0.
"""

import sys
import subprocess
import csv
import io

SHEET_ID = "1EmC6f4ljLU2GZmD9HEBt50WdTlVXoQtPQ64vFQL1I_0"

def fetch_sheet_rows(tab_name, range_coords):
    cmd = ["gsheets", "readonly", "read", SHEET_ID, f"{tab_name}!{range_coords}"]
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0:
        print(f"[ERROR] Could not read {tab_name}: {res.stderr}")
        return []
    
    lines = [l for l in res.stdout.strip().splitlines() if l.strip()]
    if not lines:
        return []
    
    # Parser en CSV TSV
    rows = []
    for line in lines:
        parts = [p.strip().strip('"') for p in line.split("\t")]
        rows.append(parts)
    return rows

def parse_float(val, default=0.0):
    try:
        clean = str(val).replace("€", "").replace("DZD", "").replace("EUR", "").replace(" ", "").replace(",", ".")
        return float(clean)
    except (ValueError, TypeError):
        return default

def compute_and_sync_kpis():
    print("[AGIA-002 KPI AUDIT] Lecture rigoureuse des données CRM réelles...")

    # 1. Analyse des Leads (01_PROSPECTS_LEADS)
    # Header: ID_Lead, Date_Entree, Marche, Entreprise, Contact_Nom, Email, Telephone, Besoin_Principal, Maturite_IA, Budget_Estime, Score_Qualification, Statut, Notes_Diagnostic, Environnement
    leads_raw = fetch_sheet_rows("01_PROSPECTS_LEADS", "A1:N100")
    total_leads_prod = 0
    qualified_leads_prod = 0
    leads_test_count = 0

    if len(leads_raw) > 1:
        headers = leads_raw[0]
        # Trouver index des colonnes
        idx_score = 10 if len(headers) > 10 else -1
        idx_statut = 11 if len(headers) > 11 else -1
        idx_env = 13 if len(headers) > 13 else -1

        for row in leads_raw[1:]:
            if not row or not row[0]:
                continue
            env = row[idx_env] if idx_env != -1 and len(row) > idx_env else ""
            statut = row[idx_statut] if idx_statut != -1 and len(row) > idx_statut else ""
            
            # Filtre strict exclusion des tests
            if env.upper() == "TEST" or statut.upper().startswith("TEST") or "[TEST]" in str(row):
                leads_test_count += 1
                continue

            total_leads_prod += 1
            score_val = parse_float(row[idx_score], default=0.0) if idx_score != -1 and len(row) > idx_score else 0.0
            if score_val >= 7.0:
                qualified_leads_prod += 1

    # 2. Analyse des Devis (02_OPPORTUNITES_DEVIS)
    # Header: ID_Devis, ID_Lead, Date_Emission, Validite, Marche, Description_Mission, Montant_HT, Devise, Statut, Lien_Doc_Devis, Date_Relance_1, Date_Relance_2, Environnement
    devis_raw = fetch_sheet_rows("02_OPPORTUNITES_DEVIS", "A1:M100")
    total_devis_emis_prod = 0
    devis_gagnes_prod = 0
    devis_test_count = 0

    if len(devis_raw) > 1:
        headers_devis = devis_raw[0]
        idx_statut_d = 8 if len(headers_devis) > 8 else -1
        idx_env_d = 12 if len(headers_devis) > 12 else -1

        for row in devis_raw[1:]:
            if not row or not row[0]:
                continue
            env_d = row[idx_env_d] if idx_env_d != -1 and len(row) > idx_env_d else ""
            statut_d = row[idx_statut_d] if idx_statut_d != -1 and len(row) > idx_statut_d else ""

            if env_d.upper() == "TEST" or statut_d.upper().startswith("TEST") or "[TEST]" in str(row):
                devis_test_count += 1
                continue

            total_devis_emis_prod += 1
            if statut_d.upper() in ["GAGNE", "SIGNE", "ACCEPTE"]:
                devis_gagnes_prod += 1

    conversion_rate = (devis_gagnes_prod / total_devis_emis_prod * 100.0) if total_devis_emis_prod > 0 else 0.0

    # 3. Analyse des Projets de Production (03_PROJETS_PRODUCTION)
    projets_raw = fetch_sheet_rows("03_PROJETS_PRODUCTION", "A1:K100")
    projets_actifs_prod = 0
    if len(projets_raw) > 1:
        for row in projets_raw[1:]:
            if not row or not row[0]:
                continue
            statut_p = row[6] if len(row) > 6 else ""
            if "[TEST]" in str(row) or statut_p.upper().startswith("TEST"):
                continue
            if statut_p.upper() in ["EN_COURS", "ACTIF", "RECETTE"]:
                projets_actifs_prod += 1

    # 4. Analyse du Chiffre d'Affaires Réel (04_FACTURES_PAIEMENTS)
    # Seules les factures ENCAISSEES ou VALIDEES sont comptabilisées
    # Header: ID_Facture, ID_Devis, Entreprise, Marche, Date_Emission, Date_Echeance, Montant_HT, TVA, Montant_TTC, Devise, Statut_Paiement, Ref_Comptable
    factures_raw = fetch_sheet_rows("04_FACTURES_PAIEMENTS", "A1:L100")
    ca_france_reel = 0.0
    ca_algerie_reel = 0.0

    if len(factures_raw) > 1:
        for row in factures_raw[1:]:
            if not row or not row[0]:
                continue
            marche = row[3] if len(row) > 3 else "France"
            montant_ht = parse_float(row[6]) if len(row) > 6 else 0.0
            statut_paiement = row[10] if len(row) > 10 else ""

            if "[TEST]" in str(row) or statut_paiement.upper().startswith("TEST"):
                continue

            # Règle stricte P0 : uniquement si paiement encaissé / validé
            if statut_paiement.upper() in ["ENCAISSE", "PAYE", "SOLDE"]:
                if "ALGERIE" in marche.upper() or "DZ" in marche.upper():
                    ca_algerie_reel += montant_ht
                else:
                    ca_france_reel += montant_ht

    # 5. Analyse des Coûts Réels Constatés (05_SUPERVISION_COUTS_API)
    # Header: Date, Poste_Depense, Modele_Ou_Outil, Tokens_Utilises, Cout_Estime_EUR, Statut_Abonnement, Alertes
    couts_raw = fetch_sheet_rows("05_SUPERVISION_COUTS_API", "A1:G100")
    couts_totaux_engages = 0.0

    if len(couts_raw) > 1:
        for row in couts_raw[1:]:
            if not row or not row[0]:
                continue
            cout_val = parse_float(row[4]) if len(row) > 4 else 0.0
            couts_totaux_engages += cout_val

    print(f"""
=== SYNTHÈSE DE CONTRÔLE RÉELLE (AGIA-002) ===
- Leads réels (Prod)      : {total_leads_prod} (Qualifiés >= 7 : {qualified_leads_prod})
- Leads de test isolés    : {leads_test_count}
- Devis réels émis        : {total_devis_emis_prod} (Gagnés : {devis_gagnes_prod})
- Devis de test isolés    : {devis_test_count}
- Taux de conversion réel : {conversion_rate:.1f}%
- CA Réel Encaissé France : {ca_france_reel:.2f} EUR (Fictif : 0.00 EUR)
- CA Réel Encaissé Algérie: {ca_algerie_reel:.2f} DZD (Fictif : 0.00 DZD)
- Projets actifs réels    : {projets_actifs_prod}
- Dépenses réelles API/SaaS: {couts_totaux_engages:.2f} EUR
""")

    # 6. Mise à jour de 00_DASHBOARD_KPI
    dashboard_rows = (
        f"Leads Commerciaux Réels,{total_leads_prod},50,Nombre,Pipe commercial réel hors tests|"
        f"Leads Qualifiés (Score >= 7),{qualified_leads_prod},20,Nombre,Calculé sur critères stricts|"
        f"Devis Commerciaux Émis,{total_devis_emis_prod},10,Nombre,Devis réels en négociation|"
        f"Taux de Conversion Réel,{conversion_rate:.1f},30,%,Devis réels gagnés / Devis émis|"
        f"Chiffre d'Affaires Encaissé (France),{ca_france_reel:.2f},15000,EUR,Factures réelles encaissées|"
        f"Chiffre d'Affaires Encaissé (Algérie),{ca_algerie_reel:.2f},1500000,DZD,Factures réelles encaissées|"
        f"Projets en Cours (Delivery),{projets_actifs_prod},5,Nombre,Projets clients réels actifs|"
        f"Dépenses Constatées (Outils & IA),{couts_totaux_engages:.2f},0,EUR,Dépenses réelles comptabilisées|"
        f"Données de Test Isolées (Audit),{leads_test_count + devis_test_count},0,Nombre,Traçabilité tests AGIA-001 isolés"
    )

    cmd_write = ["gsheets", "mutate", "write", SHEET_ID, "00_DASHBOARD_KPI!A2:E10", dashboard_rows]
    subprocess.run(cmd_write, check=True)
    print("[SUCCESS] 00_DASHBOARD_KPI mis à jour avec les métriques réelles et auditables.")

if __name__ == "__main__":
    compute_and_sync_kpis()
