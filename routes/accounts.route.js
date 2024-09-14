const { login, register } = require("../controllers/user.controller");
const { loginRateLimiter } = require("../utils/rateLimiter");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", loginRateLimiter, login);

module.exports = router;
