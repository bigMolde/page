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
          {/* Left Navigation - 按分类搜索 */}
          <nav className="nav">
            <ul className="nav-list">
              <li>
                <Link to="/r/figures" className="nav-link">
                  手办
                </Link>
              </li>
              <li>
                <Link to="/r/apparel" className="nav-link">
                  服装
                </Link>
              </li>
              <li>
                <Link to="/r/stationery" className="nav-link">
                  文具杂货
                </Link>
              </li>
              <li>
                <Link to="/r/games" className="nav-link">
                  游戏玩具
                </Link>
              </li>
              <li>
                <Link to="/r/books" className="nav-link">
                  漫画书籍
                </Link>
              </li>
              <li>
                <Link to="/r/accessories" className="nav-link">
                  配饰
                </Link>
              </li>
            </ul>
          </nav>

          {/* Logo - 首页 */}
          <Link to="/" className="logo">
            <div className="logo-icon">
              <span>J</span>
            </div>
            <div className="logo-text">
              <div className="logo-title">Jump Comics</div>
              <div className="logo-subtitle">官方商城</div>
            </div>
          </Link>

          {/* Search bar - 关键词搜索 */}
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-container">
              <input
                type="text"
                placeholder="搜索商品、作品名..."
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
            {/* Mobile search button - 关键词搜索 */}
            <button 
              className="header-icon-button md:hidden"
              onClick={() => navigate('/search')}
            >
              <Search size={20} />
              <span>搜索</span>
            </button>

            {/* Cart - 购物车 */}
            <Link 
              to="/cart" 
              className="header-icon-button"
            >
              <ShoppingCart size={20} />
              <span>购物车</span>
              {getTotalItems() > 0 && (
                <span className="cart-badge">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {/* User menu - 登录 */}
            <Link 
              to="/login" 
              className="header-icon-button"
              title="登录"
            >
              <User size={20} />
              <span>登录</span>
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

        {/* Mobile menu - 分类商品列表 */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu-content">
              <div className="mobile-menu-section">商品分类</div>
              <Link 
                to="/r/figures" 
                className="mobile-menu-link"
                onClick={() => setIsMenuOpen(false)}
              >
                手办
              </Link>
              <Link 
                to="/r/apparel" 
                className="mobile-menu-link"
                onClick={() => setIsMenuOpen(false)}
              >
                服装
              </Link>
              <Link 
                to="/r/stationery" 
                className="mobile-menu-link"
                onClick={() => setIsMenuOpen(false)}
              >
                文具杂货
              </Link>
              <Link 
                to="/r/games" 
                className="mobile-menu-link"
                onClick={() => setIsMenuOpen(false)}
              >
                游戏玩具
              </Link>
              <Link 
                to="/r/books" 
                className="mobile-menu-link"
                onClick={() => setIsMenuOpen(false)}
              >
                漫画书籍
              </Link>
              <Link 
                to="/r/accessories" 
                className="mobile-menu-link"
                onClick={() => setIsMenuOpen(false)}
              >
                配饰
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;