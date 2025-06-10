import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, X } from 'lucide-react';
import ProductCard from '../components/Product/ProductCard';
import { products } from '../data/products';

const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'iPhone', '连衣裙', '蓝牙耳机', '运动鞋', '护肤品'
  ]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }

    const query = searchQuery.toLowerCase().trim();
    return products.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.tags?.some(tag => tag.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
      // Add to recent searches
      setRecentSearches(prev => {
        const filtered = prev.filter(item => item !== searchQuery.trim());
        return [searchQuery.trim(), ...filtered].slice(0, 10);
      });
    }
  };

  const handleRecentSearch = (query: string) => {
    setSearchQuery(query);
    setSearchParams({ q: query });
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchParams({});
  };

  const currentQuery = searchParams.get('q');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索商品..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 pr-12 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500 text-lg"
              />
              <SearchIcon 
                size={24} 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" 
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </form>

          {/* Recent Searches */}
          {!currentQuery && recentSearches.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">最近搜索</h3>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((query, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentSearch(query)}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Search Results */}
        {currentQuery && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                搜索结果: "{currentQuery}"
              </h2>
              <p className="text-gray-600">
                找到 {searchResults.length} 件商品
              </p>
            </div>

            {searchResults.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="max-w-md mx-auto">
                  <SearchIcon size={64} className="text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    没有找到相关商品
                  </h3>
                  <p className="text-gray-600 mb-4">
                    尝试使用其他关键词搜索，或浏览我们的商品分类
                  </p>
                  <button
                    onClick={clearSearch}
                    className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    清除搜索
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {searchResults.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Popular Categories */}
        {!currentQuery && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">热门分类</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: '电子产品', slug: 'electronics', image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg' },
                { name: '服装配饰', slug: 'fashion', image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg' },
                { name: '家居生活', slug: 'home', image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg' },
                { name: '运动户外', slug: 'sports', image: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg' },
                { name: '美妆护肤', slug: 'beauty', image: 'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg' },
                { name: '图书文具', slug: 'books', image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg' }
              ].map((category) => (
                <button
                  key={category.slug}
                  onClick={() => handleRecentSearch(category.name)}
                  className="group text-center"
                >
                  <div className="w-full aspect-square rounded-lg overflow-hidden mb-2">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="text-sm text-gray-900 group-hover:text-red-600 transition-colors">
                    {category.name}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;