const Profile = require("../models/Profile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

const getProfile = async (req, res) => {
    try {
        const profile = await Profile.findById(req.user.id).select("-password"); // Exclude password
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.status(200).json({ profile });
    } catch (error) {
        res.status(500).json({ message: "Error fetching profile", error });
    }
};

module.exports = {
    register,
    login,
    getProfile,
};
