import UsersModel from "../Models/Users.js";

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

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const { userName, email, address, city, state, phoneNumber, profilePhoto } =
      req.body;

    // You can add validation for the required fields here

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

///////////////////////////////////////
//     res.json({ success: true, data: updatedUser });
//   } catch (error) {
//     console.error("Error updating user profile:", error);

//     // Check for duplicate key error
//     if (error.code === 11000) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Email already exists" });
//     }

//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };
