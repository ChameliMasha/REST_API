const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    imageURL: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
  }
  //{ timestamps: true }
);

module.exports = mongoose.model("movie", movieSchema);
