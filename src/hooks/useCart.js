import { useState, useEffect, useMemo, useCallback } from 'react';

// Key for localStorage persistence
const CART_STORAGE_KEY = 'ecom_cart';

/**
 * Helper function to safely load the initial cart state from localStorage.
 * @returns {Array} The stored cart items or an empty array.
 */
const getInitialCart = () => {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    return [];
  }
};

/**
 * A custom hook for managing the shopping cart state, including persistence
 * via localStorage and calculating derived values (totals).
 *
 * @returns {{
 *   cartItems: Array,
 *   totalItems: number,
 *   subtotal: number,
 *   addItem: (product: {id: string, name: string, price: number}, quantity?: number) => void,
 *   removeItem: (productId: string) => void,
 *   updateQuantity: (productId: string, newQuantity: number) => void,
 *   clearCart: () => void
 * }}
 */
export const useCart = () => {
  const [cartItems, setCartItems] = useState(getInitialCart);

  // --- Persistence Effect ---
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      // Handle potential quota exceeded errors
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cartItems]);

  // --- Derived State (Memoized Totals) ---
  const { totalItems, subtotal } = useMemo(() => {
    let totalItems = 0;
    let subtotal = 0;

    cartItems.forEach(item => {
      // Ensure quantity and price are valid numbers before calculation
      const quantity = Number(item.quantity) || 0;
      const price = Number(item.price) || 0;

      totalItems += quantity;
      subtotal += price * quantity;
    });

    // Use toFixed(2) for display purposes later, but keep as number here for calculations
    return {
      totalItems,
      subtotal: subtotal,
    };
  }, [cartItems]);

  // --- Cart Actions ---

  /**
   * Adds a product to the cart or increments its quantity if it already exists.
   * @param {{id: string, name: string, price: number}} product - The product details.
   * @param {number} [quantity=1] - The quantity to add.
   */
  const addItem = useCallback((product, quantity = 1) => {
    setCartItems(currentItems => {
      const existingItemIndex = currentItems.findIndex(item => item.id === product.id);

      if (existingItemIndex > -1) {
        // Item exists: Update quantity
        return currentItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // New item: Add to cart
        return [...currentItems, { ...product, quantity }];
      }
    });
  }, []);

  /**
   * Removes an item completely from the cart.
   * @param {string} productId - The ID of the product to remove.
   */
  const removeItem = useCallback((productId) => {
    setCartItems(currentItems =>
      currentItems.filter(item => item.id !== productId)
    );
  }, []);

  /**
   * Updates the quantity of a specific item. If newQuantity is 0 or less, the item is removed.
   * @param {string} productId - The ID of the product.
   * @param {number} newQuantity - The new quantity.
   */
  const updateQuantity = useCallback((productId, newQuantity) => {
    const quantity = Number(newQuantity);

    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setCartItems(currentItems =>
      currentItems.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  }, [removeItem]);

  /**
   * Clears all items from the cart.
   */
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  return {
    cartItems,
    totalItems,
    subtotal,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };
};

// Note: In a larger application, this hook would typically be wrapped by a CartProvider
// using React Context to make the state globally accessible without prop drilling.