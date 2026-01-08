import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';

/**
 * ProductCard Component
 * Displays a single product item with image, name, price, and an action button.
 *
 * @param {object} product - The product data object.
 * @param {number} product.id
 * @param {string} product.name
 * @param {number} product.price
 * @param {string} product.imageUrl
 * @param {boolean} [product.isNew=false]
 * @param {boolean} [product.isInStock=true]
 * @param {number} [product.rating=0]
 */
const ProductCard = ({ product }) => {
  const {
    id,
    name,
    price,
    imageUrl,
    isNew = false,
    isInStock = true,
    rating = 0,
  } = product;

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);

  // Placeholder for handling the Add to Cart action
  const handleAddToCart = (e) => {
    e.preventDefault();
    if (isInStock) {
      console.log(`Adding product ${id} to cart.`);
      // Implement actual cart logic here (e.g., Redux dispatch, context update)
    }
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition duration-300 hover:shadow-2xl">
      {/* Image Area */}
      <div className="aspect-square w-full overflow-hidden bg-gray-100">
        <a href={`/products/${id}`} aria-label={`View details for ${name}`}>
          <img
            src={imageUrl || 'https://via.placeholder.com/400x400?text=Product+Image'}
            alt={name}
            className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </a>
        {isNew && (
          <span className="absolute top-3 left-3 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold uppercase text-white shadow-md">
            New
          </span>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-grow flex-col p-4">
        {/* Rating (Optional) */}
        {rating > 0 && (
          <div className="mb-1 flex items-center text-sm text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(rating) ? 'fill-yellow-500' : 'text-gray-300'}`}
                strokeWidth={1.5}
              />
            ))}
            <span className="ml-1 text-xs text-gray-500">({rating.toFixed(1)})</span>
          </div>
        )}

        {/* Name */}
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
          <a
            href={`/products/${id}`}
            className="hover:text-indigo-600 transition duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {name}
          </a>
        </h3>

        {/* Price and Stock Status */}
        <div className="mt-3 flex items-center justify-between">
          <p className="text-2xl font-extrabold text-indigo-600">
            {formattedPrice}
          </p>
          <p className={`text-sm font-medium ${isInStock ? 'text-green-600' : 'text-red-500'}`}>
            {isInStock ? 'In Stock' : 'Sold Out'}
          </p>
        </div>
      </div>

      {/* Action Button */}
      <div className="p-4 pt-0">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!isInStock}
          className="flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-md transition duration-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:shadow-none"
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          {isInStock ? 'Add to Cart' : 'Notify Me'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;