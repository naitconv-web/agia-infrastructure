#!/usr/bin/env python3
"""
SYNTESIA / WORKSTATION-IA — Filet de sécurité secondaire pour .agents/hooks.json
IMPORTANT : La protection principale reste `scripts/harness_ctl.py`.
Ce script bloque uniquement les commandes destructrices explicites ou les fuites
de secrets détectées, sans bloquer les opérations normales de développement.
Code de retour : 0 = autorisé | 2 = bloqué (PreToolUse hook Antigravity).
"""
import json
import os
import re
import sys

# Commandes strictement destructives (ciblées pour éviter les faux positifs)
DESTRUCTIVE_PATTERNS = [
    (r"\brm\s+-[a-zA-Z]*r[a-zA-Z]*f[a-zA-Z]*\s+(/|\*|\.\.?/?|\.git|docs|scripts|sites)(?=\s|$)", "Suppression récursive destructive sur dossier critique ou racine"),
    (r"\brm\s+-[a-zA-Z]*f[a-zA-Z]*r[a-zA-Z]*\s+(/|\*|\.\.?/?|\.git|docs|scripts|sites)(?=\s|$)", "Suppression récursive destructive sur dossier critique ou racine"),
    (r"\bgit\s+push\s+.*(--force|-f)\b", "Git push --force interdit sur le dépôt"),
    (r"\bgit\s+reset\s+--hard\b", "Git reset --hard interdit sans validation explicite"),
    (r"\b(DROP\s+TABLE|DROP\s+DATABASE|TRUNCATE\s+TABLE)\b", "Commande SQL destructive interdite"),
    (r"\brm\s+.*\b(AGENTS\.md|REGISTRE_MEMOIRE\.md|harness_ctl\.py)\b", "Suppression d'un fichier central de gouvernance interdite"),
]

# Secrets critiques à bloquer en clair dans les commandes / arguments
SECRET_PATTERNS = [
    (r"\b(?:sk|rk)_live_[A-Za-z0-9]{10,}\b", "Clé Stripe live détectée en clair"),
    (r"\bwhsec_[A-Za-z0-9]{10,}\b", "Secret webhook Stripe détecté en clair"),
    (r"-----BEGIN [A-Z0-9 ]*PRIVATE KEY-----", "Clé privée PEM détectée en clair"),
    (r"\bgh[pousr]_[A-Za-z0-9]{20,}\b", "Jeton GitHub détecté en clair"),
]


def evaluate_command(cmd_text):
    text = str(cmd_text or "")
    for pat, reason in DESTRUCTIVE_PATTERNS:
        if re.search(pat, text, flags=re.IGNORECASE):
            return False, reason
    for pat, reason in SECRET_PATTERNS:
        if re.search(pat, text):
            return False, reason
    return True, "OK"


def main():
    raw = sys.stdin.read().strip() if not sys.stdin.isatty() else ""
    cmd_text = raw
    if raw.startswith("{"):
        try:
            payload = json.loads(raw)
            tool_input = payload.get("tool_input") or payload.get("input") or {}
            if isinstance(tool_input, dict):
                cmd_text = tool_input.get("CommandLine") or tool_input.get("command") or raw
        except json.JSONDecodeError:
            pass

    allowed, reason = evaluate_command(cmd_text)
    if not allowed:
        sys.stderr.write(f"[HOOK_GUARD BLOCKED] {reason}\n")
        sys.exit(2)
    sys.exit(0)


if __name__ == "__main__":
    main()
