const {
  getSavedDetails,
  postVariable,
  postFiledVariable,
} = require("../controllers/variable.controller");

const router = require("express").Router();

router.get("/secrets", getSavedDetails);
router.post("/plainSecret", postVariable);
router.post("/filesSecret", postFiledVariable);

module.exports = router;
