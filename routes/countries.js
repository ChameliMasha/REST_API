const express = require("express");
const router = express.Router();
const Country = require("../models/countries");

//creating one
router.post("/save", async (req, res) => {
  const country = new Country({
    name: req.body.name,
    description: req.body.description,
    countrys: req.body.countrys,
  });
  try {
    const newCountry = await country.save();
    res.status(201).json(newCountry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//getting all

router.get("/getAll", async (req, res) => {
  try {
    const data = await Country.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//getting one
router.get("/getOne/:id", getCountry, (req, res) => {
  res.json(res.country);
});

//update
router.put("/update/:updateId", async (req, res) => {
  const filter = { _id: req.params.updateId };
  const options = {
    upsert: true,
    new: true,
  };
  try {
    const result = await Country.findOneAndUpdate(
      filter,
      {
        name: req.body.name,
        description: req.body.description,
        countrys: req.body.countrys,
      },
      options
    );
    res.status(200).send({ Country: result });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
});

//deleting one
router.delete("/delete/:deleteId", async (req, res) => {
  const filter = { _id: req.params.deleteId };

  const result = await Country.deleteOne(filter);
  if (result.deletedCount === 1) {
    res.status(200).send({ success: true, msg: "Data Deleted" });
  } else {
    res.status(200).send({ success: false, msg: "Data Not Found" });
  }
});

async function getCountry(req, res, next) {
  let country;
  try {
    country = await Country.findById(req.params.id);
    if (country == null) {
      return res.status(404).json({ message: "Cannot find country" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.country = country;
  next();
}

module.exports = router;
