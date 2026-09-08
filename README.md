# Casaca Club App

Tienda online de camisetas de selecciones nacionales (frontend con datos de prueba, sin backend).

## Cómo editar este código

Cloná el repositorio y trabajá localmente con tu IDE preferido.

Requisito: tener Node.js & npm instalados - [instalar con nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

```sh
# Paso 1: cloná el repositorio
git clone <YOUR_GIT_URL>

# Paso 2: entrá a la carpeta del proyecto
cd casaca_club_app

# Paso 3: instalá las dependencias
npm i

# Paso 4: iniciá el servidor de desarrollo con auto-reload
npm run dev
```

Para una explicación más detallada del funcionamiento y cómo probarlo en local, ver [`EXPLICACION_Y_USO_LOCAL.md`](./EXPLICACION_Y_USO_LOCAL.md).

## Tecnologías utilizadas

Este proyecto está construido con:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Cómo desplegar este proyecto

**Deploy con Vercel**

```sh
npm i -g vercel
vercel
```

**Deploy con Netlify**

```sh
npm run build
# Luego arrastrá la carpeta 'dist' a netlify.com/drop
```

## Scripts disponibles

| Script | Comando | Descripción |
|--------|---------|-------------|
| **Dev** | `npm run dev` | Inicia el servidor de desarrollo con hot reload |
| **Build** | `npm run build` | Genera un build de producción optimizado |
| **Preview** | `npm run preview` | Sirve el build de producción localmente |
| **Type Check** | `npm run type-check` | Verifica los tipos de TypeScript sin emitir archivos |
| **Lint** | `npm run lint` | Revisa el código en busca de errores de lint |
| **Lint Fix** | `npm run lint:fix` | Corrige automáticamente errores de lint |
| **Format** | `npm run format` | Formatea el código con Prettier |

## Versiones de librerías principales

| Librería | Versión | Propósito |
|---------|---------|-----------|
| React | 18.3.1 | Framework de UI |
| Vite | 6.2.0 | Build tool & servidor de desarrollo |
| TypeScript | 5.7.2 | Tipado estático |
| Tailwind CSS | 3.4.17 | Estilos utility-first |
| React Router DOM | 6.26.2 | Ruteo del lado del cliente |
| Recharts | 2.12.7 | Visualización de datos |
| Zod | 3.23.8 | Validación de esquemas |
