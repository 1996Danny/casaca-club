/* =====================================================================
   CASACA CLUB - SCRIPT PRINCIPAL (Sprint 2)
   JavaScript puro, sin librerías. Mejora progresiva: el sitio funciona
   sin JS; este script agrega el menú hamburguesa en mobile y
   comodidades al checkout simulado.
   Privacidad: los datos del formulario NO se envían ni se almacenan
   (ver sección "Política de Privacidad" del index.html).
   ===================================================================== */

// Marca que hay JS disponible: el CSS sólo oculta el menú mobile con esta clase
document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  iniciarMenu();
  iniciarCheckout();
});

/* Menú hamburguesa: abre y cierra la navegación en pantallas chicas */
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

  // Al elegir una sección, el menú se cierra para dejar ver el contenido
  menu.querySelectorAll("a").forEach((enlace) => {
    enlace.addEventListener("click", () => alternar(false));
  });

  // Escape cierra el menú y devuelve el foco al botón
  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && boton.getAttribute("aria-expanded") === "true") {
      alternar(false);
      boton.focus();
    }
  });
}

/* Checkout simulado: preselección de producto, validación y resumen */
function iniciarCheckout() {
  const formulario = document.querySelector(".formulario");
  const selectProducto = document.getElementById("producto");
  const inputCantidad = document.getElementById("cantidad");
  const mensaje = document.getElementById("formulario-mensaje");

  if (!formulario || !selectProducto || !inputCantidad || !mensaje) return;

  const formatoPrecio = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });

  /* 1. Botón "Comprar" de cada tarjeta: preselecciona la camiseta en el checkout */
  document.querySelectorAll("[data-producto-id]").forEach((boton) => {
    boton.addEventListener("click", () => {
      selectProducto.value = boton.dataset.productoId;
      ocultarMensaje();
    });
  });

  /* 2. Envío del formulario: valida y muestra un resumen, sin enviar datos */
  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    if (!formulario.checkValidity()) {
      mostrarMensaje(
        "Revisá los campos obligatorios y aceptá la Política de Privacidad para continuar.",
        true
      );
      formulario.reportValidity();
      return;
    }

    const opcion = selectProducto.selectedOptions[0];
    const cantidad = Number(inputCantidad.value);
    const total = Number(opcion.dataset.precio) * cantidad;

    // reset() dispara el evento "reset", por eso se limpia antes de mostrar el resumen
    formulario.reset();
    mostrarMensaje(
      `Compra simulada con éxito: ${cantidad} × ${opcion.textContent} — Total ${formatoPrecio.format(total)}. ` +
        "No se procesó ningún pago y tus datos no fueron almacenados.",
      false
    );
  });

  /* 3. Botón "Limpiar": descarta los datos y el mensaje */
  formulario.addEventListener("reset", ocultarMensaje);

  function mostrarMensaje(texto, esError) {
    mensaje.textContent = texto;
    mensaje.classList.toggle("formulario__mensaje--error", esError);
    mensaje.hidden = false;
  }

  function ocultarMensaje() {
    mensaje.hidden = true;
    mensaje.textContent = "";
  }
}
