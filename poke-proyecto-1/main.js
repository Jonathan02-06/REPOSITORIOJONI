renderLogin();

// Importa las funciones `pedirPokemons` y `pedirMasInfoDelPokemon` desde el archivo "api" en la carpeta "utils".
// Estas funciones permiten obtener una lista de Pokémon y detalles adicionales de cada Pokémon.
import { pedirPokemons, pedirMasInfoDelPokemon } from "./utils/api";

// Importa la función `crearPokemonInfoCards` desde el archivo "Card" en la carpeta "components".
// Esta función genera una tarjeta con la información de un Pokémon.
import { crearPokemonInfoCards } from "./components/Card";

//funcion para buscador
import{buscarPokemon} from "./utils/buscador"



// Selecciona el elemento HTML con el ID "pokemon-container", donde se añadirán las tarjetas de los Pokémon.
const pokemonContainer = document.getElementById("pokemon-container");

// Declara una función asíncrona `cargarPokemons` que se encarga de cargar y mostrar los Pokémon en la interfaz.
async function cargarPokemons() {
  // Llama a `pedirPokemons` para obtener la lista inicial de Pokémon desde la API.
  const pokemons = await pedirPokemons();

  // Utiliza `Promise.all` para hacer una solicitud adicional de información para cada Pokémon en `pokemons`.
  // Mapea cada elemento `pokemon` en la lista para obtener su URL y llama a `pedirMasInfoDelPokemon`.
  const pokemosConMasInfo = await Promise.all(
    pokemons.map((pokemon) => {
      return pedirMasInfoDelPokemon(pokemon.url);
    })
  );

  // Imprime en la consola el array `pokemosConMasInfo`, que ahora contiene objetos con la información detallada de cada Pokémon.
  console.log("🚀 ~ pokemosConMasInfo ~ pokemosConMasInfo:", pokemosConMasInfo);

  // Itera sobre cada elemento `pokemon` en `pokemosConMasInfo` para crear y mostrar una tarjeta con su información.
  pokemosConMasInfo.forEach((pokemon) => {
    // Llama a `crearPokemonInfoCards` para generar una tarjeta (`card`) con la información del Pokémon.
    const card = crearPokemonInfoCards(pokemon);

    // Imprime en la consola la tarjeta creada para este Pokémon, útil para verificar que se creó correctamente.
    console.log("🚀 ~ pokemosConMasInfo.forEach ~ card:", card);

    // Agrega la tarjeta creada al contenedor `pokemonContainer` en la página HTML.
    pokemonContainer.appendChild(card);
  });
}

    //funcion para el login
export function renderLogin() {
  const isLogin= localStorage.getItem("loggedIn");
  if (isLogin !== "true"){
   window.location.href = "./components/login/login.html";
  }
  
 }





//funcion para el buscador
document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('#search'); // Asegúrate de tener un input con id="buscador"
  let resultadoDiv = document.querySelector('#resultado'); // Intentamos encontrar el div con id="resultado"

  // creamos el div contenedor
  if (!resultadoDiv) {
      resultadoDiv = document.createElement('div');
      resultadoDiv.id = 'resultado';  // Le asignamos un id
      document.body.appendChild(resultadoDiv);  // Lo agregamos al body o al contenedor que prefieras
  }
console.log(resultadoDiv )
  // Evento onChange para el input, segun vamos escribiendo la palabra autocompleta
  input.addEventListener('input', async (event) => {
      const query = event.target.value;

      if (query.trim() === '') {
          resultadoDiv.innerHTML = ''; // Si el input está vacío, borrar los resultados
          return;
      }

      // Llamada a la función de búsqueda
      const pokemon = await buscarPokemon(query);

      if (pokemon) {
          // Mostrar el resultado en el HTML
          resultadoDiv.innerHTML = `
              <h3>${pokemon.name.toUpperCase()}</h3>
              <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
              <p>Tipo(s): ${pokemon.types.map(type => type.type.name).join(', ')}</p>
          `;
      } else {
          // Mostrar mensaje de error si no se encuentra el Pokémon
          resultadoDiv.innerHTML = '<p>No se encontró ese Pokémon.</p>';
      }
  });
});

// Llama a la función `cargarPokemons` para iniciar el proceso de carga y mostrar los Pokémon en la interfaz.
cargarPokemons();



//para el filtro
import { obtenerPokemons, filtrarPorTipo, inicializarFiltro } from "./utils/filtro";

// Al cargar la página, inicializamos el filtro, es decir, cargamos los Pokémon y los tipos.
document.addEventListener('DOMContentLoaded', () => {
  inicializarFiltro();  // Esta función carga los Pokémon y los tipos
});

// Asignar el evento `change` al filtro de tipo para que ejecute `filtrarPorTipo`
// cuando el usuario selecciona un tipo.
const typeFilter = document.getElementById('type-filter');
typeFilter.addEventListener('change', filtrarPorTipo); // Aquí filtras los Pokémon por el tipo seleccionado