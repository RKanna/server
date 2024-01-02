const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UsersModel = require("../Models/Users.js");
import Blog from "../Models/blogModel.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// mongoose.connect("mongodb://127.0.0.1:27017/BlogFullStackDB");

mongoose.connect(
  "mongodb+srv://rkannanbalakrishnan:pKeuSy2MParodAuI@blog.8bifagg.mongodb.net/BlogFullStackDB"
);

app.get("/", (req, res) => {
  res.status(200).send("<h2>Auth Page</h2>");
});

//For user Login
app.post(`/login`, (req, res) => {
  const { email, password } = req.body;
  UsersModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("success");
      } else {
        res.json("The password is incorrect");
      }
    } else {
      res.json("The Email is not Registered with us");
    }
  });
});

//For user Registration
app.post(`/Users`, (req, res) => {
  const { email } = req.body;
  UsersModel.findOne({ email: email }).then((existingUser) => {
    if (existingUser) {
      res.status(400).json("Email already exists");
    } else {
      UsersModel.create(req.body)
        .then((user) => res.json({ message: "Signup success", user }))
        .catch((err) => res.status(400).json(err));
    }
  });
});

//For blog post after post SignIn

app.post(`/api/v1/blogs`, (req, res) => {
  const { title, content } = req.body;
  Blog.create(req.body)
    .then((blogEle) => res.json({ message: "Blog posted", blogEle }))
    .catch((err) => res.status(400).json(err));
});

app.listen(3001, () => {
  console.log("server is running");
});
