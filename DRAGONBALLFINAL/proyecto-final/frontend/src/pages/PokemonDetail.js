import React, { useState, useEffect, useMemo, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { CartContext } from "../contexts/CartContext";
import "./PokemonDetail.css";

const PokemonDetail = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const dataPokemon = await resPokemon.json();
        setPokemon(dataPokemon);

        const resSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
        const dataSpecies = await resSpecies.json();
        setSpecies(dataSpecies);
      } catch (err) {
        setError("Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [name]);

  const getDescription = () => {
    if (!species || !species.flavor_text_entries) return "Sin descripción.";
    const entry = species.flavor_text_entries.find(entry => entry.language.name === "es");
    return entry ? entry.flavor_text.replace(/\n|\f/g, " ") : "Sin descripción en español.";
  };

  const price = useMemo(() => {
    if (pokemon) return parseFloat((Math.random() * (100 - 10) + 10).toFixed(2));
    return null;
  }, [pokemon]);

  const handleAddToCart = () => {
    if (pokemon && price !== null) {
      addToCart({
        id: pokemon.name,
        name: pokemon.name,
        price: price,
        image: pokemon.sprites.front_default
      });
      alert("Producto añadido al carrito");
    }
  };

  if (loading) return <Layout><p>Cargando...</p></Layout>;
  if (error) return <Layout><p>{error}</p></Layout>;
  if (!pokemon) return <Layout><p>No se encontraron datos.</p></Layout>;

  return (
    <Layout>
      <div className="pokemon-detail">
        <h2 className="pokemon-name">{pokemon.name.toUpperCase()}</h2>
        <img className="pokemon-image" src={pokemon.sprites.front_default} alt={pokemon.name} />
        <div className="pokemon-info">
          <p><strong>Tipo(s):</strong> {pokemon.types.map(t => t.type.name).join(', ')}</p>
          <p><strong>Altura:</strong> {pokemon.height}</p>
          <p><strong>Peso:</strong> {pokemon.weight}</p>
          <p><strong>Precio:</strong> ${price}</p>
          <p><strong>Descripción:</strong> {getDescription()}</p>
        </div>
        <div className="detail-buttons">
          <button onClick={() => navigate(-1)} className="back-btn">Volver</button>
          <button onClick={handleAddToCart} className="add-cart-btn">Añadir al Carrito</button>
        </div>
      </div>
    </Layout>
  );
};

export default PokemonDetail;
