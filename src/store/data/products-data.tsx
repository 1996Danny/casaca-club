export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  description: string;
  details: string[];
  stock: "in_stock" | "low_stock" | "out_of_stock";
  images: string[];
}

export const CATEGORIES = [
  { id: "all", label: "Todo" },
  { id: "vestidos", label: "Vestidos" },
  { id: "accesorios", label: "Accesorios" },
  { id: "calzado", label: "Calzado" },
  { id: "textiles", label: "Textiles" },
] as const;

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Vestido Lino Habana",
    category: "vestidos",
    price: 89900,
    compareAtPrice: 109900,
    description:
      "Vestido midi de lino natural con corte relajado y cinturón anudado. Confeccionado en pequeños lotes por costureras locales.",
    details: [
      "100% lino natural",
      "Corte relajado, largo midi",
      "Lavado a mano recomendado",
      "Hecho en pequeños lotes",
    ],
    stock: "in_stock",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "p2",
    name: "Bolso Artesanal Rafia",
    category: "accesorios",
    price: 54900,
    description:
      "Bolso tejido a mano en rafia natural con asas de cuero vegetal. Pieza única, ideal para el día a día.",
    details: [
      "Tejido a mano en rafia",
      "Asas de cuero vegetal",
      "Interior forrado en algodón",
      "Pieza única — pequeño lote",
    ],
    stock: "low_stock",
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "p3",
    name: "Sandalias Cuero Terra",
    category: "calzado",
    price: 74900,
    description:
      "Sandalias de cuero curtido vegetal con plantilla anatómica y suela de goma natural. Comodidad y estilo artesanal.",
    details: [
      "Cuero curtido vegetal",
      "Plantilla anatómica acolchada",
      "Suela de goma natural antideslizante",
      "Disponible en tallas 35–41",
    ],
    stock: "in_stock",
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "p4",
    name: "Pañuelo Seda Ocre",
    category: "accesorios",
    price: 32900,
    description:
      "Pañuelo de seda pura estampado a mano con motivos botánicos en tonos tierra. Acabado en dobladillo enrollado.",
    details: [
      "100% seda natural",
      "Estampado artesanal a mano",
      "70 x 70 cm",
      "Dobladillo enrollado a mano",
    ],
    stock: "in_stock",
    images: [
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601924921557-45e6dea0f157?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "p5",
    name: "Vestido Algodón Arcilla",
    category: "vestidos",
    price: 79900,
    description:
      "Vestido camisero de algodón orgánico teñido con pigmentos naturales. Botonadura frontal completa y bolsillos laterales.",
    details: [
      "Algodón orgánico certificado",
      "Teñido con pigmentos naturales",
      "Botonadura frontal, bolsillos laterales",
      "Corte regular",
    ],
    stock: "low_stock",
    images: [
      "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1554568218-0f1715e72254?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "p6",
    name: "Manta Alpaca Natural",
    category: "textiles",
    price: 128900,
    description:
      "Manta tejida en fibra de alpaca 100% natural, sin teñir. Suave, cálida y liviana, tejida en telar tradicional.",
    details: [
      "100% fibra de alpaca",
      "Sin teñir — color natural",
      "130 x 180 cm",
      "Tejida en telar tradicional",
    ],
    stock: "in_stock",
    images: [
      "https://images.unsplash.com/photo-1600369671236-e74521d4b6ad?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616627981814-8a58ba03332a?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "p7",
    name: "Aretes Latón Luna",
    category: "accesorios",
    price: 28900,
    description:
      "Aretes de latón bañado en oro con forma de luna creciente, hechos a mano por orfebres locales.",
    details: [
      "Latón bañado en oro 18k",
      "Hechos a mano",
      "Cierre de gancho hipoalergénico",
      "3.2 cm de largo",
    ],
    stock: "in_stock",
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620656798579-1984d9e87df7?q=80&w=1200&auto=format&fit=crop",
    ],
  },
  {
    id: "p8",
    name: "Alpargatas Trenzadas",
    category: "calzado",
    price: 45900,
    compareAtPrice: 59900,
    description:
      "Alpargatas de yute trenzado con lona de algodón resistente. Ligeras y frescas, perfectas para el verano.",
    details: [
      "Suela de yute trenzado",
      "Lona de algodón resistente",
      "Ligeras y transpirables",
      "Disponible en tallas 36–43",
    ],
    stock: "out_of_stock",
    images: [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1200&auto=format&fit=crop",
    ],
  },
];

export const STOCK_LABEL: Record<Product["stock"], string> = {
  in_stock: "En stock",
  low_stock: "Últimas unidades",
  out_of_stock: "Agotado",
};
