const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createRequest,
  getRequests,
  updateRequest,
  deleteRequest,
} = require("../controllers/requestController");

router.post("/", authMiddleware, createRequest);
router.get("/", getRequests);
router.put("/:id", authMiddleware, updateRequest);
router.delete("/:id", authMiddleware, deleteRequest);

module.exports = router;
