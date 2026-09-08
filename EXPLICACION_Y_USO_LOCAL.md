# Casaca Club App — Explicación simple y guía para probarlo en local

## 1. ¿Qué es esta aplicación?

Es una **tienda online (e-commerce) de camisetas de fútbol** ("casacas"), construida como una aplicación web con React. Es un **prototipo de frontend**: no tiene servidor propio ni base de datos real — todos los productos, precios y stock están escritos directamente en el código (datos "mock" o de prueba), y el checkout es simulado (no procesa pagos reales).

Funciona 100% en el navegador. No necesitás instalar ninguna base de datos ni backend para probarla.

## 2. ¿Cómo está armada por dentro? (explicación simple)

Pensalo como una casa con estas partes:

- **`src/main.tsx`** — el punto de entrada. Es lo primero que arranca y "monta" la app dentro del `index.html`.
- **`src/App.tsx`** — arranca el prototipo de la tienda (`BoutiqueStorePrototype`).
- **`src/store/prototypes/boutique-store.tsx`** — el "mapa de rutas" de la app. Define qué página se muestra según la URL:
  - `/` → página de inicio con el catálogo de camisetas.
  - `/checkout/success` → pantalla de "compra exitosa" (simulada).
  - `/checkout/failure` → pantalla de "compra fallida" (simulada).
- **`src/store/data/jerseys-data.tsx`** — el "catálogo": un listado de camisetas de prueba con nación, precio, talles disponibles, imágenes, etc. Es la fuente de datos, como si fuera una mini base de datos escrita a mano.
- **`src/store/data/cart-context.tsx`** — el "cerebro" del carrito de compras. Usa el sistema de Contexto de React para que cualquier componente pueda saber qué hay en el carrito, agregar productos, sacarlos, cambiar cantidades, etc., sin tener que pasar esa información manualmente de componente en componente.
- **`src/store/components/`** — piezas visuales reutilizables: la grilla de camisetas (`jersey-grid`), la tarjeta de cada camiseta (`jersey-card`), los filtros (`jersey-filter-bar`), el cajón del carrito (`cart-drawer`), el encabezado del sitio (`site-header`), etc.
- **`src/store/layouts/storefront-layout.tsx`** — el "molde" común a todas las páginas: header arriba, contenido en el medio, footer abajo, y el cajón del carrito disponible en cualquier momento.
- **`src/store/pages/`** — las páginas completas armadas combinando esos componentes (Home, Checkout Success, Checkout Failure).
- **`src/components/ui/`** — una librería de componentes de interfaz genéricos (botones, tarjetas, modales, etc.) basada en Radix UI + Tailwind, que se usan como bloques de Lego en toda la app.

### Flujo típico de uso
1. El usuario entra a `/` y ve la grilla de camisetas, con filtros por confederación (CONMEBOL, UEFA, etc.) y edición (titular, suplente, retro).
2. Al hacer clic en una camiseta se abre un modal con el detalle (versión hincha/jugador, talles, precio).
3. Al agregar al carrito, el `CartProvider` guarda esa línea en memoria (RAM del navegador) y abre el cajón lateral del carrito.
4. Desde el carrito el usuario puede simular el checkout, que lo lleva a `/checkout/success` o `/checkout/failure` (son pantallas fijas, no hay pago real ni backend).

### Tecnologías usadas
- **React 18** + **TypeScript** — la lógica y los componentes de la interfaz.
- **Vite** — la herramienta que arranca el servidor de desarrollo y compila el proyecto (rápida y simple).
- **React Router** — el manejo de navegación entre páginas sin recargar el navegador.
- **Tailwind CSS** — el sistema de estilos (clases utilitarias en vez de archivos CSS separados).
- **Radix UI** — componentes de interfaz accesibles (modales, dropdowns, tabs, etc.) sobre los que se construye `src/components/ui`.

No hay backend, base de datos, ni autenticación de usuarios: todo el "estado" (carrito, filtros) vive en la memoria del navegador y se pierde al refrescar la página.

## 3. Cómo ejecutarlo en local (paso a paso)

### Requisitos previos
- Tener **Node.js** instalado (versión 18 o superior recomendada). Para comprobarlo, abrí una terminal y ejecutá:
  ```
  node -v
  npm -v
  ```
  Si no tenés Node instalado, descargalo desde https://nodejs.org (versión LTS).

### Pasos

1. **Abrir una terminal en la carpeta del proyecto**
   ```
   cd C:\Users\Daniel\Downloads\casaca_club_app
   ```

2. **Instalar las dependencias** (solo la primera vez, o cuando cambie `package.json`)
   ```
   npm install
   ```
   Esto descarga todas las librerías necesarias dentro de la carpeta `node_modules`.

3. **Levantar el servidor de desarrollo**
   ```
   npm run dev
   ```
   Vite va a mostrar en la terminal una URL local, típicamente:
   ```
   Local:   http://localhost:5173/
   ```

4. **Abrir esa URL en el navegador** para ver y probar la tienda. Los cambios que hagas en el código se reflejan automáticamente en el navegador (hot reload), sin necesidad de reiniciar nada.

5. **Para detener el servidor**, volvé a la terminal y presioná `Ctrl + C`.

### Otros comandos útiles

| Comando | Qué hace |
|---|---|
| `npm run build` | Genera la versión de producción (optimizada) en la carpeta `dist/` |
| `npm run preview` | Sirve localmente el build de producción, para probarlo tal cual quedaría publicado |
| `npm run lint` | Revisa el código en busca de errores de estilo o problemas comunes |
| `npm run type-check` | Verifica los tipos de TypeScript sin generar archivos |

### Qué probar al testear
- Filtrar camisetas por confederación y edición desde la barra de filtros.
- Abrir el detalle de una camiseta y elegir versión (hincha/jugador) y talle.
- Agregar productos al carrito y ver que se actualiza el contador en el header.
- Modificar cantidades o eliminar líneas dentro del cajón del carrito.
- Simular el checkout y revisar las pantallas de éxito/error en `/checkout/success` y `/checkout/failure`.
- Probar en una ventana angosta del navegador (o herramientas de dispositivo móvil) para ver la barra de navegación inferior pensada para mobile.
