import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

/**
 * A highly reusable and accessible input component styled with Tailwind CSS.
 * Supports standard text, email, password, and number types, and handles error states.
 */
const Input = forwardRef(
  (
    {
      label,
      name,
      id,
      type = 'text',
      placeholder,
      value,
      onChange,
      error,
      disabled = false,
      className = '',
      ...rest
    },
    ref
  ) => {
    // Ensure a unique ID exists for accessibility (linking label to input)
    const inputId = id || name;

    // Base classes for the input element
    const baseClasses = `
      w-full px-4 py-2 border rounded-lg shadow-sm transition duration-150 ease-in-out
      text-gray-900 placeholder-gray-400 appearance-none
      focus:outline-none focus:ring-2
    `;

    // State-specific classes (Error vs. Default/Focus)
    const stateClasses = error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
      : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200';

    // Disabled classes
    const disabledClasses = disabled
      ? 'bg-gray-100 cursor-not-allowed opacity-75'
      : '';

    return (
      <div className={`mb-4 ${className}`}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className={`block text-sm font-medium mb-1 ${
              error ? 'text-red-600' : 'text-gray-700'
            }`}
          >
            {label}
          </label>
        )}

        {/* Input Field */}
        <input
          ref={ref}
          id={inputId}
          name={name}
          type={type}
          placeholder={placeholder || label}
          value={value}
          onChange={onChange}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={`${baseClasses} ${stateClasses} ${disabledClasses}`}
          {...rest}
        />

        {/* Error Message */}
        {error && (
          <p id={`${inputId}-error`} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Input;