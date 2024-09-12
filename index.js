const express = require("express");
require("dotenv").config();
const cors = require("cors");
// const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const cloudinary = require("cloudinary");


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(cors({ origin: "*" }));
const { postVariable } = require("./controllers/variable");
const { register, login } = require("./controllers/user");
const prisma = require("./prisma/prisma");

const PORT = process.env.PORT;
// const MONGO_URI = process.env.MONGO_URI;
// const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
// const API_KEY = process.env.CLOUDINARY_API_KEY;
// const API_SECRET = process.env.CLOUDINARY_API_SECRET;

// mongoose.connect(MONGO_URI).then((res) => {
//   if (!res) console.log(`Error connecting to the database`);
//   else console.log(`Connection to the database established`);
// });

// cloudinary.config({
//   cloud_name: CLOUD_NAME,
//   api_key: API_KEY,
//   api_secret: API_SECRET,
// });


app.get("/", (req, res) => {
  res.send(`Hello and Welcome!`);
});

app.post("/register", register);
app.post("/login", login);
app.post("/saveVariable", postVariable);

app.listen(PORT, () => {
  prisma.$connect().then((resp, err) => {
    if (err) {
        console.log(`Error connecting to DB`);
    } else {
        console.log(`App listening on port: ${PORT}`);
    }
  })
});