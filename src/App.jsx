import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navigation from "./components/common/Navigation";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Success from "./components/common/Success";
import Checkout from "./components/pages/Checkout";
import HomePage from "./components/pages/HomePage";
import Login from "./components/pages/Login";
import ProductDetail from "./components/pages/ProductDetail";
import ProductListing from "./components/pages/ProductListing";
import Register from "./components/pages/Register";
import ShoppingCart from "./components/pages/ShoppingCart";
import { ToastProvider } from "./components/toast/ToastContext";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <ToastProvider>
            {" "}
            {/* Add ToastProvider here */}
            <div className="min-h-screen bg-white">
              <Navigation />
              <Routes>
                <Route
                  path="/"
                  element={<HomePage setSelectedProduct={setSelectedProduct} />}
                />
                <Route
                  path="/products"
                  element={
                    <ProductListing setSelectedProduct={setSelectedProduct} />
                  }
                />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<ShoppingCart />} />
                <Route
                  path="/checkout"
                  element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/success" element={<Success />} />
              </Routes>
            </div>
          </ToastProvider>{" "}
          {/* Close ToastProvider here */}
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
