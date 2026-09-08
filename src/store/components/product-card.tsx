import { useState } from "react";
import { ShoppingBagIcon, CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product, STOCK_LABEL } from "@/store/data/products-data";
import { formatPrice } from "@/store/data/cart-context";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({
  product,
  onSelect,
  onAddToCart,
}: ProductCardProps) {
  const [justAdded, setJustAdded] = useState(false);
  const isOutOfStock = product.stock === "out_of_stock";

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock || justAdded) return;
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(product)}
      onKeyDown={(e) => {
        if (e.key === "Enter") onSelect(product);
      }}
      className="group flex flex-col cursor-pointer outline-none"
    >
      <div className="relative overflow-hidden rounded-lg bg-secondary aspect-[4/5]">
        <img
          src={product.images[0]}
          alt={product.name}
          className={cn(
            "h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110",
            isOutOfStock && "opacity-60 grayscale-[0.3]"
          )}
        />

        <div className="absolute left-3 top-3">
          <Badge
            variant={product.stock === "low_stock" ? "destructive" : "secondary"}
            className={cn(
              "border-0 text-[11px] font-medium shadow-sm",
              product.stock === "in_stock" &&
                "bg-card/90 text-foreground backdrop-blur-sm",
              product.stock === "out_of_stock" &&
                "bg-muted text-muted-foreground"
            )}
          >
            {STOCK_LABEL[product.stock]}
          </Badge>
        </div>

        {product.compareAtPrice && (
          <div className="absolute right-3 top-3">
            <Badge className="border-0 bg-primary text-primary-foreground text-[11px] font-medium shadow-sm">
              Oferta
            </Badge>
          </div>
        )}

        <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Button
            size="sm"
            disabled={isOutOfStock}
            onClick={handleAdd}
            className="w-full gap-1.5 shadow-md"
          >
            {justAdded ? (
              <>
                <CheckIcon className="h-4 w-4" />
                Añadido
              </>
            ) : (
              <>
                <ShoppingBagIcon className="h-4 w-4" />
                {isOutOfStock ? "Agotado" : "Añadir al carrito"}
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-0.5">
        <span className="text-xs uppercase tracking-wide text-muted-foreground">
          {product.category}
        </span>
        <h3 className="font-medium leading-snug text-foreground">
          {product.name}
        </h3>
        <div className="mt-1 flex items-center gap-2">
          <span className="font-semibold text-foreground">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
