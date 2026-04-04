const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
    trim: true,
  },
  bloodGroup: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  urgency: {
    type: String,
    enum: ["Normal", "Urgent", "Critical"],
    default: "Normal",
  },
  status: {
    type: String,
    enum: ["Pending", "Fulfilled", "Canceled"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Request", requestSchema);
