import React from 'react';
import { Link } from 'react-router-dom';

const Categories: React.FC = () => {
 /** 分类数据 */
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

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f9fafb' }}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* 页面标题 */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10">
          商品类别一览
        </h1>

        {/* 分类栅格 */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {categoryData.map(({ title, items }) => (
            <div
              key={title}
              className="flex flex-col items-center text-center rounded-lg shadow-sm ring-1 ring-gray-100 overflow-hidden"
              style={{ backgroundColor: '#ffffff' }}
            >
              {/* 一级标题：粉色背景，白色文字 */}
              <h2 
                className="w-full font-semibold text-lg px-4 py-3"
                style={{ 
                  backgroundColor: '#F6DFDE', 
                  color: '#ffffff' 
                }}
              >
                {title}
              </h2>

              {/* 二级列表：无圆点，增大行距，居中 */}
              <ul className="w-full px-4 py-4 space-y-3 list-none text-sm text-gray-800">
                {items.map(item => (
                  <li key={item}>
                    <Link
                      to={`/r/${encodeURIComponent(item)}`}
                      className="block px-2 py-1 rounded transition-colors"
                      style={{
                        color: '#374151'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#db2777'; // pink-600
                        e.currentTarget.style.backgroundColor = '#fdf2f8'; // pink-50
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#374151';
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* 底部引导区 */}
        <div className="mt-16 text-center">
          <div 
            className="rounded-lg shadow-sm ring-1 ring-gray-100 p-8"
            style={{ backgroundColor: '#ffffff' }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              找不到您想要的商品？
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              您可以使用搜索功能或浏览新品列表来发现更多商品
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/search"
                className="px-8 py-3 rounded-lg font-semibold transition"
                style={{
                  backgroundColor: '#ec4899', // pink-500
                  color: '#ffffff'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#db2777'; // pink-600
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ec4899'; // pink-500
                }}
              >
                关键词搜索
              </Link>
              <Link
                to="/new"
                className="px-8 py-3 rounded-lg font-semibold transition"
                style={{
                  border: '2px solid #ec4899', 
                  color: '#db2777', 
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#fFFFF'; 
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                新品列表
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;