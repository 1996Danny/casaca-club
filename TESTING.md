# Casaca Club — Ejecución de Test Cases y Lighthouse (Sprint 4, tarea 4.2)

**Responsable:** Daniel (Desarrollo Web) · **Corrido contra la entrega real: `https://casacaclub.shop`**
**Fecha:** 24/10/2026

A diferencia de la corrida anterior (documentada en `casaca-club-sprint2/TESTING.md`, contra el
prototipo HTML/CSS/JS sin frameworks que **no es la entrega**), esta corrida se ejecutó contra el
sitio efectivamente publicado: la app React en `casacaclub.shop`. El caso de checkout se reescribió
porque acá no hay "compra simulada": el botón "Pagar con Mercado Pago" crea una preferencia real de
Mercado Pago (modo sandbox) y redirige al checkout de Mercado Pago.

## Alcance

- **Sitio probado:** `https://casacaclub.shop` (producción, VPS + Docker + nginx + Caddy).
- **Método:** Microsoft Edge en modo headless (`--headless=new`), pilotado con `puppeteer-core`
  (`test-produccion.mjs`, en la raíz del repo). El script no persiste: se corre a demanda, no es
  parte del build ni de un pipeline de CI.
- **Importante:** el caso de checkout genera una preferencia real (aunque sandbox) en la cuenta de
  Mercado Pago configurada en `MP_ACCESS_TOKEN`. No se completa el pago (no se loguea una cuenta de
  prueba Comprador), sólo se verifica que la preferencia se crea y que el sitio redirige
  correctamente.

### Cómo correrlo de nuevo

```sh
npm install --no-save puppeteer-core
node test-produccion.mjs
```

Requiere Microsoft Edge o Chrome instalado localmente (el script apunta a la ruta de Edge en
Windows; ajustar `EDGE_PATH` si hace falta).

## Casos de prueba

| # | Caso | Resultado |
|---|------|-----------|
| 1 | Carga del catálogo | ✅ Aprobado — 8 camisetas renderizadas |
| 2 | Agregar producto al carrito | ✅ Aprobado — contador pasa a 1, el ítem aparece en el panel |
| 3 | Agregar el mismo producto dos veces | ✅ Aprobado — cantidad 2, no se duplica la fila |
| 4 | Sumar/restar cantidad en el carrito | ✅ Aprobado — se recalcula al instante |
| 5 | Restar hasta 0 | ✅ Aprobado — el ítem se elimina, no queda en 0 |
| 6 | Eliminar ítem (ícono de basura) | ✅ Aprobado |
| 7 | Checkout con Mercado Pago | ✅ Aprobado — crea una preferencia real y redirige a `mercadopago.com.ar/checkout/...` con `pref_id` válido |
| 8 | Toggle de tema oscuro | ✅ Aprobado — alterna la clase `dark` en `<html>` |
| 9 | Botón de Arrepentimiento (`/terminos`) | ✅ Aprobado — muestra el mensaje simulado (Ley 24.240) |
| 10 | Política de Privacidad (`/privacidad`) | ✅ Aprobado — carga con el encabezado esperado |
| 11 | Consola sin errores en `casacaclub.shop` | ✅ Aprobado — 0 errores propios del sitio |

**Resultado final: 11/11 casos aprobados.**

> Nota técnica: el botón "Añadir al carrito" de cada tarjeta cambia a "Añadido" durante 1.4s después
> de cada click (feedback visual). La primera corrida de este script tenía 5 falsos negativos por
> clickear ese botón por su texto en sucesión rápida, lo que terminaba clickeando la tarjeta
> *siguiente* en vez de repetir la misma. Se corrigió ubicando cada tarjeta por un selector estable
> (la imagen "`{Nación}` - frente") en vez de por el texto del botón — no era un bug del sitio, era
> del script de prueba.

Un error de consola sí apareció, pero **en el dominio de Mercado Pago** después del redirect (`403`
en `mercadopago.com.ar/checkout/...`, probablemente por su propia detección de automatización en
modo headless) — no afecta a `casacaclub.shop` y no es atribuible a este sitio.

## Lighthouse

Corrido contra `https://casacaclub.shop` (producción, sin throttling adicional más allá del que
aplica Lighthouse por defecto). Reporte completo: [`reports/lighthouse-casacaclub-shop-2026-10-24.html`](reports/lighthouse-casacaclub-shop-2026-10-24.html).

| Categoría | Puntaje |
|---|---|
| Performance | 56 |
| Accessibility | 90 |
| Best Practices | 100 |
| SEO | 83 |

### Hallazgos y qué se hizo con cada uno

| Hallazgo | Categoría | Acción |
|---|---|---|
| Sin `<meta name="description">` | SEO | ✅ **Corregido** — se agregó en `index.html` |
| `robots.txt` inválido (no existía el archivo; nginx devolvía `index.html` como fallback de SPA) | SEO | ✅ **Corregido** — se agregó `public/robots.txt` (`User-agent: * / Allow: /`) |
| LCP de 10.2s, imagen del hero banner (`Estadio de noche`, cargada desde `fal.media`) | Performance | ⚠️ **Pendiente** — falta `fetchpriority="high"`/preload de esa imagen y, sobre todo, servirla en un tamaño/formato optimizado en vez del original de `fal.media` sin procesar |
| Contraste insuficiente en los badges "¡Pocas unidades!" (4.02:1) y "Edición Especial" (3.74:1), se requiere 4.5:1 | Accessibility | ⚠️ **Pendiente** — ajustar el color de fondo o texto de esos dos badges en `jersey-card.tsx` |
| Los triggers de los filtros ("Todas las ediciones", "Más relevantes") no tienen nombre accesible según axe | Accessibility | ⚠️ **Pendiente** — agregar `aria-label` explícito a esos `SelectTrigger` en `jersey-filter-bar.tsx` |

Performance es la categoría más floja y el motivo está identificado (imagen del hero sin optimizar,
cargada de un CDN externo de generación de imágenes con IA). No se tocó en esta pasada porque
requiere decidir una estrategia (comprimir/reemplazar la imagen, usar `<img loading="eager"
fetchpriority="high">`, o migrar las imágenes a un host propio con mejor caché) — lo dejo marcado
como pendiente de Daniel para antes del 10/11, no es un fix de una línea como los dos de SEO.

## Bugs encontrados

Ninguno funcional. Los tres hallazgos de Accessibility/Performance arriba no son bugs de
comportamiento (todo el flujo funciona), son mejoras pendientes de calidad que Lighthouse señala.
