import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">J</span>
              </div>
              <div>
                <div className="text-xl font-bold">Jump Comics</div>
                <div className="text-sm opacity-75">官方商城</div>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              集英社官方的Jump Comics商品专门在线商城。
              人气作品的官方商品应有尽有。
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">商品分类</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/r/figures" className="text-gray-400 hover:text-white transition-colors">
                  手办
                </Link>
              </li>
              <li>
                <Link to="/r/apparel" className="text-gray-400 hover:text-white transition-colors">
                  服装
                </Link>
              </li>
              <li>
                <Link to="/r/stationery" className="text-gray-400 hover:text-white transition-colors">
                  文具杂货
                </Link>
              </li>
              <li>
                <Link to="/r/games" className="text-gray-400 hover:text-white transition-colors">
                  游戏玩具
                </Link>
              </li>
              <li>
                <Link to="/r/books" className="text-gray-400 hover:text-white transition-colors">
                  漫画书籍
                </Link>
              </li>
              <li>
                <Link to="/r/accessories" className="text-gray-400 hover:text-white transition-colors">
                  配饰
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">客户服务</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  帮助·常见问题
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  退换货说明
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  配送说明
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  支付方式
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  联系我们
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  关于集英社ID
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">联系我们</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-red-400" />
                <span className="text-gray-400">0120-123-456</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-red-400" />
                <span className="text-gray-400">support@jumpcomics-store.jp</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-red-400 mt-1" />
                <span className="text-gray-400">
                  〒101-8050<br />
                  东京都千代田区一桥2-5-10<br />
                  集英社大厦
                </span>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <p>营业时间: 工作日 10:00-18:00</p>
              <p>（周末节假日及年末年初除外）</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 株式会社集英社. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                隐私政策
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                使用条款
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                特定商业交易法标记
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;