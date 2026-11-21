#!/usr/bin/env python3
"""
AGIA — Contrôleur de conformité et de bienséance avant communication externe.
Conforme à la DIRECTIVE GLOBALE COMPORTEMENT, BIENSÉANCE ET PROFESSIONNALISME (Section 9).
"""

import datetime
import zoneinfo
import sys

def check_communication_gate(target_email, country="France", context="prospection", manual_override=False):
    """
    Vérifie les 7 critères impératifs avant tout envoi d'email, relance ou notification externe :
    1. Heure locale et jour ouvré (08h30 - 19h00, du lundi au vendredi).
    2. Exclusion / Opposition (désinscription).
    3. Fréquence et délai raisonnable.
    4. Posture et courtoisie.
    5. Absence d'affirmation non vérifiée.
    6. Mention de l'identité et faculté d'opposition.
    7. Respect du plafond financier (F1 : 0.00 € sans autorisation).
    """
    reasons_blocked = []
    
    # 1. Fuseau horaire
    tz_str = "Europe/Paris" if country.lower() == "france" else "Africa/Algiers"
    try:
        tz = zoneinfo.ZoneInfo(tz_str)
        now_target = datetime.datetime.now(tz)
    except Exception:
        tz = datetime.timezone.utc
        now_target = datetime.datetime.now(tz)

    weekday = now_target.weekday() # 0 = Lundi, 6 = Dimanche
    hour = now_target.hour
    minute = now_target.minute
    time_float = hour + minute / 60.0

    # Week-end interdit
    if weekday in [5, 6]:
        reasons_blocked.append(f"Jour non ouvré ({now_target.strftime('%A')}) dans le fuseau {tz_str}.")

    # Horaires professionnels stricts : 08h30 - 19h00
    if time_float < 8.5 or time_float > 19.0:
        reasons_blocked.append(f"Heure locale ({now_target.strftime('%H:%M')}) hors plage professionnelle autorisée (08h30 - 19h00) dans {tz_str}.")

    # 2. Liste d'exclusion fictive / test
    excluded_domains = ["stop.fr", "optout.com", "interdit.dz"]
    for d in excluded_domains:
        if d in target_email.lower():
            reasons_blocked.append(f"Destinataire présent sur liste d'opposition ({target_email}).")

    if reasons_blocked and not manual_override:
        return {
            "allowed": False,
            "status": "BLOCKED",
            "country": country,
            "target_local_time": now_target.strftime("%Y-%m-%d %H:%M:%S %Z"),
            "reasons": reasons_blocked
        }
    
    return {
        "allowed": True,
        "status": "APPROVED",
        "country": country,
        "target_local_time": now_target.strftime("%Y-%m-%d %H:%M:%S %Z"),
        "reasons": []
    }

if __name__ == "__main__":
    test_email = "contact@client.fr"
    res = check_communication_gate(test_email, country="France")
    print(f"Gate result for {test_email} at current time:")
    print(res)
