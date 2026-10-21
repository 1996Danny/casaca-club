/* =====================================================================
   Genera server/catalog.json a partir de la fuente real del catálogo
   (src/store/data/jerseys-data.tsx) usando esbuild para transpilar ese
   TypeScript a JS y evaluarlo.

   Por qué: el precio final (precio base + delta de versión) sólo puede
   confiarse si viene calculado del lado del servidor con el mismo dato
   que usa el front, nunca del precio que mande el navegador. En vez de
   mantener un segundo archivo de precios a mano (que se puede desincronizar
   del catálogo real), este script lo deriva directamente de la misma
   fuente que usa React, en cada build de la imagen de la API.
   ===================================================================== */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import esbuild from "esbuild";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcPath = path.join(__dirname, "src", "store", "data", "jerseys-data.tsx");
const outPath = path.join(__dirname, "catalog.json");

const fuente = fs.readFileSync(srcPath, "utf-8");
const { code } = esbuild.transformSync(fuente, { loader: "tsx", format: "cjs" });

const mod = { exports: {} };
new Function("module", "exports", code)(mod, mod.exports);

const EDICION_LABEL = { titular: "Titular", suplente: "Suplente", retro: "Retro" };

const catalogo = mod.exports.JERSEYS.map((jersey) => ({
  id: jersey.id,
  nombre: `Camiseta ${jersey.nation} ${EDICION_LABEL[jersey.edition] ?? jersey.edition} ${jersey.season}`,
  precio_base: jersey.price,
  versiones: Object.fromEntries(jersey.versions.map((v) => [v.id, v.priceDelta])),
}));

fs.writeFileSync(outPath, JSON.stringify(catalogo, null, 2));
console.log(`[export-catalog] ${catalogo.length} camisetas exportadas a ${outPath}`);
