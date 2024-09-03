const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', verifyToken, userController.check);
router.get('/',  userController.getAll);
router.delete('/:id', userController.delete);

module.exports = router