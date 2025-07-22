const listOfOrders = async (req, res) => {
  try {
  } catch (error) {
    console.error("Get Orders Error:", error.message);
    return res.status(500).send({
      status: false,
      msg: "Server error",
      error: error.message,
    });
  }
};

const placeOrder = async (req, res) => {
  try {
    const { shippingAddress } = req.body;
  } catch (error) {
    console.error("Create Order Error:", error.message);
    return res.status(500).send({
      status: false,
      msg: "Server error",
      error: error.message,
    });
  }
};
const cancelOrder = async (req, res) => {
  try {
  } catch (error) {
    console.error("Cancel Order Error:", error.message);
    return res.status(500).send({
      status: false,
      msg: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  listOfOrders,
  placeOrder,
  cancelOrder,
};
