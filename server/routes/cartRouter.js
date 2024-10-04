const Router = require('express');
const router = new Router();
const cartController = require("../controllers/cartController");
const {verifyToken} = require("../middleware/authMiddleware");

router.get('/', verifyToken, cartController.getCart);
router.post('/add', verifyToken, cartController.addToCart);
router.delete('/remove/:bookId', verifyToken, cartController.removeFromCart);
router.put('/update', verifyToken, cartController.updateCartItemQuantity);
router.post('/clear/:cartId', verifyToken, cartController.clearCart);

module.exports = router;
