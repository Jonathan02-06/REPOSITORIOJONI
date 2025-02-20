const mongoose = require("mongoose");

const pokemonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: "" },
  image: { type: String, required: true },
  types: [String],
  stats: { type: Object }
});

module.exports = mongoose.model("Pokemon", pokemonSchema);
