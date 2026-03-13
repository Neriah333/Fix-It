const UserProfile = require("../models/user_profile");

// @desc    Create user profile
exports.createProfile = async (req, res) => {
  try {
    const { bio, phone, address, skills, preferences } = req.body;
    
    // FIX: Check if profile exists first
    const existingProfile = await UserProfile.findOne({ user: req.user.id });
    if (existingProfile) {
      return res.status(400).json({ message: "Profile already exists" });
    }

    const profile = await UserProfile.create({
      user: req.user.id,
      bio, 
      phone, 
      address, 
      skills, 
      preferences
    });

    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update profile
exports.updateProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // This updates the fields found in req.body into the profile document
    Object.assign(profile, req.body);

    await profile.save();
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ... keep your other controllers (getMyProfile, deleteProfile, etc.) as they are

exports.getMyProfile = async (req, res) => {
  try {
    // Add .populate("user", "username email") to pull those fields from UserAccount
    const profile = await UserProfile.findOne({ user: req.user.id })
      .populate("user", "username email"); 

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProfileByUserId = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({
      user: req.params.userId,
    }).populate("user");

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({
      user: req.user.id,
    });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    Object.assign(profile, req.body);

    await profile.save();

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Corrected searchUsers
exports.searchUsers = async (req, res) => {
  try {
    const keyword = req.query.keyword;
    
    // Search in UserAccount, then populate the profile
    const users = await UserAccount.find({
      username: { $regex: keyword, $options: "i" }
    }).select("username");

    // Map these users to their profiles
    const profiles = await UserProfile.find({ 
      user: { $in: users.map(u => u._id) } 
    }).populate("user", "username");

    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({
      user: req.user.id,
    });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    await profile.deleteOne();

    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
