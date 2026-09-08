import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { CartLine, formatPrice, getUnitPrice } from "@/store/data/cart-context";

interface CartItemRowProps {
  line: CartLine;
  onUpdateQuantity: (lineId: string, quantity: number) => void;
  onRemove: (lineId: string) => void;
}

const VERSION_LABEL: Record<string, string> = {
  hincha: "Hincha",
  jugador: "Jugador",
};

export default function CartItemRow({
  line,
  onUpdateQuantity,
  onRemove,
}: CartItemRowProps) {
  const { jersey, size, versionId, quantity, lineId } = line;
  const unitPrice = getUnitPrice(jersey, versionId);

  return (
    <div className="flex gap-3">
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md bg-secondary">
        <img
          src={jersey.images.front}
          alt={jersey.nation}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4 className="text-sm font-semibold leading-snug text-foreground">
              {jersey.nation}
            </h4>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Talle {size} · {VERSION_LABEL[versionId]} ·{" "}
              {formatPrice(unitPrice)} c/u
            </p>
          </div>
          <button
            type="button"
            onClick={() => onRemove(lineId)}
            aria-label={`Eliminar ${jersey.nation}`}
            className="text-muted-foreground transition-colors hover:text-destructive"
          >
            <Trash2Icon className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center rounded-md border border-border">
            <button
              type="button"
              onClick={() => onUpdateQuantity(lineId, quantity - 1)}
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
              onClick={() => onUpdateQuantity(lineId, quantity + 1)}
              className="flex h-7 w-7 items-center justify-center text-foreground transition-colors hover:bg-secondary"
              aria-label="Sumar cantidad"
            >
              <PlusIcon className="h-3 w-3" />
            </button>
          </div>
          <span className="text-sm font-bold text-foreground">
            {formatPrice(unitPrice * quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}
