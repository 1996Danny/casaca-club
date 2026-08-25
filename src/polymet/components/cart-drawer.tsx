import { useState } from "react";
import { ShoppingBagIcon, ShieldCheckIcon, CreditCardIcon, WalletIcon, LayersIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CartItemRow from "@/polymet/components/cart-item-row";
import { CartLine, formatPrice } from "@/polymet/data/cart-context";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lines: CartLine[];
  subtotal: number;
  onUpdateQuantity: (lineId: string, quantity: number) => void;
  onRemove: (lineId: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  open,
  onOpenChange,
  lines,
  subtotal,
  onUpdateQuantity,
  onRemove,
  onCheckout,
}: CartDrawerProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const isEmpty = lines.length === 0;

  const handleCheckout = () => {
    if (isEmpty || isCheckingOut) return;
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      onCheckout();
    }, 900);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border px-6 py-4">
          <SheetTitle className="flex items-center gap-2 text-left text-base">
            <ShoppingBagIcon className="h-4 w-4" />
            Tu carrito ({lines.reduce((n, l) => n + l.quantity, 0)})
          </SheetTitle>
        </SheetHeader>

        {isEmpty ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
              <ShoppingBagIcon className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="font-semibold text-foreground">
              Aún no tienes ninguna camiseta en tu carrito
            </p>
            <p className="text-sm text-muted-foreground">
              Elegí la camiseta de tu selección favorita y sumala al carrito.
            </p>
            <Button
              variant="outline"
              className="mt-2 bg-secondary"
              onClick={() => onOpenChange(false)}
            >
              Explorar Camisetas
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="flex flex-col gap-5">
                {lines.map((line) => (
                  <CartItemRow
                    key={line.lineId}
                    line={line}
                    onUpdateQuantity={onUpdateQuantity}
                    onRemove={onRemove}
                  />
                ))}
              </div>
            </div>

            <div className="border-t border-border bg-card px-6 py-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold text-foreground">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Envío calculado en el siguiente paso.
              </p>

              <Separator className="my-4" />

              <Button
                size="lg"
                className="w-full gap-2 bg-[hsl(var(--mercadopago))] text-[hsl(var(--mercadopago-foreground))] hover:bg-[hsl(var(--mercadopago))]/90"
                disabled={isCheckingOut}
                onClick={handleCheckout}
              >
                {isCheckingOut ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : null}
                Pagar con Mercado Pago
              </Button>

              <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <ShieldCheckIcon className="h-3.5 w-3.5 text-[hsl(var(--mercadopago))]" />
                Pago 100% seguro procesado por Mercado Pago
              </div>

              <div className="mt-3 flex items-center justify-center gap-4 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CreditCardIcon className="h-3.5 w-3.5" />
                  Tarjetas
                </span>
                <span className="flex items-center gap-1">
                  <WalletIcon className="h-3.5 w-3.5" />
                  Dinero en cuenta
                </span>
                <span className="flex items-center gap-1">
                  <LayersIcon className="h-3.5 w-3.5" />
                  Cuotas
                </span>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
