import React, { useState } from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  User,
  MapPin,
  Heart,
  Settings,
  LogOut,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  ChevronRight,
} from 'lucide-react';

// --- Configuration ---
const dashboardTabs = [
  { id: 'dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
  { id: 'orders', label: 'طلباتي', icon: ShoppingBag },
  { id: 'profile', label: 'تعديل الملف الشخصي', icon: User },
  { id: 'addresses', label: 'عناويني', icon: MapPin },
  { id: 'wishlist', label: 'قائمة الأمنيات', icon: Heart },
  { id: 'settings', label: 'الإعدادات', icon: Settings },
];

// --- Helper Components ---

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className={`p-5 bg-white rounded-xl shadow-lg border-t-4 ${color} transition duration-300 hover:shadow-xl`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
      <Icon className={`w-8 h-8 opacity-70 ${color.replace('border-t-4', 'text')}`} />
    </div>
  </div>
);

const DashboardOverview = () => (
  <div className="space-y-8">
    <h2 className="text-3xl font-extrabold text-gray-900">ملخص لوحة التحكم</h2>
    
    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard 
        title="الطلبات المكتملة" 
        value="14" 
        icon={CheckCircle} 
        color="border-t-green-500 text-green-500" 
      />
      <StatCard 
        title="الطلبات قيد المعالجة" 
        value="3" 
        icon={Clock} 
        color="border-t-yellow-500 text-yellow-500" 
      />
      <StatCard 
        title="قائمة الأمنيات" 
        value="7 منتجات" 
        icon={Heart} 
        color="border-t-red-500 text-red-500" 
      />
      <StatCard 
        title="العناوين المحفوظة" 
        value="2" 
        icon={MapPin} 
        color="border-t-blue-500 text-blue-500" 
      />
    </div>

    {/* Recent Orders */}
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">آخر الطلبات</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">رقم الطلب</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">التاريخ</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجمالي</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Example Row */}
            {['#1001', '#1002', '#1003'].map((orderId, index) => (
              <tr key={orderId} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">{orderId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-10-{(15 + index)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{(150 + index * 20).toFixed(2)} ر.س</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${index === 0 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {index === 0 ? 'مكتمل' : 'قيد الشحن'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 transition">عرض التفاصيل</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const OrdersView = () => (
  <div className="bg-white p-6 rounded-xl shadow-lg">
    <h2 className="text-3xl font-extrabold text-gray-900 mb-6">جميع طلباتي</h2>
    <div className="space-y-4">
      {/* Order Item */}
      {[1004, 1005, 1006].map(id => (
        <div key={id} className="border border-gray-200 p-4 rounded-lg flex justify-between items-center hover:bg-gray-50 transition">
          <div>
            <p className="text-lg font-semibold text-gray-900">طلب رقم: #{id}</p>
            <p className="text-sm text-gray-500 mt-1">بتاريخ: 2023-10-20 | الإجمالي: 349.00 ر.س</p>
            <span className="mt-2 inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800">
              <CheckCircle className="w-4 h-4 ml-1" />
              تم التوصيل
            </span>
          </div>
          <button className="text-indigo-600 hover:text-indigo-800 flex items-center font-medium">
            عرض التفاصيل
            <ChevronRight className="w-4 h-4 mr-1" />
          </button>
        </div>
      ))}
    </div>
  </div>
);

const ProfileView = () => (
  <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl">
    <h2 className="text-3xl font-extrabold text-gray-900 mb-6">تعديل الملف الشخصي</h2>
    <form className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">الاسم الكامل</label>
        <input
          type="text"
          id="name"
          defaultValue="أحمد محمد"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
        <input
          type="email"
          id="email"
          defaultValue="ahmed.m@example.com"
          disabled
          className="mt-1 block w-full border border-gray-200 bg-gray-50 rounded-md shadow-sm p-3 cursor-not-allowed"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">رقم الهاتف</label>
        <input
          type="tel"
          id="phone"
          defaultValue="+966 50 123 4567"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="pt-4">
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
        >
          حفظ التغييرات
        </button>
      </div>
    </form>
  </div>
);

// Placeholder for other views
const PlaceholderView = ({ title }) => (
  <div className="bg-white p-8 rounded-xl shadow-lg min-h-[400px] flex items-center justify-center">
    <div className="text-center">
      <Settings className="w-10 h-10 mx-auto text-gray-400 mb-3" />
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      <p className="text-gray-500 mt-2">هذه الصفحة قيد الإنشاء حاليًا. شكراً لصبرك.</p>
    </div>
  </div>
);


// --- Main Dashboard Component ---

const UserDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'orders':
        return <OrdersView />;
      case 'profile':
        return <ProfileView />;
      case 'addresses':
        return <PlaceholderView title="إدارة العناوين" />;
      case 'wishlist':
        return <PlaceholderView title="قائمة الأمنيات" />;
      case 'settings':
        return <PlaceholderView title="إعدادات الحساب" />;
      default:
        return <DashboardOverview />;
    }
  };

  const DashboardSidebar = () => (
    <div className="lg:sticky lg:top-24 p-4 lg:p-0">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <p className="text-xl font-bold text-gray-900">مرحباً، أحمد!</p>
          <p className="text-sm text-gray-500">لوحة تحكم المستخدم الخاصة بك</p>
        </div>
        
        <nav className="flex flex-col p-2 space-y-1">
          {dashboardTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center p-3 rounded-lg text-right transition duration-150 ${
                  isActive
                    ? 'bg-indigo-500 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-indigo-600'
                }`}
              >
                <Icon className="w-5 h-5 ml-3" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100 mt-2">
          <button
            onClick={() => console.log('Logging out...')}
            className="w-full flex items-center p-3 rounded-lg text-red-600 hover:bg-red-50 transition duration-150"
          >
            <LogOut className="w-5 h-5 ml-3" />
            <span className="font-medium">تسجيل الخروج</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10">
          حسابي
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar (Navigation) */}
          <div className="lg:col-span-3">
            <DashboardSidebar />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardPage;