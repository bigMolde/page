import { Product, Category, Work, News } from '../types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'フィギュア',
    slug: 'figures',
    image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
    productCount: 150,
    sort_order: 1
  },
  {
    id: '2',
    name: 'アパレル',
    slug: 'apparel',
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg',
    productCount: 320,
    sort_order: 2
  },
  {
    id: '3',
    name: '文具・雑貨',
    slug: 'stationery',
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
    productCount: 200,
    sort_order: 3
  },
  {
    id: '4',
    name: 'ゲーム・玩具',
    slug: 'games',
    image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg',
    productCount: 180,
    sort_order: 4
  },
  {
    id: '5',
    name: 'コミック・書籍',
    slug: 'books',
    image: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg',
    productCount: 95,
    sort_order: 5
  },
  {
    id: '6',
    name: 'アクセサリー',
    slug: 'accessories',
    image: 'https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg',
    productCount: 120,
    sort_order: 6
  }
];

export const works: Work[] = [
  {
    id: '1',
    name: 'ONE PIECE',
    kana: 'ワンピース',
    description: '海賊王を目指すルフィの冒険物語',
    image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
    productCount: 85
  },
  {
    id: '2',
    name: '鬼滅の刃',
    kana: 'きめつのやいば',
    description: '鬼と戦う剣士たちの物語',
    image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg',
    productCount: 72
  },
  {
    id: '3',
    name: '呪術廻戦',
    kana: 'じゅじゅつかいせん',
    description: '呪術師たちの戦いを描く',
    image: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg',
    productCount: 68
  },
  {
    id: '4',
    name: 'NARUTO',
    kana: 'ナルト',
    description: '忍者の世界を描いた冒険活劇',
    image: 'https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg',
    productCount: 45
  },
  {
    id: '5',
    name: 'ドラゴンボール',
    kana: 'ドラゴンボール',
    description: '孫悟空の成長と冒険の物語',
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg',
    productCount: 38
  },
  {
    id: '6',
    name: '僕のヒーローアカデミア',
    kana: 'ぼくのヒーローアカデミア',
    description: 'ヒーローを目指す少年たちの成長物語',
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
    productCount: 42
  }
];

export const news: News[] = [
  {
    id: '1',
    title: '新商品「ONE PIECE」ルフィ ギア5フィギュア予約開始！',
    content: '待望のギア5形態のルフィフィギュアがついに登場！限定生産のため、お早めにご予約ください。',
    category: 'new_product',
    date: '2024-01-15',
    image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg'
  },
  {
    id: '2',
    title: '春の大感謝祭開催中！全商品20%OFF',
    content: '3月31日まで全商品20%OFFの大感謝祭を開催中です。この機会をお見逃しなく！',
    category: 'campaign',
    date: '2024-01-10',
    image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg'
  },
  {
    id: '3',
    title: 'システムメンテナンスのお知らせ',
    content: '1月20日（土）2:00-6:00の間、システムメンテナンスを実施いたします。',
    category: 'announcement',
    date: '2024-01-08'
  }
];

export const products: Product[] = [
  {
    id: '1',
    sku_code: 'OP-FIG-001',
    name: 'ONE PIECE ルフィ ギア5 フィギュア',
    price: 12800,
    originalPrice: 15800,
    category: 'figures',
    work: 'ONE PIECE',
    character_name: 'モンキー・D・ルフィ',
    size: '約25cm',
    material: 'PVC、ABS',
    image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
    images: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
      'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg',
      'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg'
    ],
    description: '待望のギア5形態のルフィがフィギュアで登場！躍動感あふれるポーズと精巧な造形で、作品の魅力を余すことなく表現しています。',
    rating: 4.9,
    reviews: 1250,
    stock_quantity: 50,
    status: 'active',
    is_limited: true,
    is_returnable: true,
    release_date: '2024-02-15',
    discount: 19,
    tags: ['限定', '新商品', 'プレミアム'],
    specifications: {
      'サイズ': '約25cm',
      '素材': 'PVC、ABS',
      '付属品': '専用台座',
      '対象年齢': '15歳以上'
    }
  },
  {
    id: '2',
    sku_code: 'KNY-APP-001',
    name: '鬼滅の刃 炭治郎 羽織',
    price: 8900,
    category: 'apparel',
    work: '鬼滅の刃',
    character_name: '竈門炭治郎',
    size: 'M/L/XL',
    material: 'ポリエステル100%',
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg',
    description: '炭治郎の特徴的な市松模様の羽織を忠実に再現。高品質な素材で着心地も抜群です。',
    rating: 4.7,
    reviews: 890,
    stock_quantity: 120,
    status: 'active',
    is_returnable: true,
    tags: ['人気', 'コスプレ']
  },
  {
    id: '3',
    sku_code: 'JJK-STA-001',
    name: '呪術廻戦 五条悟 アクリルスタンド',
    price: 1200,
    category: 'stationery',
    work: '呪術廻戦',
    character_name: '五条悟',
    size: '約12cm',
    material: 'アクリル',
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
    description: '人気キャラクター五条悟のアクリルスタンド。デスクに飾って楽しめます。',
    rating: 4.5,
    reviews: 650,
    stock_quantity: 200,
    status: 'active',
    is_returnable: true,
    tags: ['手軽', 'デスク']
  },
  {
    id: '4',
    sku_code: 'OP-GAM-001',
    name: 'ONE PIECE カードゲーム スターターデッキ',
    price: 1650,
    category: 'games',
    work: 'ONE PIECE',
    image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg',
    description: 'ONE PIECEの世界観を楽しめるカードゲームのスターターデッキ。初心者にもおすすめ。',
    rating: 4.6,
    reviews: 420,
    stock_quantity: 300,
    status: 'active',
    is_returnable: false,
    tags: ['ゲーム', '初心者向け']
  },
  {
    id: '5',
    sku_code: 'KNY-BOO-001',
    name: '鬼滅の刃 公式ファンブック',
    price: 1980,
    category: 'books',
    work: '鬼滅の刃',
    image: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg',
    description: '鬼滅の刃の世界をより深く知ることができる公式ファンブック。未公開イラストも収録。',
    rating: 4.8,
    reviews: 780,
    stock_quantity: 150,
    status: 'active',
    is_returnable: true,
    tags: ['公式', 'ファンブック']
  },
  {
    id: '6',
    sku_code: 'JJK-ACC-001',
    name: '呪術廻戦 宿儺の指 ネックレス',
    price: 3200,
    category: 'accessories',
    work: '呪術廻戦',
    character_name: '両面宿儺',
    material: '合金、樹脂',
    image: 'https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg',
    description: '作中に登場する宿儺の指をモチーフにしたネックレス。リアルな造形が特徴です。',
    rating: 4.4,
    reviews: 320,
    stock_quantity: 80,
    status: 'active',
    is_returnable: true,
    tags: ['アクセサリー', 'リアル']
  },
  {
    id: '7',
    sku_code: 'NAR-FIG-001',
    name: 'NARUTO うずまきナルト フィギュア',
    price: 9800,
    originalPrice: 12800,
    category: 'figures',
    work: 'NARUTO',
    character_name: 'うずまきナルト',
    size: '約20cm',
    material: 'PVC、ABS',
    image: 'https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg',
    description: '螺旋丸を構えるナルトの躍動感あふれるフィギュア。細部まで丁寧に作り込まれています。',
    rating: 4.7,
    reviews: 560,
    stock_quantity: 75,
    status: 'active',
    is_returnable: true,
    discount: 23,
    tags: ['人気', 'アクション']
  },
  {
    id: '8',
    sku_code: 'DB-APP-001',
    name: 'ドラゴンボール 悟空 道着セット',
    price: 12000,
    category: 'apparel',
    work: 'ドラゴンボール',
    character_name: '孫悟空',
    size: 'S/M/L/XL',
    material: 'コットン100%',
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg',
    description: '悟空の特徴的な道着を忠実に再現。コスプレやイベントに最適です。',
    rating: 4.6,
    reviews: 440,
    stock_quantity: 90,
    status: 'active',
    is_returnable: true,
    tags: ['コスプレ', '本格派']
  },
  {
    id: '9',
    sku_code: 'MHA-STA-001',
    name: '僕のヒーローアカデミア デク 文房具セット',
    price: 2800,
    category: 'stationery',
    work: '僕のヒーローアカデミア',
    character_name: '緑谷出久',
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
    description: 'デクをモチーフにした文房具セット。ペン、ノート、ステッカーなどが入っています。',
    rating: 4.3,
    reviews: 280,
    stock_quantity: 180,
    status: 'active',
    is_returnable: true,
    tags: ['文房具', 'セット']
  },
  {
    id: '10',
    sku_code: 'OP-PRE-001',
    name: 'ONE PIECE ニカ ルフィ 特別版フィギュア',
    price: 25000,
    category: 'figures',
    work: 'ONE PIECE',
    character_name: 'モンキー・D・ルフィ',
    size: '約30cm',
    material: 'PVC、ABS、LED',
    image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
    description: 'LED発光ギミック付きの特別版ニカルフィフィギュア。予約限定商品です。',
    rating: 5.0,
    reviews: 150,
    stock_quantity: 0,
    status: 'preorder',
    is_limited: true,
    is_made_to_order: true,
    is_returnable: false,
    release_date: '2024-06-30',
    order_start_date: '2024-01-15',
    order_end_date: '2024-03-31',
    tags: ['予約限定', 'LED', '特別版']
  }
];