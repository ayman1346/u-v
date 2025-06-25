// Back to top button functionality
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // ... الكود السابق ...

    // معالجة حجز الطاولات
    const tableReservation = document.getElementById('tableReservation');
    const reserveTableBtn = document.getElementById('reserveTable');
    const cancelTableBtn = document.getElementById('cancelTable');
    const tableNumberSelect = document.getElementById('tableNumber');

    // إظهار قسم حجز الطاولات عند اختيار "صاله"
    const orderTypeRadios = document.querySelectorAll('input[name="orderType"]');
    orderTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'dineIn') {
                tableReservation.style.display = 'block';
            } else {
                tableReservation.style.display = 'none';
            }
        });
    });

    // معالجة حجز الطاولة
    reserveTableBtn.addEventListener('click', function() {
        const selectedTable = tableNumberSelect.value;
        if (selectedTable) {
            // إضافة الطاولة المحددة إلى السلة
            const tableItem = document.createElement('div');
            tableItem.className = 'cart-item';
            tableItem.innerHTML = `
                <h4>طاولة رقم ${selectedTable}</h4>
                <p>تم حجز الطاولة بنجاح</p>
            `;
            
            // إضافة الطاولة إلى قائمة السلة
            const cartItems = document.getElementById('cartItems');
            cartItems.insertBefore(tableItem, cartItems.firstChild);
            
            // إخفاء قسم حجز الطاولات
            tableReservation.style.display = 'none';
            
            // إظهار رسالة نجاح
            alert('تم حجز الطاولة رقم ' + selectedTable + ' بنجاح');
        } else {
            alert('الرجاء اختيار رقم الطاولة أولاً');
        }
    });

    // معالجة إلغاء حجز الطاولة
    cancelTableBtn.addEventListener('click', function() {
        tableReservation.style.display = 'none';
    });

    // ... باقي الكود السابق ...
    // تفعيل القائمة المتحركة
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.querySelector('i').classList.toggle('fa-bars');
        menuToggle.querySelector('i').classList.toggle('fa-times');
    });

    // تفعيل جميع الروابط للتمرير السلس
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                // إضافة تأثير حركي عند النقر على الزر
                this.classList.add('clicked');
                setTimeout(() => this.classList.remove('clicked'), 200);

                // التمرير السلس إلى القسم
                targetSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });

                // إغلاق القائمة المتحركة عند النقر على رابط
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                    menuToggle.querySelector('i').classList.remove('fa-times');
                }
            }
        });
    });

    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !e.target.closest('.nav-links') && 
            !e.target.closest('.menu-toggle') && 
            navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.querySelector('i').classList.add('fa-bars');
            menuToggle.querySelector('i').classList.remove('fa-times');
        }
    });
});

// Add scroll event listener for header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        header.style.backgroundColor = '#fff';
    }
});

// Modal functionality for menu images
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeModal = document.querySelector('.close-modal');

// Add click event to all menu images
document.querySelectorAll('.menu-image-item img').forEach(img => {
    img.addEventListener('click', function() {
        modal.style.display = 'block';
        modalImg.src = this.src;
        modalCaption.textContent = this.alt;
    });
});

// Initialize search functionality
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

// Collect all menu items from the page
const menuItems = [];

// Function to collect menu items
function collectMenuItems() {
    // Get all menu items from different sections
    const allItems = document.querySelectorAll('.menu-item');

    // Add items to the menuItems array
    allItems.forEach(item => {
        // Get all text content from the item
        const title = item.querySelector('h4, h5').textContent;
        const description = item.querySelector('.description')?.textContent || '';
        const image = item.querySelector('img')?.src || '';
        const price = item.querySelector('.price, .sizes button')?.textContent || '';
        
        // Get section name
        const section = item.closest('.menu')?.querySelector('h2')?.textContent || '';
        
        // Get sizes if available
        const sizes = [...item.querySelectorAll('.sizes button')].map(btn => btn.textContent);
        
        menuItems.push({
            title: title.toLowerCase(),
            description: description.toLowerCase(),
            section: section.toLowerCase(),
            image,
            price,
            sizes,
            element: item
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    collectMenuItems();
    
    // Search functionality
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        // Clear previous results
        searchResults.innerHTML = '';
        
        // If search term is empty, hide results
        if (!searchTerm) {
            searchResults.classList.remove('active');
            return;
        }
        
        // Filter items that match search term
        const results = menuItems.filter(item => 
            item.title.includes(searchTerm) || 
            item.description.includes(searchTerm) || 
            item.section.includes(searchTerm)
        );
        
        // Show results
        if (results.length > 0) {
            searchResults.classList.add('active');
            
            results.forEach(item => {
                const resultItem = document.createElement('div');
                resultItem.className = 'result-item';
                
                // Create result content
                const resultContent = `
                    <div class="search-product">
                        <button class="view-image-btn" onclick="showProductImage('${item.image}')">عرض الصورة</button>
                        <img src="${item.image}" alt="${item.title}">
                        <h4>${item.title}</h4>
                        ${item.description ? `<p class="description">${item.description}</p>` : ''}
                        <div class="sizes">
                            ${item.sizes.map(size => `
                                <button class="size-btn" data-size="${size}">${size}</button>
                            `).join('')}
                        </div>
                        <button class="add-to-cart-btn">
                            <i class="fas fa-cart-plus"></i> أضف للسلة
                        </button>
                    </div>
                `;
                
                resultItem.innerHTML = resultContent;
                
                // Add click event to navigate to the item
                resultItem.addEventListener('click', () => {
                    // Scroll to the item's section
                    item.element.scrollIntoView({ behavior: 'smooth' });
                    // Hide search results
                    searchResults.classList.remove('active');
                    // Clear search input
                    searchInput.value = '';
                });
                
                searchResults.appendChild(resultItem);
            });
        } else {
            searchResults.classList.remove('active');
        }
    });
});

// Search functionality
searchInput.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    
    // Clear previous results
    searchResults.innerHTML = '';
    
    // If search term is empty, hide results
    if (!searchTerm) {
        searchResults.classList.remove('active');
        return;
    }
    
    // Filter items that match search term
    const results = menuItems.filter(item => 
        item.title.includes(searchTerm) || 
        item.description.includes(searchTerm)
    );
    
    // Show results
    if (results.length > 0) {
        searchResults.classList.add('active');
        
        results.forEach(item => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            
            resultItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div>
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                    <span>${item.price}</span>
                </div>
            `;
            
            // Add click event to navigate to the item
            resultItem.addEventListener('click', () => {
                // Scroll to the item's section
                item.element.scrollIntoView({ behavior: 'smooth' });
                // Hide search results
                searchResults.classList.remove('active');
                // Clear search input
                searchInput.value = '';
            });
            
            searchResults.appendChild(resultItem);
        });
    } else {
        searchResults.classList.remove('active');
    }
});

// Hide results when clicking outside
document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.classList.remove('active');
    }
});

// Hide results when pressing escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        searchResults.classList.remove('active');
        searchInput.value = '';
    }
});

// Hide results when clicking on the search input
searchInput.addEventListener('click', () => {
    if (!searchInput.value) {
        searchResults.classList.remove('active');
    }
});

// Handle enter key in search input
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && searchResults.classList.contains('active')) {
        const firstResult = searchResults.querySelector('.result-item');
        if (firstResult) {
            firstResult.click();
        }
    }
});

// Handle arrow keys for navigation
let activeIndex = -1;

searchInput.addEventListener('keydown', (e) => {
    if (!searchResults.classList.contains('active')) return;
    
    const resultItems = searchResults.querySelectorAll('.result-item');
    
    switch(e.key) {
        case 'ArrowDown':
            e.preventDefault();
            activeIndex = (activeIndex + 1) % resultItems.length;
            highlightResult(activeIndex);
            break;
            
        case 'ArrowUp':
            e.preventDefault();
            activeIndex = (activeIndex - 1 + resultItems.length) % resultItems.length;
            highlightResult(activeIndex);
            break;
            
        case 'Enter':
            if (activeIndex >= 0) {
                resultItems[activeIndex].click();
            }
            break;
    }
});

function highlightResult(index) {
    const resultItems = searchResults.querySelectorAll('.result-item');
    resultItems.forEach(item => item.classList.remove('active'));
    resultItems[index].classList.add('active');
}

// Close modal when clicking the X
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside the image
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
    }
    if (e.key === 'Escape' && cartModal.style.display === 'block') {
        cartModal.style.display = 'none';
    }
});

// Shopping Cart Functionality
let cart = [];
const cartIcon = document.querySelector('.cart-icon');
const cartCount = document.querySelector('.cart-count');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const totalPrice = document.getElementById('totalPrice');
const closeCartModal = cartModal.querySelector('.close-modal');

// Add to Cart functionality
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function() {
        const menuItem = this.closest('.menu-item');
        const name = menuItem.querySelector('h4').textContent;
        const selectedSize = menuItem.querySelector('.size-btn.selected');
        
        if (!selectedSize) {
            alert('الرجاء اختيار الحجم');
            return;
        }
        
        const size = selectedSize.getAttribute('data-size');
        const price = parseInt(selectedSize.textContent.match(/\d+/)[0]);
        
        // Check if this is a custom flavor item
        const flavorInput = menuItem.querySelector('.flavor-input');
        let customFlavor = '';
        
        if (flavorInput) {
            customFlavor = flavorInput.value.trim();
            if (customFlavor === '') {
                alert('الرجاء كتابة الطعم المطلوب');
                return;
            }
        }
        
        cart.push({ name, size, price, customFlavor });
        updateCart();
        
        // Clear the flavor input if it exists
        if (flavorInput) {
            flavorInput.value = '';
        }
        
        // Show success message
        alert('تم إضافة ' + name + ' إلى السلة');
        
        // Animation effect
        this.innerHTML = '<i class="fas fa-check"></i> تم الإضافة';
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-cart-plus"></i> أضف للسلة';
        }, 1500);
    });
});

// Size selection
document.querySelectorAll('.size-btn').forEach(button => {
    button.addEventListener('click', function() {
        const menuItem = this.closest('.menu-item');
        menuItem.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('selected'));
        this.classList.add('selected');
    });
});

// Cart icon click
cartIcon.addEventListener('click', (e) => {
    e.preventDefault();
    cartModal.style.display = 'block';
});

// Close cart modal
closeCartModal.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

// Update cart display
function updateCart() {
    cartCount.textContent = cart.length;
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>الحجم: ${getSizeInArabic(item.size)}</p>
                ${item.customFlavor ? `<p>الطعم: ${item.customFlavor}</p>` : ''}
            </div>
            <div class="cart-item-price">
                ${item.price} ج.م
                <button onclick="removeFromCart(${index})" class="remove-item">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        cartItems.appendChild(cartItem);
        total += item.price;
    });

    totalPrice.textContent = total;
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Convert size to Arabic
function getSizeInArabic(size) {
    const sizes = {
        'small': 'صغير',
        'medium': 'وسط',
        'large': 'كبير'
    };
    return sizes[size];
}

// تحديث قسم العنوان عند تغيير نوع الطلب
document.querySelectorAll('input[name="orderType"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const addressSection = document.getElementById('addressSection');
        if (this.value === 'delivery') {
            addressSection.style.display = 'block';
        } else {
            addressSection.style.display = 'none';
        }
    });
});

// إضافة الموقع الحالي
document.getElementById('locationBtn').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                
                // تحديث حقل العنوان مع إحداثيات الموقع
                const locationLink = `https://maps.google.com/?q=${latitude},${longitude}`;
                document.getElementById('customerAddress').value += `\n\nرابط الموقع: ${locationLink}`;
                
                // إظهار رسالة النجاح
                document.getElementById('locationInfo').style.display = 'flex';
                setTimeout(() => {
                    document.getElementById('locationInfo').style.display = 'none';
                }, 3000);
            },
            (error) => {
                alert('عذراً، لم نتمكن من تحديد موقعك. الرجاء كتابة العنوان يدوياً.');
            }
        );
    } else {
        alert('عذراً، متصفحك لا يدعم تحديد المواقع.');
    }
});

// WhatsApp order
document.getElementById('whatsappOrder').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('السلة فارغة');
        return;
    }

    const selectedOrderType = document.querySelector('input[name="orderType"]:checked');
    if (!selectedOrderType) {
        alert('الرجاء اختيار نوع الطلب');
        return;
    }

    // التحقق من العنوان إذا كان التوصيل للمنزل
    if (selectedOrderType.value === 'delivery') {
        const address = document.getElementById('customerAddress').value.trim();
        if (!address) {
            alert('الرجاء إدخال عنوان التوصيل');
            return;
        }
    }

    const orderTypeText = {
        'delivery': 'توصيل للمنزل',
        'dineIn': 'تناول في الصالة',
        'pickup': 'استلام من المطعم'
    }[selectedOrderType.value];

    let message = `طلب جديد (${orderTypeText}):\n\n`;
    let total = 0;

    cart.forEach(item => {
        let itemDetails = `${item.name} (${getSizeInArabic(item.size)})`;
        if (item.customFlavor) {
            itemDetails += ` - الطعم: ${item.customFlavor}`;
        }
        message += `${itemDetails} - ${item.price} ج.م\n`;
        total += item.price;
    });

    // إضافة العنوان إذا كان التوصيل للمنزل
    if (selectedOrderType.value === 'delivery') {
        const address = document.getElementById('customerAddress').value.trim();
        message += `\nعنوان التوصيل:\n${address}`;
    }

    const notes = document.getElementById('orderNotes').value.trim();
    if (notes) {
        message += `\nملاحظات: ${notes}`;
    }

    message += `\nالمجموع: ${total} ج.م`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/201003410708?text=${encodedMessage}`, '_blank');
});
