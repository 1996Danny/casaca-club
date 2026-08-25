import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import SiteHeader from "@/polymet/components/site-header";
import MobileBottomNav from "@/polymet/components/mobile-bottom-nav";
import CartDrawer from "@/polymet/components/cart-drawer";
import { useCart } from "@/polymet/data/cart-context";

interface StorefrontLayoutProps {
  children: ReactNode;
}

export default function StorefrontLayout({ children }: StorefrontLayoutProps) {
  const navigate = useNavigate();
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
              Terra Boutique
            </span>
            <p className="mt-1 text-xs">
              Piezas artesanales, hechas en pequeños lotes.
            </p>
          </div>
          <div className="flex gap-6 text-xs">
            <Link to="/" className="hover:text-foreground">
              Inicio
            </Link>
            <a href="/#catalogo" className="hover:text-foreground">
              Catálogo
            </a>
            <span>© {new Date().getFullYear()} Terra Boutique</span>
          </div>
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
        onCheckout={() => {
          closeCart();
          navigate("/checkout/success");
        }}
      />
    </div>
  );
}
