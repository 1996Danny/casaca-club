import { BrowserRouter } from "react-router-dom";
import CheckoutFailurePage from "@/polymet/pages/checkout-failure";
import StorefrontLayout from "@/polymet/layouts/storefront-layout";
import { CartProvider } from "@/polymet/data/cart-context";

export default function CheckoutFailurePageRender() {
  return (
    <BrowserRouter>
      <CartProvider>
        <StorefrontLayout>
          <CheckoutFailurePage />
        </StorefrontLayout>
      </CartProvider>
    </BrowserRouter>
  );
}
