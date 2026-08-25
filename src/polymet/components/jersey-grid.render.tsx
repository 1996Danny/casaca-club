import { useState } from "react";
import JerseyGrid from "@/polymet/components/jersey-grid";
import { JERSEYS } from "@/polymet/data/jerseys-data";

export default function JerseyGridRender() {
  const [edition, setEdition] = useState("all");
  const [size, setSize] = useState("all");
  const [sort, setSort] = useState("relevance");

  return (
    <div className="bg-background p-8 dark">
      <JerseyGrid
        jerseys={JERSEYS}
        edition={edition}
        onEditionChange={setEdition}
        size={size}
        onSizeChange={setSize}
        sort={sort}
        onSortChange={setSort}
        onSelectJersey={() => {}}
        onAddToCart={() => {}}
      />
    </div>
  );
}
