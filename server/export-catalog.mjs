/* =====================================================================
   Genera server/catalog.json a partir de la fuente real del catálogo
   (public/productos.json) — el mismo JSON que el frontend carga con la
   Fetch API.

   Por qué: el precio final (precio base + delta de versión) sólo puede
   confiarse si viene calculado del lado del servidor con el mismo dato
   que usa el front, nunca del precio que mande el navegador. En vez de
   mantener un segundo archivo de precios a mano (que se puede desincronizar
   del catálogo real), este script lo deriva directamente de productos.json
   en cada build de la imagen de la API.
   ===================================================================== */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcPath = path.join(__dirname, "productos.json");
const outPath = path.join(__dirname, "catalog.json");

const productos = JSON.parse(fs.readFileSync(srcPath, "utf-8"));

const EDICION_LABEL = { titular: "Titular", suplente: "Suplente", retro: "Retro" };

const catalogo = productos.map((jersey) => ({
  id: jersey.id,
  nombre: `Camiseta ${jersey.nation} ${EDICION_LABEL[jersey.edition] ?? jersey.edition} ${jersey.season}`,
  precio_base: jersey.price,
  versiones: Object.fromEntries(jersey.versions.map((v) => [v.id, v.priceDelta])),
}));

fs.writeFileSync(outPath, JSON.stringify(catalogo, null, 2));
console.log(`[export-catalog] ${catalogo.length} camisetas exportadas a ${outPath}`);
