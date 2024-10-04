import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {
    clearCart,
    fetchCart,
    removeItemFromCart, selectCartId,
    selectCartItems,
    selectCartTotal,
    updateCartItemQuantity
} from "../store/slices/cartSlice";
import CartItem from "../components/cart/CartItem";
import {fetchBooks} from "../store/slices/bookSlice";
import {fetchUsers} from "../store/slices/userSlice";
import {fetchAuthors} from "../store/slices/authorSlice";
import {fetchCategories} from "../store/slices/categorySlice";

const CartPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector(selectCartItems);
    const total = useAppSelector(selectCartTotal);
    const cartId = useAppSelector(selectCartId);

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    const handleRemove = (id: number) => {
        dispatch(removeItemFromCart(id));
    };

    const handleClear = () => {
        if (cartId) {
            dispatch(clearCart(cartId));
        }
    };

    const handleQuantityChange = (bookId: number, quantity: number) => {
        dispatch(updateCartItemQuantity({bookId, quantity}));
    };

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Your Cart</h1>
                {cartItems.length > 0 && (
                    <button
                        className="text-sm text-purple-600 hover:underline mt-2"
                        onClick={() => handleClear()}>
                        Clear cart
                    </button>
                )}
            </div>
            {cartItems.length > 0 ? (
                <div className="bg-white rounded-lg shadow-lg p-6">
                    {cartItems.map((item) => (
                        <CartItem
                            key={item.book.id}
                            book={item.book}
                            quantity={item.quantity}
                            onRemove={handleRemove}
                            onQuantityChange={handleQuantityChange}
                        />
                    ))}
                    <div className="mt-8 border-t pt-4">
                        <div className="space-y-2">
                            <div className="flex justify-between font-bold">
                                <p className="text-lg">Order total</p>
                                <p className="text-lg">${total.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Your cart is empty</p>
            )}
        </div>
    );
};

export default CartPage;
