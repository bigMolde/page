import React, { useState, useMemo } from 'react';
import { Filter, Grid, List, SortAsc } from 'lucide-react';
import ProductCard from '../components/Product/ProductCard';
import { products } from '../data/products';

const NewProducts: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  // Filter for new products (products with "新商品" tag or recent release dates)
  const newProducts = useMemo(() => {
    let filtered = products.filter(product => 
      product.tags?.includes('新商品') || 
      product.tags?.includes('新品上市') ||
      (product.release_date && new Date(product.release_date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) // Last 30 days
    );

    // Sort products
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.release_date || '').getTime() - new Date(a.release_date || '').getTime());
        break;
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
      default:
        break;
    }

    return filtered;
  }, [sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="text-sm">
            <span className="text-gray-500">首页</span>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">产品列表</span>
          </nav>
        </div>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">产品列表</h1>
              <p className="text-gray-600">{newProducts.length} 件新商品</p>
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
                  <option value="newest">最新上架</option>
                  <option value="price-low">价格从低到高</option>
                  <option value="price-high">价格从高到低</option>
                  <option value="rating">评分最高</option>
                  <option value="name">商品名称</option>
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
                <span>筛选</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          {showFilters && (
            <aside className="w-full lg:w-64 bg-white rounded-lg shadow-sm p-6 h-fit">
              <h3 className="font-semibold text-gray-900 mb-4">筛选条件</h3>
              
              {/* Price Range */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">价格区间</h4>
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

              {/* Category */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">商品分类</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox text-red-600" />
                    <span className="ml-2 text-sm text-gray-700">手办</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox text-red-600" />
                    <span className="ml-2 text-sm text-gray-700">服装</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox text-red-600" />
                    <span className="ml-2 text-sm text-gray-700">文具杂货</span>
                  </label>
                </div>
              </div>

              {/* Status */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">商品状态</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox text-red-600" />
                    <span className="ml-2 text-sm text-gray-700">现货</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox text-red-600" />
                    <span className="ml-2 text-sm text-gray-700">预约中</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox text-red-600" />
                    <span className="ml-2 text-sm text-gray-700">限定商品</span>
                  </label>
                </div>
              </div>
            </aside>
          )}

          {/* Products Grid/List */}
          <main className="flex-1">
            {newProducts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <p className="text-gray-500 text-lg">暂无新商品</p>
                <p className="text-gray-400 mt-2">请稍后再来查看</p>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                    : 'space-y-4'
                }
              >
                {newProducts.map((product) => (
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

export default NewProducts;