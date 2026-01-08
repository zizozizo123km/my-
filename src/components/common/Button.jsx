import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

// --- Spinner Component (Internal Helper) ---
const Spinner = () => (
  <svg
    className="animate-spin h-5 w-5 mr-3 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

// --- Tailwind Class Maps ---

const baseClasses =
  'inline-flex items-center justify-center font-medium transition-all duration-200 ease-in-out rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap';

const sizeClasses = {
  sm: 'py-1.5 px-3 text-sm',
  md: 'py-2 px-4 text-base',
  lg: 'py-3 px-6 text-lg',
  icon: 'p-2 text-base aspect-square', // Used for square buttons containing only an icon
};

const variantClasses = {
  primary:
    'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-white',
  secondary:
    'bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200 focus:ring-gray-500 focus:ring-offset-white',
  danger:
    'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 focus:ring-offset-white',
  ghost:
    'bg-transparent text-gray-700 shadow-none hover:bg-gray-100 focus:ring-gray-500 focus:ring-offset-white',
  link: 'bg-transparent text-indigo-600 shadow-none hover:underline focus:ring-indigo-500 focus:ring-offset-white',
};

/**
 * A highly reusable and styled button component.
 * Supports variants, sizes, loading states, and icon placement.
 */
const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      type = 'button',
      isLoading = false,
      disabled = false,
      className = '',
      IconLeft,
      IconRight,
      ...props
    },
    ref
  ) => {
    const computedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        className={computedClasses}
        disabled={isDisabled}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Spinner />
            {/* Optionally hide text when loading, but often showing it is better UX */}
            <span className={size === 'icon' ? 'sr-only' : ''}>
              {children || 'Loading...'}
            </span>
          </>
        ) : (
          <>
            {IconLeft && <IconLeft className={`h-5 w-5 ${children ? 'mr-2' : ''}`} />}
            {children}
            {IconRight && <IconRight className={`h-5 w-5 ${children ? 'ml-2' : ''}`} />}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

Button.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(Object.keys(variantClasses)),
  size: PropTypes.oneOf(Object.keys(sizeClasses)),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  IconLeft: PropTypes.elementType,
  IconRight: PropTypes.elementType,
};

export default Button;