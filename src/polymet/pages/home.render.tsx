import { BrowserRouter } from "react-router-dom";
import HomePage from "@/polymet/pages/home";
import StorefrontLayout from "@/polymet/layouts/storefront-layout";
import { CartProvider } from "@/polymet/data/cart-context";

export default function HomePageRender() {
  return (
    <BrowserRouter>
      <CartProvider>
        <StorefrontLayout>
          <HomePage />
        </StorefrontLayout>
      </CartProvider>
    </BrowserRouter>
  );
}
