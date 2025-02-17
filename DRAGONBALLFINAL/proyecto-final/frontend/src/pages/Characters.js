import React from "react";
import Layout from "../components/layout/Layout";
import useFetch from "../hooks/useFetch";
import "./Characters.css";

const Characters = () => {
  // Llamamos a la API con un límite de 20 pokémon
  const { data, loading, error } = useFetch("https://pokeapi.co/api/v2/pokemon?limit=20");

  // Función para extraer el ID del URL de cada Pokémon
  const extractId = (url) => {
    const match = url.match(/\/pokemon\/(\d+)\//);
    return match ? match[1] : null;
  };

  return (
    <Layout>
      <h2>Pokémon</h2>
      {loading && <p>Cargando...</p>}
      {error && <p>Error al cargar datos: {error.message}</p>}
      {data && data.results && (
        <div className="characters-list">
          {data.results.map((pokemon) => {
            const id = extractId(pokemon.url);
            return (
              <div key={pokemon.name} className="character-card">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                  alt={pokemon.name}
                />
                <h3>{pokemon.name}</h3>
              </div>
            );
          })}
        </div>
      )}
    </Layout>
  );
};

export default Characters;
