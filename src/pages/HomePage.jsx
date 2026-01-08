import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, ShieldCheck, Headset, Star } from 'lucide-react';

// Mock Data (In a real application, this would come from an API/Redux store)
const mockProducts = [
  { id: 1, name: 'ساعة يد جلدية فاخرة', price: 450.00, imageUrl: 'https://via.placeholder.com/400x500?text=Product+1', rating: 4.8 },
  { id: 2, name: 'حقيبة ظهر عصرية', price: 299.99, imageUrl: 'https://via.placeholder.com/400x500?text=Product+2', rating: 4.5 },
  { id: 3, name: 'نظارة شمسية كلاسيكية', price: 120.50, imageUrl: 'https://via.placeholder.com/400x500?text=Product+3', rating: 4.9 },
  { id: 4, name: 'حذاء رياضي مريح', price: 380.00, imageUrl: 'https://via.placeholder.com/400x500?text=Product+4', rating: 4.7 },
];

const mockCategories = [
  { id: 1, name: 'الملابس الرجالية', slug: 'men', imageUrl: 'https://via.placeholder.com/600x400?text=Men' },
  { id: 2, name: 'الإكسسوارات', slug: 'accessories', imageUrl: 'https://via.placeholder.com/600x400?text=Accessories' },
  { id: 3, name: 'الأجهزة الإلكترونية', slug: 'electronics', imageUrl: 'https://via.placeholder.com/600x400?text=Electronics' },
];

// Helper Component for Product Card (Simplified)
const ProductCard = ({ product }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden group transition duration-300 hover:shadow-2xl border border-gray-100">
    <Link to={`/product/${product.id}`}>
      <div className="relative overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-72 object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
          جديد
        </div>
      </div>
      <div className="p-4 text-right">
        <h3 className="text-lg font-semibold text-gray-800 truncate mb-1">{product.name}</h3>
        <div className="flex items-center justify-end mb-2">
          <span className="text-yellow-500 flex ml-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-500' : 'text-gray-300'}`} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} />
            ))}
          </span>
          <span className="text-sm text-gray-500">({product.rating})</span>
        </div>
        <p className="text-2xl font-bold text-red-600">
          {product.price.toFixed(2)} ر.س
        </p>
      </div>
    </Link>
  </div>
);

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* 1. Hero Section */}
      <section className="relative h-[70vh] bg-gray-900 flex items-center justify-center text-white overflow-hidden">
        {/* Background Image Placeholder/Overlay */}
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555529693-559d3b65223e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}></div>
        
        <div className="relative z-10 text-center p-6 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight leading-tight">
            أناقة لا حدود لها. جودة لا تُضاهى.
          </h1>
          <p className="text-xl mb-10 text-gray-300 max-w-xl mx-auto">
            اكتشف أحدث مجموعات الأزياء والإكسسوارات التي تعكس ذوقك الرفيع.
          </p>
          <Link 
            to="/shop" 
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-10 rounded-full transition duration-300 shadow-xl text-lg transform hover:scale-105"
          >
            ابدأ التسوق الآن
          </Link>
        </div>
      </section>

      {/* 2. Value Proposition / Trust Badges */}
      <section className="py-12 bg-white border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          
          <div className="flex flex-col items-center p-4">
            <Truck className="w-10 h-10 text-red-600 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-1">شحن سريع ومجاني</h3>
            <p className="text-gray-500 text-sm">لجميع الطلبات التي تتجاوز 500 ر.س.</p>
          </div>

          <div className="flex flex-col items-center p-4">
            <ShieldCheck className="w-10 h-10 text-red-600 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-1">ضمان الجودة</h3>
            <p className="text-gray-500 text-sm">منتجات أصلية 100% مع ضمان استرجاع.</p>
          </div>

          <div className="flex flex-col items-center p-4">
            <Headset className="w-10 h-10 text-red-600 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-1">دعم فني 24/7</h3>
            <p className="text-gray-500 text-sm">فريق دعم مستعد للإجابة على استفساراتك.</p>
          </div>
        </div>
      </section>

      {/* 3. Featured Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">
            تصفح حسب الفئة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockCategories.map((category) => (
              <Link 
                key={category.id} 
                to={`/category/${category.slug}`}
                className="relative block overflow-hidden rounded-xl shadow-xl group transition duration-300 transform hover:scale-[1.02]"
              >
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-full h-64 object-cover transition duration-500 group-hover:opacity-80"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-3xl font-bold text-white p-4 border-b-4 border-red-600">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. New Arrivals / Featured Products Grid */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-10 text-center">
            وصل حديثاً
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/shop" 
              className="inline-block border border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-bold py-3 px-8 rounded-full transition duration-300"
            >
              عرض جميع المنتجات
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Newsletter CTA */}
      <section className="py-16 bg-red-600">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            لا تفوت أحدث العروض!
          </h2>
          <p className="text-lg mb-6 opacity-90">
            اشترك في نشرتنا البريدية لتحصل على خصم 10% على طلبك الأول.
          </p>
          <form className="max-w-lg mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="أدخل بريدك الإلكتروني هنا"
              className="flex-grow p-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none text-right"
              required
            />
            <button
              type="submit"
              className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-md"
            >
              اشترك
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;