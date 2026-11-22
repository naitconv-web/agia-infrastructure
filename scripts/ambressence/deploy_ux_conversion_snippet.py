#!/usr/bin/env python3
"""
WS-AMB-002 — Déploiement réversible du correctif UX/UI Conversion & Catalogue /catalogue/
sur ambressence.com via Code Snippets REST API (Snippet 17).

Corrections appliquées :
  1. Contournement autonome de /recherche/ : redirige les liens "Le Catalogue" vers /catalogue/
     (page WordPress dédiée, cohérente Crème/Ébène/Or, filtres instantanés, clic direct fiche produit).
  2. Réparation encodage UTF-8 (mojibake : scellÃ© -> scellé, ExpÃ©diÃ© -> Expédié, â‚¬ -> €).
  3. Fiche produit (/produit/*) : force l'affichage de la galerie photo (opacity: 1),
     grille 2 colonnes PC, grille 4x2 "Produits similaires", réassurance propre.
  4. Accueil & Mobile : suppression des débordements horizontaux, zones tactiles >= 40px.
  5. Univers (/univers/*) : clic direct vers la vraie fiche /produit/...
"""

import base64
import json
import os
import sys
import urllib.request

SNIPPET_NAME = "AMBRESSENCE - UX/UI Conversion (Fiches directes, Filtres, Reassurance)"

PHP_CODE = r"""
// WS-AMB-002 : UX/UI Conversion, /catalogue/ & Responsive Upgrade (réversible)
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

        // 1. Réparation des séquences mojibake UTF-8
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
        $html = preg_replace( '/(?:\s*·\s*){2,}/u', ' · ', $html );

        // 2. Rediriger les liens /recherche/ vers notre nouveau /catalogue/ unifié
        $html = str_replace(
            array( 'https://ambressence.com/recherche/', 'href="/recherche/"' ),
            array( 'https://ambressence.com/catalogue/', 'href="/catalogue/"' ),
            $html
        );

        $inject = <<<'HTML'
<style id="amb-ux-conversion-css">
/* Anti-débordement horizontal global PC & Mobile */
html, body, main, section { max-width: 100vw !important; overflow-x: clip !important; }
.brume, .slide, .carrousel { max-width: 100% !important; overflow: hidden !important; }

/* Cartes produits cliquables */
.produit .produit-visuel, .produit h3 { cursor: pointer; }
.produit h3:hover { color: #8a5f1e !important; text-decoration: underline; text-underline-offset: 3px; }

/* Fiche Produit WooCommerce (/produit/*) : photo toujours visible + grille 2 colonnes PC / 1 Mobile */
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
  opacity: 1 !important;
  visibility: visible !important;
  background: #fff !important;
  border: 1px solid rgba(138, 95, 30, .2) !important;
  border-radius: 6px !important;
  padding: 1.2rem !important;
}
body.single-product div.product .woocommerce-product-gallery img {
  opacity: 1 !important;
  visibility: visible !important;
  max-height: 420px !important;
  width: 100% !important;
  object-fit: contain !important;
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

/* Styles du nouveau Catalogue unifié /catalogue/ */
#amb-catalogue-app {
  max-width: 1220px;
  margin: 1.5rem auto 4rem;
  padding: 0 1.2rem;
  color: #261b0e;
}
.amb-cat-head {
  text-align: center;
  padding: 2rem 1rem 1.6rem;
  background: linear-gradient(180deg, #efe6d2, #f7f1e4);
  border-radius: 6px;
  margin-bottom: 1.6rem;
  border: 1px solid rgba(138, 95, 30, .18);
}
.amb-cat-head h1 {
  font-family: "Didot", "Playfair Display", Georgia, serif;
  font-size: clamp(1.9rem, 3.6vw, 2.8rem);
  font-weight: 400;
  margin: .35rem 0 .5rem;
}
.amb-cat-controls {
  display: flex;
  flex-wrap: wrap;
  gap: .75rem;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.8rem;
}
.amb-cat-search {
  flex: 1;
  min-width: 240px;
  max-width: 460px;
  padding: .8rem 1rem;
  border: 1px solid rgba(138, 95, 30, .35);
  border-radius: 4px;
  background: #fdfaf3;
  font-size: .95rem;
  color: #261b0e;
}
.amb-cat-pill {
  background: #fdfaf3;
  border: 1px solid rgba(138, 95, 30, .32);
  color: #6f5b3e;
  padding: .6rem 1rem;
  min-height: 40px;
  border-radius: 3px;
  font-size: .74rem;
  letter-spacing: .12em;
  text-transform: uppercase;
  cursor: pointer;
}
.amb-cat-pill.active, .amb-cat-pill:hover {
  background: #261b0e;
  color: #e8c47c;
  border-color: #261b0e;
}
.amb-cat-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.2rem;
}
.amb-cat-card {
  background: #fdfaf3;
  border: 1px solid rgba(138, 95, 30, .2);
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.amb-cat-card a.img-link {
  background: #fff;
  display: grid;
  place-items: center;
  height: 210px;
  padding: 1rem;
  border-bottom: 1px solid rgba(138, 95, 30, .14);
}
.amb-cat-card a.img-link img {
  max-height: 175px;
  width: 100%;
  object-fit: contain;
}
.amb-cat-body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: .5rem;
}
.amb-cat-title {
  font-family: "Didot", "Playfair Display", Georgia, serif;
  font-size: 1.05rem;
  line-height: 1.3;
  color: #261b0e;
  text-decoration: none;
}
.amb-cat-foot {
  margin-top: auto;
  padding-top: .7rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: .5rem;
}
.amb-cat-price { font-weight: 700; font-size: 1.05rem; }
.amb-cat-btn {
  background: #261b0e;
  color: #f7f1e4;
  padding: .55rem .9rem;
  border-radius: 3px;
  font-size: .72rem;
  letter-spacing: .1em;
  text-transform: uppercase;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  min-height: 38px;
}
.amb-cat-btn:hover { background: #8a5f1e; color: #fff; }
@media (max-width: 960px) { .amb-cat-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 520px) { .amb-cat-grid { grid-template-columns: 1fr; } }

/* Zones tactiles confortables sur Mobile */
@media (max-width: 768px) {
  .produit-cta, .btn, button, .pied a, .nav-barre a { min-height: 40px; }
  .produit h3 a, .produit-corps a { display: inline-block; padding: 6px 0; min-height: 36px; }
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
  document.querySelectorAll('a[href="#"]').forEach(function(a){
    a.setAttribute('href', '#gerer-cookies');
  });

  // 1. Sur /univers/* : relier chaque carte parfum vers sa vraie fiche produit WooCommerce
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
                window.location.href = '/catalogue/?q=' + encodeURIComponent(q);
              }
            })
            .catch(function(){
              window.location.href = '/catalogue/?q=' + encodeURIComponent(q);
            });
        }
        titleEl.addEventListener('click', goProduct);
        if (visEl) visEl.addEventListener('click', goProduct);
      });
    }, 300);
  }

  // 2. Sur /catalogue/ : rendre le nouveau Catalogue unifié haute conversion
  if (path.indexOf('/catalogue') === 0) {
    var root = document.getElementById('amb-catalogue-root') || document.querySelector('.entry-content') || document.querySelector('main');
    if (root) {
      root.innerHTML =
        '<div id="amb-catalogue-app">' +
          '<div class="amb-cat-head">' +
            '<div style="font-size:.7rem;letter-spacing:.3em;text-transform:uppercase;color:#8a5f1e;font-weight:600">Maison Ambressence · Sélection Européenne</div>' +
            '<h1>Le Catalogue</h1>' +
            '<p style="color:#6f5b3e;max-width:56ch;margin:0 auto">2 552 parfums authentiques, flacons neufs et scellés, livraison offerte dès 60 €.</p>' +
          '</div>' +
          '<div class="amb-cat-controls">' +
            '<input type="search" id="amb-q" class="amb-cat-search" placeholder="Rechercher un parfum, une marque (ex. Lattafa, Givenchy...)" />' +
            '<button type="button" class="amb-cat-pill active" data-q="">Tous</button>' +
            '<button type="button" class="amb-cat-pill" data-q="oud">Ambré & Oud</button>' +
            '<button type="button" class="amb-cat-pill" data-q="rose">Floral</button>' +
            '<button type="button" class="amb-cat-pill" data-q="bois">Boisé</button>' +
            '<button type="button" class="amb-cat-pill" data-q="Lattafa">Lattafa</button>' +
            '<button type="button" class="amb-cat-pill" data-q="Givenchy">Givenchy</button>' +
            '<select id="amb-sort" class="amb-cat-pill"><option value="date">Nouveautés</option><option value="price-asc">Prix croissant</option><option value="price-desc">Prix décroissant</option></select>' +
          '</div>' +
          '<div id="amb-cat-status" style="text-align:center;color:#6f5b3e;margin-bottom:1rem;font-size:.88rem">Chargement...</div>' +
          '<div id="amb-cat-grid" class="amb-cat-grid"></div>' +
          '<div style="text-align:center;margin-top:2rem;display:flex;gap:.8rem;justify-content:center">' +
            '<button type="button" id="amb-prev" class="amb-cat-pill">← Page précédente</button>' +
            '<button type="button" id="amb-next" class="amb-cat-pill">Page suivante →</button>' +
          '</div>' +
        '</div>';

      var state = { page: 1, q: new URLSearchParams(window.location.search).get('q') || '', orderby: 'date', order: 'desc' };
      var qInput = document.getElementById('amb-q');
      qInput.value = state.q;

      function loadProducts(){
        var status = document.getElementById('amb-cat-status');
        status.textContent = 'Chargement de la sélection...';
        var url = '/wp-json/wc/store/v1/products?per_page=12&page=' + state.page + '&orderby=' + state.orderby + '&order=' + state.order;
        if (state.q) url += '&search=' + encodeURIComponent(state.q);
        fetch(url).then(function(r){
          var total = r.headers.get('X-WP-Total') || '';
          return r.json().then(function(items){ return { items: items, total: total }; });
        }).then(function(res){
          var items = Array.isArray(res.items) ? res.items : [];
          status.textContent = (res.total ? res.total + ' parfums disponibles · ' : '') + 'Page ' + state.page;
          document.getElementById('amb-cat-grid').innerHTML = items.map(function(p){
            var img = (p.images && p.images[0] && p.images[0].src) ? p.images[0].src : '';
            var priceVal = (parseInt(p.prices.price, 10) / Math.pow(10, p.prices.currency_minor_unit || 2)).toFixed(0);
            var cleanName = cleanDots(p.name);
            return '<article class="amb-cat-card">' +
              '<a class="img-link" href="' + p.permalink + '">' +
                (img ? '<img loading="lazy" src="' + img + '" alt="' + cleanName.replace(/"/g, '&quot;') + '" />' : '') +
              '</a>' +
              '<div class="amb-cat-body">' +
                '<a class="amb-cat-title" href="' + p.permalink + '">' + cleanName + '</a>' +
                '<div style="font-size:.78rem;color:#6f5b3e">Flacon neuf & scellé · Expédié d’Europe</div>' +
                '<div class="amb-cat-foot">' +
                  '<span class="amb-cat-price">' + priceVal + ' €</span>' +
                  '<a class="amb-cat-btn" href="' + p.permalink + '">Voir la fiche →</a>' +
                '</div>' +
              '</div>' +
            '</article>';
          }).join('') || '<p style="grid-column:1/-1;text-align:center">Aucun parfum trouvé.</p>';
        }).catch(function(){
          status.textContent = 'Erreur temporaire de chargement. Réessayez dans un instant.';
        });
      }

      var timer = null;
      qInput.addEventListener('input', function(){
        clearTimeout(timer);
        timer = setTimeout(function(){ state.q = qInput.value.trim(); state.page = 1; loadProducts(); }, 350);
      });
      document.querySelectorAll('.amb-cat-pill[data-q]').forEach(function(btn){
        btn.addEventListener('click', function(){
          document.querySelectorAll('.amb-cat-pill[data-q]').forEach(function(b){ b.classList.remove('active'); });
          btn.classList.add('active');
          state.q = btn.getAttribute('data-q');
          qInput.value = state.q;
          state.page = 1;
          loadProducts();
        });
      });
      document.getElementById('amb-sort').addEventListener('change', function(e){
        var v = e.target.value;
        if (v === 'price-asc') { state.orderby = 'price'; state.order = 'asc'; }
        else if (v === 'price-desc') { state.orderby = 'price'; state.order = 'desc'; }
        else { state.orderby = 'date'; state.order = 'desc'; }
        state.page = 1;
        loadProducts();
      });
      document.getElementById('amb-prev').addEventListener('click', function(){ if (state.page > 1) { state.page--; loadProducts(); window.scrollTo(0,0); } });
      document.getElementById('amb-next').addEventListener('click', function(){ state.page++; loadProducts(); window.scrollTo(0,0); });
      loadProducts();
    }
  }

  // 3. Sur /produit/* : ajouter la réassurance conversion sous le bouton d'achat
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
