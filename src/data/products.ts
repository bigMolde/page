import { Product, Category, Work, News } from '../types';

export const categories: Category[] = [
  {
    id: '1',
    name: '手办',
    slug: 'figures',
    image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
    productCount: 150,
    sort_order: 1
  },
  {
    id: '2',
    name: '服装',
    slug: 'apparel',
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg',
    productCount: 320,
    sort_order: 2
  },
  {
    id: '3',
    name: '文具杂货',
    slug: 'stationery',
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
    productCount: 200,
    sort_order: 3
  },
  {
    id: '4',
    name: '游戏玩具',
    slug: 'games',
    image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg',
    productCount: 180,
    sort_order: 4
  },
  {
    id: '5',
    name: '漫画书籍',
    slug: 'books',
    image: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg',
    productCount: 95,
    sort_order: 5
  },
  {
    id: '6',
    name: '配饰',
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
    kana: '海贼王',
    description: '以成为海贼王为目标的路飞的冒险故事',
    image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
    productCount: 85
  },
  {
    id: '2',
    name: '鬼灭之刃',
    kana: '鬼灭之刃',
    description: '与鬼战斗的剑士们的故事',
    image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg',
    productCount: 72
  },
  {
    id: '3',
    name: '咒术回战',
    kana: '咒术回战',
    description: '描绘咒术师们战斗的故事',
    image: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg',
    productCount: 68
  },
  {
    id: '4',
    name: 'NARUTO',
    kana: '火影忍者',
    description: '描绘忍者世界的冒险活剧',
    image: 'https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg',
    productCount: 45
  },
  {
    id: '5',
    name: '龙珠',
    kana: '龙珠',
    description: '孙悟空的成长与冒险故事',
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg',
    productCount: 38
  },
  {
    id: '6',
    name: '我的英雄学院',
    kana: '我的英雄学院',
    description: '以成为英雄为目标的少年们的成长故事',
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
    productCount: 42
  }
];

export const news: News[] = [
  {
    id: '1',
    title: '新商品「ONE PIECE」路飞 五档手办开始预约！',
    content: '期待已久的五档形态路飞手办终于登场！限量生产，请尽早预约。',
    category: 'new_product',
    date: '2024-01-15',
    image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg'
  },
  {
    id: '2',
    title: '春季大感谢祭举办中！全商品20%OFF',
    content: '至3月31日全商品20%OFF的大感谢祭正在举办中。请不要错过这个机会！',
    category: 'campaign',
    date: '2024-01-10',
    image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg'
  },
  {
    id: '3',
    title: '系统维护通知',
    content: '1月20日（周六）2:00-6:00期间，将进行系统维护。',
    category: 'announcement',
    date: '2024-01-08'
  }
];

export const products: Product[] = [
  {
    id: '1',
    sku_code: 'OP-FIG-001',
    name: 'ONE PIECE 路飞 五档 手办',
    price: 12800,
    originalPrice: 15800,
    category: 'figures',
    work: 'ONE PIECE',
    character_name: '蒙奇·D·路飞',
    size: '约25cm',
    material: 'PVC、ABS',
    image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
    images: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
      'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg',
      'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg'
    ],
    description: '期待已久的五档形态路飞手办登场！充满动感的姿势和精巧的造型，完美表现了作品的魅力。',
    rating: 4.9,
    reviews: 1250,
    stock_quantity: 50,
    status: 'active',
    is_limited: true,
    is_returnable: true,
    release_date: '2024-02-15',
    discount: 19,
    tags: ['限定', '新商品', '高端'],
    specifications: {
      '尺寸': '约25cm',
      '材质': 'PVC、ABS',
      '附件': '专用底座',
      '适用年龄': '15岁以上'
    }
  },
  {
    id: '2',
    sku_code: 'KNY-APP-001',
    name: '鬼灭之刃 炭治郎 羽织',
    price: 8900,
    category: 'apparel',
    work: '鬼灭之刃',
    character_name: '灶门炭治郎',
    size: 'M/L/XL',
    material: '聚酯纤维100%',
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg',
    description: '忠实再现炭治郎特色的市松花纹羽织。高品质材料，穿着舒适。',
    rating: 4.7,
    reviews: 890,
    stock_quantity: 120,
    status: 'active',
    is_returnable: true,
    tags: ['热门', 'Cosplay']
  },
  {
    id: '3',
    sku_code: 'JJK-STA-001',
    name: '咒术回战 五条悟 亚克力立牌',
    price: 1200,
    category: 'stationery',
    work: '咒术回战',
    character_name: '五条悟',
    size: '约12cm',
    material: '亚克力',
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
    description: '人气角色五条悟的亚克力立牌。可以摆放在桌上欣赏。',
    rating: 4.5,
    reviews: 650,
    stock_quantity: 200,
    status: 'active',
    is_returnable: true,
    tags: ['便携', '桌面']
  },
  {
    id: '4',
    sku_code: 'OP-GAM-001',
    name: 'ONE PIECE 卡牌游戏 新手套装',
    price: 1650,
    category: 'games',
    work: 'ONE PIECE',
    image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg',
    description: '可以享受ONE PIECE世界观的卡牌游戏新手套装。推荐给初学者。',
    rating: 4.6,
    reviews: 420,
    stock_quantity: 300,
    status: 'active',
    is_returnable: false,
    tags: ['游戏', '新手向']
  },
  {
    id: '5',
    sku_code: 'KNY-BOO-001',
    name: '鬼灭之刃 官方粉丝手册',
    price: 1980,
    category: 'books',
    work: '鬼灭之刃',
    image: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg',
    description: '可以更深入了解鬼灭之刃世界的官方粉丝手册。收录未公开插画。',
    rating: 4.8,
    reviews: 780,
    stock_quantity: 150,
    status: 'active',
    is_returnable: true,
    tags: ['官方', '粉丝手册']
  },
  {
    id: '6',
    sku_code: 'JJK-ACC-001',
    name: '咒术回战 宿傩手指 项链',
    price: 3200,
    category: 'accessories',
    work: '咒术回战',
    character_name: '两面宿傩',
    material: '合金、树脂',
    image: 'https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg',
    description: '以作品中登场的宿傩手指为原型的项链。逼真的造型是其特色。',
    rating: 4.4,
    reviews: 320,
    stock_quantity: 80,
    status: 'active',
    is_returnable: true,
    tags: ['配饰', '逼真']
  },
  {
    id: '7',
    sku_code: 'NAR-FIG-001',
    name: 'NARUTO 漩涡鸣人 手办',
    price: 9800,
    originalPrice: 12800,
    category: 'figures',
    work: 'NARUTO',
    character_name: '漩涡鸣人',
    size: '约20cm',
    material: 'PVC、ABS',
    image: 'https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg',
    description: '摆出螺旋丸姿势的鸣人充满动感的手办。细节部分制作精良。',
    rating: 4.7,
    reviews: 560,
    stock_quantity: 75,
    status: 'active',
    is_returnable: true,
    discount: 23,
    tags: ['热门', '动作']
  },
  {
    id: '8',
    sku_code: 'DB-APP-001',
    name: '龙珠 悟空 道服套装',
    price: 12000,
    category: 'apparel',
    work: '龙珠',
    character_name: '孙悟空',
    size: 'S/M/L/XL',
    material: '棉100%',
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg',
    description: '忠实再现悟空特色道服。适合Cosplay和活动。',
    rating: 4.6,
    reviews: 440,
    stock_quantity: 90,
    status: 'active',
    is_returnable: true,
    tags: ['Cosplay', '正宗']
  },
  {
    id: '9',
    sku_code: 'MHA-STA-001',
    name: '我的英雄学院 绿谷出久 文具套装',
    price: 2800,
    category: 'stationery',
    work: '我的英雄学院',
    character_name: '绿谷出久',
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
    description: '以绿谷出久为主题的文具套装。包含笔、笔记本、贴纸等。',
    rating: 4.3,
    reviews: 280,
    stock_quantity: 180,
    status: 'active',
    is_returnable: true,
    tags: ['文具', '套装']
  },
  {
    id: '10',
    sku_code: 'OP-PRE-001',
    name: 'ONE PIECE 尼卡 路飞 特别版手办',
    price: 25000,
    category: 'figures',
    work: 'ONE PIECE',
    character_name: '蒙奇·D·路飞',
    size: '约30cm',
    material: 'PVC、ABS、LED',
    image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
    description: '带LED发光机关的特别版尼卡路飞手办。预约限定商品。',
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
    tags: ['预约限定', 'LED', '特别版']
  }
];