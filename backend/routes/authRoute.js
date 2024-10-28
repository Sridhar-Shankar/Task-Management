const express = require("express");
const router = express.Router();
const {register, login, getAllProfiles} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.get('/admins', getAllProfiles);

module.exports = router;