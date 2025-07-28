const ORDER_STATUS_LIST = [
  {
    id: 1,

    name: "Pending",

    value: "PENDING",

    description: "Order received but not yet processed.",
  },

  {
    id: 2,

    name: "Confirmed",

    value: "CONFIRMED",

    description: "Order has been confirmed and is ready for processing.",
  },

  {
    id: 3,

    name: "Processing",

    value: "PROCESSING",

    description: "Order is being prepared, packed, or printed.",
  },

  {
    id: 4,

    name: "Ready for Pickup",

    value: "READY_FOR_PICKUP",

    description: "Order is ready and waiting for the courier pickup.",
  },

  {
    id: 5,

    name: "Picked Up",

    value: "PICKED_UP",

    description: "Courier has picked up the order from warehouse/vendor.",
  },

  {
    id: 6,

    name: "In Transit",

    value: "IN_TRANSIT",

    description: "Package is moving through the logistics network.",
  },

  {
    id: 7,

    name: "Out for Delivery",

    value: "OUT_FOR_DELIVERY",

    description: "Delivery agent is en route to deliver the order.",
  },

  {
    id: 8,

    name: "Delivered",

    value: "DELIVERED",

    description: "Order successfully delivered to the customer.",
  },

  {
    id: 9,

    name: "Cancelled",

    value: "CANCELLED",

    description: "Order has been cancelled by customer or admin.",
  },

  {
    id: 10,

    name: "Returned",

    value: "RETURNED",

    description: "Order was delivered but returned by customer.",
  },

  {
    id: 11,

    name: "Refunded",

    value: "REFUNDED",

    description: "Customer refund has been processed.",
  },

  {
    id: 12,

    name: "Failed",

    value: "FAILED",

    description: "Delivery failed due to incorrect address or no response.",
  },

  {
    id: 13,

    name: "On Hold",

    value: "ON_HOLD",

    description: "Order is paused due to payment, stock, or other issues.",
  },

  {
    id: 14,

    name: "Reattempt",

    value: "REATTEMPT",

    description: "Delivery failed and is scheduled for another attempt.",
  },
];
const PAYMENT_STATUS_LIST = [
  {
    id: 1,

    name: "Pending",

    value: "PENDING",

    description: "Payment not yet completed or awaiting customer action.",
  },

  {
    id: 2,

    name: "Success",

    value: "SUCCESS",

    description: "Payment completed successfully and verified.",
  },

  {
    id: 3,

    name: "Failed",

    value: "FAILED",

    description: "Payment attempt failed due to an error or decline.",
  },

  {
    id: 4,

    name: "Refunded",

    value: "REFUNDED",

    description: "Payment has been refunded to the customer.",
  },

  {
    id: 5,

    name: "Partially Paid",

    value: "PARTIALLY_PAID",

    description: "Partial payment received, balance is pending.",
  },

  {
    id: 6,

    name: "Overpaid",

    value: "OVERPAID",

    description: "Payment received exceeds invoice amount.",
  },

  {
    id: 7,

    name: "Chargeback",

    value: "CHARGEBACK",

    description: "Payment disputed and reversed by the customer.",
  },

  {
    id: 8,

    name: "Cancelled",

    value: "CANCELLED",

    description: "Payment was cancelled before completion.",
  },

  {
    id: 9,

    name: "Awaiting Refund",

    value: "AWAITING_REFUND",

    description: "Refund is in process but not yet completed.",
  },
];
const PAYMENT_STATUS = [
  "PENDING",
  "SUCCESS",
  "FAILED",
  "REFUNDED",
  "PARTIALLY_PAID",
  "OVERPAID",
  "CHARGE_BACK",
  "CANCELLED",
  "AWAITING_REFUND",
];
const ORDER_STATUS = [
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "READY_FOR_PICKUP",
  "PICKED_UP",
  "IN_TRANSIT",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "CANCELLED",
  "RETURNED",
  "REFUNDED",
  "FAILED",
  "ON_HOLD",
  "REATTEMPT",
];
const PAYMENT_METHOD_LIST = [
  {
    id: 1,
    name: "Cash",
    value: "CASH",
    description: "Cash payment collected on delivery or pickup.",
  },
  {
    id: 2,
    name: "Card",
    value: "CARD",
    description: "Paid via debit/credit card using POS or online gateway.",
  },
  {
    id: 3,
    name: "UPI",
    value: "UPI",
    description: "Payment done through UPI apps like PhonePe, GPay, or Paytm.",
  },
  {
    id: 4,
    name: "Net Banking",
    value: "NET_BANKING",
    description: "Paid via online banking (IMPS, NEFT, RTGS, etc.).",
  },
  {
    id: 5,
    name: "Wallet",
    value: "WALLET",
    description: "Paid via digital wallets like Paytm Wallet, Amazon Pay, etc.",
  },
  {
    id: 6,
    name: "EMI",
    value: "EMI",
    description: "Payment done via EMI plans on cards or apps.",
  },
  {
    id: 7,
    name: "Cash on Delivery",
    value: "COD",
    description: "Customer will pay in cash at the time of delivery.",
  },
  {
    id: 8,
    name: "Bank Transfer",
    value: "BANK_TRANSFER",
    description: "Manual payment via bank account transfer.",
  },
  {
    id: 9,
    name: "Cheque/DD",
    value: "CHEQUE",
    description: "Payment made via cheque or demand draft.",
  },
  {
    id: 10,
    name: "Others",
    value: "OTHERS",
    description: "Any other custom or offline payment method.",
  },
];
const PAYMENT_METHOD = [
  "COD",
  "CASH",
  "CARD",
  "UPI",
  "NET_BANKING",
  "WALLET",
  "EMI",
  "BANK_TRANSFER",
  "CHEQUE",
  "OTHERS",
];

const ORDER_TYPE = ["SINGLE", "CART"];

const ROLE = ["customer", "admin", "vendor"];
const GENDER = ["male", "female", "other"];
module.exports = {
  ROLE,
  GENDER,
  ORDER_STATUS,
  ORDER_STATUS_LIST,
  PAYMENT_STATUS,
  PAYMENT_STATUS_LIST,
  PAYMENT_METHOD,
  PAYMENT_METHOD_LIST,
  ORDER_TYPE,
};
