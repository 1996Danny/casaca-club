---
description: "Build a boutique e-commerce storefront: home/catalog, product detail modal, cart drawer, checkout success/failure pages, all wired via a prototype with mock data."
status: COMPLETED
created_at: "2026-08-25T20:02:33.814Z"
---

# Boutique E-commerce Storefront

## User Request
Clean, modern, high-converting e-commerce web app for a boutique store (curated catalog). Spanish CTAs. Screens: Header/nav w/ cart badge, Home/Catalog (hero + product grid), Product Detail Modal (gallery, qty selector, CTA), Slide-over Cart (list, subtotal, "Pagar con Mercado Pago"), Success page, Failure/Retry page. Interactive states (hover/loading/disabled), empty cart state, mobile sticky bottom nav.

## Related Files
- src/index.css (done - boutique terracotta palette)
- src/polymet/data/products-data.tsx (mock products)
- src/polymet/data/cart-context.tsx (cart state - React context)
- src/polymet/components/site-header.tsx
- src/polymet/components/mobile-bottom-nav.tsx
- src/polymet/components/hero-banner.tsx
- src/polymet/components/product-card.tsx
- src/polymet/components/product-grid.tsx
- src/polymet/components/product-detail-modal.tsx
- src/polymet/components/cart-drawer.tsx
- src/polymet/components/cart-item-row.tsx
- src/polymet/layouts/storefront-layout.tsx
- src/polymet/pages/home.tsx
- src/polymet/pages/checkout-success.tsx
- src/polymet/pages/checkout-failure.tsx
- src/polymet/prototypes/boutique-store.tsx

## TODO List
- [x] Set boutique palette in index.css
- [x] products-data.tsx mock data
- [x] cart-context.tsx (cart state provider + hook)
- [x] product-card.tsx
- [x] product-grid.tsx
- [x] hero-banner.tsx
- [x] product-detail-modal.tsx
- [x] cart-item-row.tsx
- [x] cart-drawer.tsx
- [x] site-header.tsx
- [x] mobile-bottom-nav.tsx
- [x] storefront-layout.tsx
- [x] home.tsx page
- [x] checkout-success.tsx page
- [x] checkout-failure.tsx page
- [x] boutique-store.tsx prototype with routes + CartProvider
- [x] Verify canvas bundles with no errors

## Important Notes
- Spanish copy: "En stock", "Últimas unidades", "Añadir al carrito", "Comprar ahora", "Agregar al carrito", "Pagar con Mercado Pago", "Tu carrito está vacío", "Volver a la tienda"
- Cart state must be shared across header badge, drawer, product cards -> use React Context provider wrapped in prototype
- Mercado Pago badge: simple trust badge/icon, no real integration needed (mock)
- Mobile: sticky bottom nav with Home / Categories / Cart icons
