export type Confederation = "conmebol" | "uefa" | "resto";
export type Edition = "titular" | "suplente" | "retro";
export type SizeCode = "S" | "M" | "L" | "XL" | "XXL";
export type VersionId = "hincha" | "jugador";

export interface JerseyVersion {
  id: VersionId;
  label: string;
  priceDelta: number;
  description: string;
}

export interface SizeAvailability {
  size: SizeCode;
  inStock: boolean;
}

export interface Jersey {
  id: string;
  nation: string;
  flag: string;
  confederation: Confederation;
  edition: Edition;
  season: string;
  price: number;
  compareAtPrice?: number;
  isNew?: boolean;
  isSpecialEdition?: boolean;
  description: string;
  details: string[];
  images: {
    front: string;
    back: string;
  };
  versions: JerseyVersion[];
  sizes: SizeAvailability[];
  stockLevel: "in_stock" | "low_stock" | "out_of_stock";
}

export const CONFEDERATIONS: { id: Confederation | "all" | "retro"; label: string }[] = [
  { id: "all", label: "Todas" },
  { id: "conmebol", label: "CONMEBOL" },
  { id: "uefa", label: "UEFA" },
  { id: "resto", label: "Resto del Mundo" },
  { id: "retro", label: "Ediciones Retro" },
];

export const EDITIONS: { id: Edition; label: string }[] = [
  { id: "titular", label: "Titular" },
  { id: "suplente", label: "Suplente" },
  { id: "retro", label: "Retro" },
];

export const SIZES: SizeCode[] = ["S", "M", "L", "XL", "XXL"];

export const STOCK_LABEL: Record<Jersey["stockLevel"], string> = {
  in_stock: "En stock",
  low_stock: "¡Pocas unidades!",
  out_of_stock: "Agotado",
};

const VERSIONS_DEFAULT: JerseyVersion[] = [
  {
    id: "hincha",
    label: "Versión Hincha",
    priceDelta: 0,
    description: "Corte clásico, tela liviana ideal para uso diario.",
  },
  {
    id: "jugador",
    label: "Versión Jugador",
    priceDelta: 25000,
    description: "Corte ajustado, tela técnica de competición.",
  },
];

function sizes(pattern: Partial<Record<SizeCode, boolean>>): SizeAvailability[] {
  return SIZES.map((size) => ({ size, inStock: pattern[size] ?? true }));
}

export const JERSEYS: Jersey[] = [
  {
    id: "arg-titular-2024",
    nation: "Argentina",
    flag: "https://flagcdn.com/w80/ar.png",
    confederation: "conmebol",
    edition: "titular",
    season: "2024/25",
    price: 129900,
    compareAtPrice: 149900,
    isNew: true,
    description:
      "Camiseta titular de la Selección Argentina, temporada 2024/25. Rayas verticales celeste y blanco, tejido transpirable de alto rendimiento.",
    details: [
      "Tejido técnico transpirable",
      "Escudo bordado en el pecho",
      "Corte regular unisex",
      "Producto con licencia oficial",
    ],
    images: {
      front:
        "https://v3b.fal.media/files/b/0aa7cbfa/VvC-8S6O0dHURHM-dKB_g_CcWCaNgc.jpg",
      back:
        "https://v3b.fal.media/files/b/0aa7cbfa/jY3PPzMrqqGrAnvZ0GFLx_br6iK7g6.jpg",
    },
    versions: VERSIONS_DEFAULT,
    sizes: sizes({}),
    stockLevel: "in_stock",
  },
  {
    id: "bra-titular-2024",
    nation: "Brasil",
    flag: "https://flagcdn.com/w80/br.png",
    confederation: "conmebol",
    edition: "titular",
    season: "2024/25",
    price: 129900,
    isNew: true,
    description:
      "Camiseta titular de la Selección de Brasil, amarilla clásica con detalles verdes. Confeccionada en tejido de secado rápido.",
    details: [
      "Tejido de secado rápido",
      "Escudo bordado en el pecho",
      "Corte regular unisex",
      "Producto con licencia oficial",
    ],
    images: {
      front:
        "https://v3b.fal.media/files/b/0aa7cc0f/YEFzqVGXJz6YUokjx4rgB_so9oIcn8.jpg",
      back:
        "https://v3b.fal.media/files/b/0aa7cc0f/4IIuoQ9Es4Xjighzz3Sn3_5CsMKa30.jpg",
    },
    versions: VERSIONS_DEFAULT,
    sizes: sizes({ XXL: false }),
    stockLevel: "low_stock",
  },
  {
    id: "fra-suplente-2024",
    nation: "Francia",
    flag: "https://flagcdn.com/w80/fr.png",
    confederation: "uefa",
    edition: "suplente",
    season: "2024/25",
    price: 124900,
    description:
      "Camiseta suplente de la Selección de Francia, blanca con acentos geométricos en azul y rojo. Diseño minimalista de alto contraste.",
    details: [
      "Tejido liviano de doble capa",
      "Acabado geométrico en hombros",
      "Corte regular unisex",
      "Producto con licencia oficial",
    ],
    images: {
      front:
        "https://v3b.fal.media/files/b/0aa7cbfa/WeLfnuhT7WYQoObTjW2Ur_A5SMhaDa.jpg",
      back:
        "https://v3b.fal.media/files/b/0aa7cbfb/NZhqJJO3jtgLo9FkykvPG_xMCBTuxw.jpg",
    },
    versions: VERSIONS_DEFAULT,
    sizes: sizes({}),
    stockLevel: "in_stock",
  },
  {
    id: "jpn-titular-2024",
    nation: "Japón",
    flag: "https://flagcdn.com/w80/jp.png",
    confederation: "resto",
    edition: "titular",
    season: "2024/25",
    price: 119900,
    description:
      "Camiseta titular de la Selección de Japón, azul marino con estampado geométrico rojo inspirado en el sol naciente.",
    details: [
      "Tejido técnico transpirable",
      "Estampado geométrico de alto impacto",
      "Corte regular unisex",
      "Producto con licencia oficial",
    ],
    images: {
      front:
        "https://v3b.fal.media/files/b/0aa7cbfb/Q-6L_CNPux5oCUoLRqL1x_cBQ4q9fz.jpg",
      back:
        "https://v3b.fal.media/files/b/0aa7cbfb/GLtjxFMT-W5dFBCwB6GMn_rhvFsZYq.jpg",
    },
    versions: VERSIONS_DEFAULT,
    sizes: sizes({ S: false }),
    stockLevel: "in_stock",
  },
  {
    id: "ale-retro-1990",
    nation: "Alemania",
    flag: "https://flagcdn.com/w80/de.png",
    confederation: "uefa",
    edition: "retro",
    season: "Retro 1990",
    price: 149900,
    compareAtPrice: 169900,
    isSpecialEdition: true,
    description:
      "Edición retro conmemorativa de Alemania 1990. Blanca con detalles en negro, rojo y dorado, tejido con textura vintage.",
    details: [
      "Edición especial conmemorativa",
      "Tejido con textura vintage",
      "Escudo bordado clásico",
      "Tirada limitada",
    ],
    images: {
      front:
        "https://v3b.fal.media/files/b/0aa7cbfd/SNFziFcJXSdWAFU5agGwb_9cT1LM9v.jpg",
      back:
        "https://v3b.fal.media/files/b/0aa7cbfd/2ckjYFBmooBaFPWf6vEk__Bc8gLwzU.jpg",
    },
    versions: VERSIONS_DEFAULT,
    sizes: sizes({ S: false, XXL: false }),
    stockLevel: "low_stock",
  },
  {
    id: "ita-retro-1994",
    nation: "Italia",
    flag: "https://flagcdn.com/w80/it.png",
    confederation: "uefa",
    edition: "retro",
    season: "Retro 1994",
    price: 149900,
    isSpecialEdition: true,
    description:
      "Edición retro conmemorativa de Italia 1994. Azzurra clásica con cuello blanco, tejido con textura vintage y escudo clásico.",
    details: [
      "Edición especial conmemorativa",
      "Tejido con textura vintage",
      "Escudo bordado clásico",
      "Tirada limitada",
    ],
    images: {
      front:
        "https://v3b.fal.media/files/b/0aa7cbfd/fRBO1kWksWYAgcd2DPs-I_mu9cujNI.jpg",
      back:
        "https://v3b.fal.media/files/b/0aa7cc12/BPPn2HM25rQ1Q1DXPD4-G_wEcMIXV0.jpg",
    },
    versions: VERSIONS_DEFAULT,
    sizes: sizes({ M: false }),
    stockLevel: "low_stock",
  },
  {
    id: "mex-titular-2024",
    nation: "México",
    flag: "https://flagcdn.com/w80/mx.png",
    confederation: "resto",
    edition: "titular",
    season: "2024/25",
    price: 119900,
    description:
      "Camiseta titular de la Selección de México, verde con detalles rojos y blancos. Tejido transpirable de alto rendimiento.",
    details: [
      "Tejido técnico transpirable",
      "Escudo bordado en el pecho",
      "Corte regular unisex",
      "Producto con licencia oficial",
    ],
    images: {
      front:
        "https://v3b.fal.media/files/b/0aa7cbfd/KvVN5pX6bLbBN8reC3dz9_E6EU7PUk.jpg",
      back:
        "https://v3b.fal.media/files/b/0aa7cc12/T_4Lzb3I8RM1vo4AdQ8-P_lC9B1KRt.jpg",
    },
    versions: VERSIONS_DEFAULT,
    sizes: sizes({}),
    stockLevel: "in_stock",
  },
  {
    id: "esp-suplente-2024",
    nation: "España",
    flag: "https://flagcdn.com/w80/es.png",
    confederation: "uefa",
    edition: "suplente",
    season: "2024/25",
    price: 124900,
    description:
      "Camiseta suplente de la Selección de España, negra con acentos rojos y dorados. Un diseño elegante y de alto contraste.",
    details: [
      "Tejido liviano de doble capa",
      "Acentos laterales de alto contraste",
      "Corte regular unisex",
      "Producto con licencia oficial",
    ],
    images: {
      front:
        "https://v3b.fal.media/files/b/0aa7cbfd/Of0xslf4cZF3h9key3RLD_I9sT00n5.jpg",
      back:
        "https://v3b.fal.media/files/b/0aa7cbfd/uLXcS57IHkei0mvSzIVxT_eaJ97DtN.jpg",
    },
    versions: VERSIONS_DEFAULT,
    sizes: sizes({ XL: false, XXL: false }),
    stockLevel: "out_of_stock",
  },
];
