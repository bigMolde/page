import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, SortAsc } from 'lucide-react';
import ProductCard from '../components/Product/ProductCard';
import { products, categories, works } from '../data/products';

const ProductList: React.FC = () => {
  const { category, series } = useParams();
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('default');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by category or series
    if (category) {
      // Check if it's a category slug or series name
      const categoryData = categories.find(cat => cat.slug === category);
      if (categoryData) {
        // Filter by category
        filtered = filtered.filter(product => product.category === category);
      } else {
        // Treat as series name
        filtered = filtered.filter(product => product.work === category);
      }
    }
    
    if (series) {
      // Filter by series/work name
      filtered = filtered.filter(product => product.work === series);
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.release_date || '').getTime() - new Date(a.release_date || '').getTime());
        break;
      default:
        // Keep original order
        break;
    }

    return filtered;
  }, [category, series, sortBy]);

  // Determine page title
  const getPageTitle = () => {
    if (category) {
      const categoryData = categories.find(cat => cat.slug === category);
      if (categoryData) {
        return categoryData.name;
      } else {
        // It's a series name
        return category;
      }
    }
    if (series) {
      return series;
    }
    return '商品一覧';
  };

  const title = getPageTitle();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="text-sm">
            <span className="text-gray-500">ホーム</span>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{title}</span>
          </nav>
        </div>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
              <p className="text-gray-600">{filteredProducts.length} 件の商品が見つかりました</p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              {/* Sort */}
              <div className="flex items-center space-x-2">
                <SortAsc size={20} className="text-gray-600" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="default">おすすめ順</option>
                  <option value="newest">新着順</option>
                  <option value="price-low">価格の安い順</option>
                  <option value="price-high">価格の高い順</option>
                  <option value="rating">評価の高い順</option>
                  <option value="name">商品名順</option>
                </select>
              </div>

              {/* View Mode */}
              <div className="flex rounded-lg border overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${
                    viewMode === 'grid'
                      ? 'bg-red-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 border-l ${
                    viewMode === 'list'
                      ? 'bg-red-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <List size={20} />
                </button>
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                <Filter size={20} />
                <span>絞り込み</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          {showFilters && (
            <aside className="w-full lg:w-64 bg-white rounded-lg shadow-sm p-6 h-fit">
              <h3 className="font-semibold text-gray-900 mb-4">絞り込み条件</h3>
              
              {/* Price Range */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">価格帯</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox text-red-600" />
                    <span className="ml-2 text-sm text-gray-700">¥0 - ¥1,000</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox text-red-600" />
                    <span className="ml-2 text-sm text-gray-700">¥1,000 - ¥5,000</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox text-red-600" />
                    <span className="ml-2 text-sm text-gray-700">¥5,000 - ¥10,000</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox text-red-600" />
                    <span className="ml-2 text-sm text-gray-700">¥10,000以上</span>
                  </label>
                </div>
              </div>

              {/* Status */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">商品状態</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox text-red-600" />
                    <span className="ml-2 text-sm text-gray-700">在庫あり</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox text-red-600" />
                    <span className="ml-2 text-sm text-gray-700">予約受付中</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox text-red-600" />
                    <span className="ml-2 text-sm text-gray-700">限定商品</span>
                  </label>
                </div>
              </div>

              {/* Rating */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">評価</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox text-red-600" />
                    <span className="ml-2 text-sm text-gray-700">★4以上</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox text-red-600" />
                    <span className="ml-2 text-sm text-gray-700">★3以上</span>
                  </label>
                </div>
              </div>
            </aside>
          )}

          {/* Products Grid/List */}
          <main className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <p className="text-gray-500 text-lg">条件に合う商品が見つかりませんでした</p>
                <p className="text-gray-400 mt-2">検索条件を変更してお試しください</p>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                    : 'space-y-4'
                }
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    className={viewMode === 'list' ? 'flex' : ''}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductList;