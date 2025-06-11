import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/products';

const Categories: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">商品分类</h1>
          <p className="text-gray-600">选择您感兴趣的商品分类</p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/r/${category.slug}`}
              className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {category.productCount} 件商品
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Popular Works Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">热门作品</h2>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: 'ONE PIECE', slug: 'ONE PIECE' },
                { name: '鬼灭之刃', slug: '鬼灭之刃' },
                { name: '咒术回战', slug: '咒术回战' },
                { name: 'NARUTO', slug: 'NARUTO' },
                { name: '龙珠', slug: '龙珠' },
                { name: '我的英雄学院', slug: '我的英雄学院' }
              ].map((work) => (
                <Link
                  key={work.slug}
                  to={`/r/${work.slug}`}
                  className="text-center p-4 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-colors"
                >
                  <div className="text-sm font-medium text-gray-900 hover:text-red-600">
                    {work.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;