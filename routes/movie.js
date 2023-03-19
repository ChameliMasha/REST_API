const express = require("express");
const router = express.Router();
const Movie = require("../models/movie");

//getting all

router.get("/getAll", async (req, res) => {
  try {
    const data = await Movie.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//getting one
router.get("/getOne/:id", getMovie, (req, res) => {
  res.json(res.movie);
});

//creating one
router.post("/save", async (req, res) => {
  const movie = new Movie({
    name: req.body.name,
    imageURL: req.body.imageURL,
    language: req.body.language,
    category: req.body.category,
    director: req.body.director,
    main_actor: req.body.main_actor,
  });
  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//update
router.put("/update/:updateId", async (req, res) => {
  const filter = { _id: req.params.updateId };
  const options = {
    upsert: true,
    new: true,
  };
  try {
    const result = await Movie.findOneAndUpdate(
      filter,
      {
        name: req.body.name,
        imageURL: req.body.imageURL,
        language: req.body.language,
        category: req.body.category,
        director: req.body.director,
        main_actor: req.body.main_actor,
      },
      options
    );
    res.status(200).send({ Movie: result });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
});

//deleting one
router.delete("/delete/:deleteId", async (req, res) => {
  const filter = { _id: req.params.deleteId };

  const result = await Movie.deleteOne(filter);
  if (result.deletedCount === 1) {
    res.status(200).send({ success: true, msg: "Data Deleted" });
  } else {
    res.status(200).send({ success: false, msg: "Data Not Found" });
  }
});

async function getMovie(req, res, next) {
  let movie;
  try {
    movie = await Movie.findById(req.params.id);
    if (movie == null) {
      return res.status(404).json({ message: "Cannot find movie" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.movie = movie;
  next();
}

module.exports = router;
