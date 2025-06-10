import React from 'react';
import { Link } from 'react-router-dom';
import { works } from '../data/products';

const Works: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">作品から探す</h1>
          <p className="text-gray-600">お気に入りの作品のグッズを見つけよう</p>
        </div>

        {/* Works Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {works.map((work) => (
            <Link
              key={work.id}
              to={`/r/${work.name}`}
              className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={work.image}
                  alt={work.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors mb-2">
                  {work.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{work.kana}</p>
                <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                  {work.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-red-600 font-semibold">
                    {work.productCount} 商品
                  </span>
                  <span className="text-sm text-gray-500 group-hover:text-red-600 transition-colors">
                    商品を見る →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Works;