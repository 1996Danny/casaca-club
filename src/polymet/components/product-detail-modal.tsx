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
import { Product, STOCK_LABEL } from "@/polymet/data/products-data";
import { formatPrice } from "@/polymet/data/cart-context";
import { cn } from "@/lib/utils";

interface ProductDetailModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
}

export default function ProductDetailModal({
  product,
  open,
  onOpenChange,
  onAddToCart,
  onBuyNow,
}: ProductDetailModalProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loadingAction, setLoadingAction] = useState<"cart" | "buy" | null>(
    null
  );

  useEffect(() => {
    if (open) {
      setActiveImage(0);
      setQuantity(1);
      setLoadingAction(null);
    }
  }, [open, product?.id]);

  if (!product) return null;

  const isOutOfStock = product.stock === "out_of_stock";

  const runAction = (kind: "cart" | "buy") => {
    if (isOutOfStock) return;
    setLoadingAction(kind);
    setTimeout(() => {
      if (kind === "cart") onAddToCart(product, quantity);
      else onBuyNow(product, quantity);
      setLoadingAction(null);
    }, 700);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl gap-0 overflow-hidden p-0 sm:rounded-xl">
        <DialogHeader className="sr-only">
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="flex flex-col gap-3 bg-secondary p-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={img}
                    onClick={() => setActiveImage(idx)}
                    className={cn(
                      "h-16 w-16 shrink-0 overflow-hidden rounded-md border-2 transition-colors",
                      idx === activeImage
                        ? "border-primary"
                        : "border-transparent"
                    )}
                  >
                    <img
                      src={img}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex max-h-[80vh] flex-col overflow-y-auto p-6">
            <span className="text-xs uppercase tracking-wide text-muted-foreground">
              {product.category}
            </span>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
              {product.name}
            </h2>

            <div className="mt-3 flex items-center gap-3">
              <span className="text-xl font-semibold text-foreground">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
              <Badge
                variant={
                  product.stock === "low_stock" ? "destructive" : "secondary"
                }
                className="border-0"
              >
                {STOCK_LABEL[product.stock]}
              </Badge>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            <Separator className="my-4" />

            <ul className="flex flex-col gap-1.5 text-sm text-foreground">
              {product.details.map((detail) => (
                <li key={detail} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />

                  {detail}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center gap-3">
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

            <div className="mt-6 flex flex-col gap-2">
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
                {isOutOfStock ? "Agotado" : "Comprar ahora"}
              </Button>
              <Button
                size="lg"
                variant="outline"
                disabled={isOutOfStock || loadingAction !== null}
                onClick={() => runAction("cart")}
                className="gap-2 bg-card"
              >
                {loadingAction === "cart" ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : (
                  <ShoppingBagIcon className="h-4 w-4" />
                )}
                Agregar al carrito
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
