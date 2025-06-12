import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { pinyin } from 'pinyin-pro';

/**
 * 作品列表页面（按作品搜索）
 * 参考提供的案例进行设计，保持简洁专业的风格
 * 修复布局重叠问题，确保适当的间距和对齐
 */
const Search: React.FC = () => {
  const [selectedLetter, setSelectedLetter] = useState<string>('');

  /* 完整作品列表 - 与ProductList.tsx保持一致 */
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

  // 按拼音首字母分组作品
  const worksData = React.useMemo(() => {
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

  // 获取所有字母
  const allLetters = Object.keys(worksData).sort();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-5xl mx-auto px-6 md:px-8 py-10 bg-white text-gray-900 antialiased">
        {/* 主标题 */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">作品列表</h1>
        </div>

        {/* 拼音索引导航 */}
        <nav className="mb-10">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium">
            {allLetters.map((letter) => (
              <li key={letter}>
                <a 
                  href={`#${letter.toLowerCase()}-list`} 
                  className={`hover:text-red-600 transition-colors ${
                    selectedLetter === letter ? 'text-red-600 font-bold' : 'text-gray-700'
                  }`}
                  onClick={() => setSelectedLetter(letter)}
                >
                  {letter}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 h-px bg-gray-200" />
        </nav>

        {/* 作品列表 */}
        <div className="space-y-16">
          {allLetters.map((letter) => (
            <section key={letter} id={`${letter.toLowerCase()}-list`} className="scroll-mt-20">
              <h2 className="text-lg font-semibold mb-6 text-gray-900">
                {letter} 开头
              </h2>
              
              {/* 作品网格 - 修复重叠问题 */}
              <div className="space-y-6">
                {/* 将作品按每行4个分组 */}
                {Array.from({ length: Math.ceil(worksData[letter].length / 4) }, (_, rowIndex) => (
                  <div key={rowIndex} className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4 text-sm">
                      {worksData[letter]
                        .slice(rowIndex * 4, (rowIndex + 1) * 4)
                        .map((work, index) => (
                          <div key={index} className="py-2">
                            <Link
                              to={`/r/${encodeURIComponent(work)}`}
                              className="text-gray-700 hover:text-red-600 hover:underline transition-colors duration-200 block"
                            >
                              {work}
                            </Link>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* 底部说明 */}
        <div className="mt-20 pt-8 border-t border-gray-200">
          <div className="text-center text-gray-600">
            <p className="text-sm mb-4">
              点击作品名称查看相关商品 • 共收录 {allWorks.length} 部作品
            </p>
            <div className="flex justify-center space-x-6">
              <Link
                to="/categories"
                className="text-sm text-red-600 hover:text-red-700 transition-colors"
              >
                按类别搜索
              </Link>
              <Link
                to="/new"
                className="text-sm text-red-600 hover:text-red-700 transition-colors"
              >
                产品列表
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Search;