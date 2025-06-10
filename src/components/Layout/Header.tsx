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
    <header className="bg-red-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-red-600 font-bold text-xl">J</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-bold">Jump Comics</div>
              <div className="text-xs opacity-90">Official Store</div>
            </div>
          </Link>

          {/* Search bar - hidden on mobile */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="商品・作品名で検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-4 pr-12 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-300"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-red-600 hover:text-red-700"
              >
                <Search size={20} />
              </button>
            </div>
          </form>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Mobile search button */}
            <button 
              className="md:hidden p-2 hover:bg-red-700 rounded-full transition-colors"
              onClick={() => navigate('/search')}
            >
              <Search size={20} />
            </button>

            {/* Cart */}
            <Link 
              to="/cart" 
              className="relative p-2 hover:bg-red-700 rounded-full transition-colors"
            >
              <ShoppingCart size={20} />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-red-600 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {/* User menu */}
            <Link 
              to="/login" 
              className="p-2 hover:bg-red-700 rounded-full transition-colors"
              title="ログイン"
            >
              <User size={20} />
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 hover:bg-red-700 rounded-full transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex border-t border-red-500 py-2">
          <div className="flex space-x-8">
            {/* Category Navigation */}
            <Link to="/r/figures" className="py-2 hover:text-red-200 transition-colors">
              フィギュア
            </Link>
            <Link to="/r/apparel" className="py-2 hover:text-red-200 transition-colors">
              アパレル
            </Link>
            <Link to="/r/stationery" className="py-2 hover:text-red-200 transition-colors">
              文具・雑貨
            </Link>
            <Link to="/r/games" className="py-2 hover:text-red-200 transition-colors">
              ゲーム・玩具
            </Link>
            <Link to="/r/books" className="py-2 hover:text-red-200 transition-colors">
              コミック・書籍
            </Link>
            <Link to="/r/accessories" className="py-2 hover:text-red-200 transition-colors">
              アクセサリー
            </Link>
            
            <div className="border-l border-red-500 mx-4"></div>
            
            {/* Series Navigation */}
            <Link to="/r/ONE PIECE" className="py-2 hover:text-red-200 transition-colors font-medium">
              ONE PIECE
            </Link>
            <Link to="/r/鬼滅の刃" className="py-2 hover:text-red-200 transition-colors font-medium">
              鬼滅の刃
            </Link>
            <Link to="/r/呪術廻戦" className="py-2 hover:text-red-200 transition-colors font-medium">
              呪術廻戦
            </Link>
          </div>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-red-500 py-4">
            <div className="flex flex-col space-y-3">
              {/* Categories */}
              <div className="text-sm font-semibold text-red-200 mb-2">カテゴリ</div>
              <Link 
                to="/r/figures" 
                className="py-2 pl-4 hover:text-red-200 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                フィギュア
              </Link>
              <Link 
                to="/r/apparel" 
                className="py-2 pl-4 hover:text-red-200 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                アパレル
              </Link>
              <Link 
                to="/r/stationery" 
                className="py-2 pl-4 hover:text-red-200 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                文具・雑貨
              </Link>
              <Link 
                to="/r/games" 
                className="py-2 pl-4 hover:text-red-200 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                ゲーム・玩具
              </Link>
              <Link 
                to="/r/books" 
                className="py-2 pl-4 hover:text-red-200 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                コミック・書籍
              </Link>
              <Link 
                to="/r/accessories" 
                className="py-2 pl-4 hover:text-red-200 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                アクセサリー
              </Link>
              
              <div className="border-t border-red-500 my-2"></div>
              
              {/* Series */}
              <div className="text-sm font-semibold text-red-200 mb-2">人気作品</div>
              <Link 
                to="/r/ONE PIECE" 
                className="py-2 pl-4 hover:text-red-200 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                ONE PIECE
              </Link>
              <Link 
                to="/r/鬼滅の刃" 
                className="py-2 pl-4 hover:text-red-200 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                鬼滅の刃
              </Link>
              <Link 
                to="/r/呪術廻戦" 
                className="py-2 pl-4 hover:text-red-200 transition-colors font-medium"
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