import React, { createContext, useReducer, useContext, useCallback, useEffect } from 'react';

// --- Constants and Storage Key ---
const CART_STORAGE_KEY = 'ecom_cart_state';

// --- Initial State ---
const initialState = {
    items: [], // [{ id, name, price, quantity, image }]
    totalItems: 0,
    totalAmount: 0,
};

// --- Helper Functions ---

/**
 * Calculates the total number of items and the total monetary amount in the cart.
 * @param {Array} items - The current array of cart items.
 * @returns {{totalItems: number, totalAmount: number}}
 */
const calculateTotals = (items) => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    // Ensure totalAmount is formatted correctly (e.g., two decimal places)
    return {
        totalItems,
        totalAmount: parseFloat(totalAmount.toFixed(2)),
    };
};

/**
 * Custom initializer function for useReducer to load state from localStorage.
 * @param {Object} defaultState
 * @returns {Object}
 */
const initializer = (defaultState) => {
    try {
        const storedState = localStorage.getItem(CART_STORAGE_KEY);
        if (storedState) {
            return JSON.parse(storedState);
        }
    } catch (error) {
        console.error("Error loading cart state from localStorage:", error);
    }
    return defaultState;
};

// --- Reducer Logic ---

const cartReducer = (state, action) => {
    let newItems;
    let existingItemIndex;

    switch (action.type) {
        case 'ADD_ITEM':
            const product = action.payload;
            const quantityToAdd = product.quantity || 1;

            existingItemIndex = state.items.findIndex(item => item.id === product.id);

            if (existingItemIndex > -1) {
                // Item exists, update quantity
                newItems = state.items.map((item, index) =>
                    index === existingItemIndex
                        ? { ...item, quantity: item.quantity + quantityToAdd }
                        : item
                );
            } else {
                // New item
                newItems = [...state.items, { ...product, quantity: quantityToAdd }];
            }

            return {
                ...state,
                items: newItems,
                ...calculateTotals(newItems),
            };

        case 'REMOVE_ITEM':
            newItems = state.items.filter(item => item.id !== action.payload.id);

            return {
                ...state,
                items: newItems,
                ...calculateTotals(newItems),
            };

        case 'UPDATE_QUANTITY':
            const { id, quantity } = action.payload;

            if (quantity <= 0) {
                // If quantity is zero or less, remove the item
                newItems = state.items.filter(item => item.id !== id);
            } else {
                // Update quantity
                newItems = state.items.map(item =>
                    item.id === id
                        ? { ...item, quantity: quantity }
                        : item
                );
            }

            return {
                ...state,
                items: newItems,
                ...calculateTotals(newItems),
            };

        case 'CLEAR_CART':
            return {
                ...initialState,
            };

        default:
            return state;
    }
};

// --- Context Creation ---
const CartContext = createContext(undefined);

// --- Provider Component ---

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState, initializer);

    // Effect to persist state to localStorage whenever state changes
    useEffect(() => {
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
        } catch (error) {
            console.error("Could not save cart state to localStorage:", error);
        }
    }, [state]);

    // Memoized dispatch functions
    const addItem = useCallback((product) => {
        dispatch({ type: 'ADD_ITEM', payload: product });
    }, []);

    const removeItem = useCallback((id) => {
        dispatch({ type: 'REMOVE_ITEM', payload: { id } });
    }, []);

    const updateQuantity = useCallback((id, quantity) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }, []);

    const clearCart = useCallback(() => {
        dispatch({ type: 'CLEAR_CART' });
    }, []);

    // Context value
    const contextValue = {
        ...state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

// --- Custom Hook for Consumption ---

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

// Export the context for potential advanced usage (though useCart is preferred)
export default CartContext;