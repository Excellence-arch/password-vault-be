const { login, register } = require("../controllers/user.controller");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;