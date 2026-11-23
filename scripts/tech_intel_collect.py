#!/usr/bin/env python3
"""
TECH INTELLIGENCE — Collecteur automatique gratuit (Pôle 1 & Pôle 2)
Utilise uniquement l'outil officiel `gh api` déjà authentifié (0,00 EUR, sans dépendance externe).
"""
import datetime
import json
import os
import subprocess

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SNAPSHOT_PATH = os.path.join(REPO_ROOT, "docs", "tech-intelligence", "snapshots", "latest_collect.json")

WATCHED_REPOS = [
    {"repo": "google-antigravity/antigravity-sdk-python", "pole": "Pôle 1 — Antigravity SDK", "projects": ["WORKSTATION-IA"]},
    {"repo": "googleapis/python-genai", "pole": "Pôle 1 — Gemini / AI Studio SDK", "projects": ["AMBRESSENCE", "SYNTESIA"]},
    {"repo": "cli/cli", "pole": "Pôle 1 — GitHub CLI", "projects": ["ALL"]},
    {"repo": "getpaseo/paseo", "pole": "Pôle 1 — Orchestrateur Paseo", "projects": ["WORKSTATION-IA"]},
    {"repo": "mistralai/mistral-vibe", "pole": "Pôle 1 — Mistral Vibe (Paseo)", "projects": ["WORKSTATION-IA"]},
    {"repo": "anomalyco/opencode", "pole": "Pôle 1 — OpenCode (Paseo)", "projects": ["WORKSTATION-IA"]},
    {"repo": "agentskills/agentskills", "pole": "Pôle 1/3 — Standards Skills", "projects": ["ALL"]},
    {"repo": "modelcontextprotocol/servers", "pole": "Pôle 1 — Protocole MCP", "projects": ["AMBRESSENCE", "OMNISECUR", "SYNTESIA"]},
    {"repo": "promptfoo/promptfoo", "pole": "Pôle 2/3 — Eval & Red-teaming", "projects": ["AMBRESSENCE", "SYNTESIA", "OMNISECUR"]},
    {"repo": "BerriAI/litellm", "pole": "Pôle 2 — Passerelle LLM", "projects": ["OMNISECUR", "SYNTESIA"]},
    {"repo": "langchain-ai/langgraph", "pole": "Pôle 2 — Workflows Agents", "projects": ["OMNISECUR"]},
    {"repo": "mem0ai/mem0", "pole": "Pôle 2 — Mémoire Agents", "projects": ["AMBRESSENCE"]},
    {"repo": "NousResearch/hermes-agent", "pole": "Pôle 2 — Veille concurrente (non retenu)", "projects": ["VEILLE"]},
]


def gh_api(endpoint):
    res = subprocess.run(["gh", "api", endpoint], cwd=REPO_ROOT, capture_output=True, text=True)
    if res.returncode != 0:
        return None
    try:
        return json.loads(res.stdout)
    except json.JSONDecodeError:
        return None


def main():
    os.makedirs(os.path.dirname(SNAPSHOT_PATH), exist_ok=True)
    collected = []
    for item in WATCHED_REPOS:
        repo = item["repo"]
        data = gh_api(f"repos/{repo}")
        rel = gh_api(f"repos/{repo}/releases/latest")
        if not data:
            collected.append({"repo": repo, "status": "ERROR"})
            continue
        lic = (data.get("license") or {}).get("spdx_id") or "CHECK_LICENSE_MD"
        collected.append({
            "repo": repo,
            "pole": item["pole"],
            "projects": item["projects"],
            "stars": data.get("stargazers_count"),
            "open_issues": data.get("open_issues_count"),
            "pushed_at": data.get("pushed_at"),
            "license_spdx": lic,
            "latest_release": (rel or {}).get("tag_name") if isinstance(rel, dict) else None,
            "release_date": (rel or {}).get("published_at") if isinstance(rel, dict) else None,
            "archived": data.get("archived", False),
            "status": "OK",
        })

    payload = {
        "collected_at_utc": datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "cost_eur": 0.0,
        "items": collected,
    }
    with open(SNAPSHOT_PATH, "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2, ensure_ascii=False)
    print(f"[TECH-INTEL COLLECT OK] {len(collected)} depots verifies -> {SNAPSHOT_PATH}")
    for c in collected:
        if c.get("status") == "OK":
            print(f"  - {c['repo']}: {c['stars']} stars | {c['license_spdx']} | release={c['latest_release']} | push={c['pushed_at']}")


if __name__ == "__main__":
    main()
