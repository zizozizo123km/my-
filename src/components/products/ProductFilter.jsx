import React, { useState, useCallback } from 'react';

// --- Helper Component: Collapsible Filter Section ---
const FilterSection = ({ title, children, defaultOpen = true }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border-b border-gray-200 py-4">
            <button
                className="flex justify-between items-center w-full text-lg font-semibold text-gray-800 hover:text-indigo-600 transition duration-150 focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-controls={`filter-panel-${title.toLowerCase().replace(/\s/g, '-')}`}
            >
                {title}
                <svg className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <div
                id={`filter-panel-${title.toLowerCase().replace(/\s/g, '-')}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}
            >
                {children}
            </div>
        </div>
    );
};

// --- Mock Data Structure (Replace with actual API data fetching in a real app) ---
const mockAvailableOptions = {
    categories: ['Electronics', 'Apparel', 'Home Goods', 'Books', 'Outdoor'],
    brands: ['Brand A', 'Brand B', 'Brand C', 'Generic', 'Luxury Co.', 'Tech Innovators'],
    maxPrice: 5000,
};

/**
 * ProductFilter Component
 * Renders a sidebar filter panel for product listings.
 *
 * @param {object} props
 * @param {object} props.filters - The current state of active filters.
 * @param {function} props.onFilterChange - Callback function to update filters in the parent state.
 * @param {object} [props.availableOptions] - Lists of available filter options (categories, brands, max price).
 * @param {boolean} [props.isLoading] - Loading state indicator.
 */
const ProductFilter = ({
    filters = {},
    onFilterChange,
    availableOptions = mockAvailableOptions,
    isLoading = false
}) => {

    // Handler for updating a specific filter key
    const handleFilterChange = useCallback((key, value) => {
        onFilterChange({ ...filters, [key]: value });
    }, [filters, onFilterChange]);

    // --- Category/Checkbox Handler ---
    const handleCheckboxChange = (key, value) => {
        const currentValues = filters[key] || [];
        const newValues = currentValues.includes(value)
            ? currentValues.filter(v => v !== value)
            : [...currentValues, value];
        handleFilterChange(key, newValues);
    };

    // --- Price Handler ---
    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        const numericValue = Number(value);

        // Ensure min/max constraints are respected
        const newPriceRange = {
            min: filters.priceRange?.min || 0,
            max: filters.priceRange?.max || availableOptions.maxPrice,
            [name]: numericValue
        };

        // Basic validation (optional but good UX)
        if (name === 'min' && numericValue > newPriceRange.max) {
            newPriceRange.max = numericValue;
        }
        if (name === 'max' && numericValue < newPriceRange.min) {
            newPriceRange.min = numericValue;
        }

        handleFilterChange('priceRange', newPriceRange);
    };

    const currentMinPrice = filters.priceRange?.min ?? 0;
    const currentMaxPrice = filters.priceRange?.max ?? availableOptions.maxPrice;


    if (isLoading) {
        // Skeleton Loader
        return (
            <div className="w-full lg:w-64 p-4 bg-white rounded-xl shadow-2xl sticky top-6 h-fit animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-6"></div>
                {[1, 2, 3].map(i => (
                    <div key={i} className="border-b border-gray-200 py-4">
                        <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
                        <div className="space-y-2">
                            <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                            <div className="h-3 bg-gray-100 rounded w-2/3"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <aside className="w-full lg:w-64 p-4 bg-white rounded-xl shadow-2xl sticky top-6 h-fit">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-4 border-b pb-2">
                Filter Products
            </h2>

            {/* 1. Category Filter */}
            <FilterSection title="Categories">
                <div className="space-y-2 text-sm">
                    {availableOptions.categories.map((category) => (
                        <label key={category} className="flex items-center cursor-pointer hover:text-indigo-600 transition duration-150">
                            <input
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                                checked={(filters.categories || []).includes(category)}
                                onChange={() => handleCheckboxChange('categories', category)}
                            />
                            <span className="ml-3 text-gray-700">{category}</span>
                        </label>
                    ))}
                </div>
            </FilterSection>

            {/* 2. Price Range Filter */}
            <FilterSection title="Price Range">
                <div className="space-y-4">
                    <div className="flex justify-between text-sm font-medium text-gray-700">
                        <span>Min: ${currentMinPrice.toFixed(0)}</span>
                        <span>Max: ${currentMaxPrice.toFixed(0)}</span>
                    </div>

                    <div className="flex space-x-3">
                        <input
                            type="number"
                            name="min"
                            value={currentMinPrice}
                            onChange={handlePriceChange}
                            min="0"
                            max={availableOptions.maxPrice}
                            className="w-1/2 p-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                            placeholder="Min Price"
                            aria-label="Minimum Price"
                        />
                        <input
                            type="number"
                            name="max"
                            value={currentMaxPrice}
                            onChange={handlePriceChange}
                            min="0"
                            max={availableOptions.maxPrice}
                            className="w-1/2 p-2 border border-gray-300 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                            placeholder="Max Price"
                            aria-label="Maximum Price"
                        />
                    </div>
                </div>
            </FilterSection>

            {/* 3. Brand Filter */}
            <FilterSection title="Brands">
                <div className="space-y-2 text-sm max-h-40 overflow-y-auto pr-2">
                    {availableOptions.brands.map((brand) => (
                        <label key={brand} className="flex items-center cursor-pointer hover:text-indigo-600 transition duration-150">
                            <input
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                                checked={(filters.brands || []).includes(brand)}
                                onChange={() => handleCheckboxChange('brands', brand)}
                            />
                            <span className="ml-3 text-gray-700">{brand}</span>
                        </label>
                    ))}
                </div>
            </FilterSection>

            {/* 4. Availability Toggle */}
            <FilterSection title="Availability">
                <label className="flex items-center cursor-pointer justify-between">
                    <span className="text-sm font-medium text-gray-700 select-none">In Stock Only</span>
                    <div className="relative">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={filters.inStock || false}
                            onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                        />
                        <div className={`block w-10 h-6 rounded-full transition duration-300 ease-in-out ${filters.inStock ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
                        <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition duration-300 ease-in-out ${filters.inStock ? 'transform translate-x-4' : 'transform translate-x-0'}`}></div>
                    </div>
                </label>
            </FilterSection>

            {/* Clear Filters Button */}
            <div className="pt-4">
                <button
                    onClick={() => onFilterChange({})} // Clear all filters
                    className="w-full py-2 text-sm font-medium text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Clear Filters
                </button>
            </div>
        </aside>
    );
};

export default ProductFilter;