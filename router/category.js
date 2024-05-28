const router = require("express").Router();
const { getCategories } = require("../controller/category");

router.get("/", getCategories);

module.exports = router;
