const router = require("express").Router();
const verify = require("../middleware/auth");
const product = require("../controller/product");

router.get("/:category_id", product.getProductByCategory);
router.get("/total", product.getProductTotal);
router.get("/total/:category_id", product.getProductTotalByCategory);
router.get("/max/price", product.getMaxPriceProduct);
router.get("/max/qty", product.getMaxQtyProduct);
router.post("/", verify, product.insertProduct);
router.put("/:id", verify, product.updateProduct);
router.delete("/:id", verify, product.deleteProduct);

module.exports = router;
