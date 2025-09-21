// 获取DOM元素
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const lastStepBtn = document.getElementById('lastStepBtn');
const finishBtn = document.getElementById('finishBtn');

// 文件上传相关变量
let uploadedFile = null;

// 初始化事件监听器
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
});

function initializeEventListeners() {
    // 点击上传区域打开文件选择
    uploadArea.addEventListener('click', function() {
        fileInput.click();
    });

    // 文件选择事件
    fileInput.addEventListener('change', handleFileSelect);

    // 拖拽事件
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);

    // 按钮事件
    lastStepBtn.addEventListener('click', handleLastStep);
    finishBtn.addEventListener('click', handleFinish);

    // 按钮悬停效果
    addButtonHoverEffects();
}

// 处理文件选择
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        processFile(file);
    }
}

// 处理拖拽悬停
function handleDragOver(event) {
    event.preventDefault();
    uploadArea.classList.add('dragover');
}

// 处理拖拽离开
function handleDragLeave(event) {
    event.preventDefault();
    uploadArea.classList.remove('dragover');
}

// 处理文件拖放
function handleDrop(event) {
    event.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        const file = files[0];
        // 检查文件类型
        if (isValidFileType(file)) {
            processFile(file);
        } else {
            showError('请上传PDF、DOC或DOCX格式的文件');
        }
    }
}

// 处理文件
function processFile(file) {
    uploadedFile = file;
    
    // 隐藏原始拖拽说明文字
    hideOriginalText();
    
    // 显示文件信息
    showFileInfo(file);
    
    // 更新上传区域状态
    uploadArea.classList.add('success');
    
    // 更新完成按钮状态
    updateFinishButton();
}

// 隐藏原始拖拽说明文字
function hideOriginalText() {
    const uploadText = uploadArea.querySelector('.upload-text');
    uploadText.style.display = 'none';
}

// 显示文件信息
function showFileInfo(file) {
    // 移除已存在的文件信息
    const existingInfo = uploadArea.querySelector('.file-info');
    if (existingInfo) {
        existingInfo.remove();
    }
    
    // 创建新的文件信息显示
    const fileInfo = document.createElement('div');
    fileInfo.className = 'file-info';
    fileInfo.innerHTML = `
        <strong>✓ 文件已选择</strong><br>
        文件名：${file.name}<br>
        文件大小：${formatFileSize(file.size)}<br>
        文件类型：${file.type || '未知'}
    `;
    
    uploadArea.appendChild(fileInfo);
}

// 更新完成按钮状态
function updateFinishButton() {
    finishBtn.disabled = false;
    finishBtn.style.opacity = '1';
    finishBtn.style.cursor = 'pointer';
}

// 检查文件类型是否有效
function isValidFileType(file) {
    const validTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    return validTypes.includes(file.type) || 
           file.name.toLowerCase().endsWith('.pdf') ||
           file.name.toLowerCase().endsWith('.doc') ||
           file.name.toLowerCase().endsWith('.docx');
}

// 格式化文件大小
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 显示错误信息
function showError(message) {
    // 创建错误提示
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #fef2f2;
        color: #dc2626;
        padding: 12px 16px;
        border-radius: 8px;
        border: 1px solid #fecaca;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    errorDiv.textContent = message;
    
    document.body.appendChild(errorDiv);
    
    // 3秒后自动移除
    setTimeout(() => {
        errorDiv.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 300);
    }, 3000);
}

// 处理上一步按钮
function handleLastStep() {
    // 添加点击效果
    lastStepBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        lastStepBtn.style.transform = 'scale(1)';
    }, 150);
    
    // 这里可以添加实际的导航逻辑
    console.log('返回上一步');
    alert('返回上一步功能待实现');
}

// 处理完成按钮
function handleFinish() {
    if (!uploadedFile) {
        showError('请先选择一个文件');
        return;
    }
    
    // 添加点击效果
    finishBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        finishBtn.style.transform = 'scale(1)';
    }, 150);
    
    // 这里可以添加实际的文件上传逻辑
    console.log('完成上传，文件：', uploadedFile);
    alert(`文件上传完成！\n文件名：${uploadedFile.name}\n文件大小：${formatFileSize(uploadedFile.size)}`);
}

// 添加按钮悬停效果
function addButtonHoverEffects() {
    const buttons = [lastStepBtn, finishBtn];
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// 添加CSS动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .error-message {
        animation: slideIn 0.3s ease-out;
    }
`;
document.head.appendChild(style);

// 初始化完成按钮状态
document.addEventListener('DOMContentLoaded', function() {
    finishBtn.disabled = true;
    finishBtn.style.opacity = '0.6';
    finishBtn.style.cursor = 'not-allowed';
});
