const router = require("express").Router();
const { getConverted } = require("../controller/currency");

router.post("/", getConverted);

module.exports = router;
