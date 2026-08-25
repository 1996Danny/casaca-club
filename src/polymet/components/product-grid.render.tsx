import { useState } from "react";
import ProductGrid from "@/polymet/components/product-grid";
import { PRODUCTS, Product } from "@/polymet/data/products-data";

export default function ProductGridRender() {
  const [category, setCategory] = useState("all");
  const filtered =
    category === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === category);

  return (
    <div className="bg-background p-8">
      <ProductGrid
        products={filtered}
        activeCategory={category}
        onCategoryChange={setCategory}
        onSelectProduct={() => {}}
        onAddToCart={() => {}}
      />
    </div>
  );
}
