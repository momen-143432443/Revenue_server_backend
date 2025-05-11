const router = require('express').Router();
const ProductController = require('../controllers/product.controller');

router.post('/insertInfoOfPurchase',ProductController.insertProductToDatabase);
router.get('/getOrderStatus',ProductController.getOrderStatusFromDatabase);

module.exports = router;