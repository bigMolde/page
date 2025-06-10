import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../hooks/useCart';

const Cart: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <ShoppingBag size={64} className="text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">购物车空空如也</h2>
            <p className="text-gray-600 mb-6">快去选购您喜欢的商品吧！</p>
            <Link
              to="/"
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors inline-flex items-center"
            >
              <ArrowLeft size={20} className="mr-2" />
              继续购物
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleCheckout = () => {
    navigate('/checkout/confirm');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">购物车</h1>
          <p className="text-gray-600">您有 {getTotalItems()} 件商品</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">商品列表</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="p-6">
                    <div className="flex items-center space-x-4">
                      {/* Product Image */}
                      <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </Link>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <Link 
                          to={`/product/${item.product.id}`}
                          className="text-lg font-medium text-gray-900 hover:text-red-600 transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-sm text-gray-600 mt-1">
                          {item.product.description.slice(0, 100)}...
                        </p>
                        
                        {/* Price */}
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="text-lg font-bold text-red-600">
                            ¥{item.product.price.toLocaleString()}
                          </span>
                          {item.product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              ¥{item.product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-2 hover:bg-gray-50 rounded-l-lg"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-4 py-2 border-x">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-50 rounded-r-lg"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        {/* Subtotal */}
                        <div className="text-right min-w-0">
                          <p className="text-lg font-bold text-gray-900">
                            ¥{(item.product.price * item.quantity).toLocaleString()}
                          </p>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          title="移除商品"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">订单摘要</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">商品总计</span>
                  <span className="text-gray-900">¥{getTotalPrice().toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">配送费</span>
                  <span className="text-gray-900">
                    {getTotalPrice() >= 99 ? '免费' : '¥10'}
                  </span>
                </div>
                {getTotalPrice() >= 99 && (
                  <div className="text-sm text-green-600">
                    ✓ 已享受免费配送
                  </div>
                )}
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>总计</span>
                    <span className="text-red-600">
                      ¥{(getTotalPrice() + (getTotalPrice() >= 99 ? 0 : 10)).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                去结算 ({getTotalItems()})
              </button>

              <Link
                to="/"
                className="w-full mt-3 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-center block"
              >
                继续购物
              </Link>

              {/* Promotions */}
              <div className="mt-6 p-4 bg-red-50 rounded-lg">
                <h4 className="font-medium text-red-800 mb-2">优惠提醒</h4>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• 满99元免配送费</li>
                  <li>• 新用户首单9折</li>
                  <li>• 购买2件以上享9.5折</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;