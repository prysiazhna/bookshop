const Router = require('express');
const router = new Router();

const authorController = require('../controllers/authorController');
const { checkRole } = require('../middleware/authMiddleware');
const categoryController = require("../controllers/categoryController");

// router.post('/', checkRole('ADMIN'), authorController.create);
router.post('/', authorController.create);
router.get('/',  authorController.getAll);
router.put('/:id', authorController.update);
router.delete('/:id', authorController.delete);

module.exports = router;