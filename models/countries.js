const mongoose = require("mongoose");

const countriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  movies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "movie",
    },
  ],
});

const countries = mongoose.model("countries", countriesSchema);

module.exports = countries;
