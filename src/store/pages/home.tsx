import { useState } from "react";
import HeroBanner from "@/store/components/hero-banner";
import JerseyGrid from "@/store/components/jersey-grid";
import JerseyDetailModal from "@/store/components/jersey-detail-modal";
import { Jersey } from "@/store/data/jerseys-data";
import { useJerseys } from "@/store/data/use-jerseys";
import { useCart } from "@/store/data/cart-context";

export default function HomePage() {
  const { jerseys, loading, error } = useJerseys();
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

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">Cargando catálogo…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4 text-center">
        <p className="text-sm text-destructive">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-14 pb-14 sm:gap-20">
      <HeroBanner jerseys={jerseys} />

      <div className="px-4 sm:px-6">
        <JerseyGrid
          jerseys={jerseys}
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
