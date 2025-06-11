import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * 作品列表页面（按作品搜索）
 * 参考提供的案例进行设计，保持简洁专业的风格
 * 修复布局重叠问题，确保适当的间距和对齐
 */
const Search: React.FC = () => {
  const [selectedLetter, setSelectedLetter] = useState<string>('');

  // 完整的作品数据，按首字母分组
  const worksData = {
    'A': [
      '阿基拉', '阿松', '暗杀教室', '爱丽丝学园',
      '爱吃拉面的小泉同学', '埃罗芒阿老师', '埃及神明们的日常', '安达与岛村'
    ],
    'B': [
      '白箱', '白色相簿', '白兔糖', '北斗神拳',
      '爆漫王', '薄樱鬼', '冰菓', '巴哈姆特之怒'
    ],
    'C': [
      '灌篮高手', '超时空要塞F', '虫师', '初音未来',
      '从零开始的异世界生活', '城市猎人', '超能陆战队', '赤发白雪姬'
    ],
    'D': [
      '刀剑神域', '地狱少女', '动物朋友', '东京食尸鬼',
      '多啦A梦', '电锯人', '东方少年', '地球防卫少年'
    ],
    'E': [
      '恶魔人', '二十面相少女', '恶魔城', '恶魔奶爸',
      '恶魔高校DxD', '恶魔的谜题', '恶魔幸存者', '恶魔猎人'
    ],
    'F': [
      'Fate/Zero', 'Fate/stay night', 'Free!', 'FLCL',
      'Fate/Grand Order', 'Fate/Apocrypha', 'Full Metal Panic!', 'Fate/kaleid liner'
    ],
    'G': [
      '鬼灭之刃', '攻壳机动队', '钢之炼金术师', '高达',
      '工作细胞', '干物妹！小埋', '怪物', '光之美少女'
    ],
    'H': [
      '火影忍者', '海贼王', '黑执事', '黑色五叶草',
      '花开伊吕波', '狼与香辛料', '黑子的篮球', '化物语'
    ],
    'J': [
      'JOJO的奇妙冒险', '进击的巨人', '机动战士高达', '寄生兽',
      '境界的彼方', '境界触发者', '绝园的暴风雨', '监狱学园'
    ],
    'K': [
      '口袋妖怪', '柯南', 'K-ON!', '空之境界',
      '刻刻', '科学超电磁炮', '可塑性记忆', '空战魔导士'
    ],
    'L': [
      '龙珠', '灵能百分百', '路人女主的养成方法', 'Love Live!',
      '狼与香辛料', '凉宫春日的忧郁', '轻音少女', '零之使魔'
    ],
    'M': [
      '名侦探柯南', '魔法少女小圆', '魔卡少女樱', '秒速五厘米',
      '妄想学生会', '魔法禁书目录', '魔王勇者', '美少女战士'
    ],
    'N': [
      'NARUTO', 'NEW GAME!', 'NANA', 'NO GAME NO LIFE',
      '南家三姐妹', '女神异闻录', '逆转裁判', '女高中生的虚度日常'
    ],
    'O': [
      'ONE PIECE', 'OVERLORD', 'Orange', 'OKKO',
      '欧布奥特曼', '乙女游戏世界', '王者天下', '我的英雄学院'
    ],
    'P': [
      '排球少年！！', 'Pokemon', 'Persona', 'PSYCHO-PASS',
      '乒乓', '飘零燕', '破刃之剑', '普罗米亚'
    ],
    'Q': [
      '拳愿阿修罗', '青春猪头少年', '七大罪', '棋魂',
      '青之驱魔师', '轻音少女', '青春×机关枪', '全职猎人'
    ],
    'R': [
      'Re:从零开始的异世界生活', 'Robotics;Notes', 'ReLIFE', 'Rewrite',
      '日常', '人渣的本愿', '热带雨林的爆笑生活', '如果有妹妹就好了'
    ],
    'S': [
      '死神', '数码宝贝', '四月是你的谎言', '食戟之灵',
      '少女终末旅行', '声之形', '石纪元', '斩！赤红之瞳'
    ],
    'T': [
      '天空之城', '天气之子', '天元突破', '东京喰种',
      '头文字D', '图书馆战争', '天使的3P!', '天真与闪电'
    ],
    'W': [
      '我的英雄学院', '未闻花名', '物语系列', '为美好的世界献上祝福！',
      '我们仍未知道那天所看见的花的名字', '无头骑士异闻录', '我的青春恋爱物语果然有问题', '忘却的旋律'
    ],
    'X': [
      '夏目友人帐', '小林家的龙女仆', '学园孤岛', '新世纪福音战士',
      '心理测量者', '血界战线', '星际牛仔', '虚构推理'
    ],
    'Y': [
      '约定的梦幻岛', '银魂', '游戏人生', '摇曳露营△',
      '樱花庄的宠物女孩', '野良神', '异世界四重奏', '月刊少女野崎君'
    ],
    'Z': [
      '紫罗兰永恒花园', '在下坂本，有何贵干？', '只有我不存在的城市', '中二病也要谈恋爱！',
      '终将成为你', '最终幻想', '足球小将', '昨日之歌'
    ]
  };

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
              点击作品名称查看相关商品 • 共收录 {Object.values(worksData).flat().length} 部作品
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