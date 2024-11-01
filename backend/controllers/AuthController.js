const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) return res.json({ message: "Wrong Email or Password" });

    try {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 180 });
            res.json({ token, user });
        } else {
            res.json({ message: "Wrong Email or Password" });
        }
    } catch (error) {
        res.json({ message: "An error occurred" });
    }
};

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) return res.json({ message: "Email already exists" });

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ name, email, password: hashedPassword });
        const savedUser = await newUser.save();
        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: 180 });
        res.json({ token, user: savedUser });
    } catch (error) {
        res.json({ message: "An error occurred" });
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, password } = req.body;
    try {
        const updatedData = { name };
        if (password) updatedData.password = await bcrypt.hash(password, 10);
        const updatedUser = await UserModel.findByIdAndUpdate(id, updatedData, { new: true });
        res.json({ updatedUser });
    } catch (error) {
        res.json({ message: "An error occurred" });
    }
};
