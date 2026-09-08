import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/store/data/cart-context";
import StorefrontLayout from "@/store/layouts/storefront-layout";
import HomePage from "@/store/pages/home";
import CheckoutSuccessPage from "@/store/pages/checkout-success";
import CheckoutFailurePage from "@/store/pages/checkout-failure";

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
