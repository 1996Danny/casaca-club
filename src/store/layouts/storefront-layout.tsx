import { ReactNode } from "react";
import { Link } from "react-router-dom";
import SiteHeader from "@/store/components/site-header";
import MobileBottomNav from "@/store/components/mobile-bottom-nav";
import CartDrawer from "@/store/components/cart-drawer";
import { useCart } from "@/store/data/cart-context";

interface StorefrontLayoutProps {
  children: ReactNode;
}

export default function StorefrontLayout({ children }: StorefrontLayoutProps) {
  const {
    lines,
    isOpen,
    itemCount,
    subtotal,
    openCart,
    closeCart,
    updateQuantity,
    removeItem,
  } = useCart();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader cartCount={itemCount} onCartClick={openCart} />

      <main className="flex-1 pb-16 md:pb-0">{children}</main>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <span className="font-semibold text-foreground">
              Casaca Club
            </span>
            <p className="mt-1 text-xs">
              Camisetas de selecciones, originales y de calidad.
            </p>
            <p className="mt-1 text-xs">
              Imágenes y descripciones del catálogo generadas con IA, bajo licencia{" "}
              <a
                href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es"
                rel="license noopener noreferrer"
                target="_blank"
                className="underline underline-offset-2 hover:text-foreground"
              >
                CC BY-NC-SA 4.0
              </a>
              .
            </p>
          </div>
          <nav
            aria-label="Enlaces del footer"
            className="flex flex-wrap gap-x-6 gap-y-2 text-xs"
          >
            <Link to="/" className="hover:text-foreground">
              Inicio
            </Link>
            <a href="/#catalogo" className="hover:text-foreground">
              Catálogo
            </a>
            <Link to="/terminos" className="hover:text-foreground">
              Términos y Condiciones
            </Link>
            <Link to="/terminos#arrepentimiento" className="hover:text-foreground">
              Derecho de Arrepentimiento
            </Link>
            <Link to="/privacidad" className="hover:text-foreground">
              Política de Privacidad
            </Link>
            <span>© {new Date().getFullYear()} Casaca Club</span>
          </nav>
        </div>
      </footer>

      <MobileBottomNav cartCount={itemCount} onCartClick={openCart} />

      <CartDrawer
        open={isOpen}
        onOpenChange={(open) => (open ? openCart() : closeCart())}
        lines={lines}
        subtotal={subtotal}
        onUpdateQuantity={updateQuantity}
        onRemove={removeItem}
      />
    </div>
  );
}
