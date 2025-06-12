const router = require('express').Router();
const UserController = require('../controllers/user.controller');

router.post('/create',UserController.register);
router.get('/getUserData/:email', UserController.select);
router.post('/sendOTPToEmail',UserController.sendOTPToEmail);
router.post('/verfiyOTPToResetPassword', UserController.verifyOTP);
router.post('/resetPasswordOfEmail',UserController.resetPasswordOfEmail);


module.exports = router;