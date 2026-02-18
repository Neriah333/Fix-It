const express = require("express");
const router = express.Router();
const profileController = require("../controllers/userprofileController");
const { protect } = require("../middleware/auth");

router.post("/", protect, profileController.createProfile);
router.get("/me", protect, profileController.getMyProfile);
router.get("/:userId", protect, profileController.getProfileByUserId);
router.put("/", protect, profileController.updateProfile);
router.delete("/", protect, profileController.deleteProfile);

module.exports = router;
