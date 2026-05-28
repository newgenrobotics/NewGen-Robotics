const slider = document.getElementById('store-slider');
let isDown = false;
let startX;
let scrollLeft;

let isAutoScrolling = true;
let scrollDirection = 1; 
const scrollSpeed = 0.5; 

function autoScroll() {
    if (isAutoScrolling && !isDown) {
        slider.scrollLeft += (scrollDirection * scrollSpeed);
        
        if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth - 1) {
            scrollDirection = -1;
        }
        else if (slider.scrollLeft <= 0) {
            scrollDirection = 1;
        }
    }
    requestAnimationFrame(autoScroll); 
}

autoScroll();

// Pause on Hover/Touch
slider.addEventListener('mouseenter', () => isAutoScrolling = false);
slider.addEventListener('mouseleave', () => {
    isDown = false;
    if (document.getElementById('modal-container').classList.contains('hidden')) {
        isAutoScrolling = true;
    }
});

slider.addEventListener('touchstart', () => isAutoScrolling = false);
slider.addEventListener('touchend', () => {
     if (document.getElementById('modal-container').classList.contains('hidden')) {
        isAutoScrolling = true;
    }
});

// Drag to scroll
slider.addEventListener('mousedown', (e) => {
    if (e.target.tagName.toLowerCase() === 'button' || e.target.closest('button')) return;
    isDown = true;
    isAutoScrolling = false; 
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseup', () => {
    isDown = false;
     if (document.getElementById('modal-container').classList.contains('hidden')) {
        isAutoScrolling = true;
    }
});

slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5; 
    slider.scrollLeft = scrollLeft - walk;
});

// --- MODAL LOGIC ---
const modalContainer = document.getElementById('modal-container');

window.openModal = function(modalId) {
    isAutoScrolling = false;
    document.querySelectorAll('.modal-content').forEach(el => {
        el.classList.add('hidden');
        el.classList.remove('scale-100', 'opacity-100');
        el.classList.add('scale-95');
    });
    
    modalContainer.classList.remove('hidden');
    
    setTimeout(() => {
        modalContainer.classList.remove('opacity-0');
        modalContainer.classList.add('opacity-100');
        
        const targetModal = document.getElementById(modalId);
        targetModal.classList.remove('hidden');
        setTimeout(() => {
            targetModal.classList.remove('scale-95');
            targetModal.classList.add('scale-100', 'opacity-100');
        }, 10);
    }, 10);
}

window.closeModal = function() {
    modalContainer.classList.remove('opacity-100');
    modalContainer.classList.add('opacity-0');
    
    document.querySelectorAll('.modal-content').forEach(el => {
        el.classList.remove('scale-100');
        el.classList.add('scale-95');
    });
    
    setTimeout(() => {
        modalContainer.classList.add('hidden');
        document.querySelectorAll('.modal-content').forEach(el => el.classList.add('hidden'));
        isAutoScrolling = true; 
    }, 300);
}

// Close primary modal when clicking background
modalContainer.addEventListener('click', function(e) {
    if (e.target === this && document.getElementById('image-zoom-modal').classList.contains('hidden')) {
        closeModal();
    }
});

// --- IMAGE ZOOM LOGIC ---
const imageZoomModal = document.getElementById('image-zoom-modal');
const zoomedImage = document.getElementById('zoomed-image');

window.openImageZoom = function(imgSrc) {
    zoomedImage.src = imgSrc;
    imageZoomModal.classList.remove('hidden');
    
    setTimeout(() => {
        imageZoomModal.classList.remove('opacity-0');
        imageZoomModal.classList.add('opacity-100');
        zoomedImage.classList.remove('scale-95');
        zoomedImage.classList.add('scale-100');
    }, 10);
}

window.closeImageZoom = function() {
    imageZoomModal.classList.remove('opacity-100');
    imageZoomModal.classList.add('opacity-0');
    zoomedImage.classList.remove('scale-100');
    zoomedImage.classList.add('scale-95');
    
    setTimeout(() => {
        imageZoomModal.classList.add('hidden');
        zoomedImage.src = ''; 
    }, 300);
}

// Close on Escape Key
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        if (!imageZoomModal.classList.contains('hidden')) {
            closeImageZoom();
        } else if (!modalContainer.classList.contains('hidden')) {
            closeModal();
        }
    }
});

// --- WHATSAPP FORM SUBMISSION LOGIC ---
document.addEventListener('DOMContentLoaded', function() {
    const formElement = document.getElementById('trialForm');
    
    if (formElement) {
        formElement.addEventListener('submit', function(event) {
            // Stop the standard browser form submission loop immediately
            event.preventDefault();

            // 1. Get input fields
            const name = document.getElementById('parentName').value;
            const email = document.getElementById('parentEmail').value;
            const phone = document.getElementById('parentPhone').value;
            const grade = document.getElementById('childGrade').value;
            const course = document.getElementById('selectedCourse').value;

            // 2. Set business line destination
            const whatsappNumber = "918826821126"; 

            // 3. Format message layout
            const message = `🤖 *New Trial Class Booking* 🤖\n\n` +
                            `👤 *Parent's Name:* ${name}\n` +
                            `📧 *Email:* ${email}\n` +
                            `📞 *Phone Number:* ${phone}\n` +
                            `🎓 *Child's Grade:* ${grade}\n` +
                            `💻 *Selected Course:* ${course}`;

            // 4. Safely package data structure for URLs
            const encodedMessage = encodeURIComponent(message);

            // 5. Detect if the user device is iOS (iPhone/iPad)
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                          (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

            if (isIOS) {
                // iOS friendly deep-link protocol that native apps intercept immediately
                const iosWhatsappUrl = `whatsapp://send?phone=${whatsappNumber}&text=${encodedMessage}`;
                
                // Changing the window location directly bypasses Safari's pop-up blocker
                window.location.href = iosWhatsappUrl;
                
                // Fallback redirect to the web portal if they do not have the native application installed
                setTimeout(() => {
                    window.location.href = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
                }, 500);
            } else {
                // Desktop and Android handle standard web links in a fresh tab beautifully
                const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
                window.open(whatsappUrl, '_blank');
            }
        });
    }
});