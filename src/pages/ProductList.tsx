import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, Plus, Minus, X } from 'lucide-react';
import ProductCard from '../components/Product/ProductCard';
import { products, categories, works } from '../data/products';

/**
 * 重新实现 ProductList.tsx，完全对齐截图所示布局：
 * 1. 顶部 2px 红色条
 * 2. 左侧搜索框（含黑底× 按钮）
 * 3. 标题「高级搜索」及说明链接
 * 4. 排序按钮水平排列，选中项浅粉背景突出
 * 5. 结果计数紧跟排序左侧
 * 6. 侧边栏字体/间距与高亮逻辑一致
 * 7. 其余原有过滤/排序/视图模式功能保持
 */

const ProductList: React.FC = () => {
  /* URL 参数 */
  const { category, series } = useParams();
  const [searchParams] = useSearchParams();

  /* 视图 / 排序 */
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

  /*********************** 作品首字母分组 ************************/
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

  const worksByKana = useMemo(() => {
    const map: Record<string, string[]> = {};
    allWorks.forEach(w => {
      const key = w.charAt(0).toUpperCase();
      if (!map[key]) map[key] = [];
      map[key].push(w);
    });
    Object.keys(map).forEach(k => map[k].sort());
    return map;
  }, []);

  /*********************** 分类数据 ************************/
  const categoryData = [
    {
      title: '手办 / 模型',
      items: ['所有手办/模型', 'PVC手办', '可动手办', '景品手办', '粘土人', '模型套件', '迷你手办', '限定手办', '预售手办']
    },
    {
      title: '服装 / 配饰',
      items: ['所有服装/配饰', 'T恤', '连帽衫', '外套', '帽子', '包包', '钱包', '手表', '首饰']
    },
    {
      title: '文具 / 杂货',
      items: ['所有文具/杂货', '笔记本', '文件夹', '笔类', '贴纸', '徽章', '钥匙扣', '杯子', '餐具']
    },
    {
      title: '游戏 / 玩具',
      items: ['所有游戏/玩具', '卡牌游戏', '桌游', '拼图', '毛绒玩具', '积木', '电子游戏', '收藏卡', '游戏周边']
    },
    {
      title: '漫画 / 书籍',
      items: ['所有漫画/书籍', '单行本', '画集', '设定集', '小说', '攻略本', '杂志', '限定版', '签名版']
    },
    {
      title: '数码 / 电子',
      items: ['所有数码/电子', '手机壳', '充电器', '耳机', '音响', 'USB设备', '电脑配件', '游戏机', '智能设备']
    },
    {
      title: '家居 / 生活',
      items: ['所有家居/生活', '抱枕', '毛毯', '床单', '装饰品', '收纳盒', '台灯', '挂画', '生活用品']
    },
    {
      title: '限定 / 特别',
      items: ['所有限定/特别', '会场限定', '网店限定', '预约限定', '抽选商品', '纪念商品', '合作商品', '特典商品', '其他限定']
    }
  ];

  /*********************** 商品过滤 & 排序 ************************/
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // URL category / series
    if (category) list = list.filter(p => p.category === category || p.work === category);
    if (series)   list = list.filter(p => p.work === series);

    // 搜索
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.work.toLowerCase().includes(q));
    }

    // 类别 / 作品
    if (selectedCategories.length) list = list.filter(p => selectedCategories.some(c => p.category.includes(c)));
    if (selectedWorks.length)      list = list.filter(p => selectedWorks.includes(p.work));

    // 库存
    if (stockFilter === 'inStock') list = list.filter(p => p.stock_quantity > 0);

    // 排序
    switch (sortBy) {
      case 'price-low':  list.sort((a, b) => a.price - b.price); break;
      case 'price-high': list.sort((a, b) => b.price - a.price); break;
      case 'newest':     list.sort((a, b) => new Date(b.release_date || '').getTime() - new Date(a.release_date || '').getTime()); break;
    }
    return list;
  }, [category, series, searchQuery, selectedCategories, selectedWorks, stockFilter, sortBy]);

  /*********************** 工具函数 ************************/
  const toggleSection = (s: string) => setExpandedSections(prev => ({ ...prev, [s]: !prev[s] }));
  const toggleKanaRow = (k: string) => setExpandedKanaRows(prev => ({ ...prev, [k]: !prev[k] }));
  const toggleCategory = (c: string) => setSelectedCategories(prev => prev.includes(c) ? prev.filter(i => i !== c) : [...prev, c]);
  const toggleWork = (w: string) => setSelectedWorks(prev => prev.includes(w) ? prev.filter(i => i !== w) : [...prev, w]);

  const isCategoryTitleHighlighted = (t: string) => {
    const cat = categoryData.find(c => c.title === t);
    return cat ? cat.items.some(i => selectedCategories.includes(i)) : false;
  };
  const isKanaTitleHighlighted = (k: string) => (worksByKana[k] || []).some(w => selectedWorks.includes(w));

  /*********************** 渲染 ************************/
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部红线 */}
      <div className="w-full h-2 bg-red-600" />

      <div className="container mx-auto px-4 pt-6 pb-8">
        {/* 搜索 + 标题行 */}
        <div className="flex items-start gap-8 mb-8">
          {/* 搜索框 */}
          <div className="relative" style={{ width: 270 }}>
            <input
              type="text"
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

          {/* 标题 + 说明 */}
          <div>
            <h1 className="text-2xl font-bold mb-1">高级搜索</h1>
            <a href="#" className="text-xs text-red-600 underline hover:text-red-800">查看每个目标的说明</a>
          </div>
        </div>

        {/* 排序区域 */}
        <div className="flex items-center gap-6 mb-6 text-sm">
          {/* 结果计数 */}
          <span className="text-gray-600">
            {filteredProducts.length} 件商品
          </span>

          {/* 排序按钮 */}
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy('newest')}
              className={`px-3 py-1 rounded text-xs ${
                sortBy === 'newest' ? 'bg-pink-100 text-pink-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              最新
            </button>
            <button
              onClick={() => setSortBy('price-low')}
              className={`px-3 py-1 rounded text-xs ${
                sortBy === 'price-low' ? 'bg-pink-100 text-pink-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              价格低到高
            </button>
            <button
              onClick={() => setSortBy('price-high')}
              className={`px-3 py-1 rounded text-xs ${
                sortBy === 'price-high' ? 'bg-pink-100 text-pink-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              价格高到低
            </button>
          </div>

          {/* 视图切换 */}
          <div className="flex gap-1 ml-auto">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${
                viewMode === 'grid' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${
                viewMode === 'list' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <List size={16} />
            </button>
          </div>
        </div>

        {/* 主要内容区域 */}
        <div className="flex gap-8">
          {/* 侧边栏过滤器 */}
          {showFilters && (
            <div className="w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm border p-4">
                {/* 分类过滤 */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">商品分类</h3>
                  <div className="space-y-2">
                    {categoryData.map(cat => (
                      <div key={cat.title}>
                        <button
                          onClick={() => toggleSection(cat.title)}
                          className={`flex items-center justify-between w-full text-left text-sm py-1 ${
                            isCategoryTitleHighlighted(cat.title) ? 'text-red-600 font-medium' : 'text-gray-700'
                          }`}
                        >
                          {cat.title}
                          {expandedSections[cat.title] ? <Minus size={14} /> : <Plus size={14} />}
                        </button>
                        {expandedSections[cat.title] && (
                          <div className="ml-4 mt-1 space-y-1">
                            {cat.items.map(item => (
                              <label key={item} className="flex items-center text-xs">
                                <input
                                  type="checkbox"
                                  checked={selectedCategories.includes(item)}
                                  onChange={() => toggleCategory(item)}
                                  className="mr-2 text-red-600 focus:ring-red-500"
                                />
                                <span className={selectedCategories.includes(item) ? 'text-red-600' : 'text-gray-600'}>
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

                {/* 作品过滤 */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">作品</h3>
                  <div className="space-y-2">
                    {Object.keys(worksByKana).sort().map(kana => (
                      <div key={kana}>
                        <button
                          onClick={() => toggleKanaRow(kana)}
                          className={`flex items-center justify-between w-full text-left text-sm py-1 ${
                            isKanaTitleHighlighted(kana) ? 'text-red-600 font-medium' : 'text-gray-700'
                          }`}
                        >
                          {kana}
                          {expandedKanaRows[kana] ? <Minus size={14} /> : <Plus size={14} />}
                        </button>
                        {expandedKanaRows[kana] && (
                          <div className="ml-4 mt-1 space-y-1">
                            {worksByKana[kana].map(work => (
                              <label key={work} className="flex items-center text-xs">
                                <input
                                  type="checkbox"
                                  checked={selectedWorks.includes(work)}
                                  onChange={() => toggleWork(work)}
                                  className="mr-2 text-red-600 focus:ring-red-500"
                                />
                                <span className={selectedWorks.includes(work) ? 'text-red-600' : 'text-gray-600'}>
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

                {/* 库存过滤 */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">库存状态</h3>
                  <div className="space-y-2">
                    <label className="flex items-center text-sm">
                      <input
                        type="radio"
                        name="stock"
                        checked={stockFilter === 'all'}
                        onChange={() => setStockFilter('all')}
                        className="mr-2 text-red-600 focus:ring-red-500"
                      />
                      全部商品
                    </label>
                    <label className="flex items-center text-sm">
                      <input
                        type="radio"
                        name="stock"
                        checked={stockFilter === 'inStock'}
                        onChange={() => setStockFilter('inStock')}
                        className="mr-2 text-red-600 focus:ring-red-500"
                      />
                      仅现货
                    </label>
                    <label className="flex items-center text-sm">
                      <input
                        type="radio"
                        name="stock"
                        checked={stockFilter === 'includeOutOfStock'}
                        onChange={() => setStockFilter('includeOutOfStock')}
                        className="mr-2 text-red-600 focus:ring-red-500"
                      />
                      包含缺货
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 商品列表 */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">没有找到符合条件的商品</p>
              </div>
            ) : (
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                  : 'space-y-4'
              }>
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    viewMode={viewMode}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;