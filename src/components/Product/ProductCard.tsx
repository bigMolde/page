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
          <div className="product-status-badge status-preorder">
            <Clock size={12} />
            予約受付中
          </div>
        );
      case 'coming':
        return (
          <div className="product-status-badge status-coming">
            発売予定
          </div>
        );
      case 'soldout':
        return (
          <div className="product-status-badge status-soldout">
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
      className={`product-card ${className}`}
    >
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
        
        {/* Status Badge */}
        {getStatusBadge()}
        
        {/* Discount Badge */}
        {product.discount && (
          <div className="product-discount-badge">
            -{product.discount}%
          </div>
        )}

        {/* Special Attributes */}
        <div className="product-attributes">
          {product.is_limited && (
            <span className="attribute-badge attribute-limited">
              限定
            </span>
          )}
          {product.is_made_to_order && (
            <span className="attribute-badge attribute-made-to-order">
              受注生産
            </span>
          )}
          {product.is_lottery && (
            <span className="attribute-badge attribute-lottery">
              抽選
            </span>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="product-actions">
          <button
            onClick={handleToggleFavorite}
            className={`action-button favorite-button ${
              isFavorite('product', product.id) ? 'active' : ''
            }`}
            title="お気に入り"
          >
            <Heart size={16} fill={isFavorite('product', product.id) ? 'currentColor' : 'none'} />
          </button>
          
          {(isAvailable || isPreorder) && (
            <button
              onClick={handleAddToCart}
              className="action-button cart-button"
              title={isPreorder ? 'カートに追加（予約）' : 'カートに追加'}
            >
              {isPreorder ? <Package size={16} /> : <ShoppingCart size={16} />}
            </button>
          )}
        </div>
      </div>
      
      <div className="product-info">
        {/* Work Name */}
        {product.work && (
          <p className="product-work">{product.work}</p>
        )}
        
        <h3 className="product-name">
          {product.name}
        </h3>
        
        {/* Character Name */}
        {product.character_name && (
          <p className="product-character">{product.character_name}</p>
        )}

        <div className="product-rating">
          <div className="rating-stars">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`star ${
                  i < Math.floor(product.rating)
                    ? 'star-filled'
                    : 'star-empty'
                }`}
              />
            ))}
          </div>
          <span className="rating-text">
            {product.rating} ({product.reviews})
          </span>
        </div>

        <div className="product-price">
          <div className="price-container">
            <span className="current-price">
              ¥{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="original-price">
                ¥{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="product-tags">
            {product.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="tag"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Stock Status */}
        <div className="product-stock">
          {product.status === 'preorder' ? (
            <span className="stock-preorder">
              予約受付中 {product.order_end_date && `（〜${product.order_end_date}）`}
            </span>
          ) : product.status === 'coming' ? (
            <span className="stock-coming">
              発売予定 {product.release_date && `（${product.release_date}）`}
            </span>
          ) : product.stock_quantity > 0 ? (
            <span className="stock-available">在庫あり</span>
          ) : (
            <span className="stock-out">売り切れ</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;