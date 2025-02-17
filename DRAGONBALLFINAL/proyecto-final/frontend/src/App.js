import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { ToastProvider } from "./contexts/ToastContext";
import Toast from "./components/Toast/Toast";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Store from "./pages/Store";
import Cart from "./pages/Cart";
import PokemonDetail from "./pages/PokemonDetail";
import Users from "./pages/Users";
import ManageProducts from "./pages/ManageProducts";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <Router>
            <Toast />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/store" element={<ProtectedRoute><Store /></ProtectedRoute>} />
              <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
              <Route path="/pokemon/:name" element={<ProtectedRoute><PokemonDetail /></ProtectedRoute>} />
              <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
              <Route path="/manage-products" element={<ProtectedRoute><ManageProducts /></ProtectedRoute>} />
            </Routes>
          </Router>
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
