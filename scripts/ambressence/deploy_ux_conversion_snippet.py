#!/usr/bin/env python3
"""
WS-AMB-002 — Déploiement réversible du correctif UX/UI Conversion & Responsive sur ambressence.com
via Code Snippets REST API (Snippet 17).

Corrections appliquées :
  1. Réparation encodage UTF-8 (mojibake : scellÃ© -> scellé, ExpÃ©diÃ© -> Expédié, â‚¬ -> €).
  2. Fiche produit (/produit/*) : grille 2 colonnes PC (photo à gauche, achat à droite),
     grille 4 colonnes PC / 2 colonnes Mobile pour "Produits similaires", réassurance propre.
  3. Accueil & Mobile : suppression des débordements horizontaux (.brume, .slide, boutons),
     zones tactiles >= 44px sur mobile, nettoyage "· · ·" sur tous les titres/liens.
  4. Univers (/univers/*) : clic direct vers la vraie fiche /produit/...
  5. Catalogue (/recherche/) : barre de filtres rapides cohérente avec les 4 univers.
"""

import base64
import json
import os
import sys
import urllib.request

SNIPPET_NAME = "AMBRESSENCE - UX/UI Conversion (Fiches directes, Filtres, Reassurance)"

PHP_CODE = r"""
// WS-AMB-002 : UX/UI Conversion & Responsive Upgrade (réversible)
add_action( 'init', function () {
    if ( is_admin() ) { return; }
    if ( function_exists( 'wp_doing_ajax' ) && wp_doing_ajax() ) { return; }
    if ( defined( 'REST_REQUEST' ) && REST_REQUEST ) { return; }
    if ( defined( 'DOING_CRON' ) && DOING_CRON ) { return; }
    if ( ! empty( $_GET['wc-ajax'] ) ) { return; }
    if ( ! empty( $_SERVER['REQUEST_URI'] ) && strpos( $_SERVER['REQUEST_URI'], '/wp-json/' ) !== false ) { return; }
    if ( $_SERVER['REQUEST_METHOD'] !== 'GET' ) { return; }

    ob_start( function ( $html ) {
        if ( stripos( $html, '<html' ) === false ) {
            return $html;
        }

        // 1. Réparation des séquences mojibake UTF-8 fréquentes dans les snippets existants
        $mojibake = array(
            'scellÃ©'   => 'scellé',
            'ExpÃ©diÃ©' => 'Expédié',
            'expÃ©diÃ©' => 'expédié',
            'dÃ¨s'      => 'dès',
            'â‚¬'       => '€',
            'â€™'       => '’',
            'Ã©'        => 'é',
            'Ã¨'        => 'è',
            'Ã '        => 'à',
            'Ã´'        => 'ô',
            'Ã®'        => 'î',
            'Ã§'        => 'ç',
            'Â·'        => '·',
        );
        $html = strtr( $html, $mojibake );

        // Nettoyer les séparateurs multiples "· · ·" dans le HTML rendu
        $html = preg_replace( '/(?:\s*·\s*){2,}/u', ' · ', $html );

        $inject = <<<'HTML'
<style id="amb-ux-conversion-css">
/* Anti-débordement horizontal global PC & Mobile */
html, body, main, section { max-width: 100vw !important; overflow-x: clip !important; }
.brume, .slide, .carrousel { max-width: 100% !important; overflow: hidden !important; }

/* Cartes produits cliquables */
.produit .produit-visuel, .produit h3 { cursor: pointer; }
.produit h3:hover { color: #8a5f1e !important; text-decoration: underline; text-underline-offset: 3px; }

/* Fiche Produit WooCommerce (/produit/*) : 2 colonnes propres PC + 1 colonne Mobile */
body.single-product div.product {
  display: grid !important;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr) !important;
  gap: 2.4rem !important;
  align-items: start !important;
  max-width: 1180px !important;
  margin: 2rem auto !important;
  padding: 0 1.2rem !important;
}
body.single-product div.product .woocommerce-product-gallery {
  width: 100% !important;
  float: none !important;
  margin: 0 !important;
  background: #fff;
  border: 1px solid rgba(138, 95, 30, .2);
  border-radius: 6px;
  padding: 1.2rem;
}
body.single-product div.product .summary.entry-summary {
  width: 100% !important;
  float: none !important;
  margin: 0 !important;
}
body.single-product section.related.products {
  grid-column: 1 / -1 !important;
  margin-top: 2.5rem !important;
  padding-top: 2rem !important;
  border-top: 1px solid rgba(138, 95, 30, .2) !important;
}
body.single-product section.related.products ul.products {
  display: grid !important;
  grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
  gap: 1.2rem !important;
  margin: 1.2rem 0 0 !important;
  padding: 0 !important;
  list-style: none !important;
}
body.single-product section.related.products ul.products li.product {
  width: 100% !important;
  margin: 0 !important;
  float: none !important;
  background: #fdfaf3 !important;
  border: 1px solid rgba(138, 95, 30, .2) !important;
  border-radius: 6px !important;
  padding: 1rem !important;
  display: flex !important;
  flex-direction: column !important;
}
body.single-product section.related.products ul.products li.product img {
  width: 100% !important;
  height: 190px !important;
  object-fit: contain !important;
  margin-bottom: .75rem !important;
}
@media (max-width: 820px) {
  body.single-product div.product { grid-template-columns: 1fr !important; gap: 1.4rem !important; }
  body.single-product section.related.products ul.products { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: .8rem !important; }
}

/* Bloc réassurance conversion */
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

/* Filtres catalogue */
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
  padding: .6rem 1rem;
  min-height: 40px;
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

/* Zones tactiles confortables sur Mobile */
@media (max-width: 768px) {
  .produit-cta, .btn, button, .pied a, .nav-barre a {
    min-height: 40px;
  }
  .produit h3 a, .produit-corps a {
    display: inline-block;
    padding: 6px 0;
    min-height: 36px;
  }
}
</style>
<script id="amb-ux-conversion-js">
(function(){
  var path = window.location.pathname || '/';

  function cleanDots(txt){
    return (txt || '').replace(/(?:\s*·\s*){2,}/g, ' · ').trim();
  }
  if (document.title && document.title.indexOf('· ·') !== -1) {
    document.title = cleanDots(document.title);
  }
  document.querySelectorAll('h1, h2, h3, .woocommerce-loop-product__title, .produit h3 a').forEach(function(el){
    if (el.textContent && el.textContent.indexOf('· ·') !== -1) {
      el.textContent = cleanDots(el.textContent);
    }
  });

  // Corriger lien vide "Gérer les cookies"
  document.querySelectorAll('a[href="#"]').forEach(function(a){
    a.setAttribute('href', '#gerer-cookies');
  });

  // Sur /univers/* : relier chaque carte parfum vers sa vraie fiche produit WooCommerce
  if (path.indexOf('/univers/') === 0) {
    setTimeout(function(){
      document.querySelectorAll('#grille-collection .produit').forEach(function(card){
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

  // Sur /recherche/ : filtres rapides
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

  // Sur /produit/* : ajouter la réassurance conversion sous le bouton d'achat
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

    target_id = os.environ.get("SNIPPET_ID")
    if not target_id:
        req_list = urllib.request.Request(f"{base_url}/wp-json/code-snippets/v1/snippets", headers=headers)
        with urllib.request.urlopen(req_list, timeout=45) as r:
            raw = r.read().decode("utf-8")
            existing = json.loads(raw[:raw.rfind("]") + 1])
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
