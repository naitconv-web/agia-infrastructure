#!/usr/bin/env bash
# Script de déploiement exécuté par cPanel (.cpanel.yml) sur o2switch.
# Par sécurité, DRY_RUN=1 par défaut tant que le déploiement réel n'est pas activé.
set -euo pipefail

DRY_RUN="${DRY_RUN:-1}"
SOURCE_DIR="${SOURCE_DIR:-docs/ambressence/patches}"
TARGET_DIR="${TARGET_DIR:-/home/ruqa5736/public_html/wp-content/mu-plugins}"

echo "=== cPanel Git Deploy (DRY_RUN=${DRY_RUN}) ==="
echo "Source : ${SOURCE_DIR}"
echo "Cible  : ${TARGET_DIR}"

if [ ! -d "${SOURCE_DIR}" ]; then
  echo "ERROR: Répertoire source introuvable: ${SOURCE_DIR}"
  exit 1
fi

if [ ! -d "${TARGET_DIR}" ]; then
  echo "ERROR: Répertoire cible introuvable sur o2switch: ${TARGET_DIR}"
  exit 1
fi

RSYNC_OPTS=(-avz --delay-updates --exclude=wp-config.php --exclude=.htaccess --exclude=wp-content/uploads/ --exclude=.env)

if [ "${DRY_RUN}" = "1" ]; then
  echo "[MODE DRY-RUN] Aucune modification appliquée en production :"
  /usr/bin/rsync --dry-run "${RSYNC_OPTS[@]}" "${SOURCE_DIR}/" "${TARGET_DIR}/"
  exit 0
fi

mkdir -p "${HOME}/backups"
TS=$(date -u +"%Y%m%d-%H%M%SZ")
tar -czf "${HOME}/backups/cpanel-deploy-${TS}.tar.gz" -C "${TARGET_DIR}" .
/usr/bin/rsync "${RSYNC_OPTS[@]}" "${SOURCE_DIR}/" "${TARGET_DIR}/"
echo "PASS: Déploiement cPanel terminé avec sauvegarde préalable."
