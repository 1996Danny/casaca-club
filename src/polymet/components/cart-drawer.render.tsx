import { useState } from "react";
import CartDrawer from "@/polymet/components/cart-drawer";
import { PRODUCTS } from "@/polymet/data/products-data";
import { CartLine } from "@/polymet/data/cart-context";
import { Button } from "@/components/ui/button";

export default function CartDrawerRender() {
  const [open, setOpen] = useState(true);
  const [lines, setLines] = useState<CartLine[]>([
    { product: PRODUCTS[0], quantity: 1 },
    { product: PRODUCTS[2], quantity: 2 },
  ]);

  const subtotal = lines.reduce(
    (sum, l) => sum + l.product.price * l.quantity,
    0
  );

  return (
    <div className="flex min-h-[600px] items-center justify-center gap-4 bg-background p-8">
      <Button onClick={() => setOpen(true)}>Abrir carrito</Button>
      <Button variant="outline" onClick={() => setLines([])}>
        Vaciar carrito
      </Button>
      <CartDrawer
        open={open}
        onOpenChange={setOpen}
        lines={lines}
        subtotal={subtotal}
        onUpdateQuantity={(id, qty) =>
          setLines((prev) =>
            qty <= 0
              ? prev.filter((l) => l.product.id !== id)
              : prev.map((l) =>
                  l.product.id === id ? { ...l, quantity: qty } : l
                )
          )
        }
        onRemove={(id) =>
          setLines((prev) => prev.filter((l) => l.product.id !== id))
        }
        onCheckout={() => {}}
      />
    </div>
  );
}
