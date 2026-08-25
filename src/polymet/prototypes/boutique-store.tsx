import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/polymet/data/cart-context";
import StorefrontLayout from "@/polymet/layouts/storefront-layout";
import HomePage from "@/polymet/pages/home";
import CheckoutSuccessPage from "@/polymet/pages/checkout-success";
import CheckoutFailurePage from "@/polymet/pages/checkout-failure";

export default function BoutiqueStorePrototype() {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route
            path="/"
            element={
              <StorefrontLayout>
                <HomePage />
              </StorefrontLayout>
            }
          />

          <Route
            path="/checkout/success"
            element={
              <StorefrontLayout>
                <CheckoutSuccessPage />
              </StorefrontLayout>
            }
          />

          <Route
            path="/checkout/failure"
            element={
              <StorefrontLayout>
                <CheckoutFailurePage />
              </StorefrontLayout>
            }
          />
        </Routes>
      </CartProvider>
    </Router>
  );
}
