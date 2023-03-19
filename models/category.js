const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    description: { type: String },

    movies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "movie",
      },
    ],
  }
  //{ timestamps: true }
);

module.exports = mongoose.model("category", categorySchema);
