const router = require("express").Router();
const { login, register, updateUser } = require("../controllers/userController");

router.post("/login", login);
router.post("/register", register);
router.patch("/updateuser/:id", updateUser);

module.exports = router;
