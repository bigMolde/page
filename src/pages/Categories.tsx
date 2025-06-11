import React from 'react';
import { Link } from 'react-router-dom';

const Categories: React.FC = () => {
  /** 分类数据 */
  const categoryData = [
    /* ……原数据不变…… */
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* 页面标题 */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-10">
          商品类别一览
        </h1>

        {/* 分类栅格 */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {categoryData.map(({ title, items }) => (
            <div        /* 每列容器：纵向排列并整体居中 */
              key={title}
              className="flex flex-col items-center text-center"
            >
              {/* 一级标题：红色背景，居中白字 */}
              <h2 className="w-full bg-red-600 text-white font-semibold text-lg px-4 py-2">
                {title}
              </h2>

              {/* 二级列表：无圆点，增大行距，居中 */}
              <ul className="mt-4 space-y-3 list-none text-sm text-gray-800">
                {items.map(item => (
                  <li key={item}>
                    <Link
                      to={`/r/${encodeURIComponent(item)}`}
                      className="hover:text-red-600 transition-colors"
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
                className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
              >
                关键词搜索
              </Link>
              <Link
                to="/new"
                className="border-2 border-red-600 text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-red-50 transition"
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
