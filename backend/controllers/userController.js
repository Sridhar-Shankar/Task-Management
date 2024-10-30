const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json({ message: "Invalid email or password." });
    }

    try {
        const hasMatch = await bcrypt.compare(password, user.password);
        if (hasMatch) {
            const jwttoken = jwt.sign(user.toJSON(), process.env.JWT_SECRET, { expiresIn: '3h' });
            res.json({ jwttoken, user });
        } else {
            res.status(401).json({ message: "Invalid email or password." });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred during login. Please try again." });
    }
};

const register = async (req, res) => {
    const { name, email, password } = req.body;

    const alreadyUser = await User.findOne({ email });
    if (alreadyUser) {
        return res.status(400).json({ message: "Email already in use. Please choose another." });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        const savedUser = await user.save();
        const jwttoken = jwt.sign(user.toJSON(), process.env.JWT_SECRET, { expiresIn: '3h' });
        res.status(201).json({ jwttoken, user: savedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred during registration. Please try again." });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;

    try {
        const { name, password } = req.body;
        const updateData = {};

        if (name) updateData.name = name;
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found." });
        }

        res.json({ user: updatedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred while updating user information. Please try again." });
    }
};

module.exports = {
    login,
    register,
    updateUser,
};
