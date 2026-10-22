// 默认示例商品数据
const DEFAULT_PRODUCTS = [
  {
    id: 1,
    title: "iPhone 13 128G 蓝色",
    category: "数码",
    condition: "几乎全新",
    price: 2899,
    originalPrice: 5999,
    description: "自用一年多，屏幕完美无划痕，电池健康 92%。配件齐全，原装充电器+数据线都在。因为换了新机所以出。支持验机。",
    location: "上海 · 浦东",
    emoji: "📱",
    color: "from-blue-100 to-blue-50",
    seller: "数码达人小王",
    views: 128,
    likes: 23
  },
  {
    id: 2,
    title: "索尼 WH-1000XM4 降噪耳机",
    category: "数码",
    condition: "轻微使用",
    price: 680,
    originalPrice: 2299,
    description: "降噪效果一流，通勤必备。耳罩有轻微磨损但不影响使用，功能完好。附赠收纳包。",
    location: "北京 · 朝阳",
    emoji: "🎧",
    color: "from-teal-100 to-teal-50",
    seller: "音乐爱好者",
    views: 89,
    likes: 15
  },
  {
    id: 3,
    title: "MacBook Air M1 8+256",
    category: "数码",
    condition: "几乎全新",
    price: 5200,
    originalPrice: 7999,
    description: "学生党用过一个学期，几乎没磕碰。办公、写代码、剪辑都流畅。原装充电器。可当面交易。",
    location: "广州 · 天河",
    emoji: "💻",
    color: "from-gray-100 to-gray-50",
    seller: "程序员小李",
    views: 256,
    likes: 47
  },
  {
    id: 4,
    title: "考研政治+英语资料全套",
    category: "图书",
    condition: "轻微使用",
    price: 120,
    originalPrice: 350,
    description: "肖秀荣全套 + 张剑黄皮书 + 恋练有词，笔记完整。2024考研已上岸，资料转给有需要的学弟学妹。",
    location: "武汉 · 洪山",
    emoji: "📚",
    color: "from-purple-100 to-purple-50",
    seller: "上岸学长",
    views: 67,
    likes: 12
  },
  {
    id: 5,
    title: "宜家 KALLAX 书架 2×2",
    category: "家具",
    condition: "明显使用痕迹",
    price: 150,
    originalPrice: 399,
    description: "搬家出，功能完好，有轻微划痕。白色，适合小户型。可拆装，自提优先。",
    location: "杭州 · 西湖",
    emoji: "🗄️",
    color: "from-amber-100 to-amber-50",
    seller: "搬家长途",
    views: 45,
    likes: 8
  },
  {
    id: 6,
    title: "Nike Air Force 1 白色 42码",
    category: "服饰",
    condition: "轻微使用",
    price: 320,
    originalPrice: 799,
    description: "经典款，穿了不到10次，鞋底几乎全新。尺码偏小建议41.5的朋友。鞋盒在。",
    location: "成都 · 武侯",
    emoji: "👟",
    color: "from-slate-100 to-slate-50",
    seller: "球鞋控",
    views: 112,
    likes: 31
  },
  {
    id: 7,
    title: "戴森 V8 无线吸尘器",
    category: "家电",
    condition: "轻微使用",
    price: 980,
    originalPrice: 3290,
    description: "吸力依然很强，电池续航正常。附带多个刷头。家里有了机器人所以出。",
    location: "深圳 · 南山",
    emoji: "🧹",
    color: "from-pink-100 to-pink-50",
    seller: "洁癖星人",
    views: 78,
    likes: 19
  },
  {
    id: 8,
    title: "Keep 跑步机 家用折叠",
    category: "运动",
    condition: "几乎全新",
    price: 1500,
    originalPrice: 2999,
    description: "买了之后用得很少，几乎全新。静音效果好，适合公寓。自提或同城配送。",
    location: "南京 · 鼓楼",
    emoji: "🏃",
    color: "from-green-100 to-green-50",
    seller: "健身新手",
    views: 93,
    likes: 22
  },
  {
    id: 9,
    title: "无印良品 收纳盒套装",
    category: "其他",
    condition: "几乎全新",
    price: 80,
    originalPrice: 199,
    description: "搬家整理出来的，质量很好。5件套，各种尺寸都有。",
    location: "苏州 · 工业园区",
    emoji: "📦",
    color: "from-stone-100 to-stone-50",
    seller: "整理达人",
    views: 34,
    likes: 6
  },
  {
    id: 10,
    title: "Switch OLED 白色 + 健身环",
    category: "数码",
    condition: "几乎全新",
    price: 1850,
    originalPrice: 2899,
    description: "OLED版，屏幕无坏点。附赠健身环大冒险全套。因为没时间玩所以出。",
    location: "重庆 · 渝中",
    emoji: "🎮",
    color: "from-red-100 to-red-50",
    seller: "游戏玩家",
    views: 187,
    likes: 41
  },
  {
    id: 11,
    title: "优衣库羽绒服 黑色 M码",
    category: "服饰",
    condition: "轻微使用",
    price: 180,
    originalPrice: 599,
    description: "去年买的，只穿过两次。保暖性很好，适合南方冬天。",
    location: "厦门 · 思明",
    emoji: "🧥",
    color: "from-indigo-100 to-indigo-50",
    seller: "穿搭博主",
    views: 56,
    likes: 11
  },
  {
    id: 12,
    title: "小米空气净化器 4 Pro",
    category: "家电",
    condition: "几乎全新",
    price: 650,
    originalPrice: 1499,
    description: "搬家换了新房自带新风，这个闲置了。滤芯还能用很久。",
    location: "西安 · 雁塔",
    emoji: "💨",
    color: "from-cyan-100 to-cyan-50",
    seller: "数码控",
    views: 72,
    likes: 14
  }
];

// 从 localStorage 获取用户发布的商品
function getUserProducts() {
  try {
    const data = localStorage.getItem('xianwuji_user_products');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

// 保存用户发布的商品
function saveUserProduct(product) {
  const products = getUserProducts();
  products.unshift(product);
  localStorage.setItem('xianwuji_user_products', JSON.stringify(products));
}

// 获取全部商品（用户发布的 + 默认）
function getAllProducts() {
  return [...getUserProducts(), ...DEFAULT_PRODUCTS];
}

// 购物车相关
function getCart() {
  try {
    const data = localStorage.getItem('xianwuji_cart');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem('xianwuji_cart', JSON.stringify(cart));
}

function addToCart(product) {
  const cart = getCart();
  if (!cart.find(p => p.id === product.id)) {
    cart.push(product);
    saveCart(cart);
  }
  return cart;
}

function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter(p => p.id !== id);
  saveCart(cart);
  return cart;
}
