const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createDonor,
  getDonors,
  getDonorById,
  updateDonor,
  deleteDonor,
  matchDonors,
} = require("../controllers/donorController");

router.post("/", authMiddleware, createDonor);
router.get("/search/match", matchDonors);
router.get("/search", matchDonors);
router.get("/match", matchDonors);
router.get("/", getDonors);
router.get("/:id", getDonorById);
router.put("/:id", authMiddleware, updateDonor);
router.delete("/:id", authMiddleware, deleteDonor);

module.exports = router;
