import { BrowserRouter } from "react-router-dom";
import MobileBottomNav from "@/polymet/components/mobile-bottom-nav";

export default function MobileBottomNavRender() {
  return (
    <BrowserRouter>
      <div className="relative min-h-[500px] max-w-sm bg-background">
        <div className="p-6 text-sm text-muted-foreground">
          Contenido de la página...
        </div>
        <MobileBottomNav cartCount={2} onCartClick={() => {}} />
      </div>
    </BrowserRouter>
  );
}
