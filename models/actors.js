const mongoose = require("mongoose");

const actorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    imageURL: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
  }
  //{ timestamps: true }
);

module.exports = mongoose.model("actor", actorSchema);
