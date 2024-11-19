// URL base de la API
const API_URL = 'https://pokeapi.co/api/v2/';

let pokemons = [];  // Array de Pokémon
let tiposUnicos = new Set();  // Set para almacenar tipos únicos de Pokémon

// Función para obtener todos los Pokémon desde la PokeAPI
export async function obtenerPokemons() {
  try {
    let nextUrl = `${API_URL}pokemon?limit=100`; // Pide 100 Pokémon de una vez
    let pokemonsBatch = [];

    while (nextUrl) {
      const response = await fetch(nextUrl);
      if (!response.ok) throw new Error(`Error al cargar Pokémon: ${response.statusText}`);
      
      const data = await response.json();
      const pokemonPromises = data.results.map(async (pokemon) => {
        const pokemonData = await fetch(pokemon.url);
        if (!pokemonData.ok) throw new Error(`Error al cargar detalles de Pokémon: ${pokemonData.statusText}`);
        
        const pokemonDetails = await pokemonData.json();
        return {
          name: pokemonDetails.name,
          type: pokemonDetails.types.map(t => t.type.name) ,
          image: pokemonDetails.sprites.front_default // Extraemos los tipos
        };
      });

      // Esperamos a que todas las promesas del batch se resuelvan
      pokemonsBatch = await Promise.all(pokemonPromises);
      pokemons = [...pokemons, ...pokemonsBatch];

      // Obtener la siguiente URL para la siguiente página de Pokémon
      nextUrl = data.next;
    }

    // Cargar los tipos después de obtener todos los Pokémon
    cargarTipos();

    // Mostrar los Pokémon en la interfaz
    mostrarPokemons(pokemons);
  } catch (error) {
    console.error('Error al obtener los Pokémon:', error);
    pokemonContainer.innerHTML = '<p>Hubo un problema al cargar los Pokémon. Intenta de nuevo más tarde.</p>';
  }
}

// Función para cargar los tipos de Pokémon en el filtro
export function cargarTipos() {
  // Extraer tipos únicos de los Pokémon
  pokemons.forEach(pokemon => {
    pokemon.type.forEach(tipo => tiposUnicos.add(tipo));
  });

  // Convertir el Set en un array y ordenarlos alfabéticamente
  const tiposOrdenados = Array.from(tiposUnicos).sort();

  // Limpiar el contenido del selector
  const typeFilter = document.getElementById('type-filter');
  typeFilter.innerHTML = '<option value="">Filtrar por Tipo</option>';

  // Agregar cada tipo al select
  tiposOrdenados.forEach(tipo => {
    const option = document.createElement('option');
    option.value = tipo;
    option.textContent = tipo.charAt(0).toUpperCase() + tipo.slice(1); // Capitalizar la primera letra
    typeFilter.appendChild(option);
  });
}

// Función para mostrar los Pokémon en la interfaz
export function mostrarPokemons(pokemonsFiltrados) {
  const pokemonContainer = document.getElementById('pokemon-container');
  
  // Limpiar el contenedor de Pokémon
  pokemonContainer.innerHTML = '';

  // Si no hay Pokémon, mostrar un mensaje
  if (pokemonsFiltrados.length === 0) {
    pokemonContainer.innerHTML = '<p>No se encontraron Pokémon para este filtro.</p>';
  }

  // Mostrar cada Pokémon
  pokemonsFiltrados.forEach(pokemon => {
    const pokemonElement = document.createElement('div');
    pokemonElement.classList.add('card');
    pokemonElement.innerHTML = `
      <h3>${pokemon.name}</h3>
      <p>Tipos: ${pokemon.type.join(', ')}</p>
      <img src="${pokemon.image}" alt="${pokemon.name}">
    `;
    pokemonContainer.appendChild(pokemonElement);
  });
}

// Función para filtrar los Pokémon por tipo
export function filtrarPorTipo() {
  
  const tipoSeleccionado = document.getElementById('type-filter').value;

  // Filtrar los Pokémon por el tipo seleccionado
  const pokemonsFiltrados = tipoSeleccionado ? 
    pokemons.filter(pokemon => pokemon.type.includes(tipoSeleccionado)) : 
    pokemons;

  // Mostrar los Pokémon filtrados
  mostrarPokemons(pokemonsFiltrados);
}

// Función para inicializar la aplicación
export function inicializarFiltro() {
  // Cargar los Pokémon desde la PokeAPI solo una vez
  obtenerPokemons();
}