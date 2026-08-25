import { Product, CATEGORIES } from "@/polymet/data/products-data";
import ProductCard from "@/polymet/components/product-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  products: Product[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductGrid({
  products,
  activeCategory,
  onCategoryChange,
  onSelectProduct,
  onAddToCart,
}: ProductGridProps) {
  return (
    <section id="catalogo" className="mx-auto max-w-7xl">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Catálogo
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Piezas seleccionadas y hechas en pequeños lotes.
          </p>
        </div>

        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          {CATEGORIES.map((cat) => (
            <Button
              key={cat.id}
              size="sm"
              variant={activeCategory === cat.id ? "default" : "outline"}
              onClick={() => onCategoryChange(cat.id)}
              className={cn(
                "shrink-0 rounded-full",
                activeCategory !== cat.id && "bg-card"
              )}
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border py-24 text-center">
          <p className="font-medium text-foreground">
            No encontramos productos en esta categoría
          </p>
          <p className="text-sm text-muted-foreground">
            Probá con otra categoría del catálogo.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </section>
  );
}
