# Casaca Club — Ejecución de Test Cases y depuración (Sprint 4, tarea 4.2)

**Responsable:** Daniel (Desarrollo Web) · **Semana 10 (26/10 al 30/10)**

Ejecución funcional de los casos de prueba sobre las funcionalidades programadas en el Sprint 3
(Fetch API, carrito de compras, checkout, Botón de Arrepentimiento), más la auditoría de consola
y Lighthouse antes del despliegue del Sprint 4.

## Alcance

- **Sitio probado:** `casaca-club-sprint2/index.html`, servido localmente (`python -m http.server`).
- **Método:** Microsoft Edge en modo *headless* (`--headless=new`), por línea de comandos y con
  `puppeteer-core` para simular clics y leer la consola del navegador.
- **Fuera de alcance:** pruebas con usuarios reales y navegadores distintos de Chromium/Edge (ya
  cubierto en parte por `SprintsDocs/capturas-responsive/`, Sprint 2).

## Casos de prueba

| # | Caso | Pasos | Resultado esperado | Resultado |
|---|------|-------|---------------------|-----------|
| 1 | Carga dinámica del catálogo (Fetch API) | Abrir `index.html` | Se renderizan las 6 camisetas de `productos.json` sin HTML hardcodeado | ✅ Aprobado |
| 2 | Agregar producto al carrito | Click en "Agregar al carrito" de una tarjeta | El contador del navbar pasa de 0 a 1; el ítem aparece en el panel del carrito | ✅ Aprobado |
| 3 | Agregar el mismo producto dos veces | Click "Agregar al carrito" dos veces sobre la misma camiseta | La cantidad del ítem en el carrito es 2, no se duplica la fila | ✅ Aprobado |
| 4 | Sumar/restar cantidad en el carrito | Abrir el carrito, click en + y − | La cantidad y el subtotal se recalculan al instante | ✅ Aprobado |
| 5 | Restar hasta 0 | Click en − hasta llegar a 1 y luego otra vez | El ítem se elimina del carrito, no queda en 0 | ✅ Aprobado |
| 6 | Eliminar ítem | Click en el ícono de basura de un ítem | El ítem desaparece del carrito y del resumen de checkout | ✅ Aprobado |
| 7 | Carrito vacío bloquea el checkout | Vaciar el carrito y enviar el formulario | El botón "Simular compra" está deshabilitado y/o se muestra el aviso de carrito vacío | ✅ Aprobado |
| 8 | Validación de campos obligatorios | Dejar nombre/email vacíos con carrito con productos y enviar | El navegador marca los campos inválidos, no se envía | ✅ Aprobado |
| 9 | Checkbox de consentimiento obligatorio | Completar nombre/email, no tildar el checkbox, enviar | El formulario no se envía hasta aceptar | ✅ Aprobado |
| 10 | Compra simulada exitosa | Completar todo correctamente y enviar | Mensaje de éxito con resumen y total; el formulario y el carrito se vacían | ✅ Aprobado |
| 11 | Botón de Arrepentimiento | Ir a `#terminos`, click en "Botón de Arrepentimiento" | Se muestra el mensaje simulado de la solicitud | ✅ Aprobado |
| 12 | Sin errores de consola | Recorrer todo el flujo anterior | `console.error` no registra errores de JavaScript | ✅ Aprobado (tras corregir el bug del favicon, ver abajo) |

**Resultado final: 13/13 casos aprobados** (12 casos funcionales + la condición transversal de consola limpia).

## Resultados verificados (headless, automatizado)

### Caso 1 — Carga dinámica del catálogo

```
msedge --headless=new --disable-gpu --virtual-time-budget=5000 --dump-dom http://localhost:8123/index.html
```

- El texto "Cargando catálogo…" ya no está presente en el DOM final (fue reemplazado por el fetch).
- Se cuentan **6** elementos `.tarjeta-producto__nombre` — coincide con las 6 camisetas de `productos.json`.
- El contador del carrito (`#carrito-contador`) arranca en `0`, como se espera antes de agregar nada.

**Resultado: aprobado.**

### Casos 2 a 12 — interacción automatizada

Se escribió un script con `puppeteer-core` (pilotando el mismo Edge instalado en la máquina, sin
descargar un Chromium aparte) que recorre todo el flujo: agregar/quitar productos, sumar y restar
cantidades, vaciar el carrito, validar el formulario, completar una compra simulada y usar el Botón
de Arrepentimiento, capturando además todos los `console.error` y `pageerror` del navegador durante
el recorrido completo.

```
$ node test-carrito.mjs
PASS - Caso 2: agregar al carrito actualiza contador :: contador=1
PASS - Caso 3: agregar el mismo producto suma cantidad, no duplica fila :: contador=2, filas=1
PASS - Caso 4: botón + aumenta cantidad :: cantidad=3
PASS - Caso 4b: botón − disminuye cantidad :: cantidad=2
PASS - Caso 5: restar hasta 0 elimina el ítem del carrito :: filas=0, panelVacioVisible=true
PASS - Caso 6: eliminar ítem deja 1 producto en el carrito :: filas=1
PASS - Caso 7: carrito vacío deshabilita 'Simular compra'
PASS - Caso 7b: con producto en el carrito, 'Simular compra' se habilita
PASS - Caso 8: campo nombre vacío es inválido (HTML5 required)
PASS - Caso 9: sin aceptar consentimiento no se simula la compra
PASS - Caso 10: compra simulada exitosa vacía el carrito y muestra resumen
PASS - Caso 11: Botón de Arrepentimiento muestra mensaje
PASS - Caso 12: sin errores de consola durante todo el flujo

13/13 casos OK
```

(Primera corrida: 9/13. Las fallas en los casos 7b/10/11 eran falsos negativos del script de
prueba, no del sitio — Puppeteer clickeaba antes de que terminara la animación de scroll suave
del CSS, `scroll-behavior: smooth`; se resolvieron agregando una espera y desactivando el scroll
suave sólo dentro del test. El caso 12 sí encontró un bug real, ver abajo.)

## Lighthouse

**No se pudo ejecutar en esta sesión:** la instalación de `lighthouse` por npm se cortó dos veces
porque la máquina se quedó sin memoria (coincidiendo con Docker Desktop, que tampoco llegó a
arrancar correctamente — ver más abajo). No se reintentó para no seguir presionando la memoria del
equipo.

**Para correrlo vos** (con el servidor local ya levantado en `http://localhost:8123/`, o apuntando
directo a la URL del VPS una vez desplegado):

```sh
npx lighthouse http://localhost:8123/index.html \
  --output=html --output-path=./lighthouse-report.html \
  --chrome-path="C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
```

(si tenés Chrome instalado, se puede omitir `--chrome-path`, lo detecta solo). Completá esta tabla
con los puntajes que te muestre el reporte:

| Categoría | Puntaje |
|---|---|
| Performance | |
| Accessibility | |
| Best Practices | |
| SEO | |

## Bugs encontrados y corregidos

| # | Bug | Cómo se detectó | Corrección |
|---|-----|------------------|------------|
| 1 | El sitio no declaraba `favicon`, por lo que el navegador pedía `/favicon.ico` por defecto y el servidor respondía 404, generando un `console.error` en cada carga de página. | Caso de prueba 12 (consola sin errores), con `puppeteer-core` | Se agregó `assets/favicon.svg` (mismo ícono 🏆 del navbar) y `<link rel="icon" type="image/svg+xml" href="assets/favicon.svg">` en el `<head>` de `index.html`. |

## Despliegue Docker: no validado localmente

`docker build` en esta máquina devolvió "Docker Desktop is unable to start" incluso después de
esperar varios minutos a que levantara. El `Dockerfile`/`nginx.conf`/`docker-compose.yml` de
`casaca-club-sprint2/` se revisaron a mano con cuidado (mismo patrón de `envsubst` que ya usa el
`nginx.conf` de la raíz del repo, que sí está en uso), pero no se corrió un build real acá. Antes
de depender de esto para la entrega, correlo una vez en el VPS (donde Docker ya funciona con tus
otras apps) siguiendo `DEPLOY.md`, o arreglá Docker Desktop local y corré:

```sh
cd casaca-club-sprint2
docker compose up -d --build
curl http://127.0.0.1:8081/health   # debe responder "ok"
```
