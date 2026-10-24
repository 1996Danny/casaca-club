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

/* El catálogo ya no vive hardcodeado acá: se sirve como JSON estático en
   /productos.json (ver public/productos.json) y se carga en tiempo de
   ejecución con la Fetch API (ver store/data/use-jerseys.ts). Este
   archivo sólo define los tipos y los catálogos auxiliares (filtros,
   etiquetas) que no dependen del catálogo de productos en sí. */
