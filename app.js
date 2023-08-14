const PORT = process.env.PORT || 3000;
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const User = require("./models/User.js");
const connectDB = require("./config/db.js");

const app = express();
connectDB();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/register", function (req, res) {
  res.render("register");
});

app.post("/register", async function (req, res) {
  const { username, password } = req.body;
  const newUser = new User({
    username,
    password,
  });

  try {
    const response = await newUser.save();
    res.render("secrets");
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/login", async function (req, res) {
  const { username, password } = req.body;
  try {
    const response = await User.findOne({ username: username });
    if (response) {
      if (response.password === password) {
        res.render("secrets");
      } else {
        res.send("Incorrect Email or Password!");
      }
    } else {
      res.redirect("/register");
    }
  } catch (error) {
    res.send(error.message);
  }
});

app.listen(PORT, function () {
  console.log(`Server started on port ${PORT} 🚀.`);
});
