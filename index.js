import express from "express";
import router from "./routes/blogRoutes.js";
import cors from "cors";
import mongoose from "mongoose";
import UsersModel from "./Models/Users.js";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
// app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use("/api/v1/blogs", router);
// app.use(express.urlencoded({ extended: false }));

mongoose.connect("mongodb://127.0.0.1:27017/BlogFullStackDB");

// mongoose.connect(
//   "mongodb+srv://rkannanbalakrishnan:pKeuSy2MParodAuI@blog.8bifagg.mongodb.net/BlogFullStackDB"
// );

app.get("/", (req, res) => {
  res.status(200).send("<h2>Auth Page</h2>");
});

// For user Login
app.post(`/login`, async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UsersModel.findOne({ email: email });
    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (isPasswordMatch) {
        res.json("success");
      } else {
        res.json("The password is incorrect");
      }
    } else {
      res.json("The Email is not Registered with us");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

// For user Registration
app.post(`/Users`, async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const existingUser = await UsersModel.findOne({ email: email });
    if (existingUser) {
      res.status(400).json("Email already exists");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      // req.body.password = hashedPassword;
      const newUser = {
        userName,
        email,
        password: hashedPassword,
      };

      // const user = await UsersModel.create(req.body);
      const user = await UsersModel.create(newUser);
      res.json({ message: "Signup success", user });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
});

app.listen(3001, () => {
  console.log("server is running");
});
//////////////////////////////////////

//For blog post after post SignIn

// app.post(`/api/v1/blogs`, (req, res) => {
//   const { title, content } = req.body;
//   BlogsTestModel.create({ title, content })
//     .then((blogEle) => res.json({ message: "Blog posted", blogEle }))
//     .catch((err) => res.status(400).json(err));
// });
////////////////////////////////////////////////////////
