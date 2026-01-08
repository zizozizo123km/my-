/**
 * CartSummary Component
 * Displays the breakdown of costs (subtotal, shipping, tax) and the final total.
 * Includes the primary call-to-action for checkout.
 */
import React from 'react';

// Helper function for currency formatting
const formatCurrency = (amount) => {
  // Use a robust formatter, assuming USD for this context, but easily changeable via props/context
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

/**
 * @typedef {object} CartSummaryProps
 * @property {number} subtotal - The sum of all item prices.
 * @property {number} shipping - The calculated shipping cost.
 * @property {number} number - The calculated tax amount.
 * @property {number} total - The final total cost.
 * @property {function} onCheckout - Function to handle the checkout action.
 */

/**
 * @param {CartSummaryProps} props
 */
const CartSummary = ({
  subtotal = 0,
  shipping = 0,
  tax = 0,
  total = 0,
  onCheckout = () => console.log('Checkout initiated'),
}) => {

  const summaryItems = [
    { label: 'Subtotal', value: subtotal, key: 'subtotal' },
    { label: 'Shipping Estimate', value: shipping, key: 'shipping' },
    { label: 'Tax Estimate', value: tax, key: 'tax' },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-3">Order Summary</h2>

      <div className="space-y-3">
        {summaryItems.map((item) => (
          <div key={item.key} className="flex justify-between text-gray-600 text-base">
            <span className="font-medium">{item.label}</span>
            <span className="font-semibold text-gray-800">{formatCurrency(item.value)}</span>
          </div>
        ))}
      </div>

      <div className="my-5 border-t border-gray-200"></div>

      {/* Total */}
      <div className="flex justify-between pt-2 font-bold text-xl text-gray-900">
        <span>Order Total</span>
        <span className="text-indigo-600">{formatCurrency(total)}</span>
      </div>

      {/* Checkout Button */}
      <button
        onClick={onCheckout}
        className="w-full mt-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        disabled={total <= 0}
      >
        Proceed to Checkout
      </button>

      <p className="text-xs text-center text-gray-500 mt-4">
        Shipping and taxes calculated at checkout.
      </p>
    </div>
  );
};

export default CartSummary;