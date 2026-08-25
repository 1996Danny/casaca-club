import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { CartLine, formatPrice } from "@/polymet/data/cart-context";

interface CartItemRowProps {
  line: CartLine;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export default function CartItemRow({
  line,
  onUpdateQuantity,
  onRemove,
}: CartItemRowProps) {
  const { product, quantity } = line;

  return (
    <div className="flex gap-3">
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md bg-secondary">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4 className="text-sm font-medium leading-snug text-foreground">
              {product.name}
            </h4>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {formatPrice(product.price)} c/u
            </p>
          </div>
          <button
            type="button"
            onClick={() => onRemove(product.id)}
            aria-label={`Eliminar ${product.name}`}
            className="text-muted-foreground transition-colors hover:text-destructive"
          >
            <Trash2Icon className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center rounded-md border border-border">
            <button
              type="button"
              onClick={() => onUpdateQuantity(product.id, quantity - 1)}
              className="flex h-7 w-7 items-center justify-center text-foreground transition-colors hover:bg-secondary"
              aria-label="Restar cantidad"
            >
              <MinusIcon className="h-3 w-3" />
            </button>
            <span className="w-6 text-center text-xs font-medium tabular-nums">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => onUpdateQuantity(product.id, quantity + 1)}
              className="flex h-7 w-7 items-center justify-center text-foreground transition-colors hover:bg-secondary"
              aria-label="Sumar cantidad"
            >
              <PlusIcon className="h-3 w-3" />
            </button>
          </div>
          <span className="text-sm font-semibold text-foreground">
            {formatPrice(product.price * quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}
