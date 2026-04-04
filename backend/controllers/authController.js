const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if (!phone) {
      return res.status(400).json({ message: "Phone number is required." });
    }

    let user = await User.findOne({ phone });
    if (!user) {
      user = new User({ name, email, phone });
      await user.save();
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Registration failed.", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({ message: "Phone number is required." });
    }

    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Login failed.", error: error.message });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    if (!phone || !otp) {
      return res.status(400).json({ message: "Phone and OTP are required." });
    }

    if (otp.length < 4) {
      return res.status(400).json({ message: "OTP is invalid." });
    }

    let user = await User.findOne({ phone });
    if (!user) {
      user = new User({ phone });
      await user.save();
    }

    return res.status(200).json({
      message: "OTP verified successfully.",
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: "OTP verification failed.", error: error.message });
  }
};
