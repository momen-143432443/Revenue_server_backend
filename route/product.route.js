const router = require('express').Router();
const { connect } = require('http2');
const ProductController = require('../controllers/product.controller');

router.post('/insertInfoOfPurchase',ProductController.insertProductToDatabase);
router.get('/getOrderStatus',ProductController.getOrderStatusFromDatabase);
router.get('/FetchProductsMostOfTrindingToUser',ProductController.FetchAllItemsMostOfTrinding);

module.exports = router;