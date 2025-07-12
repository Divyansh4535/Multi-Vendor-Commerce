const config = require("config");
const { default: mongoose } = require("mongoose");

// const dbgr = require("debug")("development:mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `${config.get("MONGODB_URI")}Multi_Vendor_ECommerce`
    );
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1); // Exit process if connection fails
  }
};

module.exports = connectDB;

// | Shell                  | Correct Command to Set `DEBUG` |
// | ---------------------- | ------------------------------ |
// | PowerShell             | `$env:DEBUG="development:*"`   |
// | CMD                    | `set DEBUG=development:*`      |
// | Git Bash / Linux / Mac | `export DEBUG=development:*`   |
