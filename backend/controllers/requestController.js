const Request = require("../models/Request");

exports.createRequest = async (req, res) => {
  try {
    const request = new Request(req.body);
    await request.save();
    return res.status(201).json(request);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create request.", error: error.message });
  }
};

exports.getRequests = async (req, res) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    return res.status(200).json(requests);
  } catch (error) {
    return res.status(500).json({ message: "Failed to load requests.", error: error.message });
  }
};

exports.updateRequest = async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!request) {
      return res.status(404).json({ message: "Request not found." });
    }
    return res.status(200).json(request);
  } catch (error) {
    return res.status(500).json({ message: "Unable to update request.", error: error.message });
  }
};

exports.deleteRequest = async (req, res) => {
  try {
    const request = await Request.findByIdAndDelete(req.params.id);
    if (!request) {
      return res.status(404).json({ message: "Request not found." });
    }
    return res.status(200).json({ message: "Request canceled." });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete request.", error: error.message });
  }
};
