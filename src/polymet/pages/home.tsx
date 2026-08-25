import { useState } from "react";
import HeroBanner from "@/polymet/components/hero-banner";
import JerseyGrid from "@/polymet/components/jersey-grid";
import JerseyDetailModal from "@/polymet/components/jersey-detail-modal";
import { JERSEYS, Jersey } from "@/polymet/data/jerseys-data";
import { useCart } from "@/polymet/data/cart-context";

export default function HomePage() {
  const [edition, setEdition] = useState("all");
  const [size, setSize] = useState("all");
  const [sort, setSort] = useState("relevance");
  const [selectedJersey, setSelectedJersey] = useState<Jersey | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { addItem } = useCart();

  const handleSelectJersey = (jersey: Jersey) => {
    setSelectedJersey(jersey);
    setModalOpen(true);
  };

  const handleQuickAdd = (jersey: Jersey) => {
    const firstAvailable = jersey.sizes.find((s) => s.inStock);
    if (!firstAvailable) return;
    addItem({
      jersey,
      size: firstAvailable.size,
      versionId: "hincha",
      quantity: 1,
    });
  };

  return (
    <div className="flex flex-col gap-14 pb-14 sm:gap-20">
      <HeroBanner />

      <div className="px-4 sm:px-6">
        <JerseyGrid
          jerseys={JERSEYS}
          edition={edition}
          onEditionChange={setEdition}
          size={size}
          onSizeChange={setSize}
          sort={sort}
          onSortChange={setSort}
          onSelectJersey={handleSelectJersey}
          onAddToCart={handleQuickAdd}
        />
      </div>

      <JerseyDetailModal
        jersey={selectedJersey}
        open={modalOpen}
        onOpenChange={setModalOpen}
        onAddToCart={(jersey, size, versionId, quantity) => {
          addItem({ jersey, size, versionId, quantity });
          setModalOpen(false);
        }}
        onBuyNow={(jersey, size, versionId, quantity) => {
          addItem({ jersey, size, versionId, quantity });
          setModalOpen(false);
        }}
      />
    </div>
  );
}
