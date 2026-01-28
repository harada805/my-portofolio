// ===== CUSTOM CURSOR =====
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;
    
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Cursor effects on hover
const interactiveElements = document.querySelectorAll('a, button, .role, .tag, .skill-category, .portfolio-item, .social-card');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorDot.style.transform = 'scale(2)';
        cursorOutline.style.transform = 'scale(1.5)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursorDot.style.transform = 'scale(1)';
        cursorOutline.style.transform = 'scale(1)';
    });
});

// ===== MOBILE MENU =====
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

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

// ===== ACTIVE NAV LINK =====
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

// ===== SCROLL REVEAL ANIMATION =====
const scrollElements = document.querySelectorAll('[data-scroll]');

const elementInView = (el, offset = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset
    );
};

const displayScrollElement = (element) => {
    element.classList.add('visible');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 100)) {
            displayScrollElement(el);
        }
    });
};

window.addEventListener('scroll', handleScrollAnimation);
handleScrollAnimation();

// ===== HERO ROLES ROTATION =====
const roles = document.querySelectorAll('.role');
let currentRoleIndex = 0;

setInterval(() => {
    roles[currentRoleIndex].classList.remove('active');
    currentRoleIndex = (currentRoleIndex + 1) % roles.length;
    roles[currentRoleIndex].classList.add('active');
}, 3000);

// Manual role click
roles.forEach((role, index) => {
    role.addEventListener('click', () => {
        roles.forEach(r => r.classList.remove('active'));
        role.classList.add('active');
        currentRoleIndex = index;
    });
});

// ===== STAT COUNTER ANIMATION =====
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
};

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            animateCounter(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statObserver.observe(stat);
});

// ===== SKILL PROGRESS BARS =====
const skillCategories = document.querySelectorAll('.skill-category');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                bar.style.setProperty('--progress', progress + '%');
                setTimeout(() => {
                    bar.style.width = progress + '%';
                }, 300);
            });
        }
    });
}, { threshold: 0.3 });

skillCategories.forEach(category => {
    skillObserver.observe(category);
});

// ===== PORTFOLIO LAPTOP TILT EFFECT =====
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 30;
        const rotateY = (centerX - x) / 30;
        
        const laptopScreen = item.querySelector('.laptop-screen');
        if (laptopScreen) {
            laptopScreen.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
    });
    
    item.addEventListener('mouseleave', () => {
        const laptopScreen = item.querySelector('.laptop-screen');
        if (laptopScreen) {
            laptopScreen.style.transform = 'rotateX(0) rotateY(0)';
        }
    });
});

// ===== TIMELINE DOT PULSE ANIMATION =====
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const dot = entry.target.querySelector('.timeline-dot');
            if (dot) {
                dot.style.animation = 'pulse 0.6s ease-in-out';
                setTimeout(() => {
                    dot.style.animation = '';
                }, 600);
            }
        }
    });
}, { threshold: 0.5 });

timelineItems.forEach(item => {
    timelineObserver.observe(item);
});

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.8); box-shadow: 0 0 0 8px rgba(99, 102, 241, 0.4), 0 0 30px var(--primary); }
    }
`;
document.head.appendChild(style);

// ===== SOCIAL CARDS ANIMATION =====
const socialCards = document.querySelectorAll('.social-card');

socialCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, index * 100);
});

// ===== CONTACT ITEM HOVER ANIMATION =====
const contactItems = document.querySelectorAll('.contact-item');

contactItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const icon = item.querySelector('.contact-icon');
        if (icon) {
            icon.style.transform = 'rotate(360deg) scale(1.1)';
        }
    });
    
    item.addEventListener('mouseleave', () => {
        const icon = item.querySelector('.contact-icon');
        if (icon) {
            icon.style.transform = 'rotate(0) scale(1)';
        }
    });
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
    
    // Prevent drag
    element.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
});

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Parallax for particles
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        const speed = 0.5 + (index * 0.1);
        particle.style.transform = `translateY(${scrolled * speed}px)`;
    });
    
    // Parallax for hero visual
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ===== INTERSECTION OBSERVER FOR SKILL ITEMS =====
const skillItems = document.querySelectorAll('.skill-item');

skillItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
});

// ===== MAGNETIC BUTTON EFFECT =====
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
    });
});

// ===== INTEREST TAGS SHUFFLE ANIMATION =====
const interestTags = document.querySelectorAll('.interest-tag');

interestTags.forEach((tag, index) => {
    tag.addEventListener('mouseenter', () => {
        interestTags.forEach((otherTag, otherIndex) => {
            if (otherIndex !== index) {
                otherTag.style.transform = 'scale(0.95)';
                otherTag.style.opacity = '0.6';
            }
        });
    });
    
    tag.addEventListener('mouseleave', () => {
        interestTags.forEach(otherTag => {
            otherTag.style.transform = 'scale(1)';
            otherTag.style.opacity = '1';
        });
    });
});

// ===== PORTFOLIO TAGS INTERACTION =====
const portfolioTags = document.querySelectorAll('.portfolio-tags .tag');

portfolioTags.forEach(tag => {
    tag.addEventListener('click', () => {
        tag.style.animation = 'tagPop 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        setTimeout(() => {
            tag.style.animation = '';
        }, 300);
    });
});

// Add tag pop animation
const tagStyle = document.createElement('style');
tagStyle.textContent = `
    @keyframes tagPop {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2) rotate(5deg); }
    }
`;
document.head.appendChild(tagStyle);

// ===== HERO VISUAL CIRCLES INTERACTION =====
const visualCircles = document.querySelectorAll('.visual-circle');

visualCircles.forEach((circle, index) => {
    circle.addEventListener('mouseenter', () => {
        visualCircles.forEach((otherCircle, otherIndex) => {
            if (otherIndex !== index) {
                otherCircle.style.animationPlayState = 'paused';
            }
        });
    });
    
    circle.addEventListener('mouseleave', () => {
        visualCircles.forEach(otherCircle => {
            otherCircle.style.animationPlayState = 'running';
        });
    });
});

// ===== SCROLL TO TOP =====
const logo = document.querySelector('.nav-logo');

logo.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
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

// ===== IMAGE LAZY LOADING ANIMATION =====
const portfolioImages = document.querySelectorAll('.portfolio-image');

portfolioImages.forEach(img => {
    img.addEventListener('load', () => {
        img.style.animation = 'fadeIn 0.5s ease';
    });
});

// ===== CONTACT INPUTS ANIMATION =====
const contactInputs = document.querySelectorAll('.contact-value');

contactInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.parentElement.style.transform = 'translateX(15px) scale(1.02)';
        input.parentElement.parentElement.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.parentElement.style.transform = 'translateX(0) scale(1)';
        input.parentElement.parentElement.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.05)';
    });
});

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Trigger initial animations
    handleScrollAnimation();
});

// ===== PERFORMANCE OPTIMIZATION =====
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(() => {
        // Scroll optimizations handled here
    });
}, { passive: true });

// ===== EASTER EGG - CONSOLE =====
console.log('%c👨‍💻 Portfolio Website', 'font-size: 24px; font-weight: bold; color: #6366f1;');
console.log('%c✨ Terima kasih telah mengunjungi portfolio saya!', 'font-size: 14px; color: #4a5568;');
console.log('%c📧 Tertarik untuk berkolaborasi? Scroll ke bagian kontak!', 'font-size: 14px; color: #4a5568;');
console.log('%c🎨 Website ini dibuat dengan HTML, CSS, dan JavaScript', 'font-size: 12px; color: #94a3b8;');

// ===== VIEWPORT HEIGHT FIX FOR MOBILE =====
const setVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
};

setVh();
window.addEventListener('resize', setVh);

// ===== SMOOTH SCROLL REVEAL =====
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const fadeElements = document.querySelectorAll('.skill-category, .portfolio-item, .timeline-item, .stat-card');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    fadeObserver.observe(element);
});

console.log('%c✅ All animations loaded!', 'font-size: 12px; color: #10b981; font-weight: bold;');

