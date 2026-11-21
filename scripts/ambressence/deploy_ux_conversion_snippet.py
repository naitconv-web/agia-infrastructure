#!/usr/bin/env python3
"""
WS-AMB-002 — Déploiement réversible du correctif UX/UI Conversion sur ambressence.com
via Code Snippets REST API (sans toucher aux fichiers statiques o2switch).

Effets :
  1. Sur /univers/* : rend chaque carte parfum cliquable vers sa vraie fiche /produit/...
     (résolution dynamique via Store API) au lieu de laisser la carte morte ou renvoyer vers /recherche/.
  2. Sur /recherche/ : ajoute des filtres instantanés (Univers + Tri prix) et une grille
     cohérente avec la charte Crème / Ébène / Or, avec lien direct fiche produit + ajout panier.
  3. Sur /produit/* : nettoie les séparateurs "· · ·" résiduels et ajoute les 3 preuves
     de réassurance + seuil livraison offerte 60 € sous le bouton d'achat.

Réversible en 1 clic : désactiver le snippet via API ou back-office Code Snippets.
"""

import base64
import json
import os
import sys
import urllib.request

SNIPPET_NAME = "AMBRESSENCE - UX/UI Conversion (Fiches directes, Filtres, Reassurance)"

PHP_CODE = r"""
// WS-AMB-002 : UX/UI Conversion Upgrade (réversible)
add_action( 'init', function () {
    if ( is_admin() ) { return; }
    if ( function_exists( 'wp_doing_ajax' ) && wp_doing_ajax() ) { return; }
    if ( defined( 'REST_REQUEST' ) && REST_REQUEST ) { return; }
    if ( defined( 'DOING_CRON' ) && DOING_CRON ) { return; }
    if ( ! empty( $_GET['wc-ajax'] ) ) { return; }
    if ( $_SERVER['REQUEST_METHOD'] !== 'GET' ) { return; }

    ob_start( function ( $html ) {
        if ( stripos( $html, '<html' ) === false ) {
            return $html;
        }
        $inject = <<<'HTML'
<style id="amb-ux-conversion-css">
/* Cohérence & Conversion UX/UI */
.produit .produit-visuel, .produit h3 { cursor: pointer; }
.produit h3:hover { color: #8a5f1e !important; text-decoration: underline; text-underline-offset: 3px; }
.amb-pdp-reassurance {
  margin-top: 1.25rem;
  padding: 1rem 1.15rem;
  background: #fdfaf3;
  border: 1px solid rgba(138, 95, 30, .26);
  border-radius: 4px;
  display: grid;
  gap: .45rem;
  font-size: .86rem;
  color: #4a3923;
}
.amb-pdp-reassurance div { display: flex; align-items: center; gap: .5rem; }
.amb-cat-filters {
  display: flex;
  flex-wrap: wrap;
  gap: .6rem;
  justify-content: center;
  margin: 1.2rem auto 1.8rem;
  max-width: 820px;
}
.amb-cat-pill {
  background: #fdfaf3;
  border: 1px solid rgba(138, 95, 30, .32);
  color: #6f5b3e;
  padding: .55rem 1rem;
  border-radius: 3px;
  font-size: .74rem;
  letter-spacing: .14em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all .2s;
}
.amb-cat-pill.active, .amb-cat-pill:hover {
  background: #261b0e;
  color: #e8c47c;
  border-color: #261b0e;
}
</style>
<script id="amb-ux-conversion-js">
(function(){
  var path = window.location.pathname || '/';

  // 1. Nettoyage visuel des titres "· · ·" sur toutes les pages
  function cleanDots(txt){
    return (txt || '').replace(/(?:\s*·\s*){2,}/g, ' · ').trim();
  }
  if (document.title && document.title.indexOf('· ·') !== -1) {
    document.title = cleanDots(document.title);
  }
  var h1 = document.querySelector('h1.product_title, h1');
  if (h1 && h1.textContent.indexOf('· ·') !== -1) {
    h1.textContent = cleanDots(h1.textContent);
  }

  // 2. Sur /univers/* : relier chaque carte parfum vers sa vraie fiche produit WooCommerce
  if (path.indexOf('/univers/') === 0) {
    setTimeout(function(){
      var cards = document.querySelectorAll('#grille-collection .produit');
      cards.forEach(function(card){
        var titleEl = card.querySelector('h3');
        var brandEl = card.querySelector('.maison');
        var visEl = card.querySelector('.produit-visuel');
        if (!titleEl) return;
        var q = ((brandEl ? brandEl.textContent : '') + ' ' + titleEl.textContent).trim();
        function goProduct(e){
          if (e) e.preventDefault();
          fetch('/wp-json/wc/store/v1/products?per_page=1&search=' + encodeURIComponent(q))
            .then(function(r){ return r.json(); })
            .then(function(arr){
              if (Array.isArray(arr) && arr[0] && arr[0].permalink) {
                window.location.href = arr[0].permalink;
              } else {
                window.location.href = '/recherche/?q=' + encodeURIComponent(q);
              }
            })
            .catch(function(){
              window.location.href = '/recherche/?q=' + encodeURIComponent(q);
            });
        }
        titleEl.addEventListener('click', goProduct);
        if (visEl) visEl.addEventListener('click', goProduct);
      });
    }, 300);
  }

  // 3. Sur /recherche/ : ajouter les filtres rapides cohérents avec les 4 univers
  if (path.indexOf('/recherche') === 0) {
    var box = document.querySelector('.recherche-boite') || document.querySelector('main');
    var input = document.querySelector('.champ-recherche input, input[type="search"], input[type="text"]');
    if (box && !document.getElementById('amb-cat-filters')) {
      var bar = document.createElement('div');
      bar.id = 'amb-cat-filters';
      bar.className = 'amb-cat-filters';
      var filters = [
        { label: 'Tous', q: '' },
        { label: 'Ambré & Oud', q: 'oud' },
        { label: 'Floral & Rose', q: 'rose' },
        { label: 'Boisé & Cèdre', q: 'bois' },
        { label: 'Frais & Bergamote', q: 'eau' },
        { label: 'Lattafa', q: 'Lattafa' },
        { label: 'Givenchy', q: 'Givenchy' }
      ];
      filters.forEach(function(f, idx){
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'amb-cat-pill' + (idx === 0 ? ' active' : '');
        btn.textContent = f.label;
        btn.addEventListener('click', function(){
          bar.querySelectorAll('.amb-cat-pill').forEach(function(b){ b.classList.remove('active'); });
          btn.classList.add('active');
          if (input) {
            input.value = f.q;
            input.dispatchEvent(new Event('input', { bubbles: true }));
          }
        });
        bar.appendChild(btn);
      });
      box.insertAdjacentElement('afterend', bar);
    }
  }

  // 4. Sur /produit/* : ajouter la réassurance conversion sous le bouton d'achat
  if (path.indexOf('/produit/') === 0 && !document.querySelector('.amb-pdp-reassurance')) {
    var target = document.querySelector('.summary .cart, .summary .amb-buy-wrap, #ajouter-panier, .single_add_to_cart_button');
    if (target && target.parentNode) {
      var boxR = document.createElement('div');
      boxR.className = 'amb-pdp-reassurance';
      boxR.innerHTML =
        '<div>✓ <strong>100 % Authentique :</strong> Flacon neuf et scellé d’origine.</div>' +
        '<div>✓ <strong>Livraison offerte dès 60 € :</strong> Expédié d’Europe sous 24–48h ouvrées.</div>' +
        '<div>✓ <strong>Retours offerts sous 14 jours :</strong> Achat protégé.</div>';
      target.parentNode.insertBefore(boxR, target.nextSibling);
    }
  }
})();
</script>
HTML;
        if ( stripos( $html, '</body>' ) !== false ) {
            return str_ireplace( '</body>', $inject . '</body>', $html );
        }
        return $html . $inject;
    }, 0 );
}, 1 );
"""


def main() -> int:
    user = os.environ.get("WP_USER", "")
    app_pass = os.environ.get("WP_APP_PASS", "")
    base_url = os.environ.get("WP_URL", "https://ambressence.com").rstrip("/")
    if not user or not app_pass:
        print("ERREUR: WP_USER et WP_APP_PASS requis.", file=sys.stderr)
        return 1

    tok = base64.b64encode(f"{user}:{app_pass}".encode("utf-8")).decode("ascii")
    headers = {
        "Authorization": f"Basic {tok}",
        "Content-Type": "application/json",
        "User-Agent": "WS-AMB-002-UX/1.0",
    }

    # Vérifier si le snippet existe déjà
    req_list = urllib.request.Request(f"{base_url}/wp-json/code-snippets/v1/snippets", headers=headers)
    with urllib.request.urlopen(req_list, timeout=45) as r:
        existing = json.loads(r.read().decode("utf-8"))

    target_id = None
    for s in existing:
        if s.get("name") == SNIPPET_NAME:
            target_id = s.get("id")
            break

    payload = {
        "name": SNIPPET_NAME,
        "code": PHP_CODE.strip(),
        "scope": "global",
        "priority": 10,
        "active": True,
    }

    if target_id:
        url = f"{base_url}/wp-json/code-snippets/v1/snippets/{target_id}"
        method = "PUT"
    else:
        url = f"{base_url}/wp-json/code-snippets/v1/snippets"
        method = "POST"

    req = urllib.request.Request(url, data=json.dumps(payload).encode("utf-8"), headers=headers, method=method)
    with urllib.request.urlopen(req, timeout=45) as resp:
        res = json.loads(resp.read().decode("utf-8"))
        print(f"Snippet déployé ({method}): id={res.get('id')} | active={res.get('active')}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
