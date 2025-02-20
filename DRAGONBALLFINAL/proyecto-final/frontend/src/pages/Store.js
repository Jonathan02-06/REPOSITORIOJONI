import React, { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import useFetch from "../hooks/useFetch";
import { CartContext } from "../contexts/CartContext";
import { ToastContext } from "../contexts/ToastContext";
import "./Store.css";

const Store = () => {
  const { data, loading, error } = useFetch("https://pokeapi.co/api/v2/pokemon?limit=20");
  const { addToCart } = useContext(CartContext);
  const { showToast } = useContext(ToastContext);
  const navigate = useNavigate();

  const products = useMemo(() => {
    if (!data || !data.results) return [];
    return data.results.map((pokemon) => {
      const match = pokemon.url.match(/\/pokemon\/(\d+)\//);
      const id = match ? match[1] : null;
      const price = (Math.random() * (100 - 10) + 10).toFixed(2);
      return {
        id: pokemon.name,
        name: pokemon.name,
        price: parseFloat(price),
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
      };
    });
  }, [data]);

  const handleAddToCart = (product) => {
    addToCart(product);
    showToast("Producto añadido", "success");
  };

  return (
    <Layout>
      <h2>Tienda de Pokémon</h2>
      {loading && <p>Cargando...</p>}
      {error && <p>Error al cargar datos: {error.message}</p>}
      {products.length > 0 && (
        <div className="store-list">
          {products.map((product) => (
            <div key={product.id} className="store-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="price">${product.price}</p>
              <button onClick={() => handleAddToCart(product)}>Añadir al Carrito</button>
              <button onClick={() => navigate(`/pokemon/${product.name}`)}>Ver Detalle</button>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Store;
