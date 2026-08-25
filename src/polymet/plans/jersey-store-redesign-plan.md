---
description: Full pivot of the existing boutique-clothing storefront into a sporty national-team soccer jersey e-commerce app (dark stadium theme, MP cyan checkout, sizes/editions/versions).
status: IN_PROGRESS
created_at: "2026-08-25T20:16:55.345Z"
---

# National Team Jersey Store Redesign

## User Request
Rebuild the existing boutique storefront (active file: src/polymet/prototypes/boutique-store.tsx) into a sporty, high-energy e-commerce app selling authentic national team soccer jerseys. Dark slate + vibrant pitch-green accent theme, dedicated Mercado Pago cyan (#009EE3) for payment CTAs only. New screens/behaviors:
- Header: sporty logo, confederation quick filters (CONMEBOL/UEFA/Resto del Mundo/Retro), search bar, cart badge
- Hero: marquee jerseys (Argentina, Brazil, France, Japan), "Explorar Camisetas" CTA
- Filter/sort bar: confederation, edition (Home/Away/Retro), size (S-XXL)
- Product card: hover image swap front->back, nation, edition label, stock badge, price, quick add
- Detail modal: multi-angle gallery, size pills (disable OOS), version selector (Jugador/Hincha), sticky Agregar/Comprar CTAs
- Cart drawer: nation/size/qty line items, subtotal, "Pagar con Mercado Pago" w/ payment method badges
- Success page: celebration + order summary w/ sizes + tracking notice
- Failure page: retry CTA
- Badges: Nueva Colección, Edición Especial, Stock Limitado
- Empty cart state: "Aún no tienes ninguna camiseta en tu carrito"

## Related Files
- src/index.css (done - dark stadium green palette + --mercadopago brand var)
- src/polymet/data/jerseys-data.tsx (new mock data: nations, confederation, edition, versions, sizes)
- src/polymet/data/cart-context.tsx (rewrite: cart line = jersey + size + version + qty)
- src/polymet/components/jersey-card.tsx (replaces product-card)
- src/polymet/components/jersey-filter-bar.tsx (new: confederation/edition/size filters)
- src/polymet/components/jersey-grid.tsx (replaces product-grid)
- src/polymet/components/hero-banner.tsx (rewrite: marquee jerseys, generated stadium image)
- src/polymet/components/jersey-detail-modal.tsx (replaces product-detail-modal)
- src/polymet/components/cart-item-row.tsx (rewrite for size/version)
- src/polymet/components/cart-drawer.tsx (rewrite: MP cyan CTA + payment badges)
- src/polymet/components/site-header.tsx (rewrite: search bar + confederation filters)
- src/polymet/components/mobile-bottom-nav.tsx (restyle only)
- src/polymet/layouts/storefront-layout.tsx (force dark theme wrapper, rewire new components)
- src/polymet/pages/home.tsx (rewrite: hero + filter bar + grid + modal)
- src/polymet/pages/checkout-success.tsx (rewrite: celebration + sizes)
- src/polymet/pages/checkout-failure.tsx (restyle only)
- src/polymet/prototypes/boutique-store.tsx (keep filename, update imports/content)

## TODO List
- [x] Palette: dark stadium theme in index.css + mercadopago brand var
- [x] Generate jersey product images (front/back x8) + hero stadium image
- [x] jerseys-data.tsx mock data model
- [x] cart-context.tsx rewrite (size + version aware cart lines)
- [x] jersey-card.tsx
- [x] jersey-filter-bar.tsx
- [x] jersey-grid.tsx
- [x] hero-banner.tsx rewrite
- [x] jersey-detail-modal.tsx
- [x] cart-item-row.tsx rewrite
- [x] cart-drawer.tsx rewrite (MP branding)
- [x] site-header.tsx rewrite
- [ ] mobile-bottom-nav.tsx restyle (still uses old boutique styling, needs sporty restyle + wiring)
- [ ] storefront-layout.tsx rewire + force dark theme (still references old cart-context/site-header props; must add `dark` class wrapper, wire new SiteHeader confederation filter state, use CartDrawer/CartLine new shape)
- [ ] home.tsx rewrite (still uses old ProductGrid/ProductDetailModal/products-data; must switch to JerseyGrid/JerseyDetailModal/jerseys-data + addItem({jersey,size,versionId,quantity}) signature)
- [ ] checkout-success.tsx rewrite (celebration copy + sizes/tracking notice)
- [ ] checkout-failure.tsx restyle (dark theme only, keep retry logic)
- [ ] boutique-store.tsx prototype update (imports already point to home/layout so will inherit once those are rewritten; double check dark wrapper + routes unchanged)
- [ ] delete old boutique-only files no longer used: product-card.tsx(+render), product-grid.tsx(+render), product-detail-modal.tsx(+render), products-data.tsx, jersey-filter-bar preview double-check
- [ ] bundle_all_nodes verification at the end

## Important Notes
- Force dark theme by adding `dark` class on layout root wrapper (no theme toggle infra exists in project)
- Mercado Pago CTA always uses hardcoded bg-[hsl(var(--mercadopago))] / explicit cyan, never --primary
- Jersey images generated via AI (fal quality model), stored as fal.media URLs — front+back per nation, 8 nations: Argentina, Brasil, Francia, Japón, Alemania (retro), Italia (retro), México, España
- Spanish copy required throughout (Añadir al carrito, Comprar ahora, Pocas unidades, etc.)
- No real club/federation logos used in generated images (IP-safe placeholder crests)
