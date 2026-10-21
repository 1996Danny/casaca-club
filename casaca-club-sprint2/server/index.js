/* =====================================================================
   CASACA CLUB - API de Mercado Pago (Sprint 3-4)
   Único trabajo de este servicio: recibir el carrito armado en el
   navegador, recalcular los precios del lado del servidor (nunca se
   confía en el precio que manda el cliente) y crear una preferencia de
   pago de Mercado Pago (Checkout Pro) con esas credenciales.

   Corre con credenciales de PRUEBA (Access Token que empieza con
   "TEST-"): Mercado Pago redirige a un checkout real pero sólo acepta
   tarjetas/usuarios de prueba, no se cobra dinero real. Para pasar a
   producción el día que corresponda, sólo hay que cambiar el
   MP_ACCESS_TOKEN en el .env del VPS por el de producción.
   ===================================================================== */

const fs = require("fs");
const path = require("path");
const express = require("express");
const { MercadoPagoConfig, Preference } = require("mercadopago");

const PORT = process.env.PORT || 3000;
const ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;
const SITE_URL = (process.env.SITE_URL || "http://localhost:8081").replace(/\/$/, "");

if (!ACCESS_TOKEN) {
  console.error(
    "[casaca-club-api] Falta MP_ACCESS_TOKEN en el entorno: no se van a poder crear preferencias de pago."
  );
}

const mpClient = new MercadoPagoConfig({ accessToken: ACCESS_TOKEN });
const preferenceClient = new Preference(mpClient);

const productos = JSON.parse(fs.readFileSync(path.join(__dirname, "productos.json"), "utf-8"));

const app = express();
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.post("/api/crear-preferencia", async (req, res) => {
  const { items, comprador } = req.body ?? {};

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "El carrito está vacío." });
  }

  const itemsMercadoPago = [];
  for (const entrada of items) {
    const producto = productos.find((p) => p.id === Number(entrada?.id));
    const cantidad = Number(entrada?.cantidad);

    if (!producto || !Number.isInteger(cantidad) || cantidad <= 0) {
      return res.status(400).json({ error: `Ítem de carrito inválido (id ${entrada?.id}).` });
    }

    itemsMercadoPago.push({
      id: String(producto.id),
      title: producto.nombre,
      quantity: cantidad,
      unit_price: Number(producto.precio_simulado),
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
        payer: comprador?.email
          ? { name: comprador?.nombre || undefined, email: comprador.email }
          : undefined,
        back_urls: {
          success: `${SITE_URL}/?mp_estado=exito#checkout`,
          failure: `${SITE_URL}/?mp_estado=fallo#checkout`,
          pending: `${SITE_URL}/?mp_estado=pendiente#checkout`,
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
    console.error("[casaca-club-api] Error creando preferencia de Mercado Pago:", error);
    res.status(502).json({ error: "No se pudo generar el link de pago. Intentá de nuevo en unos minutos." });
  }
});

app.listen(PORT, () => {
  console.log(`[casaca-club-api] escuchando en :${PORT} (SITE_URL=${SITE_URL})`);
});
