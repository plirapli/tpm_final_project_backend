const router = require("express").Router();
const verify = require("../middleware/auth");
const product = require("../controller/product");

router.get("/category/:category_id", product.getProductByCategory);
router.get("/total", product.getProductTotal);
router.get("/total/price", product.getProductTotalPrice);
router.get("/total/:category_id", product.getProductTotalByCategory);
router.get("/max/price", product.getMaxPriceProduct);
router.get("/max/qty", product.getMaxQtyProduct);
router.post("/:category_id", verify, product.insertProduct);
router.put("/:id", verify, product.updateProduct);
router.delete("/:id", verify, product.deleteProduct);

module.exports = router;
