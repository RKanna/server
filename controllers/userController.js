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

//for uploading a image
// userController.js
export const uploadImage = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UsersModel.findById(id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const { image } = req.body;

    // Assuming the image is sent as base64 encoded data
    const imageData = Buffer.from(image, "base64");

    user.image = {
      data: imageData,
      contentType: "image/*", // Adjust the content type based on your needs
    };

    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Image uploaded successfully" });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
