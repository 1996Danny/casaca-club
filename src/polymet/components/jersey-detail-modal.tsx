import { useEffect, useState } from "react";
import { MinusIcon, PlusIcon, ShoppingBagIcon, ZapIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Jersey,
  SizeCode,
  VersionId,
  STOCK_LABEL,
} from "@/polymet/data/jerseys-data";
import { formatPrice, getUnitPrice } from "@/polymet/data/cart-context";
import { cn } from "@/lib/utils";

interface JerseyDetailModalProps {
  jersey: Jersey | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddToCart: (
    jersey: Jersey,
    size: SizeCode,
    versionId: VersionId,
    quantity: number
  ) => void;
  onBuyNow: (
    jersey: Jersey,
    size: SizeCode,
    versionId: VersionId,
    quantity: number
  ) => void;
}

const EDITION_LABEL: Record<Jersey["edition"], string> = {
  titular: "Titular",
  suplente: "Suplente",
  retro: "Retro",
};

export default function JerseyDetailModal({
  jersey,
  open,
  onOpenChange,
  onAddToCart,
  onBuyNow,
}: JerseyDetailModalProps) {
  const [activeImage, setActiveImage] = useState<"front" | "back">("front");
  const [size, setSize] = useState<SizeCode | null>(null);
  const [versionId, setVersionId] = useState<VersionId>("hincha");
  const [quantity, setQuantity] = useState(1);
  const [loadingAction, setLoadingAction] = useState<"cart" | "buy" | null>(
    null
  );

  useEffect(() => {
    if (open && jersey) {
      setActiveImage("front");
      setQuantity(1);
      setVersionId("hincha");
      setLoadingAction(null);
      const firstAvailable = jersey.sizes.find((s) => s.inStock);
      setSize(firstAvailable ? firstAvailable.size : null);
    }
  }, [open, jersey?.id]);

  if (!jersey) return null;

  const isOutOfStock = jersey.stockLevel === "out_of_stock" || !size;
  const price = getUnitPrice(jersey, versionId);

  const runAction = (kind: "cart" | "buy") => {
    if (isOutOfStock || !size) return;
    setLoadingAction(kind);
    setTimeout(() => {
      if (kind === "cart") onAddToCart(jersey, size, versionId, quantity);
      else onBuyNow(jersey, size, versionId, quantity);
      setLoadingAction(null);
    }, 700);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl gap-0 overflow-hidden p-0 sm:rounded-xl">
        <DialogHeader className="sr-only">
          <DialogTitle>{jersey.nation}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="flex flex-col gap-3 bg-secondary p-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
              <img
                src={jersey.images[activeImage]}
                alt={jersey.nation}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex gap-2">
              {(["front", "back"] as const).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveImage(key)}
                  className={cn(
                    "h-16 w-16 shrink-0 overflow-hidden rounded-md border-2 transition-colors",
                    key === activeImage ? "border-primary" : "border-transparent"
                  )}
                >
                  <img
                    src={jersey.images[key]}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex max-h-[80vh] flex-col overflow-y-auto p-6">
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
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-foreground">
              {jersey.nation}
            </h2>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-xl font-bold text-foreground">
                {formatPrice(price)}
              </span>
              {jersey.compareAtPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(jersey.compareAtPrice)}
                </span>
              )}
              <Badge
                className={cn(
                  "border-0",
                  jersey.stockLevel === "low_stock" &&
                    "bg-destructive text-destructive-foreground",
                  jersey.stockLevel === "in_stock" && "bg-secondary text-foreground",
                  jersey.stockLevel === "out_of_stock" && "bg-muted text-muted-foreground"
                )}
              >
                {STOCK_LABEL[jersey.stockLevel]}
              </Badge>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {jersey.description}
            </p>

            <Separator className="my-4" />

            <div>
              <span className="text-sm font-medium text-foreground">
                Versión
              </span>
              <div className="mt-2 flex flex-col gap-2">
                {jersey.versions.map((version) => (
                  <button
                    key={version.id}
                    onClick={() => setVersionId(version.id)}
                    className={cn(
                      "flex items-center justify-between rounded-md border px-3 py-2 text-left transition-colors",
                      versionId === version.id
                        ? "border-primary bg-primary/10"
                        : "border-border hover:bg-secondary"
                    )}
                  >
                    <span>
                      <span className="block text-sm font-medium text-foreground">
                        {version.label}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        {version.description}
                      </span>
                    </span>
                    {version.priceDelta > 0 && (
                      <span className="text-xs font-semibold text-primary">
                        +{formatPrice(version.priceDelta)}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <span className="text-sm font-medium text-foreground">
                Talle
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {jersey.sizes.map((s) => (
                  <button
                    key={s.size}
                    disabled={!s.inStock}
                    onClick={() => setSize(s.size)}
                    className={cn(
                      "flex h-10 w-12 items-center justify-center rounded-md border text-sm font-semibold transition-colors",
                      !s.inStock &&
                        "cursor-not-allowed border-border text-muted-foreground/40 line-through",
                      s.inStock &&
                        size === s.size &&
                        "border-primary bg-primary text-primary-foreground",
                      s.inStock &&
                        size !== s.size &&
                        "border-border text-foreground hover:border-primary"
                    )}
                  >
                    {s.size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <span className="text-sm font-medium text-foreground">
                Cantidad
              </span>
              <div className="flex items-center rounded-md border border-border">
                <button
                  type="button"
                  disabled={isOutOfStock}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-9 w-9 items-center justify-center text-foreground transition-colors hover:bg-secondary disabled:opacity-40"
                  aria-label="Restar cantidad"
                >
                  <MinusIcon className="h-3.5 w-3.5" />
                </button>
                <span className="w-8 text-center text-sm font-medium tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  disabled={isOutOfStock}
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="flex h-9 w-9 items-center justify-center text-foreground transition-colors hover:bg-secondary disabled:opacity-40"
                  aria-label="Sumar cantidad"
                >
                  <PlusIcon className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="sticky bottom-0 mt-6 flex flex-col gap-2 bg-card pt-2">
              <Button
                size="lg"
                disabled={isOutOfStock || loadingAction !== null}
                onClick={() => runAction("buy")}
                className="gap-2"
              >
                {loadingAction === "buy" ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : (
                  <ZapIcon className="h-4 w-4" />
                )}
                {jersey.stockLevel === "out_of_stock" ? "Agotado" : "Comprar ahora"}
              </Button>
              <Button
                size="lg"
                variant="outline"
                disabled={isOutOfStock || loadingAction !== null}
                onClick={() => runAction("cart")}
                className="gap-2 bg-secondary"
              >
                {loadingAction === "cart" ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : (
                  <ShoppingBagIcon className="h-4 w-4" />
                )}
                Agregar al Carrito
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
