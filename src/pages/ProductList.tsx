import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, Plus, Minus, X, Search as SearchIcon } from 'lucide-react';
import ProductCard from '../components/Product/ProductCard';
import { products, categories } from '../data/products';

/**
 * ProductList.tsx – 重新排版以匹配截图：
 *  1. 左侧 260 px 搜索框（白底灰字），黑色搜索按钮紧贴右侧。
 *  2. “高级搜索”标题位于搜索框右侧；右上角为说明链接。
 *  3. 下一行：左侧显示结果数，右侧水平排列排序按钮（与左边侧栏标题齐平）。
 *  4. 其余过滤 / 侧栏 / 视图切换逻辑保持不变。
 */

const ProductList: React.FC = () => {
  /* URL params */
  const { category, series } = useParams();
  const [searchParams] = useSearchParams();

  /* UI state */
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high'>('newest');
  const [showFilters, setShowFilters] = useState(true);

  /* Filter state */
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
      const k = w.charAt(0).toUpperCase();
      if (!map[k]) map[k] = [];
      map[k].push(w);
    });
    Object.keys(map).forEach(k => map[k].sort());
    return map;
  }, []);

  /*********************** 分类数据 ************************/
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

  /*********************** 过滤与排序 ************************/
  const filteredProducts = useMemo(() => {
    let list = [...products];
    if (category) list = list.filter(p => p.category === category || p.work === category);
    if (series)   list = list.filter(p => p.work === series);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.work.toLowerCase().includes(q));
    }
    if (selectedCategories.length) list = list.filter(p => selectedCategories.some(c => p.category.includes(c)));
    if (selectedWorks.length)      list = list.filter(p => selectedWorks.includes(p.work));
    if (stockFilter === 'inStock') list = list.filter(p => p.stock_quantity > 0);

    switch (sortBy) {
      case 'price-low':  list.sort((a, b) => a.price - b.price); break;
      case 'price-high': list.sort((a, b) => b.price - a.price); break;
      case 'newest':     list.sort((a, b) => new Date(b.release_date || '').getTime() - new Date(a.release_date || '').getTime()); break;
    }
    return list;
  }, [category, series, searchQuery, selectedCategories, selectedWorks, stockFilter, sortBy]);

  /*********************** UI 辅助函数 ************************/
  const toggleSection = (k: string) => setExpandedSections(s => ({ ...s, [k]: !s[k] }));
  const toggleKanaRow = (k: string) => setExpandedKanaRows(s => ({ ...s, [k]: !s[k] }));
  const toggleCategory = (c: string) => setSelectedCategories(s => s.includes(c) ? s.filter(i => i !== c) : [...s, c]);
  const toggleWork = (w: string) => setSelectedWorks(s => s.includes(w) ? s.filter(i => i !== w) : [...s, w]);
  const isCategoryTitleHighlighted = (t: string) => {
    const cat = categoryData.find(c => c.title === t);
    return cat ? cat.items.some(i => selectedCategories.includes(i)) : false;
  };
  const isKanaTitleHighlighted = (k: string) => (worksByKana[k] || []).some(w => selectedWorks.includes(w));

  /*********************** 页面渲染 ************************/
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部红线 */}
      <div className="w-full h-2 bg-red-600" />

      <div className="container mx-auto px-4 pt-6 pb-8">
        {/* 第一行：搜索框 + 标题 + 说明链接 */}
        <div className="flex items-start justify-between mb-4">
          {/* 搜索框 */}
          <div className="flex-shrink-0 relative" style={{ width: 260 }}>
            <input
              type="text"
              placeholder="找什么？"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-4 pr-10 text-sm border border-gray-200 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <button
              onClick={() => { /* 触发搜索或清空 */ }}
              className="absolute inset-y-0 right-0 w-10 bg-black flex items-center justify-center"
            >
              <SearchIcon size={18} className="text-white" />
            </button>
          </div>

          {/* 标题 */}
          <h1 className="text-2xl font-bold ml-6">高级搜索</h1>

          {/* 说明链接 */}
          <a href="#" className="text-sm text-black underline hover:text-red-700 ml-auto">查看每个目标的说明</a>
        </div>

        {/* 第二行：结果数 + 排序按钮组 */}
        <div className="flex items-center justify-between border-b pb-3 mb-6">
          {/* 结果数 */}
          <p className="text-sm font-medium">{filteredProducts.length} 个结果</p>

          {/* 排序按钮组 */}
          <div className="flex items-center gap-4 text-sm whitespace-nowrap">
            <span className="text-gray-600">排序：</span>
            {[
              { key: 'newest',     label: '发布日期' },
              { key: 'price-low',  label: '价格（从低到高）' },
              { key: 'price-high', label: '价格（从高到低）' }
            ].map(s => (
              <button
                key={s.key}
                onClick={() => setSortBy(s.key as any)}
                className={`px-4 py-1 transition-colors ${sortBy === s.key ? 'bg-red-100 text-red-800' : 'hover:bg-gray-100'}`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* 视图切换 + 筛选开关 */}
        <div className="flex items-center justify-end gap-4 mb-6">
          <div className="flex rounded-sm border overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-red-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 border-l ${viewMode === 'list' ? 'bg-red-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <List size={18} />
            </button>
          </div>
          <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-1 px-3 py-2 border rounded-sm text-sm hover:bg-gray-50">
            <Filter size={18} />筛选
          </button>
        </div>

        {/* 主体：左侧侧栏 + 商品列表 */}
        <div className="flex gap-6">
          {/* 过滤侧栏 */}
          {showFilters && (
            <aside className="w-64 flex-shrink-0 bg-white rounded-sm shadow-sm overflow-y-auto max-h-screen sticky top-8">
              {/* 作品名称 */}
              <h3 className="bg-red-600 text-white text-sm font-semibold px-4 py-3">作品名称</h3>
              {Object.entries(worksByKana).map(([kana, items]) => (
                <div key={kana}>
                  <button
                    onClick={() => toggleKanaRow(kana)}
                    style={{ backgroundColor: isKanaTitleHighlighted(kana) ? '#F6DFDE' : undefined }}
                    className="flex w-full items-center justify-between text-left px-4 py-3 text-xs hover:bg-gray-50"
                  >
                    <span>{kana}</span>
                    {expandedKanaRows[kana] ? <Minus size={14} /> : <Plus size={14} />}
                  </button>
                  {expandedKanaRows[kana] && items.map(it => (
                    <label
                      key={it}
                      style={{ backgroundColor: selectedWorks.includes(it) ? '#F6DFDE' : undefined }}
                      className="flex items-center gap-2 pl-8 pr-4 py-2 text-xs cursor-pointer hover:bg-gray-50"
                    >
                      <input type="checkbox" checked={selectedWorks.includes(it)} onChange={() => toggleWork(it)} className="w-3 h-3 accent-red-600" />
                      {it}
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
                    style={{ backgroundColor: isCategoryTitleHighlighted(c.title) ? '#F6DFDE' : undefined }}
                    className="flex w-full items-center justify-between text-left px-4 py-3 text-xs hover:bg-gray-50"
                  >
                    <span>{c.title}</span>
                    {expandedSections[c.title] ? <Minus size={14} /> : <Plus size={14} />}
                  </button>
                  {expandedSections[c.title] && c.items.map(it => (
                    <label
                      key={it}
                      style={{ backgroundColor: selectedCategories.includes(it) ? '#F6DFDE' : undefined }}
                      className="flex items-center gap-2 pl-8 pr-4 py-2 text-xs cursor-pointer hover:bg-gray-50"
                    >
                      <input type="checkbox" checked={selectedCategories.includes(it)} onChange={() => toggleCategory(it)} className="w-3 h-3 accent-red-600" />
                      {it}
                    </label>
                  ))}
                </div>
              ))}
            </aside>
          )}

          {/* 商品列表 */}
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
