import express from "express";
import router from "./routes/blogRoutes.js";
import route from "./routes/userRoutes.js";
import cors from "cors";
import mongoose from "mongoose";
import UsersModel from "./Models/Users.js";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";

const app = express();
// app.use(cors());
// app.use(
//   cors({
//     origin: ["https://tame-pink-pike-sock.cyclic.app"],
//     methods: ["POST", "GET"],
//     credentials: true,
//   })
// );
app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Range", "X-Content-Range"],
  })
);
app.options("*", cors());

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
// app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use("/api/v1/blogs", router);
app.use("/api/v1/users", route);
// app.use(express.urlencoded({ extended: false }));

mongoose.connect("mongodb://127.0.0.1:27017/BlogFullStackDB");

// mongoose.connect(
//   "mongodb+srv://rkannanbalakrishnan:pKeuSy2MParodAuI@blog.8bifagg.mongodb.net/BlogFullStackDB"
// );

app.get("/", (req, res) => {
  res.status(200).send("<h2>Auth Page</h2>");
});

//Login
app.post(`/login`, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UsersModel.findOne({ email });

    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (isPasswordMatch) {
        res.json({
          success: true,
          _id: user._id,
          userEmail: user.email,
        });
      } else {
        res.status(401).json({
          success: false,
          error: "The password is incorrect",
        });
      }
    } else {
      res.status(404).json({
        success: false,
        error: "The Email is not Registered with us",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

// For user Registration
// app.post(`/Users`, async (req, res) => {
//   const {
//     userName,
//     email,
//     password,
//     address,
//     city,
//     state,
//     phoneNumber,
//     profilePhoto,
//   } = req.body;

//   try {
//     const existingUser = await UsersModel.findOne({ email: email });

//     if (existingUser) {
//       return res.status(400).json({ message: "Email already exists" });
//     } else {
//       const hashedPassword = await bcrypt.hash(password, 10);

//       const newUser = new UsersModel({
//         userName,
//         email,
//         password: hashedPassword,
//         address,
//         city,
//         state,
//         phoneNumber,
//         profilePhoto,
//       });

//       const savedUser = await newUser.save();
//       console.log("Saved user data:", savedUser);
//       res.status(201).json({ message: "Signup success", user: savedUser });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

app.listen(3001, () => {
  console.log("server is running");
});
