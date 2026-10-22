document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('sellForm');
  const imageUpload = document.getElementById('imageUpload');
  const imageInput = document.getElementById('imageInput');
  const previewImages = document.getElementById('previewImages');
  const successToast = document.getElementById('successToast');

  let selectedFiles = [];
  let emoji = '📦';
  let color = 'from-gray-100 to-gray-50';

  // 根据分类设置默认 emoji 和颜色
  const categoryMap = {
    '数码': { emoji: '📱', color: 'from-blue-100 to-blue-50' },
    '家电': { emoji: '🔌', color: 'from-pink-100 to-pink-50' },
    '服饰': { emoji: '👕', color: 'from-indigo-100 to-indigo-50' },
    '图书': { emoji: '📚', color: 'from-purple-100 to-purple-50' },
    '家具': { emoji: '🪑', color: 'from-amber-100 to-amber-50' },
    '运动': { emoji: '⚽', color: 'from-green-100 to-green-50' },
    '其他': { emoji: '📦', color: 'from-stone-100 to-stone-50' }
  };

  document.getElementById('category').addEventListener('change', (e) => {
    const cat = e.target.value;
    if (categoryMap[cat]) {
      emoji = categoryMap[cat].emoji;
      color = categoryMap[cat].color;
    }
  });

  // 图片上传模拟
  imageUpload.addEventListener('click', () => imageInput.click());

  imageInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files).slice(0, 6 - selectedFiles.length);
    selectedFiles = [...selectedFiles, ...files].slice(0, 6);
    renderPreviews();
  });

  function renderPreviews() {
    previewImages.innerHTML = selectedFiles.map((file, i) => {
      const url = URL.createObjectURL(file);
      return `
        <div class="preview-img">
          <img src="${url}" alt="预览">
          <div class="remove-btn" data-index="${i}"><i class="fas fa-times"></i></div>
        </div>
      `;
    }).join('');

    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        selectedFiles.splice(parseInt(btn.dataset.index), 1);
        renderPreviews();
      });
    });
  }

  // 提交表单
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value.trim();
    const category = document.getElementById('category').value;
    const condition = document.getElementById('condition').value;
    const price = parseInt(document.getElementById('price').value);
    const originalPrice = parseInt(document.getElementById('originalPrice').value) || null;
    const description = document.getElementById('description').value.trim();
    const location = document.getElementById('location').value.trim() || '未知城市';

    if (!title || !category || !condition || !price) {
      alert('请填写必填项');
      return;
    }

    const newProduct = {
      id: Date.now(),
      title,
      category,
      condition,
      price,
      originalPrice,
      description,
      location,
      emoji,
      color,
      seller: '我',
      views: 0,
      likes: 0
    };

    saveUserProduct(newProduct);

    // 显示成功提示
    successToast.classList.remove('hidden');
    successToast.classList.add('flex');

    // 重置表单
    form.reset();
    selectedFiles = [];
    previewImages.innerHTML = '';

    setTimeout(() => {
      successToast.classList.add('hidden');
      successToast.classList.remove('flex');
      // 跳转回首页
      window.location.href = 'index.html';
    }, 1500);
  });
});
