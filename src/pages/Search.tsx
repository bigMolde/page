import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { pinyin } from 'pinyin-pro';

/**
 * 作品列表页面（按作品搜索）
 * - 顶部 A–Z/# 索引栏横向排布，移动端可横向滚动。
 * - 点击索引时使用锚点跳转并平滑滚动到对应分组。
 * - 每组作品自动按字典序排序，4 列栅格适配移动 & 桌面。
 * - 使用 Tailwind v3 `scroll-smooth` + `scroll-mt-24` 消除固定 Header 遮挡。
 */

// 完整作品列表（保持与 ProductList.tsx 一致）
const ALL_WORKS = [
  '阿基拉', '阿松', '暗杀教室', '进击的巨人', '鬼灭之刃', '火影忍者', '海贼王', '死神', '名侦探柯南', '钢之炼金术师',
  '工作细胞', '排球少年！！', '黑执事', '黑色五叶草', 'JOJO的奇妙冒险', '灵能百分百', '拳愿阿修罗', '境界触发者', '境界的彼方', '魔法少女小圆',
  '魔卡少女樱', '秒速五厘米', '言叶之庭', '千与千寻', '天空之城', '龙猫', '萤火虫之墓', '天气之子', '星之声', '数码宝贝大冒险',
  '口袋妖怪', '妄想学生会', '日常', '银魂', '为美好的世界献上祝福！', 'Re:从零开始的异世界生活', '刀剑神域', '加速世界', '赛马娘Pretty Derby', '紫罗兰永恒花园',
  '约定的梦幻岛', '四月是你的谎言', '乐园追放', '未来日记', '斩！赤红之瞳', '刀剑乱舞 花丸',
  'Fate/Zero', 'Fate/stay night［Unlimited Blade Works］', 'Fate/Apocrypha', 'Fate/Grand Order ‑绝对魔兽战线巴比伦尼亚‑',
  '干物妹！小埋', '摇曳露营△', '轻音少女', '中二病也要谈恋爱！', '花开伊吕波', '狼与香辛料', '兽娘动物园', '青春猪头少年不会梦到兔女郎学姐', '物语系列', '东京喰种',
  '异度侵入', '心理测量者', '进化之实踏上胜利的人生', '文豪野犬', '缘之空', '未闻花名', '彼方的阿斯特拉', '来自新世界', '七大罪', '白箱',
  '工作细胞BLACK', '宝可梦旅途', '哆啦A梦', '蜡笔小新', '樱桃小丸子', '美少女战士', '忍者乱太郎', '足球小将', '灌篮高手', '网球王子',
  '甲铁城的卡巴内瑞', '银河铁道999', '机动战士高达UC', '新世纪福音战士', '机动战士高达SEED', '交响诗篇', '天元突破红莲螺岩',
  '高分少女', 'Love Live! Sunshine!!', 'BanG Dream!', '歌之王子殿下', '永生之酒', '无头骑士异闻录', '灼眼的夏娜',
  '旋风管家', '零之使魔', '只要长得可爱即使是变态你也喜欢吗？', '辉夜大小姐想让我告白', '间谍过家家', '记录的地平线'
];

// A–Z 常量（维持稳定顺序）
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const Search: React.FC = () => {
  const [activeLetter, setActiveLetter] = useState('');

  /**
   * 将作品按首字母分组（非 A‑Z 归为 #）。
   * 每个分组内部再做字典序排序。
   */
  const grouped = useMemo(() => {
    const map: Record<string, string[]> = {};

    ALL_WORKS.forEach((work) => {
      const initial = (pinyin(work.charAt(0), { pattern: 'first', toneType: 'none' }) || '#').toUpperCase();
      const key = /^[A-Z]$/.test(initial) ? initial : '#';
      (map[key] ??= []).push(work);
    });

    Object.values(map).forEach((arr) => arr.sort());
    return map;
  }, []);

  // 导航栏实际需要渲染的索引（排除空分组，# 总是在最后）
  const navLetters = useMemo(() => {
    const existing = LETTERS.filter((l) => grouped[l]);
    if (grouped['#']) existing.push('#');
    return existing;
  }, [grouped]);

  return (
    <div className="min-h-screen bg-gray-50 scroll-smooth">
      <main className="mx-auto max-w-5xl px-6 md:px-8 py-10 bg-white text-gray-900 antialiased">
        {/* 标题 */}
        <h1 className="mb-8 text-3xl md:text-4xl font-extrabold tracking-tight">作品列表</h1>

        {/* 拼音索引导航 */}
        <nav className="mb-10 overflow-x-auto whitespace-nowrap">
          <ul className="flex gap-6 text-sm font-medium w-max px-1">
            {navLetters.map((letter) => (
              <li key={letter} className="shrink-0">
                {grouped[letter] ? (
                  <a
                    href={`#${letter.toLowerCase()}-list`}
                    onClick={() => setActiveLetter(letter)}
                    className={`transition-colors hover:text-red-600 ${
                      activeLetter === letter ? 'text-red-600 font-bold' : 'text-gray-700'
                    }`}
                  >
                    {letter}
                  </a>
                ) : (
                  <span className="text-gray-400 select-none">{letter}</span>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-4 h-px bg-gray-200" />
        </nav>

        {/* 作品分组列表 */}
        <div className="space-y-16">
          {navLetters.map((letter) => (
            <section key={letter} id={`${letter.toLowerCase()}-list`} className="scroll-mt-24">
              <h2 className="mb-6 text-lg font-semibold text-gray-900">{letter} 开头</h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-8 gap-y-4 text-sm">
                {grouped[letter].map((work) => (
                  <Link
                    key={work}
                    to={`/r/${encodeURIComponent(work)}`}
                    className="block py-2 text-gray-700 transition-colors duration-200 hover:text-red-600 hover:underline"
                  >
                    {work}
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* 底部说明 */}
        <footer className="mt-20 pt-8 border-t border-gray-200 text-center text-gray-600 space-y-4">
          <p className="text-sm">点击作品名称查看相关商品 • 共收录 {ALL_WORKS.length} 部作品</p>
          <div className="flex justify-center space-x-6">
            <Link to="/categories" className="text-sm text-red-600 hover:text-red-700">按类别搜索</Link>
            <Link to="/new" className="text-sm text-red-600 hover:text-red-700">产品列表</Link>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Search;
