const router = require('express').Router();
const UserController = require('../controllers/user.controller');

router.post('/create',UserController.register);

module.exports = router;