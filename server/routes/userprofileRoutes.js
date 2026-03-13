const express = require("express");
const router = express.Router();
const { createProfile, getMyProfile,
  getProfileByUserId, updateProfile, deleteProfile
} = require("../controllers/userprofileController");
const { protect } = require("../middlewares/auth");

router.post("/profile", protect, createProfile);
router.get("/me", protect, getMyProfile);
router.get("/:userId", protect, getProfileByUserId);
router.put("/update", protect, updateProfile);
router.delete("/delete", protect, deleteProfile);

module.exports = router;
