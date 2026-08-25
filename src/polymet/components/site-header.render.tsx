import { BrowserRouter } from "react-router-dom";
import SiteHeader from "@/polymet/components/site-header";

export default function SiteHeaderRender() {
  return (
    <BrowserRouter>
      <div className="bg-background">
        <SiteHeader cartCount={3} onCartClick={() => {}} />
        <div className="p-10 text-sm text-muted-foreground">
          Contenido de la página...
        </div>
      </div>
    </BrowserRouter>
  );
}
