const { privateKey, TOKEN_NAME } = require("../../config/constentValues");
const User = require("../../models/user-model");
const { encryptedData, decryptedData } = require("../../utils/encryptDecrypt");
const { generateToken } = require("../../utils/token");

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate request fields
    if (!email || !password) {
      return res.status(400).send({
        status: false,
        msg: "Email and password are required!",
      });
    }

    // Find the user
    const user = await User.findOne({ email }); // ❌ You were using find() which returns an array

    // If user not found
    if (!user) {
      return res.status(404).send({
        status: false,
        msg: "Admin not found!",
      });
    }

    // Check if user is an admin
    if (user.role !== "admin") {
      return res.status(403).send({
        status: false,
        msg: "You are not authorized to access this!",
      });
    }

    // Compare passwords (you should ideally use bcrypt here)
    const isPasswordValid = password === user.password; // Replace with bcrypt.compare if hashed
    if (!isPasswordValid) {
      return res.status(401).send({
        status: false,
        msg: "Invalid email or password!",
      });
    }

    // Generate token
    const token = generateToken(
      { email: user.email, id: user._id },
      privateKey
    );

    // Return success response
    return res.status(200).send({
      status: true,
      msg: "Login successful!",
      token,
    });
  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).send({
      status: false,
      msg: "Internal server error",
    });
  }
};

module.exports = { adminLogin };
