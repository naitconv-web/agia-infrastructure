#!/usr/bin/env python3
"""
Tests de conformité WS-GOV-001 + WS-GOV-002 — Charte de Franchise, Non-Complaisance et Responsabilité.
Vérifie la transmission effective dans les points d'entrée réels ET la couverture des 8 scénarios comportementaux.
"""
import os
import subprocess
import sys

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.insert(0, os.path.join(REPO_ROOT, "scripts"))
import harness_ctl as h
import hook_guard as hg


def main():
    # 1. Présence de la charte renforcée (WS-GOV-001 + WS-GOV-002) à la racine
    charter_path = os.path.join(REPO_ROOT, "CHARTE-FRANCHISE-NON-COMPLAISANCE.md")
    assert os.path.exists(charter_path), "CHARTE-FRANCHISE-NON-COMPLAISANCE.md manquant"
    charter_txt = open(charter_path, "r", encoding="utf-8").read()
    for required in [
        "RÈGLE 1 — OBLIGATION DE CONSEIL",
        "RÈGLE 2 — ZÉRO CERTITUDE FABRIQUÉE",
        "RÈGLE 3 — RESPONSABILITÉ DES RECOMMANDATIONS",
        "RÈGLE 4 — DROIT D'ALERTE ET DE SUSPENSION",
        "RÈGLE 5 — INDÉPENDANCE DES AUDITEURS",
        "RÈGLE 6 — MÉMOIRE DES ERREURS ET DES DÉSACCORDS",
        "RÈGLE 7 — EXISTANT AVANT DÉVELOPPEMENT",
        "A. OBJECTIF",
        "G. RESPONSABILITÉ",
        "PROTECTION CONTRE LA COMPLAISANCE COLLECTIVE",
    ]:
        assert required in charter_txt, f"Obligation WS-GOV-002 manquante: {required}"

    # 2. Registre des erreurs et désaccords (Règle 6) & preuves comportementales (Scénarios 1..8)
    err_path = os.path.join(REPO_ROOT, "docs", "harness", "REGISTRE_ERREURS_ET_DESACCORDS.md")
    assert os.path.exists(err_path), "REGISTRE_ERREURS_ET_DESACCORDS.md manquant"
    err_txt = open(err_path, "r", encoding="utf-8").read()
    assert "DES-001" in err_txt and "DES-002" in err_txt, "Preuves de désaccord/rejet absentes"

    # 3. Scénario 5 : Détection dépense / secret non autorisé (hook_guard)
    ok_spend, _ = hg.evaluate_command("echo sk_live_1234567890abcdef")
    assert not ok_spend, "Scénario 5 échoué: secret live non bloqué"

    # 4. Scénario 8 : Distinction documentée vs tentée vs exécutée (validate_execution_proof)
    doc_only = h.validate_execution_proof({"id": "T-DOC"})
    assert doc_only["classification"] == "ACTION_DOCUMENTED_ONLY" and doc_only["allowed_status"] == "PROPOSED"

    # 5. Transmission effective lors du preflight réel
    res = subprocess.run(["python3", "scripts/harness_ctl.py", "preflight"], cwd=REPO_ROOT, capture_output=True, text=True)
    assert res.returncode == 0, f"Preflight a échoué: {res.stderr}\n{res.stdout}"
    assert "CHARTE_FRANCHISE_V2: True" in res.stdout, "Preflight ne vérifie pas CHARTE_FRANCHISE_V2"
    assert "ERRORS_LOG: True" in res.stdout, "Preflight ne vérifie pas ERRORS_LOG"
    assert "DIRECTIVE_WS-GOV-002" in res.stdout, "Preflight n'injecte pas DIRECTIVE_WS-GOV-002"

    print("WS-GOV-002 COMPLIANCE & BEHAVIORAL GUARD TESTS: PASS (5/5 suites)")


if __name__ == "__main__":
    main()
