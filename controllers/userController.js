import UsersModel from "../Models/Users.js";
import bcrypt from "bcrypt";

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UsersModel.findById(id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Create userProfile

export const createUserProfile = async (req, res) => {
  const {
    userName,
    email,
    password,
    address,
    city,
    state,
    phoneNumber,
    profilePhoto,
  } = req.body;
  console.log("Request Body:", req.body);

  try {
    const existingUser = await UsersModel.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new UsersModel({
        userName,
        email,
        password: hashedPassword,
        address,
        city,
        state,
        phoneNumber,
        profilePhoto,
      });

      const savedUser = await newUser.save();

      res.status(201).json({ message: "Signup success", user: savedUser });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const { userName, email, address, city, state, phoneNumber, profilePhoto } =
      req.body;

    const updatedUser = await UsersModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          userName,
          email,
          address,
          city,
          state,
          phoneNumber,
          profilePhoto,
        },
      },
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    //for giving the message to user you are trying to update a email that already exist in db
    res.status(500).json({ message: "Internal Server Error" });
  }
};
