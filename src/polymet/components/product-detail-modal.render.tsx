import { useState } from "react";
import ProductDetailModal from "@/polymet/components/product-detail-modal";
import { PRODUCTS } from "@/polymet/data/products-data";
import { Button } from "@/components/ui/button";

export default function ProductDetailModalRender() {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex min-h-[600px] items-center justify-center bg-background p-8">
      <Button onClick={() => setOpen(true)}>Abrir producto</Button>
      <ProductDetailModal
        product={PRODUCTS[0]}
        open={open}
        onOpenChange={setOpen}
        onAddToCart={() => {}}
        onBuyNow={() => {}}
      />
    </div>
  );
}
