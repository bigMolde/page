import React from 'react';
import { Link } from 'react-router-dom';

const Categories: React.FC = () => {
  // 分类数据结构
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
        '预售手办'
      ]
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
        '首饰'
      ]
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
        '餐具'
      ]
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
        '游戏周边'
      ]
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
        '签名版'
      ]
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
        '智能设备'
      ]
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
        '生活用品'
      ]
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
        '其他限定'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 容器：最大宽度 1280px，左右自动居中 */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* 页面标题：靠左、大气 */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10">
          商品类别一览
        </h1>

        {/* 栅格：≥768px 四列，≥640px 两列，移动端一列 */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          
          {categoryData.map((category, index) => (
            <article key={index} className="flex flex-col rounded-lg shadow-sm ring-1 ring-gray-100 bg-white overflow-hidden">
              {/* 一级标题带红色背景，白色文字 */}
              <header className="bg-red-600 px-5 py-3">
                <h2 className="text-lg font-semibold text-white">{category.title}</h2>
              </header>

              {/* 二级列表：白色背景，仅留空隙 */}
              <ul className="px-5 py-4 space-y-2 text-gray-700 leading-relaxed text-sm flex-1">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <Link
                      to={`/r/${encodeURIComponent(item)}`}
                      className="block hover:text-red-600 transition-colors duration-200 py-1"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}

        </section>

        {/* 底部引导区域 */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-lg shadow-sm ring-1 ring-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              找不到您想要的商品？
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              您可以使用搜索功能或浏览新品列表来发现更多商品
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/search"
                className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200"
              >
                关键词搜索
              </Link>
              <Link
                to="/new"
                className="border-2 border-red-600 text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors duration-200"
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