const {Category} = require('../models/models')
const ApiErrorHandler = require('../errorHandler/apiErrorHandler');

class CategoryController {
    async create(req, res, next) {
        try {
            const { name } = req.body;
            if (!name) {
                return next(ApiErrorHandler.badRequest('Category name is required'));
            }
            const category = await Category.create({ name });
            return res.json(category);
        } catch (error) {
            return next(ApiErrorHandler.internal('An error occurred while creating the category'));
        }
    }

    async getAll(req, res, next) {
        try {
            const categories = await Category.findAll();
            return res.json(categories);
        } catch (error) {
            return next(ApiErrorHandler.internal('An error occurred while retrieving categories'));
        }
    }
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { name } = req.body;

            if (!name) {
                return next(ApiErrorHandler.badRequest('Category name is required'));
            }
            const category = await Category.findByPk(id);
            if (!category) {
                return next(ApiErrorHandler.notFound('Category not found'));
            }

            category.name = name;
            await category.save();

            return res.json(category);
        } catch (error) {
            return next(ApiErrorHandler.internal('An error occurred while updating the category'));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const category = await Category.findByPk(id);
            if (!category) {
                return next(ApiErrorHandler.notFound('Category not found'));
            }
            await category.destroy();
            return res.json({ message: 'Category deleted successfully' });
        } catch (error) {
            return next(ApiErrorHandler.internal('An error occurred while deleting the category'));
        }
    }
}

module.exports = new CategoryController();