const Donor = require("../models/Donor");

exports.createDonor = async (req, res) => {
  try {
    const donor = new Donor({
      ...req.body,
      availability: req.body.availability !== undefined ? req.body.availability : true,
    });
    await donor.save();
    return res.status(201).json(donor);
  } catch (error) {
    return res.status(500).json({ message: "Failed to register donor.", error: error.message });
  }
};

exports.getDonors = async (req, res) => {
  try {
    const donors = await Donor.find().sort({ createdAt: -1 });
    return res.status(200).json(donors);
  } catch (error) {
    return res.status(500).json({ message: "Failed to load donors.", error: error.message });
  }
};

exports.getDonorById = async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    if (!donor) {
      return res.status(404).json({ message: "Donor not found." });
    }
    return res.status(200).json(donor);
  } catch (error) {
    return res.status(500).json({ message: "Failed to load donor.", error: error.message });
  }
};

exports.updateDonor = async (req, res) => {
  try {
    const donor = await Donor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!donor) {
      return res.status(404).json({ message: "Donor not found." });
    }
    return res.status(200).json(donor);
  } catch (error) {
    return res.status(500).json({ message: "Unable to update donor.", error: error.message });
  }
};

exports.matchDonors = async (req, res) => {
  try {
    const { bloodGroup, location } = req.query;
    if (!bloodGroup) {
      return res.status(400).json({ message: "Blood group is required." });
    }

    let query = { availability: true, bloodGroup };

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    const donors = await Donor.find(query).sort({ createdAt: -1 });
    return res.status(200).json(donors);
  } catch (error) {
    return res.status(500).json({ message: "Failed to find matching donors.", error: error.message });
  }
};

exports.deleteDonor = async (req, res) => {
  try {
    const donor = await Donor.findByIdAndDelete(req.params.id);
    if (!donor) {
      return res.status(404).json({ message: "Donor not found." });
    }
    return res.status(200).json({ message: "Donor removed." });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete donor.", error: error.message });
  }
};
