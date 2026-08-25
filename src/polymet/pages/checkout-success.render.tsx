import { BrowserRouter } from "react-router-dom";
import CheckoutSuccessPage from "@/polymet/pages/checkout-success";
import StorefrontLayout from "@/polymet/layouts/storefront-layout";
import { CartProvider } from "@/polymet/data/cart-context";

export default function CheckoutSuccessPageRender() {
  return (
    <BrowserRouter>
      <CartProvider>
        <StorefrontLayout>
          <CheckoutSuccessPage />
        </StorefrontLayout>
      </CartProvider>
    </BrowserRouter>
  );
}
