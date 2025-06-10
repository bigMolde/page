import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, MapPin, Truck, CheckCircle } from 'lucide-react';
import { useCart } from '../hooks/useCart';

const CheckoutConfirm: React.FC = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'credit',
    notes: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate order processing
    clearCart();
    navigate('/checkout/complete');
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  const shippingFee = getTotalPrice() >= 99 ? 0 : 10;
  const totalAmount = getTotalPrice() + shippingFee;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">确认订单</h1>
          <p className="text-gray-600">请确认您的订单信息和配送地址</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <MapPin className="text-red-600 mr-2" size={20} />
                <h3 className="text-lg font-semibold text-gray-900">配送地址</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    收货人姓名 *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    联系电话 *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    详细地址 *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="请输入详细的配送地址"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <CreditCard className="text-red-600 mr-2" size={20} />
                <h3 className="text-lg font-semibold text-gray-900">支付方式</h3>
              </div>
              
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit"
                    checked={formData.paymentMethod === 'credit'}
                    onChange={handleInputChange}
                    className="form-radio text-red-600"
                  />
                  <span className="ml-3">信用卡/借记卡</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="alipay"
                    checked={formData.paymentMethod === 'alipay'}
                    onChange={handleInputChange}
                    className="form-radio text-red-600"
                  />
                  <span className="ml-3">支付宝</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="wechat"
                    checked={formData.paymentMethod === 'wechat'}
                    onChange={handleInputChange}
                    className="form-radio text-red-600"
                  />
                  <span className="ml-3">微信支付</span>
                </label>
              </div>
            </div>

            {/* Order Notes */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">订单备注</h3>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="如有特殊要求请在此说明（选填）"
              />
            </div>

            {/* Delivery Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <Truck className="text-red-600 mr-2" size={20} />
                <h3 className="text-lg font-semibold text-gray-900">配送信息</h3>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• 预计配送时间：1-3个工作日</p>
                <p>• 配送范围：全国（偏远地区除外）</p>
                <p>• 满99元免运费</p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">订单详情</h3>
              
              {/* Order Items */}
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex items-center space-x-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        ¥{item.product.price} × {item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      ¥{(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 mb-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">商品小计</span>
                  <span>¥{getTotalPrice().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">配送费</span>
                  <span>{shippingFee === 0 ? '免费' : `¥${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                  <span>总计</span>
                  <span className="text-red-600">¥{totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                提交订单
              </button>

              <div className="mt-4 text-xs text-gray-500 text-center">
                点击"提交订单"即表示您同意我们的服务条款
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const CheckoutComplete: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-sm p-8 max-w-md w-full mx-4 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="text-green-600" size={32} />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">订单提交成功！</h2>
        <p className="text-gray-600 mb-6">
          感谢您的购买！我们将尽快处理您的订单，并通过短信和邮件通知您订单状态。
        </p>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600 mb-1">订单号</p>
          <p className="font-bold text-gray-900">YG{Date.now()}</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate('/')}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            继续购物
          </button>
          <button
            onClick={() => navigate('/cart')}
            className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            查看订单
          </button>
        </div>
      </div>
    </div>
  );
};

export { CheckoutConfirm, CheckoutComplete };