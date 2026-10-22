// 主页面逻辑
document.addEventListener('DOMContentLoaded', () => {
  let currentCategory = 'all';
  let searchQuery = '';
  let products = getAllProducts();

  // DOM 元素
  const productGrid = document.getElementById('productGrid');
  const productCount = document.getElementById('productCount');
  const emptyState = document.getElementById('emptyState');
  const searchInput = document.getElementById('searchInput');
  const mobileSearchInput = document.getElementById('mobileSearchInput');
  const mobileSearchBtn = document.getElementById('mobileSearchBtn');
  const mobileSearch = document.getElementById('mobileSearch');
  const categoryBtns = document.querySelectorAll('.category-btn');
  const itemModal = document.getElementById('itemModal');
  const modalContent = document.getElementById('modalContent');
  const closeModal = document.getElementById('closeModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const cartBtn = document.getElementById('cartBtn');
  const mobileCartBtn = document.getElementById('mobileCartBtn');
  const cartSidebar = document.getElementById('cartSidebar');
  const cartOverlay = document.getElementById('cartOverlay');
  const closeCart = document.getElementById('closeCart');
  const cartItems = document.getElementById('cartItems');
  const cartCount = document.getElementById('cartCount');
  const cartTotal = document.getElementById('cartTotal');

  // 渲染商品列表
  function renderProducts() {
    let filtered = products.filter(p => {
      const matchCategory = currentCategory === 'all' || p.category === currentCategory;
      const matchSearch = !searchQuery || 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });

    productCount.textContent = filtered.length;

    if (filtered.length === 0) {
      productGrid.innerHTML = '';
      emptyState.classList.remove('hidden');
      return;
    }

    emptyState.classList.add('hidden');
    productGrid.innerHTML = filtered.map(p => `
      <div class="product-card bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer" data-id="${p.id}">
        <div class="aspect-square bg-gradient-to-br ${p.color || 'from-gray-100 to-gray-50'} flex items-center justify-center text-5xl relative">
          ${p.emoji || '📦'}
          ${p.originalPrice ? `<span class="absolute top-2 left-2 bg-primary/90 text-white text-xs px-2 py-0.5 rounded-full">省¥${p.originalPrice - p.price}</span>` : ''}
        </div>
        <div class="p-3">
          <h3 class="font-medium text-sm line-clamp-2 mb-1 leading-snug">${p.title}</h3>
          <div class="flex items-baseline gap-1.5 mb-2">
            <span class="text-primary font-bold text-lg">¥${p.price.toLocaleString()}</span>
            ${p.originalPrice ? `<span class="text-gray-400 text-xs line-through">¥${p.originalPrice.toLocaleString()}</span>` : ''}
          </div>
          <div class="flex items-center justify-between text-xs text-gray-400">
            <span class="bg-gray-100 px-1.5 py-0.5 rounded">${p.condition}</span>
            <span><i class="fas fa-map-marker-alt mr-0.5"></i>${p.location.split('·')[0].trim()}</span>
          </div>
        </div>
      </div>
    `).join('');

    // 绑定点击事件
    document.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = parseInt(card.dataset.id);
        const product = products.find(p => p.id === id);
        if (product) showModal(product);
      });
    });
  }

  // 显示详情弹窗
  function showModal(p) {
    modalContent.innerHTML = `
      <div class="aspect-square bg-gradient-to-br ${p.color || 'from-gray-100 to-gray-50'} rounded-2xl flex items-center justify-center text-7xl mb-4">
        ${p.emoji || '📦'}
      </div>
      <div class="flex items-start justify-between mb-2">
        <h2 class="text-xl font-bold leading-snug flex-1 pr-2">${p.title}</h2>
        <span class="bg-soft text-primary text-xs px-2 py-1 rounded-full flex-shrink-0">${p.condition}</span>
      </div>
      <div class="flex items-baseline gap-2 mb-4">
        <span class="text-2xl font-bold text-primary">¥${p.price.toLocaleString()}</span>
        ${p.originalPrice ? `<span class="text-gray-400 line-through">¥${p.originalPrice.toLocaleString()}</span>` : ''}
      </div>
      <div class="flex items-center gap-4 text-sm text-gray-500 mb-4 pb-4 border-b">
        <span><i class="fas fa-map-marker-alt text-primary mr-1"></i>${p.location}</span>
        <span><i class="fas fa-eye mr-1"></i>${p.views || 0} 浏览</span>
        <span><i class="fas fa-heart mr-1"></i>${p.likes || 0}</span>
      </div>
      <div class="mb-4">
        <h4 class="font-medium mb-2">商品描述</h4>
        <p class="text-gray-600 text-sm leading-relaxed">${p.description || '暂无描述'}</p>
      </div>
      <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-6">
        <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <i class="fas fa-user"></i>
        </div>
        <div>
          <p class="font-medium text-sm">${p.seller || '匿名卖家'}</p>
          <p class="text-xs text-gray-400">信用良好 · 响应迅速</p>
        </div>
      </div>
      <div class="flex gap-3">
        <button onclick="window.location.href='#'" class="flex-1 py-3 rounded-full border border-gray-200 font-medium hover:bg-gray-50 transition">
          <i class="fas fa-comment-dots mr-1"></i> 聊一聊
        </button>
        <button id="addWantBtn" class="flex-1 py-3 rounded-full bg-primary text-white font-medium hover:bg-orange-600 transition">
          <i class="fas fa-heart mr-1"></i> 我想要
        </button>
      </div>
    `;

    itemModal.classList.remove('hidden');
    itemModal.classList.add('show');
    document.body.style.overflow = 'hidden';

    // 绑定我想要
    document.getElementById('addWantBtn').addEventListener('click', () => {
      addToCart(p);
      updateCartUI();
      closeModalFn();
      // 简单提示
      const toast = document.createElement('div');
      toast.className = 'fixed bottom-24 left-1/2 -translate-x-1/2 bg-dark text-white px-5 py-2.5 rounded-full shadow-lg z-50 text-sm flex items-center gap-2';
      toast.innerHTML = '<i class="fas fa-check text-secondary"></i> 已加入「我想要」';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2000);
    });
  }

  function closeModalFn() {
    itemModal.classList.add('hidden');
    itemModal.classList.remove('show');
    document.body.style.overflow = '';
  }

  // 购物车 UI
  function updateCartUI() {
    const cart = getCart();
    if (cart.length > 0) {
      cartCount.textContent = cart.length;
      cartCount.classList.remove('hidden');
    } else {
      cartCount.classList.add('hidden');
    }

    if (cart.length === 0) {
      cartItems.innerHTML = `
        <div class="text-center py-12 text-gray-400">
          <div class="text-4xl mb-3">🛍️</div>
          <p>还没有想要的东西</p>
          <p class="text-sm mt-1">去首页淘淘吧</p>
        </div>
      `;
      cartTotal.textContent = '¥0';
      return;
    }

    cartItems.innerHTML = cart.map(p => `
      <div class="flex gap-3 p-3 bg-gray-50 rounded-xl">
        <div class="w-16 h-16 rounded-lg bg-gradient-to-br ${p.color || 'from-gray-100 to-gray-50'} flex items-center justify-center text-2xl flex-shrink-0">
          ${p.emoji || '📦'}
        </div>
        <div class="flex-1 min-w-0">
          <h4 class="font-medium text-sm line-clamp-1">${p.title}</h4>
          <p class="text-primary font-bold mt-1">¥${p.price.toLocaleString()}</p>
        </div>
        <button class="remove-cart-item text-gray-400 hover:text-red-500 p-1" data-id="${p.id}">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    `).join('');

    const total = cart.reduce((sum, p) => sum + p.price, 0);
    cartTotal.textContent = `¥${total.toLocaleString()}`;

    document.querySelectorAll('.remove-cart-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        removeFromCart(parseInt(btn.dataset.id));
        updateCartUI();
      });
    });
  }

  function openCart() {
    cartSidebar.classList.remove('translate-x-full');
    cartOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeCartFn() {
    cartSidebar.classList.add('translate-x-full');
    cartOverlay.classList.add('hidden');
    document.body.style.overflow = '';
  }

  // 事件绑定
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryBtns.forEach(b => {
        b.classList.remove('active', 'bg-primary', 'text-white', 'shadow-md');
        b.classList.add('bg-white', 'text-gray-600', 'border', 'border-gray-100');
      });
      btn.classList.add('active');
      btn.classList.remove('bg-white', 'text-gray-600', 'border', 'border-gray-100');
      currentCategory = btn.dataset.category;
      renderProducts();
    });
  });

  function handleSearch(val) {
    searchQuery = val.trim();
    renderProducts();
  }

  searchInput?.addEventListener('input', (e) => handleSearch(e.target.value));
  mobileSearchInput?.addEventListener('input', (e) => handleSearch(e.target.value));

  mobileSearchBtn?.addEventListener('click', () => {
    mobileSearch.classList.toggle('hidden');
  });

  closeModal?.addEventListener('click', closeModalFn);
  modalBackdrop?.addEventListener('click', closeModalFn);

  cartBtn?.addEventListener('click', openCart);
  mobileCartBtn?.addEventListener('click', openCart);
  closeCart?.addEventListener('click', closeCartFn);
  cartOverlay?.addEventListener('click', closeCartFn);

  // 初始化
  renderProducts();
  updateCartUI();
});
