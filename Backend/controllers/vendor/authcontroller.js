const { privateKey } = require("../../config/constentValues");
const User = require("../../models/user-model");
const { decryptedData, encryptedData } = require("../../utils/encryptDecrypt");
const { generateToken } = require("../../utils/token");

const registerVendor = async (req, res) => {
  try {
    const { fullname, username, shopName, email, password, phone } = req.body;
    if (!fullname || !email || !password || !phone || !shopName || !username) {
      res.status(400).send({ status: false, msg: "all felids are required!" });
    }
    const user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .send({ status: false, msg: "user is already registered!" });
    const hashPassword = await encryptedData(password);
    const newVendor = await User.create({
      fullname,
      username,
      email,
      password: hashPassword,
      phone,
      shopName,
      role: "vendor",
    });

    res.status(201).send({
      status: true,
      msg: "Vendor is create an account !",
      data: newVendor,
    });
  } catch (error) {
    console.error("Delete Product Error:", error.message);
    return res.status(500).send({
      status: false,
      msg: "Server error",
      error: error.message,
    });
  }
};

const loginVendor = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        status: false,
        msg: "All fields are required!",
      });
    }
    const checkMail = email.includes("@") ? { email } : { phone: email };
    console.log("checkMail", checkMail);
    const user = await User.findOne(checkMail);
    if (!user) {
      return res.status(404).send({
        status: false,
        msg: "Vendor not found!",
      });
    }
    const isMatchPassword = await decryptedData(password, user.password);
    if (!isMatchPassword) {
      return res.status(404).send({
        status: false,
        msg: "something went wrong!",
      });
    }
    const token = generateToken({ id: user._id, email }, privateKey);
    console.log("token", token);

    return res.status(200).send({
      status: true,
      msg: "Vendor login successfully!",
      data: {
        vendorDetails: user,
        token,
      },
    });
  } catch (error) {
    console.error("login vendor Error:", error.message);
    return res.status(500).send({
      status: false,
      msg: "Server error",
      error: error.message,
    });
  }
};
module.exports = {
  registerVendor,
  loginVendor,
};
