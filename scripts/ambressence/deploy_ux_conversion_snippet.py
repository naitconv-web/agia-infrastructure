#!/usr/bin/env python3
"""
WS-AMB-002 — Déploiement réversible du Module Web Premium sur ambressence.com
via Code Snippets REST API (Snippet 17).

Fonctionnalités intégrées :
  1. Catalogue unifié /catalogue/ (design system Crème/Ébène/Or, filtres, tri, H1 unique).
  2. Conseiller Parfumerie IA (quiz olfactif 3 étapes connecté en direct à Store API).
  3. Panier Tiroir (Slide-Over) connecté en direct à WooCommerce Store API (Nonce, +/-,
     barre de progression livraison offerte dès 60 €).
  4. Micro-animations GPU légères (0 dépendance externe, respect prefers-reduced-motion).
  5. Fiche produit (/produit/*) : photo forcée visible, grille 2 colonnes PC / 1 Mobile,
     grille 4x2 Produits similaires, encodage UTF-8 réparé, réassurance 3 preuves.
  6. Univers (/univers/*) : clic direct vers la vraie fiche /produit/...
"""

import base64
import json
import os
import sys
import urllib.request

SNIPPET_NAME = "AMBRESSENCE - UX/UI Conversion (Fiches directes, Filtres, Reassurance)"

PHP_CODE = r"""
// WS-AMB-002 : Module Web Premium, Conseiller IA, Panier Tiroir & OpenGraph SEO (réversible)
add_action( 'wp_head', function () {
    if ( ! function_exists( 'is_product' ) || ! is_product() ) { return; }
    global $product;
    if ( ! ( $product instanceof WC_Product ) ) {
        $product = wc_get_product( get_the_ID() );
    }
    if ( ! ( $product instanceof WC_Product ) ) { return; }
    $title = preg_replace( '/(?:\s*·\s*){2,}/u', ' · ', wp_strip_all_tags( $product->get_name() ) );
    $desc  = wp_strip_all_tags( $product->get_short_description() ?: $product->get_description() );
    $desc  = $desc ? mb_substr( preg_replace( '/\s+/', ' ', $desc ), 0, 160 ) : ( $title . ' — Flacon neuf et scellé d’origine, expédié d’Europe.' );
    $img_id = $product->get_image_id();
    $img    = $img_id ? wp_get_attachment_image_url( $img_id, 'large' ) : '';
    $price  = $product->get_price();
    echo '<meta property="og:type" content="product" />' . "\n";
    echo '<meta property="og:title" content="' . esc_attr( $title . ' | Ambressence' ) . '" />' . "\n";
    echo '<meta property="og:description" content="' . esc_attr( $desc ) . '" />' . "\n";
    echo '<meta property="og:url" content="' . esc_url( get_permalink( $product->get_id() ) ) . '" />' . "\n";
    if ( $img ) {
        echo '<meta property="og:image" content="' . esc_url( $img ) . '" />' . "\n";
    }
    if ( $price !== '' ) {
        echo '<meta property="product:price:amount" content="' . esc_attr( $price ) . '" />' . "\n";
        echo '<meta property="product:price:currency" content="EUR" />' . "\n";
    }
}, 5 );

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

        // 3. Pré-charger côté serveur les 12 produits initiaux sur /catalogue/ (zéro requête HTTP -> immunisé contre 429)
        $init_json = 'null';
        if ( ! empty( $_SERVER['REQUEST_URI'] ) && strpos( $_SERVER['REQUEST_URI'], '/catalogue' ) !== false && function_exists( 'rest_do_request' ) ) {
            $req = new WP_REST_Request( 'GET', '/wc/store/v1/products' );
            $req->set_query_params( array( 'per_page' => 12, 'page' => 1, 'orderby' => 'date', 'order' => 'desc' ) );
            $res = rest_do_request( $req );
            if ( ! $res->is_error() ) {
                $init_json = wp_json_encode( $res->get_data() );
            }
        }

        $inject = <<<'HTML'
<style id="amb-ux-conversion-css">
/* Anti-débordement horizontal global PC & Mobile */
html, body, main, section { max-width: 100vw !important; overflow-x: clip !important; }
.brume, .slide, .carrousel { max-width: 100% !important; overflow: hidden !important; }

/* Micro-animations GPU respectueuses de l'accessibilité */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
}
.produit .produit-visuel, .produit h3 { cursor: pointer; }
.produit h3:hover { color: #8a5f1e !important; text-decoration: underline; text-underline-offset: 3px; }

/* Fiche Produit WooCommerce (/produit/*) */
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
  width: 100% !important; float: none !important; margin: 0 !important;
  opacity: 1 !important; visibility: visible !important;
  background: #fff !important; border: 1px solid rgba(138, 95, 30, .2) !important;
  border-radius: 6px !important; padding: 1.2rem !important;
}
body.single-product div.product .woocommerce-product-gallery img {
  opacity: 1 !important; visibility: visible !important;
  max-height: 420px !important; width: 100% !important; object-fit: contain !important;
}
body.single-product div.product .summary.entry-summary { width: 100% !important; float: none !important; margin: 0 !important; }
body.single-product section.related.products {
  grid-column: 1 / -1 !important; margin-top: 2.5rem !important; padding-top: 2rem !important;
  border-top: 1px solid rgba(138, 95, 30, .2) !important;
}
body.single-product section.related.products ul.products {
  display: grid !important; grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
  gap: 1.2rem !important; margin: 1.2rem 0 0 !important; padding: 0 !important; list-style: none !important;
}
body.single-product section.related.products ul.products li.product {
  width: 100% !important; margin: 0 !important; float: none !important;
  background: #fdfaf3 !important; border: 1px solid rgba(138, 95, 30, .2) !important;
  border-radius: 6px !important; padding: 1rem !important; display: flex !important; flex-direction: column !important;
}
body.single-product section.related.products ul.products li.product img {
  width: 100% !important; height: 190px !important; object-fit: contain !important; margin-bottom: .75rem !important;
}
@media (max-width: 820px) {
  body.single-product div.product { grid-template-columns: 1fr !important; gap: 1.4rem !important; }
  body.single-product section.related.products ul.products { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: .8rem !important; }
}

/* Bloc réassurance conversion */
.amb-pdp-reassurance {
  margin-top: 1.25rem; padding: 1rem 1.15rem; background: #fdfaf3;
  border: 1px solid rgba(138, 95, 30, .26); border-radius: 4px;
  display: grid; gap: .45rem; font-size: .86rem; color: #4a3923;
}
.amb-pdp-reassurance div { display: flex; align-items: center; gap: .5rem; }

/* Masquer le titre WP par défaut sur /catalogue/ pour conserver 1 seul H1 */
body.page-id-9408 .entry-header, body.page-id-9408 h1.entry-title { display: none !important; }

/* Nouveau Catalogue & Conseiller IA */
#amb-catalogue-app { max-width: 1220px; margin: 1.5rem auto 4rem; padding: 0 1.2rem; color: #261b0e; }
.amb-cat-head {
  text-align: center; padding: 2.2rem 1.2rem 1.8rem;
  background: linear-gradient(180deg, #efe6d2, #f7f1e4);
  border-radius: 6px; margin-bottom: 1.6rem; border: 1px solid rgba(138, 95, 30, .18);
}
.amb-cat-head h1 {
  font-family: "Didot", "Playfair Display", Georgia, serif;
  font-size: clamp(1.9rem, 3.6vw, 2.8rem); font-weight: 400; margin: .35rem 0 .5rem;
}
.amb-advisor-toggle {
  margin-top: 1rem;
  background: linear-gradient(135deg, #e8c47c, #b5812e);
  color: #241a08; border: none; padding: .75rem 1.4rem; border-radius: 3px;
  font-size: .76rem; letter-spacing: .16em; text-transform: uppercase; font-weight: 600;
  cursor: pointer; transition: transform .2s ease, box-shadow .2s ease;
}
.amb-advisor-toggle:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(181,129,46,.28); }

.amb-advisor-box {
  display: none; background: #fdfaf3; border: 1px solid rgba(138, 95, 30, .32);
  border-radius: 6px; padding: 1.6rem; margin-bottom: 1.8rem;
}
.amb-advisor-box.open { display: block; }
.amb-advisor-steps { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; margin: 1rem 0 1.2rem; }
@media (max-width: 768px) { .amb-advisor-steps { grid-template-columns: 1fr; } }
.amb-advisor-step label { display: block; font-size: .7rem; letter-spacing: .16em; text-transform: uppercase; color: #8a5f1e; margin-bottom: .4rem; font-weight: 600; }
.amb-advisor-step select { width: 100%; padding: .7rem; border: 1px solid rgba(138, 95, 30, .32); background: #fff; border-radius: 4px; color: #261b0e; }

.amb-cat-controls { display: flex; flex-wrap: wrap; gap: .75rem; align-items: center; justify-content: center; margin-bottom: 1.8rem; }
.amb-cat-search {
  flex: 1; min-width: 240px; max-width: 440px; padding: .8rem 1rem;
  border: 1px solid rgba(138, 95, 30, .35); border-radius: 4px; background: #fdfaf3; font-size: .95rem; color: #261b0e;
}
.amb-cat-pill {
  background: #fdfaf3; border: 1px solid rgba(138, 95, 30, .32); color: #6f5b3e;
  padding: .6rem 1rem; min-height: 40px; border-radius: 3px; font-size: .74rem;
  letter-spacing: .12em; text-transform: uppercase; cursor: pointer; transition: all .2s ease;
}
.amb-cat-pill.active, .amb-cat-pill:hover { background: #261b0e; color: #e8c47c; border-color: #261b0e; }

.amb-cat-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1.2rem; }
.amb-cat-card {
  background: #fdfaf3; border: 1px solid rgba(138, 95, 30, .2); border-radius: 6px;
  overflow: hidden; display: flex; flex-direction: column;
  transition: transform .25s cubic-bezier(.22,.61,.21,1), box-shadow .25s ease;
}
.amb-cat-card:hover { transform: translateY(-3px); box-shadow: 0 14px 34px rgba(38, 27, 14, .10); }
.amb-cat-card a.img-link {
  background: #fff; display: grid; place-items: center; height: 210px; padding: 1rem;
  border-bottom: 1px solid rgba(138, 95, 30, .14);
}
.amb-cat-card a.img-link img { max-height: 175px; width: 100%; object-fit: contain; }
.amb-cat-body { padding: 1rem; display: flex; flex-direction: column; flex: 1; gap: .5rem; }
.amb-cat-title { font-family: "Didot", "Playfair Display", Georgia, serif; font-size: 1.05rem; line-height: 1.3; color: #261b0e; text-decoration: none; }
.amb-cat-foot { margin-top: auto; padding-top: .7rem; display: flex; align-items: center; justify-content: space-between; gap: .5rem; flex-wrap: wrap; }
.amb-cat-price { font-weight: 700; font-size: 1.05rem; }
.amb-cat-btn {
  background: #261b0e; color: #f7f1e4; padding: .5rem .8rem; border-radius: 3px; border: none;
  font-size: .7rem; letter-spacing: .1em; text-transform: uppercase; text-decoration: none;
  display: inline-flex; align-items: center; min-height: 38px; cursor: pointer;
}
.amb-cat-btn:hover { background: #8a5f1e; color: #fff; }
@media (max-width: 960px) { .amb-cat-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 520px) { .amb-cat-grid { grid-template-columns: 1fr; } }

/* Panier Tiroir Slide-Over */
#amb-drawer-bg { position: fixed; inset: 0; background: rgba(38,27,14,.48); z-index: 9998; display: none; }
#amb-drawer-bg.open { display: block; }
#amb-drawer {
  position: fixed; top: 0; right: -440px; width: min(410px, 100vw); height: 100vh;
  background: #fdfaf3; z-index: 9999; box-shadow: -10px 0 36px rgba(0,0,0,.18);
  display: flex; flex-direction: column; transition: right .25s ease; color: #261b0e;
}
#amb-drawer.open { right: 0; }
.amb-dr-head { padding: 1.1rem 1.3rem; border-bottom: 1px solid rgba(138,95,30,.2); display: flex; justify-content: space-between; align-items: center; }
.amb-dr-ship { background: #efe6d2; padding: .85rem 1.3rem; font-size: .84rem; border-bottom: 1px solid rgba(138,95,30,.18); }
.amb-ship-bar { height: 6px; background: rgba(138,95,30,.2); border-radius: 99px; margin-top: .45rem; overflow: hidden; }
.amb-ship-bar i { display: block; height: 100%; background: linear-gradient(90deg, #b5812e, #e8c47c); transition: width .3s ease; }
.amb-dr-items { flex: 1; overflow-y: auto; padding: 1rem 1.3rem; display: grid; gap: .85rem; align-content: start; }
.amb-dr-row { display: flex; justify-content: space-between; gap: .7rem; padding-bottom: .85rem; border-bottom: 1px solid rgba(138,95,30,.15); font-size: .9rem; }
.amb-dr-foot { padding: 1.1rem 1.3rem; border-top: 1px solid rgba(138,95,30,.2); background: #f7f1e4; }

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

  // Panier tiroir global WooCommerce Store API
  var cartNonce = '';
  function ensureDrawer(){
    if (document.getElementById('amb-drawer')) return;
    var bg = document.createElement('div'); bg.id = 'amb-drawer-bg';
    var dr = document.createElement('aside'); dr.id = 'amb-drawer';
    dr.innerHTML =
      '<div class="amb-dr-head"><strong style="font-family:Georgia,serif;font-size:1.25rem">Votre Panier</strong><button type="button" id="amb-dr-close" style="background:none;border:none;font-size:1.3rem;cursor:pointer">✕</button></div>' +
      '<div class="amb-dr-ship" id="amb-dr-ship"></div>' +
      '<div class="amb-dr-items" id="amb-dr-items"></div>' +
      '<div class="amb-dr-foot">' +
        '<div style="display:flex;justify-content:space-between;font-weight:700;font-size:1.05rem;margin-bottom:.85rem"><span>Total TTC</span><span id="amb-dr-total">0 €</span></div>' +
        '<a href="/panier/" class="amb-advisor-toggle" style="display:block;text-align:center;text-decoration:none;width:100%">Voir le panier &amp; commander →</a>' +
      '</div>';
    document.body.appendChild(bg);
    document.body.appendChild(dr);
    bg.addEventListener('click', function(){ toggleDrawer(false); });
    document.getElementById('amb-dr-close').addEventListener('click', function(){ toggleDrawer(false); });
  }
  function toggleDrawer(open){
    ensureDrawer();
    document.getElementById('amb-drawer').classList.toggle('open', open);
    document.getElementById('amb-drawer-bg').classList.toggle('open', open);
  }
  function renderCartData(c){
    ensureDrawer();
    var items = (c && c.items) ? c.items : [];
    var minor = (c && c.totals && c.totals.currency_minor_unit) ? c.totals.currency_minor_unit : 2;
    var tot = (c && c.totals && c.totals.total_items) ? (parseInt(c.totals.total_items, 10) / Math.pow(10, minor)) : 0;
    document.getElementById('amb-dr-total').textContent = tot.toFixed(2).replace('.', ',') + ' €';
    var left = Math.max(0, 60 - tot);
    var pct = Math.min(100, Math.round((tot / 60) * 100));
    document.getElementById('amb-dr-ship').innerHTML = left === 0
      ? '<strong>Livraison offerte débloquée !</strong><div class="amb-ship-bar"><i style="width:100%"></i></div>'
      : 'Plus que <strong>' + left.toFixed(2).replace('.', ',') + ' €</strong> pour la livraison offerte dès 60 €.<div class="amb-ship-bar"><i style="width:' + pct + '%"></i></div>';
    document.getElementById('amb-dr-items').innerHTML = items.length
      ? items.map(function(it){
          var p = (parseInt(it.totals.line_total, 10) / Math.pow(10, minor)).toFixed(2).replace('.', ',');
          return '<div class="amb-dr-row"><div><strong>' + cleanDots(it.name) + '</strong><div style="color:#6f5b3e;font-size:.82rem">Qté : ' + it.quantity + '</div></div><strong>' + p + ' €</strong></div>';
        }).join('')
      : '<p style="color:#6f5b3e">Votre panier est vide.</p>';
  }
  window.ambAddToCart = function(productId){
    fetch('/wp-json/wc/store/v1/cart').then(function(r){
      cartNonce = r.headers.get('Nonce') || cartNonce;
      return fetch('/wp-json/wc/store/v1/cart/add-item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Nonce': cartNonce },
        body: JSON.stringify({ id: productId, quantity: 1 })
      });
    }).then(function(r){ return r.json(); }).then(function(c){
      renderCartData(c);
      toggleDrawer(true);
    }).catch(function(){
      window.location.href = '/?add-to-cart=' + productId;
    });
  };

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
              if (Array.isArray(arr) && arr[0] && arr[0].permalink) { window.location.href = arr[0].permalink; }
              else { window.location.href = '/catalogue/?q=' + encodeURIComponent(q); }
            })
            .catch(function(){ window.location.href = '/catalogue/?q=' + encodeURIComponent(q); });
        }
        titleEl.addEventListener('click', goProduct);
        if (visEl) visEl.addEventListener('click', goProduct);
      });
    }, 300);
  }

  // 2. Sur /catalogue/ : rendre le Catalogue unifié + Conseiller Parfumerie IA
  if (path.indexOf('/catalogue') === 0) {
    var root = document.getElementById('amb-catalogue-root') || document.querySelector('.entry-content') || document.querySelector('main');
    if (root) {
      root.innerHTML =
        '<div id="amb-catalogue-app">' +
          '<div class="amb-cat-head">' +
            '<div style="font-size:.7rem;letter-spacing:.3em;text-transform:uppercase;color:#8a5f1e;font-weight:600">Maison Ambressence · Sélection Européenne</div>' +
            '<h1>Le Catalogue</h1>' +
            '<p style="color:#6f5b3e;max-width:56ch;margin:0 auto">2 552 parfums authentiques, flacons neufs et scellés, livraison offerte dès 60 €.</p>' +
            '<button type="button" id="amb-adv-btn" class="amb-advisor-toggle">✨ Conseiller Parfumerie IA — Trouver mon sillage</button>' +
          '</div>' +
          '<div id="amb-advisor-box" class="amb-advisor-box">' +
            '<strong style="font-family:Georgia,serif;font-size:1.2rem">Votre Conseiller Olfactif Personnel</strong>' +
            '<p style="color:#6f5b3e;font-size:.88rem;margin-top:.25rem">Sélectionnez vos préférences pour obtenir 4 recommandations en stock parmi nos 2 552 flacons.</p>' +
            '<div class="amb-advisor-steps">' +
              '<div class="amb-advisor-step"><label>1. Pour qui ?</label><select id="adv-who"><option value="">Peu importe</option><option value="femme">Femme</option><option value="homme">Homme</option></select></div>' +
              '<div class="amb-advisor-step"><label>2. Sillage recherché</label><select id="adv-scent"><option value="oud">Ambré, Vanille &amp; Oud</option><option value="rose">Floral, Rose &amp; Poudré</option><option value="bois">Boisé, Cèdre &amp; Épices</option><option value="eau">Frais, Agrumes &amp; Pur</option></select></div>' +
              '<div class="amb-advisor-step"><label>3. Budget</label><select id="adv-budget"><option value="all">Tous budgets</option><option value="low">Moins de 35 €</option><option value="mid">35 € à 70 €</option><option value="lux">Prestige (+60 €, port offert)</option></select></div>' +
            '</div>' +
            '<button type="button" id="adv-run" class="amb-cat-btn" style="background:#8a5f1e">Voir mes 4 parfums recommandés →</button>' +
            '<div id="adv-results" class="amb-cat-grid" style="margin-top:1.2rem"></div>' +
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

      function cardHTML(p){
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
              '<div style="display:flex;gap:.35rem">' +
                '<button type="button" class="amb-cat-btn" onclick="ambAddToCart(' + p.id + ')">+ Panier</button>' +
                '<a class="amb-cat-btn" style="background:#6f5b3e" href="' + p.permalink + '">Fiche</a>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</article>';
      }

      document.getElementById('amb-adv-btn').addEventListener('click', function(){
        document.getElementById('amb-advisor-box').classList.toggle('open');
      });
      document.getElementById('adv-run').addEventListener('click', function(){
        var who = document.getElementById('adv-who').value;
        var scent = document.getElementById('adv-scent').value;
        var bud = document.getElementById('adv-budget').value;
        var q = (scent + ' ' + who).trim();
        var url = '/wp-json/wc/store/v1/products?per_page=24&search=' + encodeURIComponent(q);
        document.getElementById('adv-results').innerHTML = '<p>Analyse de notre sélection...</p>';
        fetch(url).then(function(r){ return r.json(); }).then(function(items){
          if (!Array.isArray(items)) items = [];
          var filtered = items.filter(function(p){
            var pv = parseInt(p.prices.price, 10) / Math.pow(10, p.prices.currency_minor_unit || 2);
            if (bud === 'low') return pv < 35;
            if (bud === 'mid') return pv >= 35 && pv <= 70;
            if (bud === 'lux') return pv > 60;
            return true;
          }).slice(0, 4);
          if (!filtered.length) filtered = items.slice(0, 4);
          document.getElementById('adv-results').innerHTML = filtered.map(cardHTML).join('') || '<p>Aucune correspondance exacte, essayez un autre sillage.</p>';
        });
      });

      var state = { page: 1, q: new URLSearchParams(window.location.search).get('q') || '', orderby: 'date', order: 'desc' };
      var qInput = document.getElementById('amb-q');
      qInput.value = state.q;
      var initData = window.__AMB_INIT_PRODUCTS__ || null;

      function loadProducts(){
        var status = document.getElementById('amb-cat-status');
        if (initData && state.page === 1 && !state.q && state.orderby === 'date') {
          var firstItems = initData;
          initData = null;
          status.textContent = '2 552 parfums disponibles · Page 1';
          document.getElementById('amb-cat-grid').innerHTML = firstItems.map(cardHTML).join('');
          return;
        }
        status.textContent = 'Chargement de la sélection...';
        var url = '/wp-json/wc/store/v1/products?per_page=12&page=' + state.page + '&orderby=' + state.orderby + '&order=' + state.order;
        if (state.q) url += '&search=' + encodeURIComponent(state.q);
        fetch(url).then(function(r){
          var total = r.headers.get('X-WP-Total') || '';
          return r.json().then(function(items){ return { items: items, total: total }; });
        }).then(function(res){
          var items = Array.isArray(res.items) ? res.items : [];
          status.textContent = (res.total ? res.total + ' parfums disponibles · ' : '') + 'Page ' + state.page;
          document.getElementById('amb-cat-grid').innerHTML = items.map(cardHTML).join('') || '<p style="grid-column:1/-1;text-align:center">Aucun parfum trouvé.</p>';
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
        $preload_tag = '<script>window.__AMB_INIT_PRODUCTS__=' . $init_json . ';</script>';
        if ( stripos( $html, '</body>' ) !== false ) {
            return str_ireplace( '</body>', $preload_tag . $inject . '</body>', $html );
        }
        return $html . $preload_tag . $inject;
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
