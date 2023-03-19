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
  });
  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//updating one
router.patch("/update/:id", getMovie, async (req, res) => {
  if (req.body.name != null) {
    res.movie.name = req.body.name;
  }
  if (req.body.imageURL != null) {
    res.movie.imageURL = req.body.imageURL;
  }
  if (req.body.languagecategory != null) {
    res.movie.languagecategory = req.body.language;
  }
  if (req.body.category != null) {
    res.movie.category = req.body.category;
  }
  if (req.body.director != null) {
    res.movie.director = req.body.director;
  }

  try {
    const updatedMovie = await res.movie.save();
    res.json(updatedMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
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
