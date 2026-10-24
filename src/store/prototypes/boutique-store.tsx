import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/store/data/cart-context";
import StorefrontLayout from "@/store/layouts/storefront-layout";
import HomePage from "@/store/pages/home";
import CheckoutSuccessPage from "@/store/pages/checkout-success";
import CheckoutFailurePage from "@/store/pages/checkout-failure";
import TermsPage from "@/store/pages/terms";
import PrivacyPage from "@/store/pages/privacy";

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

          <Route
            path="/terminos"
            element={
              <StorefrontLayout>
                <TermsPage />
              </StorefrontLayout>
            }
          />

          <Route
            path="/privacidad"
            element={
              <StorefrontLayout>
                <PrivacyPage />
              </StorefrontLayout>
            }
          />
        </Routes>
      </CartProvider>
    </Router>
  );
}
