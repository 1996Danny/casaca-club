import { useState } from "react";
import CartDrawer from "@/polymet/components/cart-drawer";
import { JERSEYS } from "@/polymet/data/jerseys-data";
import { CartLine, getUnitPrice } from "@/polymet/data/cart-context";
import { Button } from "@/components/ui/button";

export default function CartDrawerRender() {
  const [open, setOpen] = useState(true);
  const [lines, setLines] = useState<CartLine[]>([
    {
      lineId: "1",
      jersey: JERSEYS[0],
      size: "M",
      versionId: "hincha",
      quantity: 1,
    },
    {
      lineId: "2",
      jersey: JERSEYS[4],
      size: "L",
      versionId: "jugador",
      quantity: 2,
    },
  ]);

  const subtotal = lines.reduce(
    (sum, l) => sum + getUnitPrice(l.jersey, l.versionId) * l.quantity,
    0
  );

  return (
    <div className="dark flex min-h-[600px] items-center justify-center gap-4 bg-background p-8">
      <Button onClick={() => setOpen(true)}>Abrir carrito</Button>
      <Button variant="outline" onClick={() => setLines([])}>
        Vaciar carrito
      </Button>
      <CartDrawer
        open={open}
        onOpenChange={setOpen}
        lines={lines}
        subtotal={subtotal}
        onUpdateQuantity={(lineId, qty) =>
          setLines((prev) =>
            qty <= 0
              ? prev.filter((l) => l.lineId !== lineId)
              : prev.map((l) =>
                  l.lineId === lineId ? { ...l, quantity: qty } : l
                )
          )
        }
        onRemove={(lineId) =>
          setLines((prev) => prev.filter((l) => l.lineId !== lineId))
        }
        onCheckout={() => {}}
      />
    </div>
  );
}
