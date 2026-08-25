import { useState } from "react";
import HeroBanner from "@/polymet/components/hero-banner";
import ProductGrid from "@/polymet/components/product-grid";
import ProductDetailModal from "@/polymet/components/product-detail-modal";
import { PRODUCTS, Product } from "@/polymet/data/products-data";
import { useCart } from "@/polymet/data/cart-context";

export default function HomePage() {
  const [category, setCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { addItem } = useCart();

  const filteredProducts =
    category === "all"
      ? PRODUCTS
      : PRODUCTS.filter((product) => product.category === category);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-14 pb-14 sm:gap-20">
      <HeroBanner />

      <div className="px-4 sm:px-6">
        <ProductGrid
          products={filteredProducts}
          activeCategory={category}
          onCategoryChange={setCategory}
          onSelectProduct={handleSelectProduct}
          onAddToCart={(product) => addItem(product, 1)}
        />
      </div>

      <ProductDetailModal
        product={selectedProduct}
        open={modalOpen}
        onOpenChange={setModalOpen}
        onAddToCart={(product, quantity) => {
          addItem(product, quantity);
          setModalOpen(false);
        }}
        onBuyNow={(product, quantity) => {
          addItem(product, quantity);
          setModalOpen(false);
        }}
      />
    </div>
  );
}
