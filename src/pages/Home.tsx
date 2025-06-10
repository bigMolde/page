import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Gift, Shield, Truck, Clock, Star, ChevronLeft, ChevronRight, Bell, X } from 'lucide-react';
import ProductCard from '../components/Product/ProductCard';
import { categories, products, works, news } from '../data/products';

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [email, setEmail] = useState('');

  const featuredProducts = products.filter(p => p.tags?.includes('新商品')).slice(0, 8);
  const hotProducts = products.filter(p => p.tags?.includes('热门')).slice(0, 4);
  const preorderProducts = products.filter(p => p.status === 'preorder').slice(0, 4);

  // 轮播图数据
  const heroSlides = [
    {
      id: 1,
      title: 'ONE PIECE 路飞五档手办',
      subtitle: '期待已久的五档形态终于登场！',
      image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
      link: '/product/1',
      badge: '限量发售'
    },
    {
      id: 2,
      title: '春季大感谢祭',
      subtitle: '全商品20%OFF 限时优惠',
      image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg',
      link: '/campaign/spring-sale',
      badge: '限时活动'
    },
    {
      id: 3,
      title: '鬼灭之刃新品上市',
      subtitle: '炭治郎羽织等周边商品',
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg',
      link: '/r/鬼灭之刃',
      badge: '新品上市'
    }
  ];

  // 自动轮播
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      alert('订阅成功！感谢您的关注。');
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 公告横幅 */}
      {showAnnouncement && (
        <div className="bg-blue-600 text-white py-2 px-4 relative">
          <div className="container mx-auto text-center">
            <div className="flex items-center justify-center space-x-2">
              <Bell size={16} />
              <span className="text-sm">
                🎉 春季大感谢祭正在进行中！全商品20%OFF，满99元免运费！
              </span>
            </div>
            <button
              onClick={() => setShowAnnouncement(false)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-200"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Hero轮播区 */}
      <section className="relative bg-gradient-to-r from-red-600 to-red-700 text-white overflow-hidden">
        <div className="relative h-96 md:h-[500px]">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center max-w-4xl px-4">
                  {slide.badge && (
                    <span className="inline-block bg-yellow-400 text-red-600 px-4 py-1 rounded-full text-sm font-bold mb-4">
                      {slide.badge}
                    </span>
                  )}
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 opacity-90">
                    {slide.subtitle}
                  </p>
                  <Link
                    to={slide.link}
                    className="bg-white text-red-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
                  >
                    立即查看
                    <ArrowRight size={20} className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* 轮播控制按钮 */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
          >
            <ChevronRight size={24} />
          </button>

          {/* 轮播指示点 */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 快速导航 */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/r/figures"
              className="flex items-center space-x-2 bg-red-50 text-red-600 px-6 py-3 rounded-full hover:bg-red-100 transition-colors"
            >
              <span>🎭</span>
              <span className="font-medium">手办专区</span>
            </Link>
            <Link
              to="/r/apparel"
              className="flex items-center space-x-2 bg-blue-50 text-blue-600 px-6 py-3 rounded-full hover:bg-blue-100 transition-colors"
            >
              <span>👕</span>
              <span className="font-medium">服装配饰</span>
            </Link>
            <Link
              to="/search?status=preorder"
              className="flex items-center space-x-2 bg-purple-50 text-purple-600 px-6 py-3 rounded-full hover:bg-purple-100 transition-colors"
            >
              <Clock size={16} />
              <span className="font-medium">预约商品</span>
            </Link>
            <Link
              to="/new"
              className="flex items-center space-x-2 bg-green-50 text-green-600 px-6 py-3 rounded-full hover:bg-green-100 transition-colors"
            >
              <span>✨</span>
              <span className="font-medium">新品上市</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 公告与新闻 */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Bell className="text-red-600 mr-3" size={24} />
              公告·最新信息
            </h2>
            <Link to="/news" className="text-red-600 hover:text-red-700 text-sm flex items-center">
              查看全部
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.slice(0, 3).map((item) => (
              <div key={item.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                <div className="flex items-start space-x-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ${
                    item.category === 'new_product' ? 'bg-blue-100 text-blue-600' :
                    item.category === 'campaign' ? 'bg-green-100 text-green-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {item.category === 'new_product' ? '新商品' :
                     item.category === 'campaign' ? '活动' : '公告'}
                  </span>
                  <span className="text-sm text-gray-500 flex-shrink-0">{item.date}</span>
                </div>
                <Link to={`/news/${item.id}`} className="block mt-2">
                  <h3 className="font-medium text-gray-900 hover:text-red-600 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {item.content}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 服务特色 */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
                <Truck className="text-red-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">全国包邮</h3>
              <p className="text-gray-600 text-sm">购买满99元免运费</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
                <Shield className="text-red-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">官方商品保证</h3>
              <p className="text-gray-600 text-sm">仅销售集英社官方正品</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
                <Gift className="text-red-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">限定商品</h3>
              <p className="text-gray-600 text-sm">只有这里才能买到的限定商品</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
                <TrendingUp className="text-red-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">积分返还</h3>
              <p className="text-gray-600 text-sm">购买金额的1%积分返还</p>
            </div>
          </div>
        </div>
      </section>

      {/* 热门作品 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">热门作品</h2>
            <p className="text-gray-600">从喜爱的作品中寻找商品</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {works.map((work) => (
              <Link
                key={work.id}
                to={`/r/${work.name}`}
                className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={work.image}
                    alt={work.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors mb-1">
                    {work.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2">{work.kana}</p>
                  <p className="text-sm text-gray-600">
                    {work.productCount} 件商品
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 预约商品 */}
      {preorderProducts.length > 0 && (
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <Clock className="text-blue-600 mr-3" size={24} />
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">预约中</h2>
                  <p className="text-gray-600">正在接受人气商品的预约</p>
                </div>
              </div>
              <Link
                to="/search?status=preorder"
                className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
              >
                查看全部
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

      {/* 商品分类 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">商品分类</h2>
            <p className="text-gray-600">按分类查找商品</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
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
        </div>
      </section>

      {/* 热门商品 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Star className="text-yellow-500 mr-3" size={24} />
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">热门商品</h2>
                <p className="text-gray-600">大家都在选择的热门商品</p>
              </div>
            </div>
            <Link
              to="/search?sort=popular"
              className="flex items-center text-red-600 hover:text-red-700 transition-colors"
            >
              查看全部
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

      {/* 新商品 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">新商品</h2>
              <p className="text-gray-600">查看最新商品</p>
            </div>
            <Link
              to="/new"
              className="flex items-center text-red-600 hover:text-red-700 transition-colors"
            >
              查看全部
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

      {/* 邮件订阅 */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">邮件订阅</h2>
          <p className="text-red-100 mb-8 max-w-2xl mx-auto">
            订阅我们的邮件通知，第一时间获取新商品信息、限定商品发售通知和优惠活动信息
          </p>
          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
            <div className="flex rounded-full overflow-hidden bg-white">
              <input
                type="email"
                placeholder="请输入邮箱地址"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-3 text-gray-900 focus:outline-none"
                required
              />
              <button 
                type="submit"
                className="bg-red-800 px-8 py-3 hover:bg-red-900 transition-colors font-semibold"
              >
                订阅
              </button>
            </div>
          </form>
          <p className="text-sm text-red-200 mt-4">
            ※ 使用集英社ID登录，可以为您提供更详细的信息
          </p>
          <div className="flex justify-center space-x-6 mt-8">
            <a href="#" className="text-red-200 hover:text-white transition-colors">
              隐私政策
            </a>
            <a href="#" className="text-red-200 hover:text-white transition-colors">
              取消订阅
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;