require("dotenv/config");

const express = require("express");
const app = express();

const cors = require("cors");
const { default: mongoose } = require("mongoose");

app.use(cors({ origin: true }));
app.use(express.json());

//movies router

// app.get("/", (req, res) => {
//   return res.json("hi there");
// });

mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true });
mongoose.connection
  .once("open", () => console.log("Connected"))
  .on("error", (error) => {
    console.log(`Error : ${error}`);
  });

const movieRouter = require("./routes/movie");
app.use("/movie", movieRouter);

const actorsRouter = require("./routes/actors");
app.use("/actors", actorsRouter);

const categoryRouter = require("./routes/category");
app.use("/category", categoryRouter);

const countriesRouter = require("./routes/countries");
app.use("/countries", countriesRouter);

app.listen(8000, () => console.log("Listening to port 8000"));
