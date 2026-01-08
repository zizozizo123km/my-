import React, { useState, useMemo } from 'react';

// --- Mock Data and Constants ---
const TAX_RATE = 0.08; // 8%
const SHIPPING_COST = 15.00; // Flat rate

const initialCartItems = [
    { id: 101, name: "Wireless Mechanical Keyboard", price: 129.99, quantity: 1, image: "/images/keyboard.jpg", color: "Black" },
    { id: 205, name: "4K Ultra HD Monitor 27\"", price: 499.00, quantity: 2, image: "/images/monitor.jpg", color: "Space Gray" },
    { id: 312, name: "Ergonomic Vertical Mouse", price: 45.50, quantity: 1, image: "/images/mouse.jpg", color: "White" },
];

// --- Utility Functions ---
const formatCurrency = (amount) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
}).format(amount);

// --- Internal Components ---

const QuantityControl = ({ quantity, onUpdate }) => (
    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-24">
        <button
            onClick={() => onUpdate(Math.max(1, quantity - 1))}
            className="p-2 text-gray-600 hover:bg-gray-100 transition duration-150 disabled:opacity-50"
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
        >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg>
        </button>
        <span className="flex-grow text-center text-sm font-medium select-none">{quantity}</span>
        <button
            onClick={() => onUpdate(quantity + 1)}
            className="p-2 text-gray-600 hover:bg-gray-100 transition duration-150"
            aria-label="Increase quantity"
        >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
        </button>
    </div>
);

const CartItem = ({ item, updateQuantity, removeItem }) => {
    const itemTotal = item.price * item.quantity;

    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center py-6 border-b border-gray-200 last:border-b-0">
            {/* Image */}
            <div className="w-full sm:w-32 flex-shrink-0 mb-4 sm:mb-0">
                <img
                    src={item.image || 'https://via.placeholder.com/150'}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg shadow-md"
                />
            </div>

            {/* Details */}
            <div className="flex-grow sm:ml-6">
                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-500 mt-1">Color: {item.color}</p>
                <p className="text-sm font-medium text-indigo-600 mt-1">{formatCurrency(item.price)} per unit</p>
            </div>

            {/* Controls & Price */}
            <div className="flex items-center justify-between w-full sm:w-auto sm:ml-6 mt-4 sm:mt-0">
                <div className="sm:mr-8">
                    <QuantityControl
                        quantity={item.quantity}
                        onUpdate={(newQuantity) => updateQuantity(item.id, newQuantity)}
                    />
                </div>

                <div className="text-right flex flex-col items-end">
                    <p className="text-lg font-bold text-gray-900">{formatCurrency(itemTotal)}</p>
                    <button
                        onClick={() => removeItem(item.id)}
                        className="text-sm text-red-500 hover:text-red-700 mt-1 flex items-center transition duration-150"
                        aria-label={`Remove ${item.name}`}
                    >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
};

const OrderSummary = ({ totals }) => (
    <div className="bg-white p-6 lg:p-8 rounded-xl shadow-lg sticky top-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-3">Order Summary</h2>

        <div className="space-y-4 text-gray-700">
            <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium">{formatCurrency(totals.subtotal)}</span>
            </div>
            <div className="flex justify-between">
                <span>Shipping Estimate</span>
                <span className="font-medium">{formatCurrency(totals.shipping)}</span>
            </div>
            <div className="flex justify-between">
                <span>Tax Estimate ({TAX_RATE * 100}%)</span>
                <span className="font-medium">{formatCurrency(totals.tax)}</span>
            </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between items-center">
            <span className="text-xl font-bold text-gray-900">Order Total</span>
            <span className="text-2xl font-extrabold text-indigo-600">{formatCurrency(totals.total)}</span>
        </div>

        <button
            className="mt-8 w-full bg-indigo-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition duration-300 shadow-md shadow-indigo-300"
        >
            Proceed to Checkout
        </button>

        <p className="text-xs text-gray-500 mt-4 text-center">
            Shipping calculated at checkout based on destination.
        </p>
    </div>
);


// --- Main Page Component ---

const CartPage = () => {
    const [cartItems, setCartItems] = useState(initialCartItems);

    const handleUpdateQuantity = (id, newQuantity) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const handleRemoveItem = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const totals = useMemo(() => {
        const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const shipping = subtotal > 0 ? SHIPPING_COST : 0;
        const tax = subtotal * TAX_RATE;
        const total = subtotal + shipping + tax;
        return { subtotal, shipping, tax, total };
    }, [cartItems]);

    const isCartEmpty = cartItems.length === 0;

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-10 border-b pb-4">
                    Shopping Cart
                </h1>

                {isCartEmpty ? (
                    <div className="text-center py-20 bg-white rounded-xl shadow-lg">
                        <svg className="mx-auto h-16 w-16 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                        <h2 className="mt-4 text-2xl font-semibold text-gray-900">Your cart is empty</h2>
                        <p className="mt-2 text-gray-500">Looks like you haven't added anything to your cart yet.</p>
                        <a
                            href="/"
                            className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300"
                        >
                            Start Shopping
                        </a>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Cart Items List (Col 1 & 2) */}
                        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
                            <div className="divide-y divide-gray-200">
                                {cartItems.map(item => (
                                    <CartItem
                                        key={item.id}
                                        item={item}
                                        updateQuantity={handleUpdateQuantity}
                                        removeItem={handleRemoveItem}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Order Summary (Col 3) */}
                        <div className="lg:col-span-1">
                            <OrderSummary totals={totals} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;