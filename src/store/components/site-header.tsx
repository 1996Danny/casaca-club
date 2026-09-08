import { Link } from "react-router-dom";
import { ShoppingBagIcon, MenuIcon, SearchIcon, ShirtIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CONFEDERATIONS } from "@/store/data/jerseys-data";
import { cn } from "@/lib/utils";

interface SiteHeaderProps {
  cartCount: number;
  onCartClick: () => void;
  activeConfederation?: string;
  onConfederationChange?: (id: string) => void;
}

export default function SiteHeader({
  cartCount,
  onCartClick,
  activeConfederation = "all",
  onConfederationChange,
}: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-extrabold uppercase tracking-tight text-foreground"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <ShirtIcon className="h-[18px] w-[18px]" />
          </span>
          Casaca<span className="text-primary">Club</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {CONFEDERATIONS.map((conf) => (
            <button
              key={conf.id}
              onClick={() => onConfederationChange?.(conf.id)}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                activeConfederation === conf.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              {conf.label}
            </button>
          ))}
        </nav>

        <div className="ml-auto hidden max-w-xs flex-1 items-center sm:flex">
          <div className="relative w-full">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar selección..."
              className="h-9 bg-secondary pl-9 text-sm"
            />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2 sm:ml-0">
          <Button variant="ghost" size="icon" className="sm:hidden" aria-label="Buscar">
            <SearchIcon className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={onCartClick}
            aria-label="Abrir carrito"
          >
            <ShoppingBagIcon className="h-5 w-5" />
            {cartCount > 0 && (
              <Badge className="absolute -right-1 -top-1 h-5 min-w-5 justify-center rounded-full border-0 bg-primary px-1 text-[11px] text-primary-foreground">
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
