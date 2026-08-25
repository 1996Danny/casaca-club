import JerseyCard from "@/polymet/components/jersey-card";
import { JERSEYS } from "@/polymet/data/jerseys-data";

export default function JerseyCardRender() {
  return (
    <div className="grid grid-cols-1 gap-6 bg-background p-8 sm:grid-cols-3 dark">
      {[JERSEYS[0], JERSEYS[4], JERSEYS[7]].map((jersey) => (
        <JerseyCard
          key={jersey.id}
          jersey={jersey}
          onSelect={() => {}}
          onAddToCart={() => {}}
        />
      ))}
    </div>
  );
}
