import { BrowserRouter } from "react-router-dom";
import StorefrontLayout from "@/polymet/layouts/storefront-layout";
import { CartProvider } from "@/polymet/data/cart-context";

export default function StorefrontLayoutRender() {
  return (
    <BrowserRouter>
      <CartProvider>
        <StorefrontLayout>
          <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-muted-foreground sm:px-6">
            Contenido de la página...
          </div>
        </StorefrontLayout>
      </CartProvider>
    </BrowserRouter>
  );
}
