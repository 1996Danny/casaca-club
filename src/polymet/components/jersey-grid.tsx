import { useMemo } from "react";
import { Jersey } from "@/polymet/data/jerseys-data";
import JerseyCard from "@/polymet/components/jersey-card";
import JerseyFilterBar from "@/polymet/components/jersey-filter-bar";

interface JerseyGridProps {
  jerseys: Jersey[];
  edition: string;
  onEditionChange: (value: string) => void;
  size: string;
  onSizeChange: (value: string) => void;
  sort: string;
  onSortChange: (value: string) => void;
  onSelectJersey: (jersey: Jersey) => void;
  onAddToCart: (jersey: Jersey) => void;
}

export default function JerseyGrid({
  jerseys,
  edition,
  onEditionChange,
  size,
  onSizeChange,
  sort,
  onSortChange,
  onSelectJersey,
  onAddToCart,
}: JerseyGridProps) {
  const filtered = useMemo(() => {
    let result = jerseys;

    if (edition !== "all") {
      result = result.filter((j) => j.edition === edition);
    }

    if (size !== "all") {
      result = result.filter((j) =>
        j.sizes.some((s) => s.size === size && s.inStock)
      );
    }

    const sorted = [...result];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "newest")
      sorted.sort((a, b) => Number(b.isNew) - Number(a.isNew));

    return sorted;
  }, [jerseys, edition, size, sort]);

  return (
    <section id="catalogo" className="mx-auto max-w-7xl">
      <div className="mb-6 flex flex-col gap-1">
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Catálogo de Camisetas
        </h2>
        <p className="text-sm text-muted-foreground">
          Selecciones oficiales, ediciones retro y lanzamientos limitados.
        </p>
      </div>

      <div className="mb-8">
        <JerseyFilterBar
          edition={edition}
          onEditionChange={onEditionChange}
          size={size}
          onSizeChange={onSizeChange}
          sort={sort}
          onSortChange={onSortChange}
          resultCount={filtered.length}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border py-24 text-center">
          <p className="font-medium text-foreground">
            No encontramos camisetas con estos filtros
          </p>
          <p className="text-sm text-muted-foreground">
            Probá cambiando la edición o el talle seleccionado.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((jersey) => (
            <JerseyCard
              key={jersey.id}
              jersey={jersey}
              onSelect={onSelectJersey}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </section>
  );
}
