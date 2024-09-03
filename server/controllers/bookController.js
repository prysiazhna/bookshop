const {Book} = require('../models/models')
const ApiErrorHandler = require('../errorHandler/apiErrorHandler');
const uuid = require('uuid')
const path = require('path');
const {Op} = require("sequelize");
const fs = require('fs');

class BookController {
    async create(req, res, next) {
        try {
            const { title, price, stock, authorId, categoryIds } = req.body;

            if (!req.files || !req.files.img) {
                return next(ApiErrorHandler.badRequest("Image file is required"));
            }

            const { img } = req.files;
            let fileName = uuid.v4() + ".jpg";
            await img.mv(path.resolve(__dirname, '..', 'static', fileName));

            const parsedCategoryIds = JSON.parse(categoryIds);

            const newBook = await Book.create({
                title,
                price,
                stock,
                authorId,
                categoryIds: parsedCategoryIds,
                img: fileName
            });

            res.status(201).json(newBook);
        } catch (error) {
            next(ApiErrorHandler.internal('Something went wrong during book creation'));
        }
    }

    // async getAll(req, res, next) {
    //     try {
    //         const { authorId, categoryIds, limit = 9, page = 1 } = req.query;
    //         const offset = (page - 1) * limit;
    //
    //         const categoryIdsArray = categoryIds
    //             ? categoryIds.split(',').map(Number).filter(Boolean)
    //             : [];
    //
    //         const queryOptions = {
    //             limit: Number(limit),
    //             offset: Number(offset),
    //             where: {
    //                 ...(authorId && { authorId: Number(authorId) }),
    //                 ...(categoryIdsArray.length > 0 && { categoryIds: { [Op.contains]: categoryIdsArray } })
    //             }
    //         };
    //
    //         const books = await Book.findAndCountAll(queryOptions);
    //
    //         return res.json(books);
    //     } catch (error) {
    //         next(ApiErrorHandler.internal('Something went wrong while fetching books'));
    //     }
    // }

    async getAll(req, res, next) {
        try {
            const { authorId, categoryIds, limit = 9, page = 1 } = req.query;
            const offset = (page - 1) * limit;

            const categoryIdsArray = categoryIds
                ? categoryIds.split(',').map(Number).filter(Boolean)
                : [];

            const queryOptions = {
                limit: Number(limit),
                offset: Number(offset),
                where: {
                    ...(authorId && { authorId: Number(authorId) }),
                    ...(categoryIdsArray.length > 0 && { categoryIds: { [Op.contains]: categoryIdsArray } })
                }
            };

            const { count, rows } = await Book.findAndCountAll(queryOptions);

            return res.json({
                books: rows,
                totalBooks: count,
                totalPages: Math.ceil(count / limit),
                currentPage: Number(page),
            });
        } catch (error) {
            next(ApiErrorHandler.internal('Something went wrong while fetching books'));
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const book = await Book.findOne({
                where: { id }
            });

            if (!book) {
                return next(ApiErrorHandler.badRequest('Book not found'));
            }

            return res.json(book);
        } catch (error) {
            next(ApiErrorHandler.internal('Something went wrong while fetching the book'));
        }
    }


    async updateBook(req, res, next) {
        try {
            const { id } = req.params;
            const { title, price, stock, authorId, categoryIds } = req.body;

            const book = await Book.findOne({ where: { id } });

            if (!book) {
                return next(ApiErrorHandler.badRequest('Book not found'));
            }

            if (req.files && req.files.img) {
                const { img } = req.files;
                let fileName = uuid.v4() + ".jpg";
                await img.mv(path.resolve(__dirname, '..', 'static', fileName));
                book.img = fileName;
            }

            if (categoryIds) {
                book.categoryIds = JSON.parse(categoryIds);
            }

            book.title = title || book.title;
            book.price = price || book.price;
            book.stock = stock || book.stock;
            book.authorId = authorId || book.authorId;

            await book.save();

            return res.json(book);
        } catch (error) {
            next(ApiErrorHandler.internal('Something went wrong while updating the book'));
        }
    }

    async deleteBook(req, res, next) {
        try {
            const { id } = req.params;

            const book = await Book.findOne({ where: { id } });

            if (!book) {
                return next(ApiErrorHandler.badRequest('Book not found'));
            }

            const imgPath = path.resolve(__dirname, '..', 'static', book.img);
            if (fs.existsSync(imgPath)) {
                fs.unlinkSync(imgPath);
            }

            await book.destroy();

            return res.status(204).json({ message: 'Book deleted successfully' });
        } catch (error) {
            next(ApiErrorHandler.internal('Something went wrong while deleting the book'));
        }
    }
}

module.exports = new BookController();