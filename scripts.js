// 移动端菜单切换
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
        
        // 点击菜单外区域关闭菜单
        document.addEventListener('click', function(event) {
            if (!mainNav.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
                mainNav.classList.remove('active');
            }
        });
    }
    
    // 登录/注册按钮点击事件
    const loginBtn = document.querySelector('.btn-login');
    const registerBtn = document.querySelector('.btn-register');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            alert('您当前所在地区不支持！');
        });
    }
    
    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
            alert('您当前所在地区不支持！');
        });
    }
    
    // 隐藏的管理员帖子彩蛋
    const adminPostLink = document.querySelector('.admin-post-link');
    if (adminPostLink) {
        adminPostLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('系统通知：检测到异常访问。论坛部分内容可能包含未经核实的信息，请谨慎对待。');
        });
    }
    
    // 随机在线人数变化（增加真实感）
    const onlineCounters = document.querySelectorAll('.online-counter strong, .stat-number');
    setInterval(() => {
        onlineCounters.forEach(counter => {
            if (counter.textContent.includes(',')) {
                const current = parseInt(counter.textContent.replace(/,/g, ''));
                const change = Math.floor(Math.random() * 21) - 10; // -10 到 +10
                const newValue = Math.max(1, current + change);
                counter.textContent = newValue.toLocaleString();
            }
        });
    }, 30000); // 每30秒更新一次

    // 初始化举报按钮功能
    initializeReportButtons();
    initializeButtonAnimations();
    // 初始化掷杯筊模拟器
    initializePoeSimulator();
    // 初始化图片查看器（新的多图功能）
    initializeImageViewer();
});

// 举报按钮功能
function initializeReportButtons() {
    // 使用事件委托处理举报按钮点击
    document.addEventListener('click', function(e) {
        if (e.target.closest('.action-btn.report') || 
            (e.target.classList.contains('action-btn') && e.target.textContent.includes('举报'))) {
            e.preventDefault();
            
            // 创建确认弹窗
            const confirmReport = confirm('确定要举报此内容吗？');
            
            if (confirmReport) {
                // 显示举报成功消息
                alert('举报已提交，管理员会尽快处理');
                
                // 禁用已举报的按钮
                const reportBtn = e.target.closest('.action-btn') || e.target;
                reportBtn.disabled = true;
                reportBtn.innerHTML = '✅ 已举报';
                reportBtn.style.color = '#95a5a6';
                reportBtn.style.cursor = 'not-allowed';
                
                // 添加动画效果
                addButtonAnimation(reportBtn);
            }
        }
    });
}

// 按钮动画效果
function initializeButtonAnimations() {
    document.addEventListener('click', function(e) {
        const btn = e.target.closest('.action-btn');
        if (!btn) return;
        
        // 跳过已禁用的举报按钮
        if (btn.disabled && (btn.textContent.includes('举报') || btn.textContent.includes('已举报'))) {
            return;
        }
        
        // 为所有按钮添加点击动画
        addButtonAnimation(btn);
        
        // 如果是回复按钮，可以添加额外功能
        const btnText = btn.textContent || btn.innerText;
        if (btnText.includes('回复') || btnText.includes('↩️')) {
            // 这里可以添加回复功能的实现
            // 例如：滚动到回复表单或打开回复编辑器
        }
    });
}

// 通用的按钮动画函数
function addButtonAnimation(button) {
    button.style.transition = 'all 0.3s ease';
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
}

// 掷杯筊模拟器功能
function initializePoeSimulator() {
    const throwBtn = document.getElementById('throwBtn');
    const poe1 = document.getElementById('poe1');
    const poe2 = document.getElementById('poe2');
    const result = document.getElementById('result');
    const history = document.getElementById('history');
    
    if (!throwBtn) return;
    
    let historyCount = 0;
    const maxHistoryItems = 3;
    
    throwBtn.addEventListener('click', function() {
        throwPoe();
    });
    
    function throwPoe() {
        // 禁用按钮防止连续点击
        throwBtn.disabled = true;
        throwBtn.textContent = '掷杯中...';
        
        // 添加投掷动画
        addThrowAnimation();
        
        setTimeout(() => {
            // 随机生成两个杯筊的结果 (0: 正面-直线面, 1: 反面-弧面)
            const result1 = Math.random() > 0.5 ? 1 : 0;
            const result2 = Math.random() > 0.5 ? 1 : 0;
            
            // 更新杯筊的显示
            updatePoeDisplay(result1, result2);
            
            // 判断结果并显示
            const { resultText, resultType, resultClass } = getPoeResult(result1, result2);
            displayResult(resultText, resultClass);
            
            // 添加到历史记录
            addToHistory(resultType, resultText);
            
            // 重新启用按钮
            resetButton();
        }, 1200);
    }
    
    function addThrowAnimation() {
        const shapes = document.querySelectorAll('.poe-shape');
        shapes.forEach(shape => {
            shape.style.transform = 'rotate(720deg) scale(1.1)';
        });
    }
    
    function updatePoeDisplay(result1, result2) {
        const shape1 = poe1.querySelector('.poe-shape');
        const shape2 = poe2.querySelector('.poe-shape');
        
        shape1.className = 'poe-shape ' + (result1 === 0 ? 'flat' : 'round');
        shape2.className = 'poe-shape ' + (result2 === 0 ? 'flat' : 'round');
        
        // 重置动画
        setTimeout(() => {
            shape1.style.transform = 'rotate(0deg) scale(1)';
            shape2.style.transform = 'rotate(0deg) scale(1)';
        }, 100);
    }
    
    function getPoeResult(result1, result2) {
        let resultText, resultType, resultClass;
        
        if ((result1 === 0 && result2 === 1) || (result1 === 1 && result2 === 0)) {
            resultText = '圣杯。所求所问之事可行，吉。';
            resultType = '圣杯';
            resultClass = 'success';
        } else if (result1 === 0 && result2 === 0) {
            resultText = '笑杯。所求所问之事情况不明。';
            resultType = '笑杯';
            resultClass = 'warning';
        } else {
            resultText = '阴杯。所求所问之事不可行，凶。';
            resultType = '阴杯';
            resultClass = 'error';
        }
        
        return { resultText, resultType, resultClass };
    }
    
    function displayResult(text, className) {
        result.textContent = text;
        result.className = `poe-result ${className}`;
    }
    
    function addToHistory(type, text) {
        historyCount++;
        
        // 移除"暂无记录"
        if (history.querySelector('.poe-history-item').textContent === '暂无记录') {
            history.innerHTML = '';
        }
        
        const historyItem = document.createElement('div');
        historyItem.className = 'poe-history-item';
        
        const typeClass = type === '圣杯' ? 'shengbei' : type === '笑杯' ? 'xiaobei' : 'yinbei';
        
        historyItem.innerHTML = `
            <div>
                <span class="history-type ${typeClass}">${type}</span>
                <span>${text.replace(/🎉|😊|😔/g, '')}</span>
            </div>
            <span style="color: #666; font-size: 12px;">#${historyCount}</span>
        `;
        
        // 限制历史记录数量
        const historyItems = history.querySelectorAll('.poe-history-item');
        if (historyItems.length >= maxHistoryItems) {
            history.removeChild(historyItems[0]);
        }
        
        history.appendChild(historyItem);
        
        // 滚动到最新记录
        history.scrollTop = history.scrollHeight;
    }
    
    function resetButton() {
        throwBtn.disabled = false;
        throwBtn.textContent = '掷杯筊';
    }
}

// 图片多图查看器功能
function initializeImageViewer() {
    // 如果HTML中没有图片查看器，创建一个
    if (!document.getElementById('image-viewer')) {
        const viewerHTML = `
            <div id="image-viewer" class="image-viewer">
                <div class="viewer-overlay"></div>
                <div class="viewer-content">
                    <button class="viewer-close"><i class="fas fa-times"></i></button>
                    <button class="viewer-nav viewer-prev"><i class="fas fa-chevron-left"></i></button>
                    <button class="viewer-nav viewer-next"><i class="fas fa-chevron-right"></i></button>
                    <div class="viewer-image-container">
                        <img id="viewer-image" src="" alt="">
                        <div class="viewer-info">
                            <span id="viewer-index">1 / 1</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', viewerHTML);
    }
    
    const viewer = document.getElementById('image-viewer');
    const viewerImage = document.getElementById('viewer-image');
    const viewerIndex = document.getElementById('viewer-index');
    const closeBtn = viewer.querySelector('.viewer-close');
    const prevBtn = viewer.querySelector('.viewer-prev');
    const nextBtn = viewer.querySelector('.viewer-next');
    const overlay = viewer.querySelector('.viewer-overlay');
    
    // 存储所有图片数据
    let allImages = [];
    let currentGroupImages = [];
    let currentIndex = 0;
    
    // 收集所有图片
    function collectImages() {
        allImages = [];
        
        // 找到所有多图容器
        const galleries = document.querySelectorAll('.multi-image-gallery');
        
        galleries.forEach((gallery, groupIndex) => {
            const imageItems = gallery.querySelectorAll('.image-item');
            
            imageItems.forEach((item, itemIndex) => {
                const img = item.querySelector('img');
                if (img) {
                    allImages.push({
                        src: img.src,
                        alt: img.alt || `图片 ${itemIndex + 1}`,
                        group: groupIndex,
                        index: itemIndex,
                        element: item
                    });
                    
                    // 为图片添加点击事件
                    item.addEventListener('click', () => {
                        openImageViewer(groupIndex, itemIndex);
                    });
                }
            });
        });
    }
    
    // 打开图片查看器
    function openImageViewer(groupIndex, imageIndex) {
        // 获取当前组的所有图片
        currentGroupImages = allImages.filter(img => img.group === groupIndex);
        
        if (currentGroupImages.length === 0) return;
        
        // 确保索引在有效范围内
        currentIndex = Math.max(0, Math.min(imageIndex, currentGroupImages.length - 1));
        
        // 更新显示
        updateViewer();
        
        // 显示查看器
        viewer.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // 更新查看器
    function updateViewer() {
        if (currentGroupImages.length === 0) return;
        
        const currentImage = currentGroupImages[currentIndex];
        viewerImage.src = currentImage.src;
        viewerImage.alt = currentImage.alt;
        viewerIndex.textContent = `${currentIndex + 1} / ${currentGroupImages.length}`;
        
        // 更新导航按钮状态
        updateNavButtons();
    }
    
    // 更新导航按钮状态
    function updateNavButtons() {
        // 第一张图片时禁用左箭头
        if (currentIndex === 0) {
            prevBtn.style.opacity = '0';
            prevBtn.style.cursor = 'auto';
            prevBtn.disabled = true;
        } else {
            prevBtn.style.opacity = '1';
            prevBtn.style.cursor = 'pointer';
            prevBtn.disabled = false;
        }
        
        // 最后一张图片时禁用右箭头
        if (currentIndex === currentGroupImages.length - 1) {
            nextBtn.style.opacity = '0';
            nextBtn.style.cursor = 'auto';
            nextBtn.disabled = true;
        } else {
            nextBtn.style.opacity = '1';
            nextBtn.style.cursor = 'pointer';
            nextBtn.disabled = false;
        }
    }
    
    // 上一张图片
    function goToPrevImage() {
        if (currentIndex > 0) {
            currentIndex--;
            updateViewer();
        }
    }
    
    // 下一张图片
    function goToNextImage() {
        if (currentIndex < currentGroupImages.length - 1) {
            currentIndex++;
            updateViewer();
        }
    }
    
    // 关闭查看器
    function closeViewer() {
        viewer.classList.remove('active');
        document.body.style.overflow = '';
        
        // 清空图片源
        setTimeout(() => {
            viewerImage.src = '';
        }, 300);
    }
    
    // 绑定事件
    function bindEvents() {
        // 关闭按钮
        closeBtn.addEventListener('click', closeViewer);
        overlay.addEventListener('click', closeViewer);
        
        // 导航按钮
        prevBtn.addEventListener('click', goToPrevImage);
        nextBtn.addEventListener('click', goToNextImage);
        
        // 键盘导航
        document.addEventListener('keydown', (e) => {
            if (!viewer.classList.contains('active')) return;
            
            switch(e.key) {
                case 'Escape':
                    closeViewer();
                    break;
                case 'ArrowLeft':
                    if (!prevBtn.disabled) goToPrevImage();
                    break;
                case 'ArrowRight':
                    if (!nextBtn.disabled) goToNextImage();
                    break;
            }
        });
        
        // 触摸滑动支持
        let touchStartX = 0;
        
        viewerImage.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        viewerImage.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].screenX;
            const diff = touchEndX - touchStartX;
            const swipeThreshold = 50;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0 && !prevBtn.disabled) {
                    // 向右滑动 - 上一张
                    goToPrevImage();
                } else if (diff < 0 && !nextBtn.disabled) {
                    // 向左滑动 - 下一张
                    goToNextImage();
                }
            }
        }, { passive: true });
    }
    
    // 初始化
    collectImages();
    bindEvents();
}

