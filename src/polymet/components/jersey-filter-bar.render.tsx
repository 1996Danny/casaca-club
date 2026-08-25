import { useState } from "react";
import JerseyFilterBar from "@/polymet/components/jersey-filter-bar";

export default function JerseyFilterBarRender() {
  const [edition, setEdition] = useState<string>("all");
  const [size, setSize] = useState<string>("all");
  const [sort, setSort] = useState<string>("relevance");

  return (
    <div className="bg-background p-8 dark">
      <JerseyFilterBar
        edition={edition}
        onEditionChange={setEdition}
        size={size}
        onSizeChange={setSize}
        sort={sort}
        onSortChange={setSort}
        resultCount={8}
      />
    </div>
  );
}
