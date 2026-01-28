// ===== MOBILE MENU TOGGLE =====
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===== ACTIVE NAV LINK ON SCROLL =====
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe portfolio items
document.querySelectorAll('.portfolio-item').forEach(item => {
    observer.observe(item);
});

// Observe timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
    observer.observe(item);
});

// Observe visual cards
document.querySelectorAll('.visual-card').forEach(card => {
    observer.observe(card);
});

// ===== PORTFOLIO MODAL =====
const modal = document.getElementById('portfolioModal');
const modalClose = document.querySelector('.modal-close');

// Portfolio data - you can customize this
const portfolioData = [
    {
        title: "Website Portfolio 1",
        year: "2024",
        category: "Web Development",
        description: "Deskripsi lengkap tentang proyek website pertama. Jelaskan tantangan yang dihadapi, solusi yang diterapkan, dan hasil yang dicapai. Tambahkan detail tentang proses development dan fitur-fitur utama.",
        technologies: ["HTML5", "CSS3", "JavaScript"],
        link: "#"
    },
    {
        title: "Website Portfolio 2",
        year: "2024",
        category: "Web Design",
        description: "Deskripsi lengkap tentang proyek website kedua. Ceritakan tentang konsep desain, workflow yang digunakan, dan bagaimana website ini membantu klien mencapai tujuan mereka.",
        technologies: ["HTML5", "CSS3", "Responsive Design"],
        link: "#"
    },
    {
        title: "Website Portfolio 3",
        year: "2023",
        category: "Web Development",
        description: "Deskripsi lengkap tentang proyek website ketiga. Diskusikan tentang teknologi yang digunakan, integrasi yang dilakukan, dan dampak dari website ini terhadap bisnis atau organisasi.",
        technologies: ["JavaScript", "CSS Animations", "UI/UX Design"],
        link: "#"
    }
];

// Open modal function
window.openModal = function(index) {
    const data = portfolioData[index];
    
    if (data) {
        // Update modal content
        document.querySelector('.modal-title').textContent = data.title;
        document.querySelector('.modal-meta').innerHTML = `
            <span class="meta-item">${data.year}</span>
            <span class="meta-separator">•</span>
            <span class="meta-item">${data.category}</span>
        `;
        document.querySelector('.modal-description p').textContent = data.description;
        
        // Update technologies
        const techList = document.querySelector('.tech-list');
        techList.innerHTML = data.technologies.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');
        
        document.querySelector('.modal-link').href = data.link;
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

// Close modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

modalClose.addEventListener('click', closeModal);

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// ===== CONTENTEDITABLE PLACEHOLDER =====
const editableElements = document.querySelectorAll('[contenteditable="true"]');

editableElements.forEach(element => {
    const placeholder = element.textContent;
    
    element.addEventListener('focus', () => {
        if (element.textContent === placeholder) {
            element.textContent = '';
        }
    });
    
    element.addEventListener('blur', () => {
        if (element.textContent.trim() === '') {
            element.textContent = placeholder;
        }
    });
});

// ===== PARALLAX EFFECT FOR SHAPES =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.1 + (index * 0.05);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== NUMBER COUNTER ANIMATION =====
const counters = document.querySelectorAll('.highlight-number');

const animateCounter = (element) => {
    const target = element.textContent;
    const number = parseInt(target);
    
    if (isNaN(number)) return;
    
    const duration = 2000;
    const increment = number / (duration / 16);
    let current = 0;
    
    element.textContent = '0';
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (target.includes('+') ? '+' : '');
        }
    }, 16);
};

// Observe counters
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            animateCounter(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// ===== TYPING EFFECT FOR HERO ROLES =====
const roles = document.querySelectorAll('.role');
let roleIndex = 0;

function typeRole() {
    if (roleIndex < roles.length) {
        const role = roles[roleIndex];
        const text = role.textContent;
        role.textContent = '';
        
        let charIndex = 0;
        const typeInterval = setInterval(() => {
            if (charIndex < text.length) {
                role.textContent += text.charAt(charIndex);
                charIndex++;
            } else {
                clearInterval(typeInterval);
                roleIndex++;
                setTimeout(typeRole, 200);
            }
        }, 50);
    }
}

// Start typing effect after page load
window.addEventListener('load', () => {
    setTimeout(typeRole, 500);
});

// ===== SKILL PILL HOVER EFFECT =====
const skillPills = document.querySelectorAll('.skill-pill');

skillPills.forEach(pill => {
    pill.addEventListener('mouseenter', () => {
        pill.style.transform = 'translateY(-2px) scale(1.05)';
    });
    
    pill.addEventListener('mouseleave', () => {
        pill.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== PORTFOLIO ITEM TILT EFFECT =====
const portfolioItems = document.querySelectorAll('.portfolio-item:not(.add-more)');

portfolioItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 30;
        const rotateY = (centerX - x) / 30;
        
        item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== TIMELINE MARKER ANIMATION =====
const timelineMarkers = document.querySelectorAll('.timeline-marker');

const markerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'pulse 1s ease-in-out';
        }
    });
}, { threshold: 0.5 });

timelineMarkers.forEach(marker => {
    markerObserver.observe(marker);
});

// Add pulse animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.3); box-shadow: 0 0 20px rgba(99, 102, 241, 0.5); }
    }
`;
document.head.appendChild(style);

// ===== FORM INPUT FOCUS EFFECT =====
const inputs = document.querySelectorAll('.method-value');

inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.parentElement.style.transform = 'translateX(10px)';
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.parentElement.style.transform = 'translateX(0)';
    });
});

// ===== SCROLL TO TOP ON LOGO CLICK =====
const logo = document.querySelector('.nav-logo');

logo.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== LAZY LOADING EFFECT =====
const lazyElements = document.querySelectorAll('.portfolio-item, .timeline-item, .visual-card');

const lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            lazyObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

lazyElements.forEach(element => {
    lazyObserver.observe(element);
});

// ===== PREVENT DEFAULT DRAG ON CONTENTEDITABLE =====
editableElements.forEach(element => {
    element.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
});

// ===== ACCESSIBILITY: KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
    
    // Navigate through portfolio items with arrow keys
    if (modal.classList.contains('active')) {
        const currentIndex = portfolioData.findIndex(item => 
            item.title === document.querySelector('.modal-title').textContent
        );
        
        if (e.key === 'ArrowRight' && currentIndex < portfolioData.length - 1) {
            openModal(currentIndex + 1);
        } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
            openModal(currentIndex - 1);
        }
    }
});

// ===== FOCUS TRAP FOR MOBILE MENU =====
navMenu.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && navMenu.classList.contains('active')) {
        const focusableElements = navMenu.querySelectorAll('a');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
});

// ===== SMOOTH REVEAL ON PAGE LOAD =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== CONSOLE MESSAGE =====
console.log('%c👋 Halo!', 'font-size: 24px; font-weight: bold; color: #6366f1;');
console.log('%cTerima kasih telah mengunjungi portfolio saya!', 'font-size: 14px; color: #4a5568;');
console.log('%cJika Anda tertarik untuk berkolaborasi, jangan ragu untuk menghubungi saya.', 'font-size: 14px; color: #4a5568;');

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(() => {
        // Scroll-based animations handled here
    });
}, { passive: true });

console.log('%c✅ Portfolio loaded successfully!', 'font-size: 12px; color: #10b981; font-weight: bold;');
