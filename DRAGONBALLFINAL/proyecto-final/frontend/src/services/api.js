import axios from "axios";

const API_BASE_URL = "https://pokeapi.co/api/v2";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

export const getPokemons = (limit = 20, offset = 0) => {
  return api.get(`/pokemon?limit=${limit}&offset=${offset}`);
};

export default api;
