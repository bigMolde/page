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
                <div className="text-sm opacity-75">Official Store</div>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              集英社公式のJump Comics商品専門オンラインストア。
              人気作品の公式グッズを豊富に取り揃えています。
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
            <h3 className="text-lg font-semibold mb-4">商品カテゴリ</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/r/figures" className="text-gray-400 hover:text-white transition-colors">
                  フィギュア
                </Link>
              </li>
              <li>
                <Link to="/r/apparel" className="text-gray-400 hover:text-white transition-colors">
                  アパレル
                </Link>
              </li>
              <li>
                <Link to="/r/stationery" className="text-gray-400 hover:text-white transition-colors">
                  文具・雑貨
                </Link>
              </li>
              <li>
                <Link to="/r/games" className="text-gray-400 hover:text-white transition-colors">
                  ゲーム・玩具
                </Link>
              </li>
              <li>
                <Link to="/r/books" className="text-gray-400 hover:text-white transition-colors">
                  コミック・書籍
                </Link>
              </li>
              <li>
                <Link to="/r/accessories" className="text-gray-400 hover:text-white transition-colors">
                  アクセサリー
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">サポート</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  ヘルプ・よくある質問
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  返品・交換について
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  配送について
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  お支払い方法
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  お問い合わせ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  集英社IDについて
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">お問い合わせ</h3>
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
                  東京都千代田区一ツ橋2-5-10<br />
                  集英社ビル
                </span>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <p>営業時間: 平日 10:00-18:00</p>
              <p>（土日祝日・年末年始を除く）</p>
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
                プライバシーポリシー
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                利用規約
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                特定商取引法に基づく表記
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;