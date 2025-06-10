import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useCart } from '../../hooks/useCart';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { getTotalItems } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Top bar */}
        <div className="header-top">
          {/* Logo */}
          <Link to="/" className="logo">
            <div className="logo-icon">
              <span>J</span>
            </div>
            <div className="logo-text">
              <div className="logo-title">Jump Comics</div>
              <div className="logo-subtitle">Official Store</div>
            </div>
          </Link>

          {/* Search bar - hidden on mobile */}
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-container">
              <input
                type="text"
                placeholder="商品・作品名で検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button
                type="submit"
                className="search-button"
              >
                <Search size={20} />
              </button>
            </div>
          </form>

          {/* Right side icons */}
          <div className="header-actions">
            {/* Mobile search button */}
            <button 
              className="header-icon-button md:hidden"
              onClick={() => navigate('/search')}
            >
              <Search size={20} />
            </button>

            {/* Cart */}
            <Link 
              to="/cart" 
              className="header-icon-button"
            >
              <ShoppingCart size={20} />
              {getTotalItems() > 0 && (
                <span className="cart-badge">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {/* User menu */}
            <Link 
              to="/login" 
              className="header-icon-button"
              title="ログイン"
            >
              <User size={20} />
            </Link>

            {/* Mobile menu button */}
            <button
              className="mobile-menu-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="nav">
          <ul className="nav-list">
            {/* Category Navigation */}
            <li>
              <Link to="/r/figures" className="nav-link">
                フィギュア
              </Link>
            </li>
            <li>
              <Link to="/r/apparel" className="nav-link">
                アパレル
              </Link>
            </li>
            <li>
              <Link to="/r/stationery" className="nav-link">
                文具・雑貨
              </Link>
            </li>
            <li>
              <Link to="/r/games" className="nav-link">
                ゲーム・玩具
              </Link>
            </li>
            <li>
              <Link to="/r/books" className="nav-link">
                コミック・書籍
              </Link>
            </li>
            <li>
              <Link to="/r/accessories" className="nav-link">
                アクセサリー
              </Link>
            </li>
            
            <li className="nav-divider"></li>
            
            {/* Series Navigation */}
            <li>
              <Link to="/r/ONE PIECE" className="nav-link nav-series">
                ONE PIECE
              </Link>
            </li>
            <li>
              <Link to="/r/鬼滅の刃" className="nav-link nav-series">
                鬼滅の刃
              </Link>
            </li>
            <li>
              <Link to="/r/呪術廻戦" className="nav-link nav-series">
                呪術廻戦
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu-content">
              {/* Categories */}
              <div className="mobile-menu-section">カテゴリ</div>
              <Link 
                to="/r/figures" 
                className="mobile-menu-link"
                onClick={() => setIsMenuOpen(false)}
              >
                フィギュア
              </Link>
              <Link 
                to="/r/apparel" 
                className="mobile-menu-link"
                onClick={() => setIsMenuOpen(false)}
              >
                アパレル
              </Link>
              <Link 
                to="/r/stationery" 
                className="mobile-menu-link"
                onClick={() => setIsMenuOpen(false)}
              >
                文具・雑貨
              </Link>
              <Link 
                to="/r/games" 
                className="mobile-menu-link"
                onClick={() => setIsMenuOpen(false)}
              >
                ゲーム・玩具
              </Link>
              <Link 
                to="/r/books" 
                className="mobile-menu-link"
                onClick={() => setIsMenuOpen(false)}
              >
                コミック・書籍
              </Link>
              <Link 
                to="/r/accessories" 
                className="mobile-menu-link"
                onClick={() => setIsMenuOpen(false)}
              >
                アクセサリー
              </Link>
              
              <div className="mobile-menu-divider"></div>
              
              {/* Series */}
              <div className="mobile-menu-section">人気作品</div>
              <Link 
                to="/r/ONE PIECE" 
                className="mobile-menu-link mobile-menu-series"
                onClick={() => setIsMenuOpen(false)}
              >
                ONE PIECE
              </Link>
              <Link 
                to="/r/鬼滅の刃" 
                className="mobile-menu-link mobile-menu-series"
                onClick={() => setIsMenuOpen(false)}
              >
                鬼滅の刃
              </Link>
              <Link 
                to="/r/呪術廻戦" 
                className="mobile-menu-link mobile-menu-series"
                onClick={() => setIsMenuOpen(false)}
              >
                呪術廻戦
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;