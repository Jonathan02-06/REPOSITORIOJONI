const axios = require("axios");
const mongoose = require("mongoose");
require("dotenv").config();

const Pokemon = require("./models/Pokemon");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Conectado a MongoDB");
    importPokemon();
  })
  .catch((err) => {
    console.error("Error conectando a MongoDB:", err);
    process.exit(1);
  });

async function importPokemon() {
  try {
    const limit = 100; // Puedes ajustar el número de Pokémon a importar
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
    const pokemonList = response.data.results;

    for (const pokemonData of pokemonList) {
      const detailsResponse = await axios.get(pokemonData.url);
      const details = detailsResponse.data;
      const speciesResponse = await axios.get(details.species.url);
      const species = speciesResponse.data;
      const flavorEntry = species.flavor_text_entries.find(entry => entry.language.name === "es");
      const description = flavorEntry ? flavorEntry.flavor_text.replace(/\n|\f/g, " ") : "Sin descripción disponible";

      const newPokemon = new Pokemon({
        name: details.name,
        description: description,
        image: details.sprites.front_default,
        types: details.types.map(t => t.type.name),
        stats: details.stats.reduce((acc, stat) => {
          acc[stat.stat.name] = stat.base_stat;
          return acc;
        }, {})
      });

      await newPokemon.save();
      console.log(`Importado: ${details.name}`);
    }
    console.log("Importación de Pokémon completada");
    process.exit(0);
  } catch (error) {
    console.error("Error durante la importación de Pokémon:", error);
    process.exit(1);
  }
}
