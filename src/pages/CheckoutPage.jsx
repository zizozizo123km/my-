import React, { useState, useCallback, useMemo } from 'react';
import { Truck, CreditCard, ClipboardList, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

// --- Constants and Mock Data ---

const STEPS = [
  { id: 1, name: 'Shipping', icon: Truck },
  { id: 2, name: 'Payment', icon: CreditCard },
  { id: 3, name: 'Review', icon: ClipboardList },
  { id: 4, name: 'Confirmation', icon: CheckCircle },
];

const MOCK_CART = [
  { id: 1, name: 'Premium Wireless Headphones', price: 249.99, quantity: 1, image: 'headphone.jpg' },
  { id: 2, name: 'Ergonomic Mechanical Keyboard', price: 129.00, quantity: 1, image: 'keyboard.jpg' },
];

const SHIPPING_OPTIONS = [
  { id: 'standard', name: 'Standard Shipping (5-7 days)', cost: 5.00 },
  { id: 'express', name: 'Express Shipping (1-2 days)', cost: 15.00 },
];

const TAX_RATE = 0.08; // 8%

// --- Utility Functions ---

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// --- Sub-Components ---

const CheckoutProgress = ({ currentStep }) => (
  <nav aria-label="Progress" className="mb-8">
    <ol role="list" className="flex items-center justify-between">
      {STEPS.map((step, index) => (
        <li key={step.id} className={`relative ${index < STEPS.length - 1 ? 'w-full' : ''}`}>
          <div className="flex items-center">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full transition duration-300 ease-in-out
                ${currentStep > step.id
                  ? 'bg-indigo-600 text-white'
                  : currentStep === step.id
                    ? 'border-2 border-indigo-600 text-indigo-600 bg-white'
                    : 'border-2 border-gray-300 text-gray-500 bg-white'
                }`}
            >
              <step.icon className="w-5 h-5" aria-hidden="true" />
            </div>
            <span className={`ml-3 text-sm font-medium hidden sm:inline ${currentStep >= step.id ? 'text-indigo-600' : 'text-gray-500'}`}>
              {step.name}
            </span>
          </div>
          {index < STEPS.length - 1 && (
            <div
              className={`absolute top-1/2 left-10 right-0 h-0.5 transform -translate-y-1/2 transition duration-300 ease-in-out
                ${currentStep > step.id ? 'bg-indigo-600' : 'bg-gray-200'}`}
            />
          )}
        </li>
      ))}
    </ol>
  </nav>
);

const ShippingForm = ({ shippingInfo, setShippingInfo, handleNext }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation check
    if (shippingInfo.fullName && shippingInfo.address1 && shippingInfo.city && shippingInfo.zip) {
      handleNext();
    } else {
      alert('Please fill in all required shipping fields.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Shipping Details</h2>
      <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
          <input type="text" name="fullName" id="fullName" required
            value={shippingInfo.fullName} onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
          <input type="email" name="email" id="email" required
            value={shippingInfo.email} onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="address1" className="block text-sm font-medium text-gray-700">Address Line 1</label>
        <input type="text" name="address1" id="address1" required
          value={shippingInfo.address1} onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
          <input type="text" name="city" id="city" required
            value={shippingInfo.city} onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">State / Province</label>
          <input type="text" name="state" id="state"
            value={shippingInfo.state} onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="zip" className="block text-sm font-medium text-gray-700">ZIP / Postal code</label>
          <input type="text" name="zip" id="zip" required
            value={shippingInfo.zip} onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="pt-4">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Shipping Method</h3>
        <div className="space-y-4">
          {SHIPPING_OPTIONS.map((option) => (
            <div key={option.id} className="flex items-center">
              <input
                id={option.id}
                name="shippingMethod"
                type="radio"
                value={option.id}
                checked={shippingInfo.shippingMethod === option.id}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
              />
              <label htmlFor={option.id} className="ml-3 text-sm font-medium text-gray-700 flex justify-between w-full">
                <span>{option.name}</span>
                <span className="font-semibold">{formatCurrency(option.cost)}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end pt-6 border-t border-gray-200">
        <button
          type="submit"
          className="flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Continue to Payment
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </form>
  );
};

const PaymentForm = ({ paymentMethod, setPaymentMethod, handleNext, handlePrev }) => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would involve tokenizing the card details
    if (paymentMethod === 'creditCard' && (!cardDetails.cardNumber || !cardDetails.cvv)) {
      alert('Please fill in card details.');
      return;
    }
    handleNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Payment Information</h2>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Select Payment Method</h3>
        {['creditCard', 'paypal'].map((method) => (
          <div key={method} className="relative flex items-start">
            <div className="flex items-center h-5">
              <input
                id={method}
                name="paymentMethod"
                type="radio"
                checked={paymentMethod === method}
                onChange={() => setPaymentMethod(method)}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor={method} className="font-medium text-gray-700 capitalize">
                {method === 'creditCard' ? 'Credit Card' : 'PayPal'}
              </label>
            </div>
          </div>
        ))}
      </div>

      {paymentMethod === 'creditCard' && (
        <div className="p-6 border border-gray-200 rounded-lg shadow-sm space-y-4">
          <div className="grid grid-cols-1 gap-y-4">
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
              <input type="text" name="cardNumber" id="cardNumber" required
                value={cardDetails.cardNumber} onChange={handleCardChange}
                placeholder="XXXX XXXX XXXX XXXX"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">Name on Card</label>
              <input type="text" name="cardName" id="cardName" required
                value={cardDetails.cardName} onChange={handleCardChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiration Date (MM/YY)</label>
              <input type="text" name="expiryDate" id="expiryDate" required
                value={cardDetails.expiryDate} onChange={handleCardChange}
                placeholder="01/25"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
              <input type="text" name="cvv" id="cvv" required
                value={cardDetails.cvv} onChange={handleCardChange}
                placeholder="123"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={handlePrev}
          className="flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Back to Shipping
        </button>
        <button
          type="submit"
          className="flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Review Order
          <ChevronRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </form>
  );
};

const OrderSummary = ({ cart, shippingInfo, totalDetails, handlePlaceOrder, currentStep, handlePrev }) => {
  const isReviewStep = currentStep === 3;
  const isConfirmationStep = currentStep === 4;

  return (
    <div className={`bg-gray-50 p-6 rounded-lg shadow-lg ${isReviewStep ? 'sticky top-8' : ''}`}>
      <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

      {/* Item List */}
      <ul role="list" className="divide-y divide-gray-200">
        {cart.map((item) => (
          <li key={item.id} className="py-4 flex justify-between text-sm">
            <p className="text-gray-700">{item.name} <span className="text-gray-500">x{item.quantity}</span></p>
            <p className="font-medium text-gray-900">{formatCurrency(item.price * item.quantity)}</p>
          </li>
        ))}
      </ul>

      {/* Totals */}
      <div className="mt-4 pt-4 border-t border-gray-200 space-y-2 text-sm">
        <div className="flex justify-between">
          <p className="text-gray-600">Subtotal</p>
          <p className="font-medium text-gray-900">{formatCurrency(totalDetails.subtotal)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Shipping ({shippingInfo.shippingMethod})</p>
          <p className="font-medium text-gray-900">{formatCurrency(totalDetails.shippingCost)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Tax ({TAX_RATE * 100}%)</p>
          <p className="font-medium text-gray-900">{formatCurrency(totalDetails.tax)}</p>
        </div>
      </div>

      {/* Grand Total */}
      <div className="mt-4 pt-4 border-t border-gray-300 flex justify-between items-center">
        <p className="text-lg font-bold text-gray-900">Order Total</p>
        <p className="text-xl font-extrabold text-indigo-600">{formatCurrency(totalDetails.total)}</p>
      </div>

      {/* Place Order Button (Only visible on Review Step) */}
      {isReviewStep && (
        <div className="mt-6">
          <button
            onClick={handlePlaceOrder}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150"
          >
            Place Order Now
          </button>
          <button
            onClick={handlePrev}
            className="mt-3 w-full text-sm text-indigo-600 hover:text-indigo-800"
          >
            Edit Payment Details
          </button>
        </div>
      )}
    </div>
  );
};

const ConfirmationSection = ({ orderId }) => (
  <div className="text-center py-12 bg-white rounded-lg shadow-xl">
    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Order Placed Successfully!</h2>
    <p className="text-lg text-gray-600 mb-6">Thank you for your purchase. Your order has been confirmed.</p>
    <p className="text-xl font-semibold text-indigo-600">Order ID: #{orderId}</p>
    <div className="mt-8 space-y-4">
      <p className="text-sm text-gray-500">A confirmation email has been sent to your inbox.</p>
      <a href="/" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
        Continue Shopping
      </a>
    </div>
  </div>
);


// --- Main Page Component ---

const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: 'Jane Doe',
    email: 'jane.doe@example.com',
    address1: '123 Main St',
    city: 'Springfield',
    state: 'IL',
    zip: '62704',
    shippingMethod: 'standard',
  });
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [orderId, setOrderId] = useState(null);

  const handleNextStep = useCallback(() => {
    setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
  }, []);

  const handlePrevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  }, []);

  const handlePlaceOrder = () => {
    // Simulate API call delay
    setTimeout(() => {
      console.log('Order placed:', { shippingInfo, paymentMethod, totalDetails });
      setOrderId(Math.floor(Math.random() * 1000000) + 100000);
      handleNextStep(); // Move to Confirmation (Step 4)
    }, 1000);
  };

  // Calculate totals dynamically
  const totalDetails = useMemo(() => {
    const subtotal = MOCK_CART.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const selectedShipping = SHIPPING_OPTIONS.find(opt => opt.id === shippingInfo.shippingMethod);
    const shippingCost = selectedShipping ? selectedShipping.cost : 0;
    const tax = (subtotal + shippingCost) * TAX_RATE;
    const total = subtotal + shippingCost + tax;

    return { subtotal, shippingCost, tax, total };
  }, [shippingInfo.shippingMethod]);


  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <ShippingForm shippingInfo={shippingInfo} setShippingInfo={setShippingInfo} handleNext={handleNextStep} />;
      case 2:
        return <PaymentForm paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} handleNext={handleNextStep} handlePrev={handlePrevStep} />;
      case 3:
        // Review step content is handled by the layout (OrderSummary)
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Review and Place Order</h2>
            <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
                <h3 className="font-medium text-lg mb-2 text-indigo-600">Ship To:</h3>
                <p className="text-gray-700">{shippingInfo.fullName}</p>
                <p className="text-gray-700">{shippingInfo.address1}</p>
                <p className="text-gray-700">{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}</p>
                <p className="text-gray-700 mt-2">Method: {shippingInfo.shippingMethod.toUpperCase()}</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
                <h3 className="font-medium text-lg mb-2 text-indigo-600">Payment Method:</h3>
                <p className="text-gray-700 capitalize">{paymentMethod === 'creditCard' ? 'Credit Card (ending in ****)' : 'PayPal'}</p>
            </div>
            <div className="flex justify-start pt-4">
                <button
                    type="button"
                    onClick={handlePrevStep}
                    className="flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Go Back to Payment
                </button>
            </div>
          </div>
        );
      case 4:
        return <ConfirmationSection orderId={orderId} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10">Checkout</h1>

        {/* Progress Bar */}
        <CheckoutProgress currentStep={currentStep} />

        {currentStep < 4 ? (
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-x-12 gap-y-10">
            {/* Left Column: Forms/Review */}
            <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-2xl">
              {renderStepContent()}
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-1">
              <OrderSummary
                cart={MOCK_CART}
                shippingInfo={shippingInfo}
                totalDetails={totalDetails}
                handlePlaceOrder={handlePlaceOrder}
                currentStep={currentStep}
                handlePrev={handlePrevStep}
              />
            </div>
          </div>
        ) : (
          // Confirmation View (Full Width)
          <div className="mt-10 max-w-3xl mx-auto">
            {renderStepContent()}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;