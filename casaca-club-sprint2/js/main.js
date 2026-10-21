/* =====================================================================
   CASACA CLUB - SCRIPT PRINCIPAL (Sprint 3-4)
   JavaScript puro, sin librerías ni frameworks.
   - Fetch API: carga y renderiza productos.json dinámicamente.
   - Carrito de compras: agregar, quitar, modificar cantidad, contador
     flotante en el navbar y total simulado.
   - Checkout: valida el formulario contra el carrito y muestra un
     resumen simulado (no se procesan pagos ni se guardan datos).
   - Botón de Arrepentimiento (Ley 24.240, art. 34): simulación del
     mecanismo exigido por la Resolución 424/2020.
   Privacidad: los datos del formulario NO se envían a ningún servidor
   ni se almacenan (ver sección "Política de Privacidad" del index.html).
   ===================================================================== */

// Marca que hay JS disponible: el CSS sólo oculta el menú mobile con esta clase
document.documentElement.classList.add("js");

/* Catálogo cargado desde productos.json y carrito en memoria.
   El carrito vive sólo en memoria (no localStorage/sessionStorage) para
   mantener el mismo criterio de minimización de datos de la Política
   de Privacidad: no persiste nada entre visitas. */
let productos = [];
let carrito = []; // [{ id, cantidad }]

const formatoPrecio = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
});

document.addEventListener("DOMContentLoaded", () => {
  iniciarMenu();
  iniciarCarrito();
  iniciarCheckout();
  iniciarArrepentimiento();
  cargarCatalogo();
});

/* =====================================================================
   MENÚ HAMBURGUESA
   ===================================================================== */
function iniciarMenu() {
  const boton = document.querySelector(".navbar__toggle");
  const menu = document.getElementById("menu-principal");

  if (!boton || !menu) return;

  const alternar = (abrir) => {
    boton.setAttribute("aria-expanded", String(abrir));
    boton.setAttribute("aria-label", abrir ? "Cerrar menú" : "Abrir menú");
    menu.classList.toggle("navbar__nav--abierto", abrir);
  };

  boton.addEventListener("click", () => {
    alternar(boton.getAttribute("aria-expanded") !== "true");
  });

  menu.querySelectorAll("a").forEach((enlace) => {
    enlace.addEventListener("click", () => alternar(false));
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && boton.getAttribute("aria-expanded") === "true") {
      alternar(false);
      boton.focus();
    }
  });
}

/* =====================================================================
   CATÁLOGO: FETCH API + RENDERIZADO DINÁMICO
   ===================================================================== */
async function cargarCatalogo() {
  const contenedor = document.getElementById("catalogo-grid");
  const estado = document.getElementById("catalogo-estado");
  if (!contenedor) return;

  try {
    const respuesta = await fetch("productos.json");

    if (!respuesta.ok) {
      throw new Error(`HTTP ${respuesta.status}`);
    }

    productos = await respuesta.json();
    renderizarCatalogo();
  } catch (error) {
    console.error("No se pudo cargar el catálogo:", error);
    if (estado) {
      estado.textContent =
        "No pudimos cargar el catálogo en este momento. Recargá la página para intentar de nuevo.";
      estado.classList.add("catalogo__estado--error");
      estado.hidden = false;
    }
  }
}

function renderizarCatalogo() {
  const contenedor = document.getElementById("catalogo-grid");
  if (!contenedor) return;

  if (!Array.isArray(productos) || productos.length === 0) {
    contenedor.innerHTML = '<p class="catalogo__estado">No hay camisetas disponibles por el momento.</p>';
    return;
  }

  contenedor.innerHTML = productos.map((producto) => crearTarjetaProducto(producto)).join("");

  // Delegación de eventos: un solo listener para todos los botones "Agregar al carrito"
  contenedor.addEventListener("click", (evento) => {
    const boton = evento.target.closest('[data-accion="agregar-carrito"]');
    if (!boton) return;

    const id = Number(boton.dataset.productoId);
    agregarAlCarrito(id);
    mostrarFeedbackAgregado(boton);
  });
}

function crearTarjetaProducto(producto) {
  return `
    <article class="tarjeta-producto">
      <div class="tarjeta-producto__imagen-wrapper">
        <img class="tarjeta-producto__imagen" src="${producto.imagen_ia_url}" alt="${producto.nombre}, vista frontal" loading="lazy">
        <img class="tarjeta-producto__imagen tarjeta-producto__imagen--espalda" src="${producto.imagen_ia_url_espalda}" alt="${producto.nombre}, vista de espalda" loading="lazy">
      </div>
      <div class="tarjeta-producto__cuerpo">
        <span class="tarjeta-producto__categoria">${producto.categoria}</span>
        <h3 class="tarjeta-producto__nombre">${producto.nombre}</h3>
        <p class="tarjeta-producto__descripcion">${producto.descripcion}</p>
        <div class="tarjeta-producto__pie">
          <span class="tarjeta-producto__precio">${formatoPrecio.format(producto.precio_simulado)}</span>
          <button type="button" class="boton boton--primario tarjeta-producto__boton" data-accion="agregar-carrito" data-producto-id="${producto.id}">
            Agregar al carrito
          </button>
        </div>
      </div>
    </article>
  `;
}

function mostrarFeedbackAgregado(boton) {
  const textoOriginal = boton.textContent;
  boton.dataset.agregado = "true";
  boton.textContent = "Agregado ✓";
  window.setTimeout(() => {
    boton.dataset.agregado = "false";
    boton.textContent = textoOriginal;
  }, 1200);
}

/* =====================================================================
   CARRITO DE COMPRAS
   ===================================================================== */
function iniciarCarrito() {
  const botonCarrito = document.getElementById("boton-carrito");
  const panel = document.getElementById("panel-carrito");

  if (!botonCarrito || !panel) return;

  botonCarrito.addEventListener("click", () => abrirCarrito());

  panel.querySelectorAll("[data-cerrar-carrito]").forEach((elemento) => {
    elemento.addEventListener("click", () => cerrarCarrito());
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && !panel.hidden) {
      cerrarCarrito();
    }
  });

  // Delegación de eventos para sumar, restar y eliminar ítems del carrito
  const lista = document.getElementById("carrito-lista");
  lista.addEventListener("click", (evento) => {
    const fila = evento.target.closest(".carrito-item");
    if (!fila) return;
    const id = Number(fila.dataset.id);

    if (evento.target.closest(".carrito-item__sumar")) {
      cambiarCantidad(id, 1);
    } else if (evento.target.closest(".carrito-item__restar")) {
      cambiarCantidad(id, -1);
    } else if (evento.target.closest(".carrito-item__eliminar")) {
      quitarDelCarrito(id);
    }
  });

  actualizarCarritoUI();
}

function abrirCarrito() {
  const panel = document.getElementById("panel-carrito");
  const boton = document.getElementById("boton-carrito");
  if (!panel) return;
  panel.hidden = false;
  boton?.setAttribute("aria-expanded", "true");
  panel.querySelector(".carrito-panel__cerrar")?.focus();
}

function cerrarCarrito() {
  const panel = document.getElementById("panel-carrito");
  const boton = document.getElementById("boton-carrito");
  if (!panel) return;
  panel.hidden = true;
  boton?.setAttribute("aria-expanded", "false");
}

function agregarAlCarrito(id, cantidad = 1) {
  const item = carrito.find((entrada) => entrada.id === id);
  if (item) {
    item.cantidad += cantidad;
  } else {
    carrito.push({ id, cantidad });
  }
  actualizarCarritoUI();
}

function quitarDelCarrito(id) {
  carrito = carrito.filter((entrada) => entrada.id !== id);
  actualizarCarritoUI();
}

function cambiarCantidad(id, delta) {
  const item = carrito.find((entrada) => entrada.id === id);
  if (!item) return;

  item.cantidad += delta;
  if (item.cantidad <= 0) {
    quitarDelCarrito(id);
    return;
  }
  actualizarCarritoUI();
}

function obtenerLineasCarrito() {
  return carrito
    .map((entrada) => {
      const producto = productos.find((p) => p.id === entrada.id);
      if (!producto) return null;
      return {
        producto,
        cantidad: entrada.cantidad,
        subtotal: producto.precio_simulado * entrada.cantidad,
      };
    })
    .filter(Boolean);
}

function calcularTotalCarrito() {
  return obtenerLineasCarrito().reduce((total, linea) => total + linea.subtotal, 0);
}

/* Punto único de verdad: redibuja el contador del navbar, el panel del
   carrito y el resumen del checkout cada vez que el carrito cambia. */
function actualizarCarritoUI() {
  const lineas = obtenerLineasCarrito();
  const cantidadTotal = lineas.reduce((total, linea) => total + linea.cantidad, 0);
  const totalPrecio = calcularTotalCarrito();

  actualizarContadorNavbar(cantidadTotal);
  actualizarPanelCarrito(lineas, totalPrecio);
  actualizarResumenCheckout(lineas, totalPrecio);
}

function actualizarContadorNavbar(cantidadTotal) {
  const contador = document.getElementById("carrito-contador");
  const boton = document.getElementById("boton-carrito");
  if (!contador || !boton) return;

  contador.textContent = String(cantidadTotal);
  boton.setAttribute("aria-label", `Abrir carrito de compras, ${cantidadTotal} productos`);

  contador.dataset.recienAgregado = "true";
  window.setTimeout(() => {
    contador.dataset.recienAgregado = "false";
  }, 200);
}

function actualizarPanelCarrito(lineas, totalPrecio) {
  const lista = document.getElementById("carrito-lista");
  const vacio = document.getElementById("carrito-vacio");
  const pie = document.getElementById("carrito-pie");
  const totalEl = document.getElementById("carrito-total");
  if (!lista || !vacio || !pie || !totalEl) return;

  if (lineas.length === 0) {
    lista.innerHTML = "";
    vacio.hidden = false;
    pie.hidden = true;
    return;
  }

  vacio.hidden = true;
  pie.hidden = false;
  totalEl.textContent = formatoPrecio.format(totalPrecio);

  lista.innerHTML = lineas
    .map(
      (linea) => `
      <li class="carrito-item" data-id="${linea.producto.id}">
        <img class="carrito-item__imagen" src="${linea.producto.imagen_ia_url}" alt="" loading="lazy">
        <div class="carrito-item__info">
          <p class="carrito-item__nombre">${linea.producto.nombre}</p>
          <p class="carrito-item__precio">${formatoPrecio.format(linea.producto.precio_simulado)} c/u</p>
        </div>
        <button type="button" class="carrito-item__eliminar" aria-label="Eliminar ${linea.producto.nombre} del carrito">🗑</button>
        <div class="carrito-item__cantidad">
          <button type="button" class="carrito-item__restar" aria-label="Quitar una unidad de ${linea.producto.nombre}">−</button>
          <span class="carrito-item__cantidad-valor">${linea.cantidad}</span>
          <button type="button" class="carrito-item__sumar" aria-label="Agregar una unidad de ${linea.producto.nombre}">+</button>
        </div>
        <p class="carrito-item__subtotal">${formatoPrecio.format(linea.subtotal)}</p>
      </li>
    `
    )
    .join("");
}

function actualizarResumenCheckout(lineas, totalPrecio) {
  const lista = document.getElementById("checkout-resumen-lista");
  const vacio = document.getElementById("checkout-resumen-vacio");
  const filaTotal = document.getElementById("checkout-resumen-total-fila");
  const totalEl = document.getElementById("checkout-resumen-total");
  const submit = document.getElementById("checkout-submit");
  const botonMP = document.getElementById("checkout-mp");
  if (!lista || !vacio || !filaTotal || !totalEl || !submit) return;

  if (lineas.length === 0) {
    lista.innerHTML = "";
    vacio.hidden = false;
    filaTotal.hidden = true;
    submit.disabled = true;
    if (botonMP) botonMP.disabled = true;
    return;
  }

  vacio.hidden = true;
  filaTotal.hidden = false;
  totalEl.textContent = formatoPrecio.format(totalPrecio);
  submit.disabled = false;
  if (botonMP) botonMP.disabled = false;

  lista.innerHTML = lineas
    .map(
      (linea) => `
      <li class="checkout__resumen-item">
        <span><strong>${linea.cantidad}×</strong> ${linea.producto.nombre}</span>
        <span>${formatoPrecio.format(linea.subtotal)}</span>
      </li>
    `
    )
    .join("");
}

/* =====================================================================
   CHECKOUT: VALIDACIÓN Y RESUMEN SIMULADO
   ===================================================================== */
function iniciarCheckout() {
  const formulario = document.querySelector(".formulario");
  const mensaje = document.getElementById("formulario-mensaje");
  const botonMP = document.getElementById("checkout-mp");

  if (!formulario || !mensaje) return;

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    if (carrito.length === 0) {
      mostrarMensajeFormulario(
        "Tu carrito está vacío: agregá al menos una camiseta desde el catálogo antes de simular la compra.",
        true
      );
      return;
    }

    if (!formulario.checkValidity()) {
      mostrarMensajeFormulario(
        "Revisá los campos obligatorios y aceptá la Política de Privacidad para continuar.",
        true
      );
      formulario.reportValidity();
      return;
    }

    const lineas = obtenerLineasCarrito();
    const total = calcularTotalCarrito();
    const resumenProductos = lineas
      .map((linea) => `${linea.cantidad} × ${linea.producto.nombre}`)
      .join(", ");

    // reset() dispara el evento "reset", por eso se limpia antes de armar el mensaje final
    formulario.reset();
    carrito = [];
    actualizarCarritoUI();

    mostrarMensajeFormulario(
      `Compra simulada con éxito: ${resumenProductos} — Total ${formatoPrecio.format(total)}. ` +
        "No se procesó ningún pago y tus datos no fueron almacenados.",
      false
    );
  });

  formulario.addEventListener("reset", ocultarMensajeFormulario);

  if (botonMP) {
    botonMP.addEventListener("click", () => pagarConMercadoPago(formulario, botonMP, mostrarMensajeFormulario));
  }

  function mostrarMensajeFormulario(texto, esError) {
    mensaje.textContent = texto;
    mensaje.classList.toggle("formulario__mensaje--error", esError);
    mensaje.hidden = false;
  }

  function ocultarMensajeFormulario() {
    mensaje.hidden = true;
    mensaje.textContent = "";
  }
}

/* Pide al backend (server/index.js) una preferencia de pago de Mercado
   Pago para el carrito actual y redirige al checkout de MP. El backend
   es quien tiene el Access Token y recalcula los precios: el navegador
   nunca ve esa credencial ni puede manipular el total. */
async function pagarConMercadoPago(formulario, boton, mostrarMensajeFormulario) {
  if (carrito.length === 0) {
    mostrarMensajeFormulario(
      "Tu carrito está vacío: agregá al menos una camiseta desde el catálogo antes de pagar.",
      true
    );
    return;
  }

  if (!formulario.checkValidity()) {
    mostrarMensajeFormulario(
      "Revisá los campos obligatorios y aceptá la Política de Privacidad para continuar.",
      true
    );
    formulario.reportValidity();
    return;
  }

  const textoOriginal = boton.textContent;
  boton.disabled = true;
  boton.textContent = "Generando link de pago…";

  try {
    const respuesta = await fetch("/api/crear-preferencia", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: carrito,
        comprador: {
          nombre: formulario.nombre.value,
          email: formulario.email.value,
        },
      }),
    });

    const datos = await respuesta.json();

    if (!respuesta.ok || !datos.init_point) {
      throw new Error(datos.error || `HTTP ${respuesta.status}`);
    }

    window.location.href = datos.init_point;
  } catch (error) {
    console.error("No se pudo crear la preferencia de Mercado Pago:", error);
    mostrarMensajeFormulario(
      "No se pudo conectar con Mercado Pago en este momento. Probá de nuevo en unos minutos.",
      true
    );
    boton.disabled = false;
    boton.textContent = textoOriginal;
  }
}

/* =====================================================================
   BOTÓN DE ARREPENTIMIENTO (Ley 24.240, art. 34 - Resolución 424/2020)
   ===================================================================== */
function iniciarArrepentimiento() {
  const boton = document.getElementById("boton-arrepentimiento");
  const mensaje = document.getElementById("arrepentimiento-mensaje");
  if (!boton || !mensaje) return;

  boton.addEventListener("click", () => {
    mensaje.textContent =
      "Solicitud de arrepentimiento simulada. En un sitio en producción, esto generaría un ticket dentro de " +
      "los 10 días corridos de la entrega y se confirmaría por correo a contacto@casacaclub.edu.ar, sin costo " +
      "para quien compra (Ley 24.240, art. 34).";
    mensaje.hidden = false;
  });
}
