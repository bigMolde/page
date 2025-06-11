import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, SortAsc, Search, Plus, Minus, X } from 'lucide-react';
import ProductCard from '../components/Product/ProductCard';
import { products, categories, works } from '../data/products';

const ProductList: React.FC = () => {
  const { category, series } = useParams();
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('default');
  const [showFilters, setShowFilters] = useState(true);
  
  // 搜索和过滤状态
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [hasStock, setHasStock] = useState(false);
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({});
  const [expandedKanaRows, setExpandedKanaRows] = useState<{[key: string]: boolean}>({});

  // 按假名分组的作品数据
  const worksByKana = useMemo(() => {
    const kanaGroups: {[key: string]: typeof works} = {
      'A': [],
      'K': [],
      'S': [],
      'T': [],
      'N': [],
      'H': [],
      'M': [],
      'Y': [],
      'R': [],
      'W': []
    };

    works.forEach(work => {
      const firstChar = work.kana.charAt(0).toUpperCase();
      if (kanaGroups[firstChar]) {
        kanaGroups[firstChar].push(work);
      }
    });

    return kanaGroups;
  }, []);

  // 分类数据
  const categoryData = [
    { id: 'images', name: '图像/印刷', subcategories: ['海报', '明信片', '贴纸'] },
    { id: 'stationery', name: '文具', subcategories: ['笔记本', '笔类', '文件夹'] },
    { id: 'daily', name: '日用品（生活杂货）', subcategories: ['收纳盒', '清洁用品', '生活小物'] },
    { id: 'tableware', name: '餐具', subcategories: ['杯子', '盘子', '餐具套装'] },
    { id: 'apparel', name: '服饰/服装品', subcategories: ['T恤', '连帽衫', '配饰'] },
    { id: 'toys', name: '玩具', subcategories: ['手办', '模型', '益智玩具'] },
    { id: 'decoration', name: '装饰品/家居', subcategories: ['挂画', '摆件', '灯具'] },
    { id: 'accessories', name: '配饰', subcategories: ['钥匙扣', '徽章', '首饰'] },
    { id: 'digital', name: '移动设备/电脑相关', subcategories: ['手机壳', '充电器', '电脑配件'] },
    { id: 'plush', name: '毛绒玩具', subcategories: ['公仔', '抱枕', '毛毯'] },
    { id: 'others', name: '其他', subcategories: ['限定商品', '合作商品'] }
  ];

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // 基础分类过滤
    if (category) {
      const categoryData = categories.find(cat => cat.slug === category);
      if (categoryData) {
        filtered = filtered.filter(product => product.category === category);
      } else {
        filtered = filtered.filter(product => product.work === category);
      }
    }
    
    if (series) {
      filtered = filtered.filter(product => product.work === series);
    }

    // 搜索过滤
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.work?.toLowerCase().includes(query)
      );
    }

    // 分类过滤
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => 
        selectedCategories.some(cat => product.category.includes(cat))
      );
    }

    // 库存过滤
    if (hasStock) {
      filtered = filtered.filter(product => product.stock_quantity > 0);
    }

    // 排序
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
        break;
    }

    return filtered;
  }, [category, series, sortBy, searchQuery, selectedCategories, hasStock]);

  // 获取当前筛选标签
  const getActiveFilters = () => {
    const filters = [];
    if (searchQuery) filters.push({ type: 'search', label: `搜索: ${searchQuery}`, value: searchQuery });
    selectedCategories.forEach(cat => {
      const categoryName = categoryData.find(c => c.id === cat)?.name || cat;
      filters.push({ type: 'category', label: categoryName, value: cat });
    });
    if (hasStock) filters.push({ type: 'stock', label: '有库存', value: 'stock' });
    return filters;
  };

  const removeFilter = (type: string, value: string) => {
    switch (type) {
      case 'search':
        setSearchQuery('');
        break;
      case 'category':
        setSelectedCategories(prev => prev.filter(cat => cat !== value));
        break;
      case 'stock':
        setHasStock(false);
        break;
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleKanaRow = (kana: string) => {
    setExpandedKanaRows(prev => ({
      ...prev,
      [kana]: !prev[kana]
    }));
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const getPageTitle = () => {
    if (category) {
      const categoryData = categories.find(cat => cat.slug === category);
      if (categoryData) {
        return categoryData.name;
      } else {
        return category;
      }
    }
    if (series) {
      return series;
    }
    return '产品列表';
  };

  const title = getPageTitle();
  const activeFilters = getActiveFilters();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="text-sm">
            <span className="text-gray-500">首页</span>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{title}</span>
          </nav>
        </div>

        {/* 搜索框 */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="请输入关键字"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <button className="bg-black text-white p-2 rounded-lg hover:bg-gray-800 transition-colors">
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
              <p className="text-gray-600">{filteredProducts.length} 件商品</p>
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
                  <option value="default">推荐排序</option>
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

          {/* 当前筛选标签 */}
          {activeFilters.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-gray-600 mr-2">当前筛选:</span>
                {activeFilters.map((filter, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm"
                  >
                    {filter.label}
                    <button
                      onClick={() => removeFilter(filter.type, filter.value)}
                      className="ml-2 hover:text-red-600"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-6">
          {/* 左侧过滤栏 */}
          {showFilters && (
            <aside className="w-60 bg-white rounded-lg shadow-sm h-fit sticky top-8 overflow-y-auto max-h-screen">
              <div className="p-6 space-y-6">
                
                {/* 作品名（按首字母检索） */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">作品名</h3>
                  <div className="space-y-2">
                    {Object.entries(worksByKana).map(([kana, worksInKana]) => (
                      <div key={kana}>
                        <button
                          onClick={() => toggleKanaRow(kana)}
                          className="w-full flex items-center justify-between py-2 px-3 text-left hover:bg-gray-50 rounded"
                        >
                          <span className="text-sm font-medium">{kana} 行</span>
                          {expandedKanaRows[kana] ? <Minus size={16} /> : <Plus size={16} />}
                        </button>
                        {expandedKanaRows[kana] && worksInKana.length > 0 && (
                          <div className="ml-4 mt-2 space-y-1">
                            {worksInKana.map(work => (
                              <a
                                key={work.id}
                                href={`/r/${work.name}`}
                                className="block text-sm text-blue-600 hover:text-blue-800 py-1"
                              >
                                {work.name}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 分类过滤 */}
                <div>
                  <h3 className="font-semibold text-white bg-red-600 px-3 py-2 rounded-t">类别</h3>
                  <div className="border border-t-0 rounded-b p-3 space-y-3">
                    {categoryData.map((cat) => (
                      <div key={cat.id}>
                        <div className="flex items-center justify-between">
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedCategories.includes(cat.id)}
                              onChange={() => toggleCategory(cat.id)}
                              className="form-checkbox text-red-600"
                            />
                            <span className="text-sm">{cat.name}</span>
                          </label>
                          <button
                            onClick={() => toggleSection(cat.id)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            {expandedSections[cat.id] ? <Minus size={14} /> : <Plus size={14} />}
                          </button>
                        </div>
                        {expandedSections[cat.id] && (
                          <div className="ml-6 mt-2 space-y-1">
                            {cat.subcategories.map((sub, index) => (
                              <label key={index} className="flex items-center space-x-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="form-checkbox text-red-600"
                                />
                                <span className="text-xs text-gray-600">{sub}</span>
                              </label>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 库存状态 */}
                <div>
                  <h3 className="font-semibold text-white bg-red-600 px-3 py-2 rounded-t">库存</h3>
                  <div className="border border-t-0 rounded-b p-3">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hasStock}
                        onChange={(e) => setHasStock(e.target.checked)}
                        className="form-checkbox text-red-600"
                      />
                      <span className="text-sm">有库存</span>
                    </label>
                  </div>
                </div>

              </div>
            </aside>
          )}

          {/* 产品网格/列表 */}
          <main className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <p className="text-gray-500 text-lg">没有找到符合条件的商品</p>
                <p className="text-gray-400 mt-2">请尝试调整筛选条件</p>
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