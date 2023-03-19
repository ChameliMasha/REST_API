const express = require("express");
const router = express.Router();
const Actors = require("../models/actors");

//getting all

router.get("/getAll", async (req, res) => {
  try {
    const data = await Actors.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//getting one
router.get("/getOne/:id", getActors, (req, res) => {
  res.json(res.actors);
});

//creating one
router.post("/save", async (req, res) => {
  const actors = new Actors({
    name: req.body.name,
    imageURL: req.body.imageURL,
    country: req.body.country,
    bio: req.body.bio,
    dob: req.body.dob,
  });
  try {
    const newActors = await actors.save();
    res.status(201).json(newActors);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//updating one
router.patch("/update/:id", getActors, async (req, res) => {
  if (req.body.name != null) {
    res.actors.name = req.body.name;
  }
  if (req.body.imageURL != null) {
    res.actors.imageURL = req.body.imageURL;
  }
  if (req.body.country != null) {
    res.actors.country = req.body.country;
  }
  if (req.body.bio != null) {
    res.actors.bio = req.body.bio;
  }
  bio;
  if (req.body.dob != null) {
    res.actors.dob = req.body.dob;
  }

  try {
    const updatedActors = await res.actors.save();
    res.json(updatedActors);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//deleting one
router.delete("/delete/:deleteId", async (req, res) => {
  const filter = { _id: req.params.deleteId };

  const result = await Actors.deleteOne(filter);
  if (result.deletedCount === 1) {
    res.status(200).send({ success: true, msg: "Data Deleted" });
  } else {
    res.status(200).send({ success: false, msg: "Data Not Found" });
  }
});

async function getActors(req, res, next) {
  let actors;
  try {
    actors = await Actors.findById(req.params.id);
    if (actors == null) {
      return res.status(404).json({ message: "Cannot find actors" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.actors = actors;
  next();
}

module.exports = router;
