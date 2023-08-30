const express = require('express')
const router = express.Router()
const Controller = require("../controllers");

const authentication = require("../middleware/authentication");

router.post('/register', Controller.register);
router.post('/login', Controller.login);
router.post('/google-login', Controller.googleLogin);
router.post('/account', Controller.getUsername);
router.use(authentication);
router.get('/diamonds', Controller.getDiamonds);
router.get('/heroes', Controller.getHeroes);
router.get('/histories', Controller.getHistories);
router.get('/heroes/:id', Controller.getHeroesById);
router.post('/generate-midtrans-token', Controller.paymentGateway);
router.patch('/carts/:cartId', Controller.updateStatusPaid);

module.exports = router;
