/* =====================================================================
   CASACA CLUB (app React) - API de Mercado Pago
   Recibe el carrito armado en el navegador, recalcula los precios del
   lado del servidor contra catalog.json (generado de la fuente real del
   catálogo por export-catalog.mjs, nunca se confía en el precio que
   manda el cliente) y crea una preferencia de pago de Mercado Pago
   (Checkout Pro).

   Corre con credenciales de PRUEBA (Access Token "APP_USR-..." de la
   sección "Credenciales de prueba" del panel de desarrolladores): el
   checkout redirige a un flujo real de Mercado Pago pero sólo se puede
   completar logueado con una cuenta de prueba, no se cobra dinero real.
   Para producción, cambiar el MP_ACCESS_TOKEN en el .env del VPS por el
   de producción.
   ===================================================================== */

const fs = require("fs");
const path = require("path");
const express = require("express");
const { MercadoPagoConfig, Preference } = require("mercadopago");

const PORT = process.env.PORT || 3000;
const ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;
const SITE_URL = (process.env.SITE_URL || "http://localhost:8080").replace(/\/$/, "");

if (!ACCESS_TOKEN) {
  console.error(
    "[casaca-club-app-api] Falta MP_ACCESS_TOKEN en el entorno: no se van a poder crear preferencias de pago."
  );
}

const mpClient = new MercadoPagoConfig({ accessToken: ACCESS_TOKEN });
const preferenceClient = new Preference(mpClient);

const catalogo = JSON.parse(fs.readFileSync(path.join(__dirname, "catalog.json"), "utf-8"));

const VERSION_LABEL = { hincha: "Versión Hincha", jugador: "Versión Jugador" };

const app = express();
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.post("/api/crear-preferencia", async (req, res) => {
  const { items, payer } = req.body ?? {};

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "El carrito está vacío." });
  }

  const itemsMercadoPago = [];
  for (const entrada of items) {
    const jersey = catalogo.find((j) => j.id === entrada?.jerseyId);
    const deltaVersion = jersey?.versiones?.[entrada?.versionId];
    const cantidad = Number(entrada?.quantity);

    if (!jersey || deltaVersion === undefined || !Number.isInteger(cantidad) || cantidad <= 0) {
      return res.status(400).json({ error: `Ítem de carrito inválido (jerseyId ${entrada?.jerseyId}).` });
    }

    const talle = typeof entrada?.size === "string" ? entrada.size : "";

    itemsMercadoPago.push({
      id: `${jersey.id}__${entrada.versionId}__${talle}`,
      title: `${jersey.nombre} - Talle ${talle} - ${VERSION_LABEL[entrada.versionId] ?? entrada.versionId}`,
      quantity: cantidad,
      unit_price: Number(jersey.precio_base) + Number(deltaVersion),
      currency_id: "ARS",
    });
  }

  // Mercado Pago rechaza auto_return si back_urls.success no es un
  // dominio público (https): en local (http://localhost:...) hay que
  // omitirlo y el comprador vuelve con el botón "Volver al sitio".
  const esSitioPublico = /^https:\/\//.test(SITE_URL);

  try {
    const preferencia = await preferenceClient.create({
      body: {
        items: itemsMercadoPago,
        payer: payer?.email ? { name: payer?.nombre || undefined, email: payer.email } : undefined,
        back_urls: {
          success: `${SITE_URL}/checkout/success`,
          failure: `${SITE_URL}/checkout/failure`,
          pending: `${SITE_URL}/checkout/success`,
        },
        ...(esSitioPublico ? { auto_return: "approved" } : {}),
        statement_descriptor: "CASACA CLUB (PRUEBA)",
      },
    });

    res.json({
      id: preferencia.id,
      init_point: preferencia.init_point,
      sandbox_init_point: preferencia.sandbox_init_point,
    });
  } catch (error) {
    console.error("[casaca-club-app-api] Error creando preferencia de Mercado Pago:", error);
    res.status(502).json({ error: "No se pudo generar el link de pago. Intentá de nuevo en unos minutos." });
  }
});

app.listen(PORT, () => {
  console.log(`[casaca-club-app-api] escuchando en :${PORT} (SITE_URL=${SITE_URL})`);
});
