import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Gift, Shield, Truck, Clock, Star } from 'lucide-react';
import ProductCard from '../components/Product/ProductCard';
import { categories, products, works, news } from '../data/products';

const Home: React.FC = () => {
  const featuredProducts = products.filter(p => p.tags?.includes('新商品')).slice(0, 8);
  const hotProducts = products.filter(p => p.tags?.includes('人気')).slice(0, 4);
  const preorderProducts = products.filter(p => p.status === 'preorder').slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Jump Comics
              <span className="block text-2xl md:text-3xl font-normal mt-2 opacity-90">
                Official Store
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              人気作品の公式グッズが勢ぞろい！
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/r/figures"
                className="bg-white text-red-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                商品を見る
              </Link>
              <Link
                to="/works"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-red-600 transition-colors"
              >
                作品から探す
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* News & Announcements */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">お知らせ・新着情報</h2>
            <Link to="/news" className="text-red-600 hover:text-red-700 text-sm">
              すべて見る
            </Link>
          </div>
          <div className="space-y-2">
            {news.slice(0, 3).map((item) => (
              <div key={item.id} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <span className="text-sm text-gray-500 whitespace-nowrap">{item.date}</span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  item.category === 'new_product' ? 'bg-blue-100 text-blue-600' :
                  item.category === 'campaign' ? 'bg-green-100 text-green-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {item.category === 'new_product' ? '新商品' :
                   item.category === 'campaign' ? 'キャンペーン' : 'お知らせ'}
                </span>
                <Link to={`/news/${item.id}`} className="text-gray-900 hover:text-red-600 transition-colors flex-1">
                  {item.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="text-red-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">全国送料無料</h3>
              <p className="text-gray-600">5,000円以上のお買い上げで送料無料</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-red-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">公式商品保証</h3>
              <p className="text-gray-600">集英社公式の正規品のみ販売</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="text-red-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">限定商品</h3>
              <p className="text-gray-600">ここでしか買えない限定グッズ</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-red-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">ポイント還元</h3>
              <p className="text-gray-600">購入金額の1%をポイント還元</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">人気作品</h2>
            <p className="text-gray-600">お気に入りの作品からグッズを探そう</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {works.map((work) => (
              <Link
                key={work.id}
                to={`/r/${work.name}`}
                className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={work.image}
                    alt={work.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                    {work.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {work.productCount} 商品
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Preorder Products */}
      {preorderProducts.length > 0 && (
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <Clock className="text-blue-600 mr-3" size={24} />
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">予約受付中</h2>
                  <p className="text-gray-600">人気商品の予約を受付中です</p>
                </div>
              </div>
              <Link
                to="/search?status=preorder"
                className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
              >
                すべて見る
                <ArrowRight size={20} className="ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {preorderProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">商品カテゴリ</h2>
            <p className="text-gray-600">カテゴリから商品を探す</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/r/${category.slug}`}
                className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
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
                    {category.productCount} 商品
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Hot Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Star className="text-yellow-500 mr-3" size={24} />
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">人気商品</h2>
                <p className="text-gray-600">みんなが選ぶ人気のアイテム</p>
              </div>
            </div>
            <Link
              to="/search?sort=popular"
              className="flex items-center text-red-600 hover:text-red-700 transition-colors"
            >
              すべて見る
              <ArrowRight size={20} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hotProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* New Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">新商品</h2>
              <p className="text-gray-600">最新のグッズをチェック</p>
            </div>
            <Link
              to="/new"
              className="flex items-center text-red-600 hover:text-red-700 transition-colors"
            >
              すべて見る
              <ArrowRight size={20} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">メルマガ登録</h2>
          <p className="text-red-100 mb-8">新商品情報やお得なキャンペーン情報をお届けします</p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="メールアドレスを入力"
              className="flex-1 px-4 py-3 rounded-l-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-300"
            />
            <button className="bg-red-800 px-6 py-3 rounded-r-full hover:bg-red-900 transition-colors">
              登録
            </button>
          </div>
          <p className="text-sm text-red-200 mt-4">
            ※集英社IDでログインすると、より詳細な情報をお届けできます
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;