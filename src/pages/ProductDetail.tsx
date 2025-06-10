import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, Plus, Minus } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../hooks/useCart';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">商品未找到</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  const images = product.images || [product.image];

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm mb-6">
          <span className="text-gray-500 cursor-pointer" onClick={() => navigate('/')}>首页</span>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-500 cursor-pointer" onClick={() => navigate(`/r/${product.category}`)}>
            {product.category}
          </span>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Images */}
            <div>
              <div className="aspect-square rounded-lg overflow-hidden mb-4">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        selectedImage === index ? 'border-red-600' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-4">
                {product.tags && (
                  <div className="flex space-x-2 mb-2">
                    {product.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }
                    />
                  ))}
                </div>
                <span className="ml-3 text-gray-600">
                  {product.rating} ({product.reviews} 条评价)
                </span>
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-center space-x-4 mb-2">
                  <span className="text-3xl font-bold text-red-600">
                    ¥{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      ¥{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                  {product.discount && (
                    <span className="bg-red-600 text-white px-2 py-1 rounded text-sm font-bold">
                      省¥{(product.originalPrice! - product.price).toLocaleString()}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">价格包含税费</p>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  数量
                </label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-gray-50 rounded-l-lg"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 py-2 border-x">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-gray-50 rounded-r-lg"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <span className="text-sm text-gray-600">
                    库存: {product.inStock ? '有货' : '缺货'}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                  className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  立即购买
                </button>
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 border-2 border-red-600 text-red-600 py-3 px-6 rounded-lg font-semibold hover:bg-red-50 disabled:border-gray-400 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  <ShoppingCart size={20} className="mr-2" />
                  加入购物车
                </button>
              </div>

              {/* Actions Row */}
              <div className="flex items-center justify-center space-x-8 py-4 border-t border-gray-200">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600">
                  <Heart size={20} />
                  <span>收藏</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600">
                  <Share2 size={20} />
                  <span>分享</span>
                </button>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="border-t border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Truck className="text-red-600" size={24} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">免费配送</h4>
                  <p className="text-sm text-gray-600">满99元免费送货</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Shield className="text-red-600" size={24} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">品质保证</h4>
                  <p className="text-sm text-gray-600">正品保障</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <RotateCcw className="text-red-600" size={24} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">7天退换</h4>
                  <p className="text-sm text-gray-600">无理由退换货</p>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications */}
          {product.specifications && (
            <div className="border-t border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">商品规格</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">{key}</span>
                    <span className="text-gray-900 font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;