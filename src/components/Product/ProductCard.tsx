import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Clock, Package } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../hooks/useCart';
import { useFavorites } from '../../hooks/useFavorites';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  const { addToCart } = useCart();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.status === 'active' && product.stock_quantity > 0) {
      addToCart(product);
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite('product', product.id)) {
      removeFromFavorites('product', product.id);
    } else {
      addToFavorites('product', product.id);
    }
  };

  const getStatusBadge = () => {
    switch (product.status) {
      case 'preorder':
        return (
          <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
            <Clock size={12} className="mr-1" />
            予約受付中
          </div>
        );
      case 'coming':
        return (
          <div className="absolute top-2 left-2 bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-bold">
            発売予定
          </div>
        );
      case 'soldout':
        return (
          <div className="absolute top-2 left-2 bg-gray-600 text-white px-2 py-1 rounded-full text-xs font-bold">
            売り切れ
          </div>
        );
      default:
        return null;
    }
  };

  const isAvailable = product.status === 'active' && product.stock_quantity > 0;
  const isPreorder = product.status === 'preorder';

  return (
    <Link 
      to={`/product/${product.id}`}
      className={`group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden ${className}`}
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Status Badge */}
        {getStatusBadge()}
        
        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold">
            -{product.discount}%
          </div>
        )}

        {/* Special Attributes */}
        <div className="absolute bottom-2 left-2 flex space-x-1">
          {product.is_limited && (
            <span className="bg-yellow-500 text-white px-1 py-0.5 rounded text-xs font-bold">
              限定
            </span>
          )}
          {product.is_made_to_order && (
            <span className="bg-orange-500 text-white px-1 py-0.5 rounded text-xs font-bold">
              受注生産
            </span>
          )}
          {product.is_lottery && (
            <span className="bg-purple-500 text-white px-1 py-0.5 rounded text-xs font-bold">
              抽選
            </span>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col space-y-2">
          <button
            onClick={handleToggleFavorite}
            className={`p-2 rounded-full transition-colors ${
              isFavorite('product', product.id)
                ? 'bg-red-600 text-white'
                : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-600'
            }`}
            title="お気に入り"
          >
            <Heart size={16} fill={isFavorite('product', product.id) ? 'currentColor' : 'none'} />
          </button>
          
          {(isAvailable || isPreorder) && (
            <button
              onClick={handleAddToCart}
              className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
              title={isPreorder ? 'カートに追加（予約）' : 'カートに追加'}
            >
              {isPreorder ? <Package size={16} /> : <ShoppingCart size={16} />}
            </button>
          )}
        </div>
      </div>
      
      <div className="p-4">
        {/* Work Name */}
        {product.work && (
          <p className="text-sm text-red-600 font-medium mb-1">{product.work}</p>
        )}
        
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
          {product.name}
        </h3>
        
        {/* Character Name */}
        {product.character_name && (
          <p className="text-sm text-gray-600 mb-2">{product.character_name}</p>
        )}

        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">
            {product.rating} ({product.reviews})
          </span>
        </div>

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-red-600">
              ¥{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ¥{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {product.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Stock Status */}
        <div className="text-sm">
          {product.status === 'preorder' ? (
            <span className="text-blue-600">
              予約受付中 {product.order_end_date && `（〜${product.order_end_date}）`}
            </span>
          ) : product.status === 'coming' ? (
            <span className="text-purple-600">
              発売予定 {product.release_date && `（${product.release_date}）`}
            </span>
          ) : product.stock_quantity > 0 ? (
            <span className="text-green-600">在庫あり</span>
          ) : (
            <span className="text-gray-500">売り切れ</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;