import { useState } from "react";
import { ShoppingBagIcon, CheckIcon, SparklesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Jersey, STOCK_LABEL } from "@/store/data/jerseys-data";
import { formatPrice } from "@/store/data/cart-context";
import { cn } from "@/lib/utils";

interface JerseyCardProps {
  jersey: Jersey;
  onSelect: (jersey: Jersey) => void;
  onAddToCart: (jersey: Jersey) => void;
}

const EDITION_LABEL: Record<Jersey["edition"], string> = {
  titular: "Titular",
  suplente: "Suplente",
  retro: "Retro",
};

export default function JerseyCard({
  jersey,
  onSelect,
  onAddToCart,
}: JerseyCardProps) {
  const [justAdded, setJustAdded] = useState(false);
  const isOutOfStock = jersey.stockLevel === "out_of_stock";

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock || justAdded) return;
    onAddToCart(jersey);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(jersey)}
      onKeyDown={(e) => {
        if (e.key === "Enter") onSelect(jersey);
      }}
      className="group flex flex-col cursor-pointer outline-none"
    >
      <div className="relative overflow-hidden rounded-xl border border-border bg-secondary aspect-[4/5]">
        <img
          src={jersey.images.front}
          alt={`${jersey.nation} - frente`}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
            "opacity-100 group-hover:opacity-0",
            isOutOfStock && "opacity-60 grayscale-[0.4]"
          )}
        />

        <img
          src={jersey.images.back}
          alt={`${jersey.nation} - espalda`}
          className={cn(
            "absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300",
            "group-hover:opacity-100",
            isOutOfStock && "grayscale-[0.4]"
          )}
        />

        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {jersey.isNew && (
            <Badge className="border-0 bg-primary text-primary-foreground text-[11px] font-semibold shadow-sm">
              Nueva Colección
            </Badge>
          )}
          {jersey.isSpecialEdition && (
            <Badge className="gap-1 border-0 bg-chart-5 text-white text-[11px] font-semibold shadow-sm">
              <SparklesIcon className="h-3 w-3" />
              Edición Especial
            </Badge>
          )}
        </div>

        <div className="absolute right-3 top-3">
          <Badge
            className={cn(
              "border-0 text-[11px] font-medium shadow-sm backdrop-blur-sm",
              jersey.stockLevel === "in_stock" && "bg-card/90 text-foreground",
              jersey.stockLevel === "low_stock" && "bg-destructive text-destructive-foreground",
              jersey.stockLevel === "out_of_stock" && "bg-muted text-muted-foreground"
            )}
          >
            {STOCK_LABEL[jersey.stockLevel]}
          </Badge>
        </div>

        <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Button
            size="sm"
            disabled={isOutOfStock}
            onClick={handleAdd}
            className="w-full gap-1.5 shadow-lg"
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
        <div className="flex items-center gap-1.5">
          <img
            src={jersey.flag}
            alt=""
            className="h-3 w-[18px] rounded-[2px] object-cover ring-1 ring-border"
          />

          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {EDITION_LABEL[jersey.edition]} · {jersey.season}
          </span>
        </div>
        <h3 className="font-semibold leading-snug text-foreground">
          {jersey.nation}
        </h3>
        <div className="mt-1 flex items-center gap-2">
          <span className="font-bold text-foreground">
            {formatPrice(jersey.price)}
          </span>
          {jersey.compareAtPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(jersey.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
