import { Link, useLocation } from "react-router-dom";
import { HomeIcon, LayoutGridIcon, ShoppingBagIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface MobileBottomNavProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function MobileBottomNav({
  cartCount,
  onCartClick,
}: MobileBottomNavProps) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-md md:hidden">
      <div className="mx-auto flex h-16 max-w-md items-center justify-around px-4">
        <Link
          to="/"
          className={cn(
            "flex flex-col items-center gap-1 text-xs font-medium transition-colors",
            isHome ? "text-primary" : "text-muted-foreground"
          )}
        >
          <HomeIcon className="h-5 w-5" />
          Inicio
        </Link>

        <a
          href="/#catalogo"
          className="flex flex-col items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <LayoutGridIcon className="h-5 w-5" />
          Catálogo
        </a>

        <button
          type="button"
          onClick={onCartClick}
          className="relative flex flex-col items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ShoppingBagIcon className="h-5 w-5" />
          Carrito
          {cartCount > 0 && (
            <Badge className="absolute -right-1 -top-1 h-5 min-w-5 justify-center rounded-full border-0 px-1 text-[11px]">
              {cartCount}
            </Badge>
          )}
        </button>
      </div>
    </nav>
  );
}
