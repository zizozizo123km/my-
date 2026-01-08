import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Star, ShoppingCart, Truck, Shield, Heart, Minus, Plus, X } from 'lucide-react';

// --- Mock Data (Replace with actual API calls) ---
const mockProductData = {
  id: 'P1001',
  name: 'سماعات رأس لاسلكية احترافية (إصدار 2024)',
  brand: 'SoundWave Pro',
  price: 499.99,
  oldPrice: 599.99,
  currency: 'ر.س',
  description: 'تجربة صوتية غامرة لا مثيل لها. تصميم مريح، إلغاء ضوضاء فعال، وعمر بطارية يصل إلى 40 ساعة. مثالية للمحترفين وعشاق الموسيقى.',
  details: [
    'تقنية إلغاء الضوضاء النشطة (ANC)',
    'مشغلات صوت 50 مم عالية الدقة',
    'اتصال بلوتوث 5.3 مستقر',
    'شحن سريع USB-C',
    'ميكروفون مدمج للمكالمات الواضحة'
  ],
  rating: 4.7,
  reviewsCount: 1245,
  stock: 55,
  colors: [
    { name: 'أسود ليلي', hex: '#1a1a1a', image: '/images/product-black.webp' },
    { name: 'فضي بلاتيني', hex: '#cccccc', image: '/images/product-silver.webp' },
    { name: 'أزرق داكن', hex: '#003366', image: '/images/product-blue.webp' }
  ],
  storage: ['64GB', '128GB', '256GB'],
  images: [
    '/images/product-main.webp',
    '/images/product-detail-1.webp',
    '/images/product-detail-2.webp',
    '/images/product-detail-3.webp'
  ],
  relatedProducts: [
    { id: 'R1', name: 'شاحن سريع 65W', price: 120, image: '/images/related-charger.webp' },
    { id: 'R2', name: 'حقيبة حمل فاخرة', price: 80, image: '/images/related-case.webp' },
  ]
};

// --- Components ---

const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center space-x-0.5 rtl:space-x-reverse">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
      ))}
      {hasHalfStar && (
        <div className="relative w-4 h-4">
          <Star className="absolute w-4 h-4 text-gray-300" />
          <div className="absolute overflow-hidden w-1/2 h-full top-0 right-0 rtl:left-0 rtl:right-auto">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          </div>
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      ))}
    </div>
  );
};

const ProductImageGallery = ({ images, selectedColor }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  useEffect(() => {
    // In a real scenario, this would update based on selectedColor fetching the correct image
    if (selectedColor && selectedColor.image) {
      setMainImage(selectedColor.image);
    } else {
      setMainImage(images[0]);
    }
  }, [selectedColor, images]);

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto p-1 max-h-[500px]">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(img)}
            className={`w-20 h-20 flex-shrink-0 rounded-lg border-2 transition-all duration-200 ${
              mainImage === img ? 'border-indigo-600 ring-2 ring-indigo-300' : 'border-gray-200 hover:border-gray-400'
            }`}
          >
            <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover rounded-md" loading="lazy" />
          </button>
        ))}
      </div>
      {/* Main Image */}
      <div className="flex-1 bg-gray-100 rounded-xl overflow-hidden shadow-lg aspect-square">
        <img
          src={mainImage}
          alt={mockProductData.name}
          className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
        />
      </div>
    </div>
  );
};

const ProductOptions = ({ options, selectedOption, setSelectedOption, label, type = 'color' }) => {
  if (!options || options.length === 0) return null;

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">{label}: <span className="font-normal text-indigo-600">{selectedOption?.name || selectedOption}</span></h3>
      <div className="flex flex-wrap gap-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => setSelectedOption(option)}
            className={`p-2 rounded-full transition-all duration-200 flex items-center justify-center ${
              type === 'color'
                ? `w-10 h-10 border-2 ${selectedOption?.hex === option.hex ? 'border-indigo-600 ring-4 ring-indigo-200' : 'border-gray-300 hover:border-indigo-400'}`
                : `px-4 py-2 text-sm font-medium border ${selectedOption === option ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-400'}`
            }`}
            aria-label={`${label} ${type === 'color' ? option.name : option}`}
            title={type === 'color' ? option.name : option}
          >
            {type === 'color' ? (
              <div
                className="w-full h-full rounded-full shadow-inner"
                style={{ backgroundColor: option.hex }}
              />
            ) : (
              option
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

const QuantitySelector = ({ quantity, setQuantity, stock }) => {
  const handleDecrement = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const handleIncrement = () => {
    setQuantity(prev => Math.min(stock, prev + 1));
  };

  return (
    <div className="flex items-center space-x-3 rtl:space-x-reverse">
      <button
        onClick={handleDecrement}
        disabled={quantity <= 1}
        className="p-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition"
        aria-label="تقليل الكمية"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="text-xl font-semibold w-8 text-center">{quantity}</span>
      <button
        onClick={handleIncrement}
        disabled={quantity >= stock}
        className="p-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition"
        aria-label="زيادة الكمية"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
};

const ProductPrice = ({ price, oldPrice, currency }) => {
  const discount = useMemo(() => {
    if (!oldPrice) return null;
    return Math.round(((oldPrice - price) / oldPrice) * 100);
  }, [price, oldPrice]);

  return (
    <div className="flex items-baseline space-x-3 rtl:space-x-reverse mb-6">
      <span className="text-4xl font-extrabold text-indigo-600">
        {price.toFixed(2)} {currency}
      </span>
      {oldPrice && (
        <>
          <span className="text-xl text-gray-400 line-through">
            {oldPrice.toFixed(2)} {currency}
          </span>
          {discount && (
            <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
              وفر {discount}%
            </span>
          )}
        </>
      )}
    </div>
  );
};

const ProductActions = ({ onAddToCart, onAddToWishlist, stock }) => (
  <div className="flex flex-col sm:flex-row gap-4 mt-8">
    <button
      onClick={onAddToCart}
      disabled={stock === 0}
      className={`flex-1 flex items-center justify-center px-6 py-3 text-lg font-semibold rounded-xl transition-all duration-300 shadow-lg ${
        stock > 0
          ? 'bg-indigo-600 text-white hover:bg-indigo-700 transform hover:scale-[1.02]'
          : 'bg-gray-400 text-gray-700 cursor-not-allowed'
      }`}
    >
      <ShoppingCart className="w-5 h-5 ml-2 rtl:mr-2 rtl:ml-0" />
      {stock > 0 ? 'أضف إلى السلة' : 'نفدت الكمية'}
    </button>
    <button
      onClick={onAddToWishlist}
      className="p-3 border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-red-500 transition duration-300"
      aria-label="أضف إلى قائمة الأمنيات"
    >
      <Heart className="w-6 h-6" />
    </button>
  </div>
);

const ProductInfoTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { id: 'description', name: 'الوصف', content: product.description },
    { id: 'details', name: 'المواصفات التقنية', content: product.details },
    // { id: 'reviews', name: `التقييمات (${product.reviewsCount})`, content: <ReviewsSection /> },
  ];

  const renderContent = () => {
    const tab = tabs.find(t => t.id === activeTab);
    if (!tab) return null;

    if (tab.id === 'details') {
      return (
        <ul className="list-disc list-inside space-y-2 text-gray-700 marker:text-indigo-500">
          {tab.content.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
      );
    }
    return <p className="text-gray-700 leading-relaxed">{tab.content}</p>;
  };

  return (
    <div className="mt-12">
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 rtl:space-x-reverse">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-1 text-lg font-medium transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-b-4 border-indigo-600 text-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-6 p-6 bg-white rounded-lg shadow-inner">
        {renderContent()}
      </div>
    </div>
  );
};

const RelatedProducts = ({ products }) => {
  if (!products || products.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">منتجات قد تعجبك</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-800 truncate">{product.name}</h3>
              <p className="text-lg font-bold text-indigo-600 mt-1">{product.price.toFixed(2)} ر.س</p>
              <button className="mt-2 w-full text-sm bg-indigo-50 text-indigo-600 py-1.5 rounded-lg hover:bg-indigo-100 transition">
                عرض المنتج
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main Page Component ---

const ProductDetailPage = () => {
  const { productId } = useParams(); // Assuming routing uses /products/:productId
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for product options
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Fetch product data (simulated)
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (productId !== mockProductData.id) {
            // In a real app, you'd fetch based on productId
            // For this mock, we'll just use the single mock data
        }

        setProduct(mockProductData);
        setSelectedColor(mockProductData.colors[0]);
        setSelectedStorage(mockProductData.storage[0]);
        setLoading(false);
      } catch (err) {
        setError('فشل في تحميل بيانات المنتج.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = useCallback(() => {
    if (!product) return;
    console.log(`Added ${quantity} x ${product.name} (${selectedColor.name}, ${selectedStorage}) to cart.`);
    // Implement actual cart logic (e.g., Redux dispatch, context update)
    alert(`تم إضافة ${quantity} من ${product.name} إلى سلة التسوق.`);
  }, [product, quantity, selectedColor, selectedStorage]);

  const handleAddToWishlist = useCallback(() => {
    if (!product) return;
    console.log(`Added ${product.name} to wishlist.`);
    // Implement actual wishlist logic
    alert(`تم إضافة ${product.name} إلى قائمة الأمنيات.`);
  }, [product]);

  if (loading) {
    return (
      <div className="container mx-auto p-4 lg:p-8 min-h-screen flex justify-center items-center">
        <div className="text-center text-xl text-indigo-600">جاري تحميل تفاصيل المنتج...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto p-4 lg:p-8 min-h-screen flex justify-center items-center">
        <div className="text-center text-red-600">
          <X className="w-10 h-10 mx-auto mb-4" />
          <p>{error || 'لم يتم العثور على المنتج.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs (Optional) */}
        <nav className="text-sm text-gray-500 mb-6">
          الرئيسية / الإلكترونيات / سماعات الرأس / <span className="text-indigo-600">{product.name}</span>
        </nav>

        <div className="bg-white p-6 lg:p-10 rounded-2xl shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            
            {/* Column 1: Images */}
            <div className="lg:sticky lg:top-4">
              <ProductImageGallery images={product.images} selectedColor={selectedColor} />
            </div>

            {/* Column 2: Details and Actions */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-lg text-gray-500 mb-4">العلامة التجارية: <span className="font-semibold text-indigo-600">{product.brand}</span></p>

              {/* Rating and Reviews */}
              <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6 pb-4 border-b border-gray-100">
                <RatingStars rating={product.rating} />
                <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                <span className="text-sm text-gray-500">({product.reviewsCount} تقييم)</span>
              </div>

              {/* Price */}
              <ProductPrice price={product.price} oldPrice={product.oldPrice} currency={product.currency} />

              {/* Options */}
              <ProductOptions
                label="اللون"
                options={product.colors}
                selectedOption={selectedColor}
                setSelectedOption={setSelectedColor}
                type="color"
              />

              {product.storage && (
                <ProductOptions
                  label="السعة"
                  options={product.storage}
                  selectedOption={selectedStorage}
                  setSelectedOption={setSelectedStorage}
                  type="size"
                />
              )}

              {/* Stock and Quantity */}
              <div className="flex items-center justify-between py-4 border-t border-b border-gray-100 my-6">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <span className="text-lg font-semibold text-gray-800">الكمية:</span>
                  <QuantitySelector quantity={quantity} setQuantity={setQuantity} stock={product.stock} />
                </div>
                <p className={`text-sm font-medium ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-orange-500' : 'text-red-600'}`}>
                  {product.stock > 10 ? 'متوفر في المخزون' : product.stock > 0 ? `متبقي ${product.stock} فقط` : 'نفدت الكمية'}
                </p>
              </div>

              {/* Actions */}
              <ProductActions
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
                stock={product.stock}
              />

              {/* Delivery and Warranty Info */}
              <div className="mt-8 space-y-4 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <Truck className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">شحن سريع ومجاني</p>
                    <p className="text-sm text-gray-600">توصيل خلال 3-5 أيام عمل لجميع المدن.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <Shield className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">ضمان لمدة سنتين</p>
                    <p className="text-sm text-gray-600">ضمان المصنع ضد عيوب الصناعة.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Tabs (Description, Details, Reviews) */}
          <ProductInfoTabs product={product} />
        </div>

        {/* Related Products Section */}
        <RelatedProducts products={product.relatedProducts} />

      </div>
    </div>
  );
};

export default ProductDetailPage;