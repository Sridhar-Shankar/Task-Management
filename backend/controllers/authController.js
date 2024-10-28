const Profile = require("../models/Profile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register a profile
const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingProfile = await Profile.findOne({ email });
        if (existingProfile) {
            return res.status(400).json({ message: "Profile already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newProfile = new Profile({
            name,
            email,
            password: hashedPassword,
        });

        await newProfile.save();
        res.status(201).json({ message: "Profile registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error registering profile", error });
    }
};

// Login a profile
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const profile = await Profile.findOne({ email });
        if (!profile) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, profile.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: profile._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: "Logged in successfully", token, profileName: profile.name });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
};

// Get all profiles
const getAllProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find().select('-password'); // Exclude passwords
        res.status(200).json({ profiles });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

module.exports = {
    register,
    login,
    getAllProfiles,
};
