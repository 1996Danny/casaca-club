import ProductCard from "@/polymet/components/product-card";
import { PRODUCTS } from "@/polymet/data/products-data";

export default function ProductCardRender() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-8 bg-background max-w-3xl">
      {[PRODUCTS[0], PRODUCTS[1], PRODUCTS[7]].map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onSelect={() => {}}
          onAddToCart={() => {}}
        />
      ))}
    </div>
  );
}
