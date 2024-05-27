const router = require("express").Router();
const { getProfile } = require("../controller/user");
const verify = require("../middleware/auth");

router.get("/", verify, getProfile);

module.exports = router;
