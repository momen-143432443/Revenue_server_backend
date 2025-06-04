const router = require('express').Router();
const { connect } = require('http2');
const ProductController = require('../controllers/product.controller');
const { resourceLimits } = require('worker_threads');

router.post('/insertInfoOfPurchase',ProductController.insertProductToDatabase);
router.get('/getOrderStatus',ProductController.getOrderStatusFromDatabase);
router.get('/FetchProductsMostOfTrindingToUser',ProductController.FetchAllItemsMostOfTrinding);
router.get('/FetchProductsShoeItemsToUser', ProductController.FetchAllItemsShoes);
router.get('/FetchAllItemsFeatureItem', ProductController.FetchAllItemsFeatureItem);
router.get('/FetchNewItemsToUser',ProductController.FetchAllNewItems);
router.get('/FetchSpecificItemFromSearchBar',ProductController.FetchSpecificItemFromSearchBar);

module.exports = router;