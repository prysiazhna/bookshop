const { Cart, CartItem, Book, Author} = require('../models/models');
const ApiErrorHandler = require('../errorHandler/apiErrorHandler');

class CartController {
    async getCart(req, res, next) {
        try {
            const userId = req.user.id;
            const cart = await Cart.findOne({
                where: { userId },
                include: [
                    {
                        model: CartItem,
                        as: 'cartItems',
                        include: [
                            {
                                model: Book,
                                as: 'book',
                                include: [
                                    {
                                        model: Author,
                                        as: 'author'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });

            if (!cart) {
                return next(ApiErrorHandler.notFound('Cart not found'));
            }

            return res.json(cart);
        } catch (error) {
            return next(ApiErrorHandler.internal('Internal server error'));
        }
    }

    async addToCart(req, res, next) {
        try {
            const userId = req.user.id;
            const { bookId, quantity } = req.body;

            let cart = await Cart.findOne({ where: { userId } });

            if (!cart) {
                cart = await Cart.create({ userId, totalPrice: 0 });
            }

            let cartItem = await CartItem.findOne({
                where: { cartId: cart.id, bookId }
            });

            if (cartItem) {
                cartItem.quantity += quantity;
                await cartItem.save();
            } else {
                const book = await Book.findByPk(bookId);
                if (!book) {
                    return next(ApiErrorHandler.notFound('Book not found'));
                }

                cartItem = await CartItem.create({
                    cartId: cart.id,
                    bookId,
                    quantity,
                    price: book.price
                });
            }

            cart.totalPrice += cartItem.price * quantity;
            await cart.save();

            return res.json(cartItem);
        } catch (error) {
            console.log(error)
            return next(ApiErrorHandler.internal('Internal server error'));
        }
    }

    async removeFromCart(req, res, next) {
        try {
            const userId = req.user.id;
            const { bookId } = req.params;

            const cart = await Cart.findOne({ where: { userId } });
            if (!cart) {
                return next(ApiErrorHandler.notFound('Cart not found'));
            }

            const cartItem = await CartItem.findOne({
                where: { cartId: cart.id, bookId }
            });

            if (!cartItem) {
                return next(ApiErrorHandler.notFound('Item not found in cart'));
            }

            cart.totalPrice -= cartItem.price * cartItem.quantity;
            await cartItem.destroy();
            await cart.save();

            return res.json({ message: 'Item removed from cart' });
        } catch (error) {
            return next(ApiErrorHandler.internal('Internal server error'));
        }
    }

    async updateCartItemQuantity(req, res, next) {
        try {
            const userId = req.user.id;
            const { bookId, quantity } = req.body;

            const cart = await Cart.findOne({ where: { userId } });
            if (!cart) {
                return next(ApiErrorHandler.notFound('Cart not found'));
            }

            const cartItem = await CartItem.findOne({
                where: { cartId: cart.id, bookId }
            });

            if (!cartItem) {
                return next(ApiErrorHandler.notFound('Item not found in cart'));
            }

            const priceDifference = cartItem.price * (quantity - cartItem.quantity);
            cartItem.quantity = quantity;
            await cartItem.save();

            cart.totalPrice += priceDifference;
            await cart.save();

            return res.json(cartItem);
        } catch (error) {
            return next(ApiErrorHandler.internal('Internal server error'));
        }
    }

    async clearCart(req, res, next) {
        try {
            const { cartId } = req.params;
            const cart = await Cart.findOne({ where: { id: cartId } });
            if (!cart) {
                return next(ApiErrorHandler.notFound('Cart not found'));
            }

            await CartItem.destroy({ where: { cartId } });
            cart.totalPrice = 0;
            await cart.save();

            return res.json({ message: 'Cart cleared' });
        } catch (error) {
            return next(ApiErrorHandler.internal('Internal server error'));
        }
    }

}

module.exports = new CartController();
