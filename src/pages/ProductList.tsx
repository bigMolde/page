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
  const [selectedWorks, setSelectedWorks] = useState<string[]>([]);
  const [stockFilter, setStockFilter] = useState<'all' | 'inStock' | 'includeOutOfStock'>('all');
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({});
  const [expandedKanaRows, setExpandedKanaRows] = useState<{[key: string]: boolean}>({});

  // 完整的作品列表
  const allWorks = [
    '阿基拉', '阿松', '暗杀教室', '进击的巨人', '鬼灭之刃', '火影忍者', '海贼王', '死神', '名侦探柯南', '钢之炼金术师',
    '工作细胞', '排球少年！！', '黑执事', '黑色五叶草', 'JOJO的奇妙冒险', '灵能百分百', '拳愿阿修罗', '境界触发者', '境界的彼方', '魔法少女小圆',
    '魔卡少女樱', '秒速五厘米', '言叶之庭', '千与千寻', '天空之城', '龙猫', '萤火虫之墓', '天气之子', '星之声', '数码宝贝大冒险',
    '口袋妖怪', '妄想学生会', '日常', '银魂', '为美好的世界献上祝福！', 'Re:从零开始的异世界生活', '刀剑神域', '加速世界', '赛马娘Pretty Derby', '紫罗兰永恒花园',
    '约定的梦幻岛', '四月是你的谎言', '乐园追放', '未来日记', '斩！赤红之瞳', '刀剑乱舞 花丸', 'Fate/Zero', 'Fate/stay night［Unlimited Blade Works］', 'Fate/Apocrypha', 'Fate/Grand Order ‑绝对魔兽战线巴比伦尼亚‑',
    '干物妹！小埋', '摇曳露营△', '轻音少女', '中二病也要谈恋爱！', '花开伊吕波', '狼与香辛料', '兽娘动物园', '青春猪头少年不会梦到兔女郎学姐', '物语系列', '东京喰种',
    '异度侵入', '心理测量者', '进化之实踏上胜利的人生', '文豪野犬', '缘之空', '未闻花名', '彼方的阿斯特拉', '来自新世界', '七大罪', '白箱',
    '工作细胞BLACK', '宝可梦旅途', '哆啦A梦', '蜡笔小新', '樱桃小丸子', '美少女战士', '忍者乱太郎', '足球小将', '灌篮高手', '网球王子',
    '甲铁城的卡巴内瑞', '银河铁道999', '机动战士高达UC', '新世纪福音战士', '机动战士高达SEED', '交响诗篇', '天元突破红莲螺岩', '高分少女', 'Love Live! Sunshine!!', 'BanG Dream!',
    '歌之王子殿下', '永生之酒', '无头骑士异闻录', '灼眼的夏娜', '旋风管家', '零之使魔', '只要长得可爱即使是变态你也喜欢吗？', '辉夜大小姐想让我告白', '间谍过家家', '记录的地平线'
  ];

  // 按首字母分组作品
  const worksByKana = useMemo(() => {
    const kanaGroups: {[key: string]: string[]} = {};

    allWorks.forEach(work => {
      const firstChar = work.charAt(0);
      // 根据中文首字母分组
      let kanaKey = '';
      
      if (['阿'].includes(firstChar)) kanaKey = 'A';
      else if (['暗', '安'].includes(firstChar)) kanaKey = 'A';
      else if (['进'].includes(firstChar)) kanaKey = 'J';
      else if (['鬼'].includes(firstChar)) kanaKey = 'G';
      else if (['火', '海', '黑', '花'].includes(firstChar)) kanaKey = 'H';
      else if (['死'].includes(firstChar)) kanaKey = 'S';
      else if (['名'].includes(firstChar)) kanaKey = 'M';
      else if (['钢', '工', '高'].includes(firstChar)) kanaKey = 'G';
      else if (['排'].includes(firstChar)) kanaKey = 'P';
      else if (['J', 'L', 'R', 'F', 'B'].includes(firstChar)) kanaKey = firstChar;
      else if (['灵'].includes(firstChar)) kanaKey = 'L';
      else if (['拳', '境'].includes(firstChar)) kanaKey = 'Q';
      else if (['魔'].includes(firstChar)) kanaKey = 'M';
      else if (['秒', '言'].includes(firstChar)) kanaKey = 'M';
      else if (['千', '天', '龙', '萤'].includes(firstChar)) kanaKey = 'T';
      else if (['星', '数'].includes(firstChar)) kanaKey = 'S';
      else if (['口'].includes(firstChar)) kanaKey = 'K';
      else if (['妄', '日', '银', '为'].includes(firstChar)) kanaKey = 'W';
      else if (['刀'].includes(firstChar)) kanaKey = 'D';
      else if (['加', '赛', '紫'].includes(firstChar)) kanaKey = 'J';
      else if (['约', '四', '乐', '未', '斩'].includes(firstChar)) kanaKey = 'Y';
      else if (['干', '摇', '轻', '中'].includes(firstChar)) kanaKey = 'G';
      else if (['狼', '兽', '青', '物'].includes(firstChar)) kanaKey = 'L';
      else if (['东', '异', '心', '进', '文', '缘'].includes(firstChar)) kanaKey = 'D';
      else if (['彼', '来', '七', '白'].includes(firstChar)) kanaKey = 'B';
      else if (['宝', '哆', '蜡', '樱', '美', '忍', '足', '灌', '网'].includes(firstChar)) kanaKey = 'B';
      else if (['甲', '银', '机', '新', '交'].includes(firstChar)) kanaKey = 'J';
      else if (['歌', '永', '无', '灼', '旋', '零', '只', '辉', '间', '记'].includes(firstChar)) kanaKey = 'G';
      
      if (kanaKey && !kanaGroups[kanaKey]) {
        kanaGroups[kanaKey] = [];
      }
      if (kanaKey) {
        kanaGroups[kanaKey].push(work);
      }
    });

    // 只返回有作品的分组
    const filteredGroups: {[key: string]: string[]} = {};
    Object.keys(kanaGroups).forEach(key => {
      if (kanaGroups[key].length > 0) {
        filteredGroups[key] = kanaGroups[key].sort();
      }
    });

    return filteredGroups;
  }, []);

  // 分类数据 - 对应Categories.tsx的结构
  const categoryData = [
    {
      title: '手办 / 模型',
      items: [
        '所有手办/模型',
        'PVC手办',
        '可动手办',
        '景品手办',
        '粘土人',
        '模型套件',
        '迷你手办',
        '限定手办',
        '预售手办',
      ],
    },
    {
      title: '服装 / 配饰',
      items: [
        '所有服装/配饰',
        'T恤',
        '连帽衫',
        '外套',
        '帽子',
        '包包',
        '钱包',
        '手表',
        '首饰',
      ],
    },
    {
      title: '文具 / 杂货',
      items: [
        '所有文具/杂货',
        '笔记本',
        '文件夹',
        '笔类',
        '贴纸',
        '徽章',
        '钥匙扣',
        '杯子',
        '餐具',
      ],
    },
    {
      title: '游戏 / 玩具',
      items: [
        '所有游戏/玩具',
        '卡牌游戏',
        '桌游',
        '拼图',
        '毛绒玩具',
        '积木',
        '电子游戏',
        '收藏卡',
        '游戏周边',
      ],
    },
    {
      title: '漫画 / 书籍',
      items: [
        '所有漫画/书籍',
        '单行本',
        '画集',
        '设定集',
        '小说',
        '攻略本',
        '杂志',
        '限定版',
        '签名版',
      ],
    },
    {
      title: '数码 / 电子',
      items: [
        '所有数码/电子',
        '手机壳',
        '充电器',
        '耳机',
        '音响',
        'USB设备',
        '电脑配件',
        '游戏机',
        '智能设备',
      ],
    },
    {
      title: '家居 / 生活',
      items: [
        '所有家居/生活',
        '抱枕',
        '毛毯',
        '床单',
        '装饰品',
        '收纳盒',
        '台灯',
        '挂画',
        '生活用品',
      ],
    },
    {
      title: '限定 / 特别',
      items: [
        '所有限定/特别',
        '会场限定',
        '网店限定',
        '预约限定',
        '抽选商品',
        '纪念商品',
        '合作商品',
        '特典商品',
        '其他限定',
      ],
    },
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

    // 作品过滤
    if (selectedWorks.length > 0) {
      filtered = filtered.filter(product => 
        selectedWorks.some(work => product.work === work)
      );
    }

    // 库存过滤
    if (stockFilter === 'inStock') {
      filtered = filtered.filter(product => product.stock_quantity > 0);
    }
    // 'includeOutOfStock' 和 'all' 都显示所有商品，不需要额外过滤

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
  }, [category, series, sortBy, searchQuery, selectedCategories, selectedWorks, stockFilter]);

  // 获取当前筛选标签
  const getActiveFilters = () => {
    const filters = [];
    if (searchQuery) filters.push({ type: 'search', label: `搜索: ${searchQuery}`, value: searchQuery });
    selectedCategories.forEach(cat => {
      filters.push({ type: 'category', label: cat, value: cat });
    });
    selectedWorks.forEach(work => {
      filters.push({ type: 'work', label: work, value: work });
    });
    if (stockFilter === 'inStock') filters.push({ type: 'stock', label: '有库存', value: 'inStock' });
    if (stockFilter === 'includeOutOfStock') filters.push({ type: 'stock', label: '包括无库存', value: 'includeOutOfStock' });
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
      case 'work':
        setSelectedWorks(prev => prev.filter(work => work !== value));
        break;
      case 'stock':
        setStockFilter('all');
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

  const toggleWork = (work: string) => {
    setSelectedWorks(prev => 
      prev.includes(work) 
        ? prev.filter(w => w !== work)
        : [...prev, work]
    );
  };

  // 检查分类标题是否应该高亮
  const isCategoryTitleHighlighted = (categoryTitle: string) => {
    const category = categoryData.find(cat => cat.title === categoryTitle);
    return category?.items.some(item => selectedCategories.includes(item)) || false;
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
          {/* 左侧过滤栏 - 调整宽度为280px */}
          {showFilters && (
            <aside className="w-70 bg-white rounded-lg shadow-sm h-fit sticky top-8 overflow-y-auto max-h-screen" style={{ width: '280px' }}>
              <div className="p-6 space-y-6">
                
                {/* 作品名称（按首字母检索） - 调整字体大小 */}
                <div>
                  <h3 className="font-semibold text-white bg-red-600 px-3 py-2 rounded-t text-sm">作品名称</h3>
                  <div className="space-y-1">
                    {Object.entries(worksByKana).map(([kana, worksInKana]) => (
                      <div key={kana}>
                        <button
                          onClick={() => toggleKanaRow(kana)}
                          className="w-full flex items-center justify-between py-1.5 px-3 text-left hover:bg-gray-50 rounded"
                        >
                          <span className="text-xs font-medium text-left">{kana}</span>
                          {expandedKanaRows[kana] ? <Minus size={14} /> : <Plus size={14} />}
                        </button>
                        {expandedKanaRows[kana] && worksInKana.length > 0 && (
                          <div className="ml-3 mt-1 space-y-1">
                            {worksInKana.map(work => (
                              <label
                                key={work}
                                className="flex items-center cursor-pointer"
                                style={{
                                  backgroundColor: selectedWorks.includes(work) ? '#E33D3D' : 'transparent',
                                  paddingTop: '8px',
                                  paddingBottom: '8px',
                                  paddingLeft: '12px',
                                  paddingRight: '12px',
                                  borderRadius: '4px'
                                }}
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedWorks.includes(work)}
                                  onChange={() => toggleWork(work)}
                                  className="mr-2"
                                  style={{
                                    width: '12px',
                                    height: '12px',
                                    accentColor: '#E33D3D'
                                  }}
                                />
                                <span className="text-xs text-black text-left">
                                  {work}
                                </span>
                              </label>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 分类过滤 - 调整字体大小并添加选择框 */}
                <div>
                  <h3 className="font-semibold text-white bg-red-600 px-3 py-2  text-sm">类别</h3>
                  <div className="space-y-1">
                    {categoryData.map((cat) => (
                      <div key={cat.title}>
                        <button
                          onClick={() => toggleSection(cat.title)}
                          className="w-full flex items-center justify-between py-1.5 px-3 text-left hover:bg-gray-50 "
                          style={{
                            backgroundColor: isCategoryTitleHighlighted(cat.title) ? '#F6DFDE' : 'transparent'
                          }}
                        >
                          <span className="text-xs font-medium text-left text-black">{cat.title}</span>
                          {expandedSections[cat.title] ? <Minus size={14} /> : <Plus size={14} />}
                        </button>
                        {expandedSections[cat.title] && (
                          <div className="ml-3 mt-1 space-y-1">
                            {cat.items.map((item, index) => (
                              <label
                                key={index}
                                className="flex items-center cursor-pointer"
                                style={{
                                  backgroundColor: selectedCategories.includes(item) ? '#F6DFDE' : 'transparent',
                                  paddingTop: '8px',
                                  paddingBottom: '8px',
                                  paddingLeft: '12px',
                                  paddingRight: '12px',
                                  borderRadius: '4px'
                                }}
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedCategories.includes(item)}
                                  onChange={() => toggleCategory(item)}
                                  className="mr-2"
                                  style={{
                                    width: '12px',
                                    height: '12px',
                                    accentColor: '#F6DFDE'
                                  }}
                                />
                                <span className="text-xs text-left text-black">
                                  {item}
                                </span>
                              </label>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 库存状态 - 简化为两个选择 */}
                <div>
                  <h3 className="font-semibold text-white bg-red-600 px-3 py-2 rounded-t text-sm">库存</h3>
                  <div className="border border-t-0 rounded-b p-3 space-y-2">
                    <button
                      onClick={() => setStockFilter(stockFilter === 'inStock' ? 'all' : 'inStock')}
                      className={`w-full flex items-center justify-between py-1.5 px-3 text-left hover:bg-gray-50 rounded ${
                        stockFilter === 'inStock' ? 'bg-red-50 text-red-600' : ''
                      }`}
                    >
                      <span className="text-xs font-medium text-left">有库存</span>
                    </button>
                    <button
                      onClick={() => setStockFilter(stockFilter === 'includeOutOfStock' ? 'all' : 'includeOutOfStock')}
                      className={`w-full flex items-center justify-between py-1.5 px-3 text-left hover:bg-gray-50 rounded ${
                        stockFilter === 'includeOutOfStock' ? 'bg-red-50 text-red-600' : ''
                      }`}
                    >
                      <span className="text-xs font-medium text-left">包括无库存</span>
                    </button>
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