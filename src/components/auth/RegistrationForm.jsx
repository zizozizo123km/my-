import React, { useState, useCallback } from 'react';
import { EyeIcon, EyeSlashIcon, EnvelopeIcon, UserIcon, LockClosedIcon } from '@heroicons/react/24/outline';

// Simple email regex for client-side validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RegistrationForm = ({ onRegisterSuccess, onSwitchToLogin }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validateForm = useCallback(() => {
        const newErrors = {};
        let isValid = true;

        if (!formData.name.trim()) {
            newErrors.name = 'الاسم مطلوب.';
            isValid = false;
        }

        if (!formData.email.trim() || !EMAIL_REGEX.test(formData.email)) {
            newErrors.email = 'البريد الإلكتروني غير صالح.';
            isValid = false;
        }

        if (formData.password.length < 8) {
            newErrors.password = 'يجب أن تتكون كلمة المرور من 8 أحرف على الأقل.';
            isValid = false;
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'كلمتا المرور غير متطابقتين.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear specific error on change
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
        setServerError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError(null);

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // In a real application, you would send formData to your backend
            // const response = await api.post('/register', formData);

            // Simulate successful registration
            console.log('Registration successful:', formData.email);
            onRegisterSuccess({ user: formData.name, token: 'fake-jwt-token' });

        } catch (error) {
            // Handle API errors (e.g., email already exists)
            setServerError('فشل التسجيل. قد يكون البريد الإلكتروني مستخدماً بالفعل.');
            console.error('Registration error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const renderInput = (name, type, label, Icon, isPassword = false) => {
        const isError = errors[name];
        const currentType = isPassword && !showPassword ? 'password' : 'text';
        const toggleVisibility = () => setShowPassword(prev => !prev);

        return (
            <div className="mb-4">
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
                <div className="relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                        id={name}
                        name={name}
                        type={isPassword ? currentType : type}
                        value={formData[name]}
                        onChange={handleChange}
                        required
                        className={`
                            w-full appearance-none rounded-md border py-2 px-3 text-gray-900 placeholder-gray-400 transition duration-150 ease-in-out sm:text-sm
                            ${isError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}
                            ${isPassword ? 'pl-10' : 'pl-3'}
                        `}
                        placeholder={label}
                        aria-invalid={isError ? "true" : "false"}
                        aria-describedby={isError ? `${name}-error` : undefined}
                    />
                    {isPassword && (
                        <button
                            type="button"
                            onClick={toggleVisibility}
                            className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 hover:text-indigo-600 focus:outline-none"
                            aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                        >
                            {showPassword ? (
                                <EyeSlashIcon className="h-5 w-5" />
                            ) : (
                                <EyeIcon className="h-5 w-5" />
                            )}
                        </button>
                    )}
                </div>
                {isError && (
                    <p id={`${name}-error`} className="mt-1 text-sm text-red-600">
                        {errors[name]}
                    </p>
                )}
            </div>
        );
    };

    // Special renderer for Confirm Password to handle its own state
    const renderConfirmPasswordInput = () => {
        const isError = errors.confirmPassword;
        const currentType = !showConfirmPassword ? 'password' : 'text';
        const toggleVisibility = () => setShowConfirmPassword(prev => !prev);

        return (
            <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    تأكيد كلمة المرور
                </label>
                <div className="relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <LockClosedIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={currentType}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className={`
                            w-full appearance-none rounded-md border py-2 px-3 text-gray-900 placeholder-gray-400 transition duration-150 ease-in-out sm:text-sm
                            ${isError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}
                            pl-10
                        `}
                        placeholder="أعد إدخال كلمة المرور"
                        aria-invalid={isError ? "true" : "false"}
                        aria-describedby={isError ? `confirmPassword-error` : undefined}
                    />
                    <button
                        type="button"
                        onClick={toggleVisibility}
                        className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 hover:text-indigo-600 focus:outline-none"
                        aria-label={showConfirmPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                    >
                        {showConfirmPassword ? (
                            <EyeSlashIcon className="h-5 w-5" />
                        ) : (
                            <EyeIcon className="h-5 w-5" />
                        )}
                    </button>
                </div>
                {isError && (
                    <p id={`confirmPassword-error`} className="mt-1 text-sm text-red-600">
                        {errors.confirmPassword}
                    </p>
                )}
            </div>
        );
    };


    return (
        <div className="w-full max-w-md mx-auto bg-white p-8 md:p-10 rounded-xl shadow-2xl border border-gray-100">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
                إنشاء حساب جديد
            </h2>
            <p className="text-center text-sm text-gray-600 mb-8">
                ابدأ رحلة التسوق معنا اليوم.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Server Error Display */}
                {serverError && (
                    <div className="p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 text-right" role="alert">
                        {serverError}
                    </div>
                )}

                {/* Name Input */}
                {renderInput('name', 'text', 'الاسم الكامل', UserIcon)}

                {/* Email Input */}
                {renderInput('email', 'email', 'البريد الإلكتروني', EnvelopeIcon)}

                {/* Password Input */}
                {renderInput('password', 'password', 'كلمة المرور', LockClosedIcon, true)}

                {/* Confirm Password Input */}
                {renderConfirmPasswordInput()}


                <div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`
                            w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition duration-200
                            ${isLoading
                                ? 'bg-indigo-400 cursor-not-allowed'
                                : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                            }
                        `}
                    >
                        {isLoading ? (
                            <div className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                جاري التسجيل...
                            </div>
                        ) : (
                            'تسجيل'
                        )}
                    </button>
                </div>
            </form>

            <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                    هل لديك حساب بالفعل؟{' '}
                    <button
                        type="button"
                        onClick={onSwitchToLogin}
                        className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
                    >
                        تسجيل الدخول
                    </button>
                </p>
            </div>
        </div>
    );
};

export default RegistrationForm;