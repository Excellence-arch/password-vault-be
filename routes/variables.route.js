const {
  getSavedDetails,
  postVariable,
  postFiledVariable,
} = require("../controllers/variable.controller");
const authenticate = require("../utils/auth");

const router = require("express").Router();

router.get("/secrets", authenticate, getSavedDetails);
router.post("/plainSecret", authenticate, postVariable);
router.post("/filesSecret", authenticate, postFiledVariable);

module.exports = router;
