// منع نسخ المحتوى
function preventCopy(e) {
    e.preventDefault();
    return false;
}

document.addEventListener('contextmenu', preventCopy);
document.addEventListener('selectstart', preventCopy);
document.addEventListener('copy', preventCopy);
document.addEventListener('cut', preventCopy);
document.addEventListener('paste', preventCopy);

// منع فتح DevTools
window.onbeforeunload = function() {
    if (window.console && (console.open || console.visible)) {
        return 'لا يمكن فتح أدوات المطور';
    }
};

// منع فتح DevTools باستخدام F12
document.addEventListener('keydown', function(e) {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'J') || (e.ctrlKey && e.key === 'U')) {
        e.preventDefault();
        return false;
    }
});

// منع تحميل الكود المصدر
window.onerror = function() {
    return true;
};

// منع التحميل المباشر للصور
window.addEventListener('load', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.userSelect = 'none';
        img.style.webkitUserSelect = 'none';
        img.style.MozUserSelect = 'none';
        img.style.msUserSelect = 'none';
    });
});

// منع التحميل المباشر للملفات
window.addEventListener('DOMContentLoaded', function() {
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';
    document.body.style.MozUserSelect = 'none';
    document.body.style.msUserSelect = 'none';
});

// منع التحميل المباشر للصفحة
window.addEventListener('beforeunload', function() {
    return 'لا يمكن إغلاق الصفحة';
});
