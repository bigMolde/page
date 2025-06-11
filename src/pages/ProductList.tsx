import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, Plus, Minus, X } from 'lucide-react';
import ProductCard from '../components/Product/ProductCard';
import { products, categories } from '../data/products';

/**
 * 根据截图统一了页面布局与配色：
 * 1. 顶部红色细条
 * 2. 搜索框占左，上含黑底“×”清空按钮
 * 3. 标题改为“高级搜索”，并加入说明链接
 * 4. 排序按钮水平排布，选中项浅粉背景突出
 * 5. 结果计数紧随排序左侧
 * 6. 侧边栏字体/间距与截图保持一致
 */

const ProductList: React.FC = () => {
  const { category, series } = useParams();
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high'>('newest');
  const [showFilters, setShowFilters] = useState(true);

  /* 搜索 / 过滤状态 */
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedWorks, setSelectedWorks] = useState<string[]>([]);
  const [stockFilter, setStockFilter] = useState<'all' | 'inStock' | 'includeOutOfStock'>('all');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [expandedKanaRows, setExpandedKanaRows] = useState<Record<string, boolean>>({});

  /* 作品首字分组 —— 仅演示用，实际应替换为后端提供 */
  const worksByKana = useMemo(() => ({ A: ['艾琳', '艾米'], B: ['哆啦A梦'] }), []);

  /* 根据筛选得到的商品 */
  const filteredProducts = useMemo(() => {
    let list = [...products];
    if (category) list = list.filter(p => p.category === category);
    if (series)   list = list.filter(p => p.work === series);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q));
    }
    if (selectedCategories.length)
      list = list.filter(p => selectedCategories.includes(p.category));
    if (selectedWorks.length)
      list = list.filter(p => selectedWorks.includes(p.work));
    if (stockFilter === 'inStock')
      list = list.filter(p => p.stock_quantity > 0);

    switch (sortBy) {
      case 'price-low':  list.sort((a, b) => a.price - b.price); break;
      case 'price-high': list.sort((a, b) => b.price - a.price); break;
      case 'newest':     list.sort((a, b) => new Date(b.release_date!).getTime() - new Date(a.release_date!).getTime());
    }
    return list;
  }, [category, series, searchQuery, selectedCategories, selectedWorks, stockFilter, sortBy]);

  /* 简易工具函数 */
  const toggleSection = (id: string) => setExpandedSections(s => ({ ...s, [id]: !s[id] }));
  const toggleKanaRow  = (id: string) => setExpandedKanaRows(s => ({ ...s, [id]: !s[id] }));
  const toggleCategory = (c: string) => setSelectedCategories(s => s.includes(c) ? s.filter(i => i !== c) : [...s, c]);
  const toggleWork     = (w: string) => setSelectedWorks(s => s.includes(w) ? s.filter(i => i !== w) : [...s, w]);

  /* 侧边栏示例数据 */
  const categoryData = [{ title: '手办 / 模型', items: ['PVC手办', '可动手办'] }];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部红色条 */}
      <div className="w-full h-2 bg-red-600" />

      <div className="container mx-auto px-4 pt-6 pb-8">
        {/* 搜索 + 标题行 */}
        <div className="flex items-start gap-8 mb-8">
          {/* 搜索框 */}
          <div className="relative" style={{ width: 270 }}>
            <input
              placeholder="なにかお探しですか？"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full border border-gray-300 rounded-sm px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute top-0 right-0 h-full px-3 bg-black flex items-center justify-center"
              >
                <X size={14} className="text-white" />
              </button>
            )}
          </div>

          <div>
            <h1 className="text-2xl font-bold mb-1">高级搜索</h1>
            <a href="#" className="text-xs text-red-600 underline hover:text-red-800">查看每个目标的说明</a>
          </div>
        </div>

        {/* 排序 + 结果数 */}
        <div className="flex items-center gap-6 mb-6 text-sm">
          <span className="whitespace-nowrap">{filteredProducts.length} 个结果</span>

          <div className="flex flex-wrap items-center gap-4">
            <span className="text-gray-600">排序：</span>
            {[
              { key: 'newest',     label: '发布日期' },
              { key: 'price-low',  label: '价格（从低到高）' },
              { key: 'price-high', label: '价格（从高到低）' }
            ].map(s => (
              <button
                key={s.key}
                onClick={() => setSortBy(s.key as any)}
                className={`px-3 py-1 rounded-sm transition-colors ${sortBy === s.key ? 'bg-red-100 text-red-800' : 'hover:bg-gray-100'}`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* 主体：左侧过滤 + 右侧产品 */}
        <div className="flex gap-6">
          {/* 过滤侧边栏 */}
          {showFilters && (
            <aside className="w-64 bg-white rounded-sm shadow-sm p-0">
              {/* 作品名称 */}
              <h3 className="bg-red-600 text-white text-sm font-semibold px-4 py-3">作品名称</h3>
              {Object.entries(worksByKana).map(([kana, items]) => (
                <div key={kana}>
                  <button
                    onClick={() => toggleKanaRow(kana)}
                    style={{ backgroundColor: items.some(i => selectedWorks.includes(i)) ? '#F6DFDE' : undefined }}
                    className="flex w-full justify-between items-center text-left px-4 py-3 text-xs hover:bg-gray-50"
                  >
                    <span>{kana}</span>
                    {expandedKanaRows[kana] ? <Minus size={14} /> : <Plus size={14} />}
                  </button>
                  {expandedKanaRows[kana] && items.map(item => (
                    <label
                      key={item}
                      className="flex items-center gap-2 pl-8 pr-4 py-2 text-xs cursor-pointer hover:bg-gray-50"
                      style={{ backgroundColor: selectedWorks.includes(item) ? '#F6DFDE' : undefined }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedWorks.includes(item)}
                        onChange={() => toggleWork(item)}
                        className="w-3 h-3 accent-red-600" />
                      {item}
                    </label>
                  ))}
                </div>
              ))}

              {/* 分类 */}
              <h3 className="bg-red-600 text-white text-sm font-semibold px-4 py-3 mt-6">类别</h3>
              {categoryData.map(c => (
                <div key={c.title}>
                  <button
                    onClick={() => toggleSection(c.title)}
                    style={{ backgroundColor: c.items.some(i => selectedCategories.includes(i)) ? '#F6DFDE' : undefined }}
                    className="flex w-full justify-between items-center text-left px-4 py-3 text-xs hover:bg-gray-50"
                  >
                    <span>{c.title}</span>
                    {expandedSections[c.title] ? <Minus size={14} /> : <Plus size={14} />}
                  </button>
                  {expandedSections[c.title] && c.items.map(i => (
                    <label
                      key={i}
                      className="flex items-center gap-2 pl-8 pr-4 py-2 text-xs cursor-pointer hover:bg-gray-50"
                      style={{ backgroundColor: selectedCategories.includes(i) ? '#F6DFDE' : undefined }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(i)}
                        onChange={() => toggleCategory(i)}
                        className="w-3 h-3 accent-red-600" />
                      {i}
                    </label>
                  ))}
                </div>
              ))}
            </aside>
          )}

          {/* 产品区域 */}
          <main className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-sm p-12 text-center text-gray-500">没有找到符合条件的商品</div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
                {filteredProducts.map(p => (
                  <ProductCard key={p.id} product={p} className={viewMode === 'list' ? 'flex' : ''} />
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
