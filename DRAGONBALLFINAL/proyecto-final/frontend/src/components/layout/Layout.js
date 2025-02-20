import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import "./layout.css";

const Layout = ({ children }) => {
  const { cart } = useContext(CartContext); 
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="layout-container">
      <header className="layout-header">
        <h1>PROYECTO FINAL Inicio</h1>
        <nav>
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/store" className="nav-link">Tienda</Link>
          <Link to="/cart" className="nav-link">Carrito ({totalQuantity})</Link>
          <Link to="/users" className="nav-link">Usuarios</Link>
        </nav>
      </header>
      <main className="layout-content">{children}</main>
      <footer className="layout-footer">
        &copy; 2025 PROYECTO FINAL. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default Layout;
