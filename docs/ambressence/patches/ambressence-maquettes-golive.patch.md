# PATCH RÉVERSIBLE — `ambressence-maquettes.php` (OUVERTURE / COMMANDER & SEO)

**Cible :** `wp-content/mu-plugins/ambressence-maquettes.php` (sur o2switch)  
**Objectif :** Supprimer le codage en dur de `X-Robots-Tag: noindex, nofollow` et du verrou `/commander/` pour les piloter proprement via options WordPress (`blog_public` et `ambressence_orders_open`).

---

## 1. Ouverture pilotable de `/commander/` (lignes 427–443)

Remplacer :
```php
if ( $path === '/commander' || $path === '/commande' ) {
```
Par :
```php
$orders_open = (bool) get_option( 'ambressence_orders_open', false );
if ( ! $orders_open && ( $path === '/commander' || $path === '/commande' ) ) {
```
**Effet :**
- Tant que `ambressence_orders_open` vaut `0`/`false` (défaut pré-Kbis), `/commander/` reste verrouillé.
- Dès que Stripe + Kbis sont validés (`update_option('ambressence_orders_open', 1)`), WooCommerce prend la main immédiatement sans modifier de fichier PHP.
- **Retour arrière :** `update_option('ambressence_orders_open', 0)`.

---

## 2. Pilotage `X-Robots-Tag` par `blog_public` (ligne 494)

Remplacer :
```php
header( 'X-Robots-Tag: noindex, nofollow', true );
```
Par :
```php
if ( (string) get_option( 'blog_public', '0' ) === '0' ) {
    header( 'X-Robots-Tag: noindex, nofollow', true );
} else {
    header( 'X-Robots-Tag: index, follow', true );
}
```
**Effet :**
- Cohérence totale entre le réglage WordPress (`blog_public = 1` au Go-Live) et les en-têtes HTTP de toutes les pages maquettes.
- **Retour arrière :** `update_option('blog_public', '0')`.
