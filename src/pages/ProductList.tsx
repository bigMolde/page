// ProductList.tsx — 简化版本，移除搜索框和工具栏
// ------------------------------------------------------------
// 说明：
//   1. 删除了搜索框功能
//   2. 删除了视图切换和筛选开关工具栏
//   3. 结果数长度限制，不超过作品名称
//   4. 保留侧栏过滤和排序功能
// ------------------------------------------------------------

import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import {
  Plus, Minus
} from 'lucide-react';
import { pinyin } from 'pinyin-pro';
import ProductCard from '../components/Product/ProductCard';
import { products, categories } from '../data/products';

// ----------------------------- 组件主体 -----------------------------
const ProductList: React.FC = () => {
  /* -------- URL params -------- */
  const { category, series } = useParams();           // 动态路由中的分类 / 作品
  const [searchParams] = useSearchParams();           // 若后续需要解析 query 可用

  /* -------- UI state -------- */
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high'>('newest');
  const [showFilters, setShowFilters] = useState(true);              // 侧栏开关

  /* -------- Filter state -------- */
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedWorks, setSelectedWorks] = useState<string[]>([]);
  const [stockFilter, setStockFilter] = useState<'all' | 'inStock' | 'includeOutOfStock'>('all');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [expandedKanaRows, setExpandedKanaRows] = useState<Record<string, boolean>>({});

  /*
   * 完整作品列表
   * ----------------------------------------------------------
   * 若后续需要从后端拉取，可替换为接口结果。
   */
  const allWorks = [
    '阿基拉','阿松','暗杀教室','进击的巨人','鬼灭之刃','火影忍者','海贼王','死神','名侦探柯南','钢之炼金术师',
    '工作细胞','排球少年！！','黑执事','黑色五叶草','JOJO的奇妙冒险','灵能百分百','拳愿阿修罗','境界触发者','境界的彼方','魔法少女小圆',
    '魔卡少女樱','秒速五厘米','言叶之庭','千与千寻','天空之城','龙猫','萤火虫之墓','天气之子','星之声','数码宝贝大冒险',
    '口袋妖怪','妄想学生会','日常','银魂','为美好的世界献上祝福！','Re:从零开始的异世界生活','刀剑神域','加速世界','赛马娘Pretty Derby','紫罗兰永恒花园',
    '约定的梦幻岛','四月是你的谎言','乐园追放','未来日记','斩！赤红之瞳','刀剑乱舞 花丸',
    'Fate/Zero','Fate/stay night［Unlimited Blade Works］','Fate/Apocrypha','Fate/Grand Order ‑绝对魔兽战线巴比伦尼亚‑',
    '干物妹！小埋','摇曳露营△','轻音少女','中二病也要谈恋爱！','花开伊吕波','狼与香辛料','兽娘动物园','青春猪头少年不会梦到兔女郎学姐','物语系列','东京喰种',
    '异度侵入','心理测量者','进化之实踏上胜利的人生','文豪野犬','缘之空','未闻花名','彼方的阿斯特拉','来自新世界','七大罪','白箱',
    '工作细胞BLACK','宝可梦旅途','哆啦A梦','蜡笔小新','樱桃小丸子','美少女战士','忍者乱太郎','足球小将','灌篮高手','网球王子',
    '甲铁城的卡巴内瑞','银河铁道999','机动战士高达UC','新世纪福音战士','机动战士高达SEED','交响诗篇','天元突破红莲螺岩',
    '高分少女','Love Live! Sunshine!!','BanG Dream!','歌之王子殿下','永生之酒','无头骑士异闻录','灼眼的夏娜',
    '旋风管家','零之使魔','只要长得可爱即使是变态你也喜欢吗？','辉夜大小姐想让我告白','间谍过家家','记录的地平线'
  ];

  /*
   * worksByKana — useMemo 保证仅在 allWorks 变更时重新计算。
   * ----------------------------------------------------------
   * 步骤：
   *   1. 遍历作品名，取首字并通过 pinyin-pro 获得拼音首字母。
   *   2. 若返回非英文字母则归为 "#" 组。
   *   3. 按 A-Z# 顺序返回有序对象，供侧栏渲染。
   */
  const worksByKana = useMemo(() => {
    const tempMap: Record<string, string[]> = {};

    allWorks.forEach(work => {
      const initial = (pinyin(work.charAt(0), { pattern: 'first', toneType: 'none' }) || '#').toUpperCase();
      const key = /^[A-Z]$/.test(initial) ? initial : '#';
      if (!tempMap[key]) tempMap[key] = [];
      tempMap[key].push(work);
    });

    // 对每组作品进行字典序排序
    Object.keys(tempMap).forEach(k => tempMap[k].sort());

    // 生成有序结果，保持侧栏 A‑Z 顺序
    const ordered: Record<string, string[]> = {};
    [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'].forEach(ch => {
      if (tempMap[ch]) ordered[ch] = tempMap[ch];
    });

    return ordered;
  }, []);

  /* 完整分类数据（侧栏用） */
  const categoryData = [
    {
      title: '手办 / 模型',
      items: ['所有手办/模型','PVC手办','可动手办','景品手办','粘土人','模型套件','迷你手办','限定手办','预售手办']
    },
    {
      title: '服装 / 配饰',
      items: ['所有服装/配饰','T恤','连帽衫','外套','帽子','包包','钱包','手表','首饰']
    },
    {
      title: '文具 / 杂货',
      items: ['所有文具/杂货','笔记本','文件夹','笔类','贴纸','徽章','钥匙扣','杯子','餐具']
    },
    {
      title: '游戏 / 玩具',
      items: ['所有游戏/玩具','卡牌游戏','桌游','拼图','毛绒玩具','积木','电子游戏','收藏卡','游戏周边']
    },
    {
      title: '漫画 / 书籍',
      items: ['所有漫画/书籍','单行本','画集','设定集','小说','攻略本','杂志','限定版','签名版']
    },
    {
      title: '数码 / 电子',
      items: ['所有数码/电子','手机壳','充电器','耳机','音响','USB设备','电脑配件','游戏机','智能设备']
    },
    {
      title: '家居 / 生活',
      items: ['所有家居/生活','抱枕','毛毯','床单','装饰品','收纳盒','台灯','挂画','生活用品']
    },
    {
      title: '限定 / 特别',
      items: ['所有限定/特别','会场限定','网店限定','预约限定','抽选商品','纪念商品','合作商品','特典商品','其他限定']
    }
  ];

  // 获取页面标题
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
    return '商品一览';
  };

  const title = getPageTitle();

  /*
   * filteredProducts — 所有过滤 & 排序逻辑集中于一处。
   * 使用 useMemo 避免无谓重算，提高性能。
   */
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // 1) 分类 / 作品 URL 过滤
    if (category) list = list.filter(p => p.category === category || p.work === category);
    if (series)   list = list.filter(p => p.work === series);

    // 2) 侧栏分类多选
    if (selectedCategories.length) list = list.filter(p => selectedCategories.some(c => p.category.includes(c)));

    // 3) 侧栏作品多选
    if (selectedWorks.length) list = list.filter(p => selectedWorks.includes(p.work));

    // 4) 库存
    if (stockFilter === 'inStock') list = list.filter(p => p.stock_quantity > 0);

    // 5) 排序
    switch (sortBy) {
      case 'price-low':  list.sort((a, b) => a.price - b.price); break;
      case 'price-high': list.sort((a, b) => b.price - a.price); break;
      case 'newest':     list.sort((a, b) => new Date(b.release_date || '').getTime() - new Date(a.release_date || '').getTime()); break;
    }

    return list;
  }, [category, series, selectedCategories, selectedWorks, stockFilter, sortBy]);

  /* -------- 侧栏辅助函数 -------- */
  const toggleSection = (title: string) => setExpandedSections(prev => ({ ...prev, [title]: !prev[title] }));
  const toggleKanaRow = (kana: string) => setExpandedKanaRows(prev => ({ ...prev, [kana]: !prev[kana] }));
  const toggleCategory = (c: string) => setSelectedCategories(prev => prev.includes(c) ? prev.filter(i => i !== c) : [...prev, c]);
  const toggleWork     = (w: string) => setSelectedWorks(prev => prev.includes(w) ? prev.filter(i => i !== w) : [...prev, w]);

  // 根据是否选中子项高亮标题行
  const isCategoryTitleHighlighted = (title: string) => {
    const cat = categoryData.find(c => c.title === title);
    return cat ? cat.items.some(i => selectedCategories.includes(i)) : false;
  };
  const isKanaTitleHighlighted = (kana: string) => (worksByKana[kana] || []).some(w => selectedWorks.includes(w));

  // 限制结果数文本长度，不超过标题长度
  const getResultText = () => {
    const resultText = `${filteredProducts.length} 个结果`;
    const maxLength = title.length;
    return resultText.length > maxLength ? `${filteredProducts.length}个` : resultText;
  };

  // ----------------------------- JSX 渲染 -----------------------------
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

        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
              <p className="text-gray-600">{getResultText()}</p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              {/* Sort */}
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">排序：</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="newest">最新上架</option>
                  <option value="price-low">价格从低到高</option>
                  <option value="price-high">价格从高到低</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          {showFilters && (
            <aside className="w-full lg:w-64 bg-white rounded-lg shadow-sm p-6 h-fit">
              <h3 className="font-semibold text-gray-900 mb-4">筛选条件</h3>
              
              {/* 作品名称分组 */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">作品名称</h4>
                {Object.entries(worksByKana).map(([kana, works]) => (
                  <div key={kana}>
                    {/* 首字母折叠按钮 */}
                    <button
                      onClick={() => toggleKanaRow(kana)}
                      style={{ backgroundColor: isKanaTitleHighlighted(kana) ? '#F6DFDE' : undefined }}
                      className="flex w-full items-center justify-between text-left px-2 py-2 text-sm hover:bg-gray-50 rounded"
                    >
                      <span>{kana}</span>
                      {expandedKanaRows[kana] ? <Minus size={14} /> : <Plus size={14} />}
                    </button>
                    {/* 展开后渲染作品复选框 */}
                    {expandedKanaRows[kana] && (
                      <div className="ml-4 mt-2 space-y-1">
                        {works.map(w => (
                          <label
                            key={w}
                            style={{ backgroundColor: selectedWorks.includes(w) ? '#F6DFDE' : undefined }}
                            className="flex items-center gap-2 px-2 py-1 text-sm cursor-pointer hover:bg-gray-50 rounded"
                          >
                            <input 
                              type="checkbox" 
                              checked={selectedWorks.includes(w)} 
                              onChange={() => toggleWork(w)} 
                              className="form-checkbox text-red-600" 
                            />
                            <span className="text-sm">{w}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Category */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">商品分类</h4>
                {categoryData.map(cat => (
                  <div key={cat.title}>
                    {/* 分类标题折叠按钮 */}
                    <button
                      onClick={() => toggleSection(cat.title)}
                      style={{ backgroundColor: isCategoryTitleHighlighted(cat.title) ? '#F6DFDE' : undefined }}
                      className="flex w-full items-center justify-between text-left px-2 py-2 text-sm hover:bg-gray-50 rounded"
                    >
                      <span>{cat.title}</span>
                      {expandedSections[cat.title] ? <Minus size={14} /> : <Plus size={14} />}
                    </button>
                    {expandedSections[cat.title] && (
                      <div className="ml-4 mt-2 space-y-1">
                        {cat.items.map(item => (
                          <label
                            key={item}
                            style={{ backgroundColor: selectedCategories.includes(item) ? '#F6DFDE' : undefined }}
                            className="flex items-center gap-2 px-2 py-1 text-sm cursor-pointer hover:bg-gray-50 rounded"
                          >
                            <input 
                              type="checkbox" 
                              checked={selectedCategories.includes(item)} 
                              onChange={() => toggleCategory(item)} 
                              className="form-checkbox text-red-600" 
                            />
                            <span className="text-sm">{item}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Status */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">商品状态</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="stock" 
                      checked={stockFilter === 'all'} 
                      onChange={() => setStockFilter('all')} 
                      className="form-radio text-red-600" 
                    />
                    <span className="ml-2 text-sm text-gray-700">全部</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="stock" 
                      checked={stockFilter === 'inStock'} 
                      onChange={() => setStockFilter('inStock')} 
                      className="form-radio text-red-600" 
                    />
                    <span className="ml-2 text-sm text-gray-700">现货</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="stock" 
                      checked={stockFilter === 'includeOutOfStock'} 
                      onChange={() => setStockFilter('includeOutOfStock')} 
                      className="form-radio text-red-600" 
                    />
                    <span className="ml-2 text-sm text-gray-700">包括缺货</span>
                  </label>
                </div>
              </div>
            </aside>
          )}

          {/* Products Grid */}
          <main className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <p className="text-gray-500 text-lg">条件に合う商品が見つかりませんでした</p>
                <p className="text-gray-400 mt-2">検索条件を変更してお試しください</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
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