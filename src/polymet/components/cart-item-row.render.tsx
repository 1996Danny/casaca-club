import CartItemRow from "@/polymet/components/cart-item-row";
import { PRODUCTS } from "@/polymet/data/products-data";

export default function CartItemRowRender() {
  return (
    <div className="flex max-w-sm flex-col gap-4 bg-background p-6">
      <CartItemRow
        line={{ product: PRODUCTS[0], quantity: 2 }}
        onUpdateQuantity={() => {}}
        onRemove={() => {}}
      />
      <CartItemRow
        line={{ product: PRODUCTS[1], quantity: 1 }}
        onUpdateQuantity={() => {}}
        onRemove={() => {}}
      />
    </div>
  );
}
