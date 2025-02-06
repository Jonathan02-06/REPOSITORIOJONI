// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importamos los contextos
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext'; // Si ya lo tienes implementado

// Importamos las páginas
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSummaryPage } from './pages/OrderSummaryPage';

// Importamos el componente de rutas protegidas
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order-summary"
              element={
                <ProtectedRoute>
                  <OrderSummaryPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
