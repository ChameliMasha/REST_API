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

app.listen(8000, () => console.log("Listening to port 8000"));
