const { privateKey, TOKEN_NAME } = require("../../config/constentValues");
const User = require("../../models/user-model");
const { encryptedData, decryptedData } = require("../../utils/encryptDecrypt");
const { generateToken } = require("../../utils/token");

const registerUser = async (req, res) => {
  try {
    const { fullname, username, email, password } = req.body;
    if (fullname || username || !email || !password) {
      res.status(400).send({ status: false, msg: "All felids are required !" });
    }
    const user = await User.findOne({ email });
    if (user) {
      res.status(409).send({
        status: false,
        msg: "User already registered!",
      });
    }
    const hashPassword = await encryptedData(password);
    const newUser = await User.create({
      // fullname,
      // username,
      email,
      password: hashPassword,
      role: "admin",
    });
    res.status(201).send({
      status: true,
      msg: "User created successfully!",
      data: newUser,
    });
  } catch (error) {
    console.error(error);
  }
};
const loginUser = async (req, res) => {
  console.log("req.body", req.body);
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!email || !password)
      return res
        .status(400)
        .send({ status: false, msg: "All felids are required !" });
    if (!user)
      return res
        .status(404)
        .send({ status: false, msg: "User is not registered!" });

    const isMatchPassword = await decryptedData(password, user.password);
    if (!isMatchPassword) {
      res.status(400).send({ status: false, msg: "something wants wrong!" });
    }
    const token = generateToken(
      { email, username: user.username, id: user._id },
      privateKey
    );
    res.cookie(TOKEN_NAME, token);
    // res.status(200).send({ status: true, msg: "user verified !", token });
    res.status(200).send({
      status: true,
      msg: "user login successfully!",
      data: { user, token },
    });
  } catch (error) {
    console.error("Login Costumer Product Error:", error.message);
    return res.status(500).send({
      status: false,
      msg: "Server error",
      error: error.message,
    });
  }
};
const logout = async (req, res) => {
  res.clearCookie(TOKEN_NAME);
  req.status(200).send({ status: true, msg: "Logged out successfully." });
  res.redirect("/");
};

module.exports = {
  registerUser,
  loginUser,
  logout,
};
