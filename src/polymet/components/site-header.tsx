import { Link } from "react-router-dom";
import { ShoppingBagIcon, MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CATEGORIES } from "@/polymet/data/products-data";

interface SiteHeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function SiteHeader({ cartCount, onCartClick }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          to="/"
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          Terra&nbsp;Boutique
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href={cat.id === "all" ? "/#catalogo" : `/#catalogo?cat=${cat.id}`}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {cat.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={onCartClick}
            aria-label="Abrir carrito"
          >
            <ShoppingBagIcon className="h-5 w-5" />
            {cartCount > 0 && (
              <Badge className="absolute -right-1 -top-1 h-5 min-w-5 justify-center rounded-full border-0 px-1 text-[11px]">
                {cartCount}
              </Badge>
            )}
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menú">
            <MenuIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
