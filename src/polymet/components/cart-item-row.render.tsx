import CartItemRow from "@/polymet/components/cart-item-row";
import { JERSEYS } from "@/polymet/data/jerseys-data";

export default function CartItemRowRender() {
  return (
    <div className="dark flex max-w-sm flex-col gap-4 bg-background p-6">
      <CartItemRow
        line={{
          lineId: "1",
          jersey: JERSEYS[0],
          size: "M",
          versionId: "hincha",
          quantity: 2,
        }}
        onUpdateQuantity={() => {}}
        onRemove={() => {}}
      />
      <CartItemRow
        line={{
          lineId: "2",
          jersey: JERSEYS[4],
          size: "L",
          versionId: "jugador",
          quantity: 1,
        }}
        onUpdateQuantity={() => {}}
        onRemove={() => {}}
      />
    </div>
  );
}
