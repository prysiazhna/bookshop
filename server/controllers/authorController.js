const {Author, Category} = require('../models/models')
const ApiErrorHandler = require('../errorHandler/apiErrorHandler');

class AuthorController {
    async create(req, res, next) {
        try {
            const { name } = req.body;
            if (!name) {
                return next(ApiErrorHandler.badRequest('Author name is required'));
            }
            const author = await Author.create({ name });
            return res.json(author);
        } catch (error) {
            return next(ApiErrorHandler.internal('An error occurred while creating the author'));
        }
    }

    async getAll(req, res, next) {
        try {
            const authors = await Author.findAll();
            return res.json(authors);
        } catch (error) {
            return next(ApiErrorHandler.internal('An error occurred while retrieving authors'));
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { name } = req.body;

            if (!name) {
                return next(ApiErrorHandler.badRequest('Author name is required'));
            }
            const author = await Author.findByPk(id);
            if (!author) {
                return next(ApiErrorHandler.notFound('Author not found'));
            }

            author.name = name;
            await author.save();

            return res.json(author);
        } catch (error) {
            return next(ApiErrorHandler.internal('An error occurred while updating the author'));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const author = await Author.findByPk(id);
            if (!author) {
                return next(ApiErrorHandler.notFound('Author not found'));
            }
            await author.destroy();
            return res.json({ message: 'Author deleted successfully' });
        } catch (error) {
            return next(ApiErrorHandler.internal('An error occurred while deleting the author'));
        }
    }
}

module.exports = new AuthorController();