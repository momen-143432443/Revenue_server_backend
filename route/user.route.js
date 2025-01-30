const router = require('express').Router();
const UserController = require('../controllers/user.controller');

router.post('/registrantion',UserController.register);

module.exports = router;