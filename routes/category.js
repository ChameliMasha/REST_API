const express = require("express");
const router = express.Router();
const Category = require("../models/category");

//creating one
router.post("/save", async (req, res) => {
  const category = new Category({
    name: req.body.name,
    description: req.body.description,
    movies: req.body.movies,
  });
  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//getting all

router.get("/getAll", async (req, res) => {
  try {
    const data = await Category.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//getting one
router.get("/getOne/:id", getCategory, (req, res) => {
  res.json(res.category);
});

//update
router.put("/update/:updateId", async (req, res) => {
  const filter = { _id: req.params.updateId };
  const options = {
    upsert: true,
    new: true,
  };
  try {
    const result = await Category.findOneAndUpdate(
      filter,
      {
        name: req.body.name,
        description: req.body.description,
        movies: req.body.movies,
      },
      options
    );
    res.status(200).send({ Category: result });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
});

//deleting one
router.delete("/delete/:deleteId", async (req, res) => {
  const filter = { _id: req.params.deleteId };

  const result = await Category.deleteOne(filter);
  if (result.deletedCount === 1) {
    res.status(200).send({ success: true, msg: "Data Deleted" });
  } else {
    res.status(200).send({ success: false, msg: "Data Not Found" });
  }
});

async function getCategory(req, res, next) {
  let category;
  try {
    category = await Category.findById(req.params.id);
    if (category == null) {
      return res.status(404).json({ message: "Cannot find category" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.category = category;
  next();
}

module.exports = router;
