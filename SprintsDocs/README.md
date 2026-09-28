# Casaca Club – Desarrollo de Sitios Web (Sprints 1 y 2)

Estado de los entregables de **Desarrollo de Sitios Web** del proyecto integrador "EcoStart IA". El sitio entregado está en [`casaca-club-sprint2/`](../casaca-club-sprint2/) y se abre directamente con `index.html`, sin instalar nada.

- **Repositorio:** [github.com/1996Danny/casaca-club](https://github.com/1996Danny/casaca-club) (rama `sprint_2`)
- **Wireframes en Figma:** [Casaca Club – Wireframes](https://www.figma.com/design/62kpNAD4oCUv20J5ySf0bN/Casaca-Club-%E2%80%93-Wireframes?node-id=0-1), página "Wireframes – Sitio entregado"
- **Documento para entregar:** [`Casaca-Club-Desarrollo-Web.pdf`](Casaca-Club-Desarrollo-Web.pdf)

## Entregables

| Sprint | Consigna | Estado | Dónde está |
| --- | --- | --- | --- |
| 1 | Wireframes de Home, Catálogo y Checkout | Hecho | [`wireframes/`](wireframes/) y Figma |
| 1 | Repositorio Git y estructura `index.html`, `/css`, `/js`, `/assets` | Hecho | [`casaca-club-sprint2/`](../casaca-club-sprint2/) |
| 1 | Estructura HTML5 semántica (`header`, `nav`, `main`, `section`, `article`, `footer`) | Hecho | `casaca-club-sprint2/index.html` |
| 2 | CSS responsive con Flexbox y CSS Grid, sin frameworks | Hecho | `casaca-club-sprint2/css/style.css` |
| 2 | Catálogo `productos.json` (`id`, `nombre`, `descripcion`, `precio_simulado`, `imagen_ia_url`, `categoria`) | Hecho | `casaca-club-sprint2/productos.json` |
| 2 | Pruebas de usabilidad responsive | Hecho | [`capturas-responsive/`](capturas-responsive/) |
| 2 | Cláusula Habeas Data y licencia en el sitio | Hecho | Sección `#privacidad`, footer y `LICENSE` |

## Estructura del sitio

```
casaca-club-sprint2/
├── index.html        Home, catálogo, checkout, política de privacidad y footer
├── css/style.css     Estilos mobile-first con Flexbox, CSS Grid y media queries
├── js/main.js        Menú hamburguesa y checkout simulado (mejora progresiva)
├── productos.json    Catálogo de 6 camisetas generadas con IA
├── assets/img/       Fotos IA de cada camiseta (frente y espalda)
└── LICENSE           GNU GPL v3.0
```

## Catálogo (`productos.json`)

| id | Nombre | Categoría | Precio simulado |
| --- | --- | --- | --- |
| 1 | Camiseta Albiceleste Eco-Edition | Selecciones Clásicas | $32.900 |
| 2 | Camiseta Amarilla Canarinha Reciclada | Selecciones Clásicas | $31.500 |
| 3 | Camiseta Azul Imperio Retro Sostenible | Retro Sostenible | $28.900 |
| 4 | Camiseta Blanca Águila Retro Sostenible | Retro Sostenible | $27.400 |
| 5 | Camiseta Tricolor Bleu Edición Especial | Edición Especial | $34.200 |
| 6 | Camiseta Samurái Azul Eco-Performance | Edición Especial | $36.700 |

Cada producto incluye además `imagen_ia_url_espalda`, con la foto de la espalda que se muestra al pasar el mouse.

## Carpetas de esta documentación

- [`wireframes/`](wireframes/): wireframes de baja fidelidad (escritorio y móvil) y descripción de cada pantalla. En `wireframes/prototipo-react/` están los diseños anteriores del prototipo en React.
- [`capturas-responsive/`](capturas-responsive/): capturas en móvil, tablet y escritorio, con el informe de las pruebas.

## Aclaraciones

- **Prototipo en React:** la raíz del repositorio contiene también un prototipo en React, Vite y Tailwind, que se conserva completo en la rama `prototipo-react`. No forma parte de la entrega, porque la consigna pide no usar frameworks.
- **Versión del Sprint 1:** no hay una copia separada del `index.html` "solo HTML" del Sprint 1. La estructura semántica de ese sprint es la misma del `index.html` actual, al que en el Sprint 2 se le sumaron la hoja de estilos y el script.
