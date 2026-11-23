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

    # 6. Tests du verrou anti-auto-certification (Règle 5) sur répertoire temporaire isolé
    import json, tempfile
    orig_cp_dir, orig_latest = h.CHECKPOINTS_DIR, h.LATEST_CP_PATH
    try:
        with tempfile.TemporaryDirectory() as td:
            h.CHECKPOINTS_DIR = td
            h.LATEST_CP_PATH = os.path.join(td, "LATEST.json")

            # Cas A : CONFIRMED sans auditeur ni preuve -> IN_PROGRESS
            h.cmd_checkpoint("TEST-SELF", "CONFIRMED", "Auto-certif interdite")
            cp_a = json.load(open(os.path.join(td, "CP-TEST-SELF.json")))
            assert cp_a["current_state"]["status"] == "IN_PROGRESS" and cp_a["current_state"]["self_certification_blocked"] is True

            # Cas B : CONFIRMED avec verdict REJETÉ -> BLOCKED
            h.cmd_checkpoint("TEST-REJ", "CONFIRMED", "Rejet", auditor="research-ext", audit_verdict="REJETÉ")
            cp_b = json.load(open(os.path.join(td, "CP-TEST-REJ.json")))
            assert cp_b["current_state"]["status"] == "BLOCKED" and cp_b["current_state"]["self_certification_blocked"] is True

            # Cas C : CONFIRMED avec auditeur + rapport écrit sans preuve réelle (fichier manquant) -> IN_PROGRESS
            h.cmd_checkpoint("TEST-NOPROOF", "CONFIRMED", "Sans fichier", auditor="research-ext", audit_verdict="VALIDÉ", audit_proof="/tmp/does_not_exist_999.md")
            cp_c = json.load(open(os.path.join(td, "CP-TEST-NOPROOF.json")))
            assert cp_c["current_state"]["status"] == "IN_PROGRESS" and cp_c["current_state"]["self_certification_blocked"] is True

            # Cas D : CONFIRMED avec vrai fichier d'audit contenant VALIDÉ -> CONFIRMED + SHA256
            proof_f = os.path.join(td, "AUDIT_PROOF.md")
            open(proof_f, "w", encoding="utf-8").write("# AUDIT INDEPENDANT\nVERDICT : VALIDÉ\nPreuves verifiees sur main.\n")
            h.cmd_checkpoint("TEST-OK", "CONFIRMED", "Audit valide", auditor="research-ext", audit_verdict="VALIDÉ", audit_proof=proof_f)
            cp_d = json.load(open(os.path.join(td, "CP-TEST-OK.json")))
            assert cp_d["current_state"]["status"] == "CONFIRMED" and cp_d["current_state"]["self_certification_blocked"] is False
            assert len(cp_d["current_state"]["audit_proof_sha256"]) == 12
    finally:
        h.CHECKPOINTS_DIR, h.LATEST_CP_PATH = orig_cp_dir, orig_latest

    print("WS-GOV-002 COMPLIANCE & ANTI-SELF-CERTIFICATION TESTS: PASS (6/6 suites)")


if __name__ == "__main__":
    main()
