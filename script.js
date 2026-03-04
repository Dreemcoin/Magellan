// 1. أنيميشن الظهور عند التمرير
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => observer.observe(el));

// 2. قائمة الجوال (إغلاق القائمة بعد النقر على رابط)
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if(menuToggle) {
    menuToggle.onclick = () => navLinks.classList.toggle('active');
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.onclick = () => navLinks.classList.remove('active');
});

// 3. وظيفة فتح تفاصيل الخدمة
function toggleService(card) {
    card.classList.toggle('active');
}

// 4. رسالة الشركاء
function showPartnerMsg(text) {
    const box = document.getElementById('partner-msg-box');
    if(box) {
        box.style.display = 'block';
        box.innerText = text;
        box.style.animation = 'fadeIn 0.5s';
    }
}

// 5. معالجة النموذج عبر AJAX (الحل النهائي والمضمون للربط)
const contactForm = document.getElementById('magellan-form');

if (contactForm) {
    contactForm.onsubmit = function(e) {
        e.preventDefault(); // منع التحديث التقليدي للصفحة
        
        const submitBtn = contactForm.querySelector('button');
        const originalText = submitBtn.innerText;
        
        // إظهار مؤشر التحميل
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
        submitBtn.disabled = true;

        const data = new FormData(contactForm);
        
        fetch(contactForm.action, {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                // النجاح: الانتقال لصفحة الشكر
                window.location.href = "thank-you.html";
            } else {
                // فشل من جهة السيرفر
                response.json().then(data => {
                    alert("عذراً، حدث خطأ: " + (data.errors ? data.errors.map(error => error.message).join(", ") : "يرجى المحاولة لاحقاً"));
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                });
            }
        }).catch(error => {
            // فشل في الاتصال
            alert("حدث خطأ في الاتصال، تأكد من اتصالك بالإنترنت.");
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        });
    };
}

// 6. إضافة تأثير بسيط عند التمرير للهيدر
window.onscroll = () => {
    const header = document.getElementById('main-header');
    if (header) {
        if (window.scrollY > 50) {
            header.style.boxShadow = "0 5px 20px rgba(0,0,0,0.1)";
            header.style.padding = "10px 0";
        } else {
            header.style.boxShadow = "none";
            header.style.padding = "15px 0";
        }
    }
};