# Casaca Club — Desarrollo Web: Sprint 3 y Sprint 4

**Responsable:** Néstor Daniel Frías — Desarrollo Web
**Período:** Sprint 3 (05/10 al 23/10) · Sprint 4 (26/10 al 10/11/2026)
**Snapshot tomado:** 24/10/2026, contra el repositorio `casaca-club-app` (rama `sprint_2`) y el sitio en vivo `https://casacaclub.shop`
**Fuente de las tareas:** `SprintsDocs/SPRINT 3 Y 4 division de tareas.docx.pdf`

---

## 0. Definición de la entrega

El repositorio tiene dos implementaciones del sitio: `casaca-club-sprint2/` (HTML + CSS + JS puro, sin frameworks) y la raíz del repo (`src/`, React + TypeScript + Vite + shadcn/Tailwind). **La entrega oficial es la que está publicada en el servidor: la versión React en `https://casacaclub.shop`** (confirmado en vivo: `200`, HTTPS válido, sirve el bundle `/assets/index-*.js` con el commit `d885984`).

`casaca-club-sprint2/` queda como prototipo anterior / material de referencia (de ahí viene, por ejemplo, el texto de los 12 casos de prueba del punto 4.2, reutilizable aunque haya que re-ejecutarlo contra la versión en vivo). No es la entrega y no hace falta desplegarlo.

Con esa definición, el gap real contra el PDF de tareas era acotado: (a) el aviso de imágenes/textos generados por IA, (b) Fetch API sobre un catálogo externo en vez de datos estáticos, y (c) test cases + Lighthouse corridos contra `casacaclub.shop`. **Los tres ya están resueltos en el repo** (commits locales, rama `sprint_2`) — ver §4 para el detalle y para lo único que sigue pendiente: hacer `git push` + redeploy en el VPS, porque nada de esto se ve todavía en `casacaclub.shop` hasta ese paso.

---

## 1. Estado por sprint — entrega oficial (`casacaclub.shop`, versión React)

Leyenda: ✅ hecho y verificado en vivo · 🟡 resuelto en el repo, pendiente de deploy · ⚠️ parcial · ❌ falta

| Sprint | Entregable de desarrollo | Estado | Dónde |
|---|---|---|---|
| 1 | Estructura semántica, wireframes | ✅ (equivalente en JSX) | `src/store/pages`, `src/store/layouts` |
| 2 | Catálogo de productos, UI responsive | ✅ (Tailwind + shadcn, no CSS puro, pero cumple el requisito funcional) | `public/productos.json` |
| 3.1 | Fetch API y renderizado dinámico de `productos.json` | 🟡 implementado y probado localmente, falta deploy | `public/productos.json`, `src/store/data/use-jerseys.ts` |
| 3.2 | Carrito (agregar, eliminar, contador, total) | ✅ | `src/store/data/cart-context.tsx`, `cart-drawer.tsx` |
| 3.2 | Validación del checkout | ✅ vía Mercado Pago real (sandbox), con recálculo de precio server-side | `server/index.js`, `cart-drawer.tsx` |
| 3.7 | Términos y Condiciones integrados al sitio | ✅ `/terminos`, enlazado en footer | `src/store/pages/terms.tsx` |
| 3.8 | Arrepentimiento (10 días) + garantía, Ley 24.240 | ✅ botón funcional en `/terminos#arrepentimiento` | `src/store/pages/terms.tsx` |
| 4.1 | Despliegue en producción con HTTPS | ✅ `casacaclub.shop`, `200`, candado válido, Docker + nginx + Caddy | `Dockerfile`, `docker-compose.yml`, `Caddyfile` |
| 4.2 | Test Cases, consola limpia, Lighthouse | ✅ corridos contra `casacaclub.shop` real: 11/11 test cases, Lighthouse 56/90/100/83 | `TESTING.md`, `reports/lighthouse-casacaclub-shop-2026-10-24.html` |
| 4.6 | Aviso de imágenes/textos generados por IA | 🟡 agregado en footer y en `/terminos`, falta deploy | `storefront-layout.tsx`, `terms.tsx` |
| 4.6 | Política de Privacidad Ley 25.326 | ✅ `/privacidad`, completa (responsable, finalidad, derechos ARCO, aviso AAIP) | `src/store/pages/privacy.tsx` |

**Lectura rápida:** los tres gaps que quedaban (3.1, 4.2 y el aviso de IA de 4.6) ya están resueltos en el repo. Lo único que falta es desplegar (`git push` + rebuild en el VPS) y, aparte, dos mejoras de calidad que salieron de Lighthouse quedaron pendientes (performance del hero banner y contraste de dos badges) — ver §4.

---

## 2. Documentación técnica — Sprint 3 (Interactividad Web, Asincronismo y Contratos)

### 3.1 — Fetch API y renderizado dinámico de `productos.json`
- **Resuelto.** El catálogo se movió a `public/productos.json` (JSON estático, las mismas 8 camisetas que antes vivían hardcodeadas en TypeScript) y se carga en tiempo de ejecución con un hook nuevo, `useJerseys()` (`src/store/data/use-jerseys.ts`), que hace `fetch("/productos.json")` con estados de `loading`/`error`. `home.tsx` ya no importa un array estático: usa el hook y muestra "Cargando catálogo…" mientras llega la respuesta.
- `jerseys-data.tsx` quedó sólo con los tipos (`Jersey`, `JerseyVersion`, etc.) y los catálogos auxiliares de filtros (`CONFEDERATIONS`, `EDITIONS`, `STOCK_LABEL`); el array de productos se borró de ahí.
- **Efecto colateral bueno:** `server/export-catalog.mjs` (el script que genera `server/catalog.json`, la fuente de precios que usa el backend de Mercado Pago para no confiar en el precio que manda el navegador) transpilaba `jerseys-data.tsx` con esbuild para sacarle el array. Ahora lee `public/productos.json` directo — **un solo archivo es la fuente de verdad tanto para el frontend como para el backend**, y de paso se sacó la dependencia de esbuild del backend (`server/package.json`, `server/Dockerfile`).
- Verificado: `npm run build` compila sin errores nuevos; `node export-catalog.mjs` genera `catalog.json` correctamente a partir del nuevo `productos.json`; con `vite preview` local, `/productos.json` respondió los 8 productos vía fetch.
- **Pendiente:** esto vive en el repo (rama `sprint_2`, sin pushear todavía) — no se ve en `casacaclub.shop` hasta el próximo deploy.

### 3.2 — Carrito de compras y validación del checkout
- **`src/store/data/cart-context.tsx`:** carrito en memoria vía Context + `useState` (`addItem`, `removeItem`, `updateQuantity`, `clearCart`), con `itemCount` y `subtotal` memoizados (`useMemo`). Mismo criterio de minimización de datos que pide la Política de Privacidad: no persiste en `localStorage`.
- **`src/store/components/cart-drawer.tsx`:** UI del carrito (sheet lateral), contador flotante en `site-header.tsx` y en la barra mobile (`mobile-bottom-nav.tsx`).
- **Checkout:** en vez de un checkout simulado, el botón "Pagar con Mercado Pago" llama a `POST /api/crear-preferencia` (`server/index.js`), que **recalcula el precio contra `server/catalog.json` del lado del servidor** (nunca confía en el precio que manda el navegador) y crea una preferencia real de Mercado Pago en modo sandbox (`MercadoPagoConfig` + `Preference`, con `back_urls` a `/checkout/success` y `/checkout/failure`). Esto cubre y supera lo que pedía 3.2 ("validación del checkout").

### 3.7 / 3.8 — Términos y Condiciones, arrepentimiento (Ley 24.240) y garantía
- `src/store/pages/terms.tsx`, ruteada en `/terminos`, con la cláusula de Derecho de Arrepentimiento (10 días corridos, Resolución 424/2020) y garantía legal (art. 11, Ley 24.240) integradas junto a un **botón de Arrepentimiento funcional** que dispara un mensaje simulado de confirmación — exactamente lo que el punto 5 del PDF pide ("coherencia entre software y cláusulas").
- El enlace está integrado al footer global (`storefront-layout.tsx`), igual que pedía la tarea de Daniel para la Semana 9.

### Apoyo a 3.4b (Plan de Casos de Prueba, de Cynthia)
- El prototipo descartado dejó un `TESTING.md` con 12 casos técnicos del carrito/checkout/arrepentimiento redactados y ejecutados; sirven como base de contenido para el Plan de Casos de Prueba, pero deben re-redactarse/re-ejecutarse apuntando a la entrega real (ver 4.2).

---

## 3. Documentación técnica — Sprint 4 (Pruebas, Despliegue, Portafolio)

### 4.1 — Despliegue en producción con HTTPS
- El PDF sugiere GitHub Pages, Vercel o Netlify; lo que se implementó es **más robusto que lo pedido**: VPS propio con Docker, build multi-etapa (Node 22 compila con Vite, nginx sirve el `dist`), Caddy con HTTPS automático, dominio `casacaclub.shop` (Hostinger) con registros DNS tipo A.
- `docker-compose.yml` publica el contenedor **sólo en `127.0.0.1`** (hardening explícito del commit `dc7e953`, para no exponer el puerto directo sin pasar por el proxy).
- **Verificado ahora mismo:** `https://casacaclub.shop/` → `200`, `/api/health` → `200`, y las rutas internas `/terminos` y `/privacidad` resuelven con el fallback de SPA de nginx.
- `DEPLOY.md` documenta paso a paso el flujo (clonar, `.env`, `docker compose up -d --build`, DNS, verificación final), pensado para que Cynthia pueda confirmarlo de forma independiente, como pide su tarea de apoyo.

### 4.2 — Test Cases, depuración y Lighthouse
- **Resuelto, corrido contra la entrega real.** `TESTING.md` (raíz del repo) documenta 11/11 test cases aprobados contra `https://casacaclub.shop`: carga del catálogo, agregar/sumar/restar/eliminar del carrito, no duplicar fila al repetir producto, checkout con Mercado Pago (crea una preferencia real en sandbox y redirige, sin completar el pago), toggle de tema oscuro, botón de Arrepentimiento, `/privacidad`, consola sin errores propios del sitio. Script reproducible: `test-produccion.mjs` (Edge headless + `puppeteer-core`).
- **Lighthouse corrido contra `casacaclub.shop`:** Performance 56, Accessibility 90, Best Practices 100, SEO 83. Reporte completo en `reports/lighthouse-casacaclub-shop-2026-10-24.html`.
- De los hallazgos de Lighthouse ya se corrigieron los dos de SEO (faltaba `<meta name="description">` en `index.html`; faltaba `public/robots.txt`, por lo que nginx devolvía el `index.html` del SPA como si fuera el robots.txt). Quedan pendientes dos de Accessibility (contraste insuficiente en los badges "¡Pocas unidades!" y "Edición Especial"; los `SelectTrigger` de los filtros sin nombre accesible para axe) y el de Performance (LCP de 10.2s, por la imagen del hero banner sin optimizar, servida directo desde `fal.media`) — están detallados en `TESTING.md` como pendientes, no se tocaron porque piden una decisión de diseño/alojamiento de imágenes, no son un cambio de una línea.

### 4.6 — Auditoría legal del sitio en vivo (apoyo de Daniel a Mathias)
- Ya resuelto: Política de Privacidad (Ley 25.326) completa, Términos y Condiciones con el botón de arrepentimiento, y ahora también el **aviso de imágenes/textos generados por IA** (footer global + sección de Propiedad Intelectual en `/terminos`, con la licencia CC BY-NC-SA 4.0).
- Pendiente de deploy, igual que 3.1.

---

## 4. Pendientes concretos antes del 10/11

1. **Deploy a producción:** todo lo de este documento (3.1, el aviso de IA, meta description, robots.txt) está commiteado localmente en la rama `sprint_2` pero no pusheado ni desplegado. Hace falta `git push` y, en el VPS, `git pull && docker compose up -d --build` (ver `DEPLOY.md`) antes de que se vea en `casacaclub.shop`.
2. **Re-correr `test-produccion.mjs` y Lighthouse después del deploy**, para confirmar que el catálogo por fetch y el aviso de IA funcionan igual en producción que en local.
3. **Dos mejoras de calidad opcionales (no bloquean la entrega):** el contraste de los badges "¡Pocas unidades!"/"Edición Especial" y el nombre accesible de los filtros de ordenamiento/edición — ambos en `src/store/components/jersey-card.tsx` y `jersey-filter-bar.tsx`. La optimización de la imagen del hero banner (LCP 10.2s) es la de mayor impacto si se quiere subir el puntaje de Performance.
