import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Layout from "../components/layout/Layout";
import "./Dashboard.css";

const Dashboard = () => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const pokemonImages = [
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png"
  ];

  const [heroImage, setHeroImage] = useState("");

  useEffect(() => {
    const changeHeroImage = () => {
      const randomIndex = Math.floor(Math.random() * pokemonImages.length);
      setHeroImage(pokemonImages[randomIndex]);
    };

    changeHeroImage();
    const interval = setInterval(changeHeroImage, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <div className="dashboard-container">
        <h2 className="dashboard-title">INICIO</h2>
        <p className="welcome-text">Bienvenido, {user ? user.username : "Invitado"}.</p>
        <div className="hero">
          {heroImage && (
            <img className="hero-image" src={heroImage} alt="Pokemon Hero" />
          )}
        </div>
        <div className="dashboard-links">
          <Link to="/store" className="dashboard-link">Tienda</Link>
          <Link to="/cart" className="dashboard-link">Carrito</Link>
          <Link to="/users" className="dashboard-link">Usuarios</Link>
        </div>
        <button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button>
      </div>
    </Layout>
  );
};

export default Dashboard;
