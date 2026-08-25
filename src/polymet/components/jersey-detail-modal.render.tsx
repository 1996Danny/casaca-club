import { useState } from "react";
import JerseyDetailModal from "@/polymet/components/jersey-detail-modal";
import { JERSEYS } from "@/polymet/data/jerseys-data";
import { Button } from "@/components/ui/button";

export default function JerseyDetailModalRender() {
  const [open, setOpen] = useState(true);

  return (
    <div className="dark flex min-h-[700px] items-center justify-center bg-background p-8">
      <Button onClick={() => setOpen(true)}>Abrir camiseta</Button>
      <JerseyDetailModal
        jersey={JERSEYS[4]}
        open={open}
        onOpenChange={setOpen}
        onAddToCart={() => {}}
        onBuyNow={() => {}}
      />
    </div>
  );
}
