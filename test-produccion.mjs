/* Test cases funcionales contra la entrega real (https://casacaclub.shop),
   adaptado del TESTING.md original (Sprint 4, tarea 4.2) a la versión React
   publicada: el checkout ahora redirige a Mercado Pago en vez de simular
   una compra (caso reescrito para verificar la preferencia real y el
   redirect, sin completar el pago).

   Nota sobre los selectores: el botón "Añadir al carrito" de cada tarjeta
   cambia su texto a "Añadido" during 1.4s después de cada click (feedback
   visual), así que identificar el botón por su texto es inestable en
   clicks seguidos. Acá cada tarjeta se ubica por un selector estable (la
   imagen "{Nación} - frente") y el botón se busca como descendiente de esa
   tarjeta, no por su texto actual. */

import puppeteer from "puppeteer-core";

const SITE = "https://casacaclub.shop";
const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

const results = [];
const consoleErrors = [];
const failedRequests = [];

function pass(name, detail = "") {
  results.push({ name, ok: true, detail });
  console.log(`PASS - ${name}${detail ? " :: " + detail : ""}`);
}
function fail(name, detail = "") {
  results.push({ name, ok: false, detail });
  console.log(`FAIL - ${name}${detail ? " :: " + detail : ""}`);
}

async function clickAddButton(page, nation) {
  return page.evaluate((nation) => {
    const img = document.querySelector(`img[alt="${nation} - frente"]`);
    const card = img?.closest('[role="button"]');
    const btn = card?.querySelector("button");
    if (!btn) return false;
    btn.click();
    return true;
  }, nation);
}

async function closeCartPanel(page) {
  await page.evaluate(() => {
    const closeBtn = [...document.querySelectorAll("button")].find(
      (b) => b.querySelector(".sr-only")?.textContent === "Close"
    );
    closeBtn?.click();
  });
  await new Promise((r) => setTimeout(r, 400));
}

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: EDGE_PATH,
    args: ["--disable-gpu"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(`[console.error] ${msg.text()} (page: ${page.url()})`);
  });
  page.on("pageerror", (err) => consoleErrors.push(`[pageerror] ${err.message} (page: ${page.url()})`));
  page.on("requestfailed", (req) => {
    failedRequests.push(`${req.failure()?.errorText} ${req.url()}`);
  });
  page.on("response", (res) => {
    if (res.status() >= 400) failedRequests.push(`HTTP ${res.status()} ${res.url()}`);
  });

  try {
    // Caso 1 — Carga del catálogo
    await page.goto(SITE, { waitUntil: "networkidle0", timeout: 30000 });
    const cardCount = await page.$$eval('img[alt$=" - frente"]', (imgs) => imgs.length);
    if (cardCount > 0) pass("1: Carga del catálogo", `${cardCount} camisetas renderizadas`);
    else fail("1: Carga del catálogo", "0 camisetas encontradas");

    // Caso 2 — Agregar al carrito (Argentina)
    await clickAddButton(page, "Argentina");
    await page.waitForSelector('[role="dialog"]', { timeout: 5000 });
    let panelText = await page.evaluate(() => document.querySelector('[role="dialog"]')?.textContent || "");
    if (panelText.includes("Tu carrito (1)") && panelText.includes("Argentina")) {
      pass("2: Agregar al carrito abre el panel con contador 1");
    } else {
      fail("2: Agregar al carrito", panelText.slice(0, 80));
    }

    // esperar a que termine la animación "Añadido" (1.4s) antes de volver a tocar la misma tarjeta
    await new Promise((r) => setTimeout(r, 1600));

    // Caso 3 — Agregar el mismo producto otra vez: no duplica fila, suma cantidad
    await clickAddButton(page, "Argentina");
    await new Promise((r) => setTimeout(r, 300));
    panelText = await page.evaluate(() => document.querySelector('[role="dialog"]')?.textContent || "");
    const rows3 = await page.$$eval('[role="dialog"] button[aria-label^="Eliminar "]', (b) => b.length);
    if (rows3 === 1 && panelText.includes("Tu carrito (2)")) {
      pass("3: Agregar el mismo producto suma cantidad, no duplica fila", `filas=${rows3}`);
    } else {
      fail("3: Agregar el mismo producto", `filas=${rows3}, texto="${panelText.slice(0, 60)}"`);
    }

    // Caso 4 — Sumar/restar cantidad
    await page.click('[role="dialog"] button[aria-label="Sumar cantidad"]');
    await new Promise((r) => setTimeout(r, 200));
    let qty = await page.$eval('[role="dialog"] span.tabular-nums', (el) => el.textContent.trim());
    if (qty === "3") pass("4: botón + aumenta cantidad", `cantidad=${qty}`);
    else fail("4: botón + aumenta cantidad", `cantidad=${qty}`);

    await page.click('[role="dialog"] button[aria-label="Restar cantidad"]');
    await new Promise((r) => setTimeout(r, 200));
    qty = await page.$eval('[role="dialog"] span.tabular-nums', (el) => el.textContent.trim());
    if (qty === "2") pass("4b: botón - disminuye cantidad", `cantidad=${qty}`);
    else fail("4b: botón - disminuye cantidad", `cantidad=${qty}`);

    // Caso 5 — Restar hasta 0 elimina el ítem
    await page.click('[role="dialog"] button[aria-label="Restar cantidad"]');
    await new Promise((r) => setTimeout(r, 200));
    await page.click('[role="dialog"] button[aria-label="Restar cantidad"]');
    await new Promise((r) => setTimeout(r, 300));
    const emptyMsg = await page.evaluate(() =>
      document.querySelector('[role="dialog"]')?.textContent?.includes("Aún no tienes ninguna camiseta")
    );
    if (emptyMsg) pass("5: restar hasta 0 elimina el ítem del carrito, muestra panel vacío");
    else fail("5: restar hasta 0", "no se detectó el panel vacío");

    await closeCartPanel(page);

    // Caso 6 — Eliminar ítem con el ícono de basura
    await clickAddButton(page, "Argentina");
    await new Promise((r) => setTimeout(r, 1600));
    await clickAddButton(page, "Brasil");
    await new Promise((r) => setTimeout(r, 300));
    const rowsBefore = await page.$$eval('[role="dialog"] button[aria-label^="Eliminar "]', (b) => b.length);
    await page.click('[role="dialog"] button[aria-label^="Eliminar "]');
    await new Promise((r) => setTimeout(r, 300));
    const rowsAfter = await page.$$eval('[role="dialog"] button[aria-label^="Eliminar "]', (b) => b.length);
    if (rowsBefore === 2 && rowsAfter === 1) pass("6: eliminar ítem deja 1 producto en el carrito", `antes=${rowsBefore}, después=${rowsAfter}`);
    else fail("6: eliminar ítem", `antes=${rowsBefore}, después=${rowsAfter}`);

    // Caso 7 — Checkout con Mercado Pago (sin completar el pago)
    await page.evaluate(() => {
      const btn = [...document.querySelectorAll('[role="dialog"] button')].find((b) =>
        b.textContent?.includes("Pagar con Mercado Pago")
      );
      btn?.click();
    });
    await page.waitForNavigation({ waitUntil: "networkidle2", timeout: 10000 }).catch(() => {});
    const currentUrl = page.url();
    if (/mercadopago\.com.*pref_id=/.test(currentUrl)) {
      pass("7: checkout crea preferencia real de Mercado Pago y redirige", currentUrl);
    } else {
      fail("7: checkout con Mercado Pago", `URL actual: ${currentUrl}`);
    }

    // volver al sitio sin completar el pago
    await page.goto(SITE, { waitUntil: "networkidle0", timeout: 30000 });

    // Caso 8 — Tema oscuro
    const themeBefore = await page.evaluate(() => document.documentElement.classList.contains("dark"));
    await page.click('button[aria-label^="Activar tema"]');
    await new Promise((r) => setTimeout(r, 200));
    const themeAfter = await page.evaluate(() => document.documentElement.classList.contains("dark"));
    if (themeBefore !== themeAfter) pass("8: toggle de tema oscuro cambia la clase 'dark'", `antes=${themeBefore}, después=${themeAfter}`);
    else fail("8: toggle de tema oscuro", "la clase 'dark' no cambió");

    // Caso 9 — Términos y botón de Arrepentimiento
    await page.goto(`${SITE}/terminos`, { waitUntil: "networkidle0", timeout: 30000 });
    await page.evaluate(() => {
      const btn = [...document.querySelectorAll("button")].find((b) =>
        b.textContent?.includes("Botón de Arrepentimiento")
      );
      btn?.click();
    });
    await new Promise((r) => setTimeout(r, 200));
    const msgShown = await page
      .$eval('[role="status"]', (el) => el.textContent.includes("Solicitud de arrepentimiento simulada"))
      .catch(() => false);
    if (msgShown) pass("9: Botón de Arrepentimiento muestra el mensaje simulado");
    else fail("9: Botón de Arrepentimiento", "no apareció el mensaje");

    // Caso 10 — Política de Privacidad carga
    await page.goto(`${SITE}/privacidad`, { waitUntil: "networkidle0", timeout: 30000 });
    const privacyHeading = await page.$eval("h1", (el) => el.textContent).catch(() => null);
    if (privacyHeading?.includes("Privacidad")) pass("10: /privacidad carga con el encabezado esperado", privacyHeading);
    else fail("10: /privacidad", `encabezado: ${privacyHeading}`);

    // Caso 11 — Consola sin errores durante el recorrido en casacaclub.shop
    const ownSiteErrors = consoleErrors.filter((e) => !e.includes("mercadopago.com"));
    if (ownSiteErrors.length === 0) {
      pass("11: sin errores de consola en casacaclub.shop durante todo el flujo");
    } else {
      fail("11: errores de consola detectados en casacaclub.shop", ownSiteErrors.join(" | "));
    }
  } catch (err) {
    fail("EXCEPCIÓN NO MANEJADA", err.message);
  } finally {
    await browser.close();
  }

  const okCount = results.filter((r) => r.ok).length;
  console.log(`\n${okCount}/${results.length} casos OK`);
  if (consoleErrors.length) {
    console.log("\nErrores/warnings de consola capturados (incluye los de mercadopago.com si los hay):");
    consoleErrors.forEach((e) => console.log(" -", e));
  }
  if (failedRequests.length) {
    console.log("\nRequests con error HTTP durante todo el recorrido:");
    failedRequests.forEach((e) => console.log(" -", e));
  }
})();
