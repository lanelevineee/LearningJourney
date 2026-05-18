// ===================================
// GSAP Animations & ScrollTrigger Setup
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // ===================================
    // Hero Section Animations
    // ===================================
    
    // Hero content fade up
    gsap.to('.hero-content', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2
    });

    // Hero image fade right
    gsap.to('.hero-image', {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.4
    });

    // Animate hero stats counter
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        
        ScrollTrigger.create({
            trigger: stat,
            start: 'top 80%',
            once: true,
            onEnter: () => {
                gsap.to(stat, {
                    innerHTML: target,
                    duration: 2,
                    snap: { innerHTML: 1 },
                    ease: 'power2.out'
                });
            }
        });
    });

    // ===================================
    // Scroll-triggered Animations for Sections
    // ===================================

    // Fade Up Elements
    const fadeUpElements = document.querySelectorAll('.gsap-fade-up');
    fadeUpElements.forEach((element, index) => {
        const delay = element.getAttribute('data-delay') || 0;
        
        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: parseFloat(delay),
            ease: 'power3.out'
        });
    });

    // Fade Right Elements
    const fadeRightElements = document.querySelectorAll('.gsap-fade-right');
    fadeRightElements.forEach(element => {
        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    });

    // Fade Left Elements
    const fadeLeftElements = document.querySelectorAll('.gsap-fade-left');
    fadeLeftElements.forEach(element => {
        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    });

    // Service Cards Stagger Animation
    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards.length > 0) {
        gsap.from(serviceCards, {
            scrollTrigger: {
                trigger: '.services-grid',
                start: 'top 80%'
            },
            opacity: 0,
            y: 60,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
        });
    }

    // Testimonial Cards Stagger
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    if (testimonialCards.length > 0) {
        gsap.from(testimonialCards, {
            scrollTrigger: {
                trigger: '.testimonials-grid',
                start: 'top 80%'
            },
            opacity: 0,
            y: 60,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        });
    }

    // Feature Items Stagger
    const featureItems = document.querySelectorAll('.feature-item');
    if (featureItems.length > 0) {
        gsap.from(featureItems, {
            scrollTrigger: {
                trigger: '.features-grid',
                start: 'top 80%'
            },
            opacity: 0,
            y: 40,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out'
        });
    }

    // FAQ Items Animation
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        gsap.from(faqItems, {
            scrollTrigger: {
                trigger: '.faq-container',
                start: 'top 80%'
            },
            opacity: 0,
            y: 30,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out'
        });
    }

    // CTA Box Scale Animation
    const ctaBox = document.querySelector('.cta-box');
    if (ctaBox) {
        gsap.from(ctaBox, {
            scrollTrigger: {
                trigger: '.cta-box',
                start: 'top 85%'
            },
            opacity: 0,
            scale: 0.95,
            duration: 0.8,
            ease: 'back.out(1.7)'
        });
    }

    // About Cards Animation
    const aboutCards = document.querySelectorAll('.about-card');
    if (aboutCards.length > 0) {
        gsap.from(aboutCards, {
            scrollTrigger: {
                trigger: '.about-cards',
                start: 'top 80%'
            },
            opacity: 0,
            x: -30,
            duration: 0.7,
            stagger: 0.2,
            ease: 'power3.out'
        });
    }

    // Image Stack Animation
    const imageStack = document.querySelector('.image-stack');
    if (imageStack) {
        gsap.from(imageStack, {
            scrollTrigger: {
                trigger: '.image-stack',
                start: 'top 80%'
            },
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
            ease: 'power3.out'
        });
    }

    // Experience Badge Pop Animation
    const experienceBadge = document.querySelector('.experience-badge');
    if (experienceBadge) {
        gsap.from(experienceBadge, {
            scrollTrigger: {
                trigger: '.experience-badge',
                start: 'top 85%'
            },
            opacity: 0,
            scale: 0,
            rotation: -180,
            duration: 0.8,
            ease: 'back.out(2)'
        });
    }

    // Overlay Card Slide Animation
    const overlayCard = document.querySelector('.overlay-card');
    if (overlayCard) {
        gsap.from(overlayCard, {
            scrollTrigger: {
                trigger: '.overlay-card',
                start: 'top 85%'
            },
            opacity: 0,
            x: -50,
            duration: 0.8,
            ease: 'power3.out'
        });
    }

    // Floating Cards Parallax Effect
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        gsap.to(card, {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            },
            y: index % 2 === 0 ? -50 : 50,
            ease: 'none'
        });
    });
});

// ===================================
// Navigation Scroll Effect
// ===================================
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===================================
// Mobile Menu Toggle
// ===================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Toggle icon
        const icon = hamburger.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('ri-menu-line');
            icon.classList.add('ri-close-line');
        } else {
            icon.classList.remove('ri-close-line');
            icon.classList.add('ri-menu-line');
        }
    });

    // Close menu when clicking a link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('ri-close-line');
            icon.classList.add('ri-menu-line');
        });
    });
}

// ===================================
// FAQ Accordion Functionality
// ===================================
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Close all other items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Toggle current item
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// ===================================
// Smooth Scroll for Anchor Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===================================
// Active Link Highlighting
// ===================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

if (sections.length > 0 && navLinks.length > 0) {
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
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
}

// ===================================
// Button Ripple Effect
// ===================================
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = button.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            left: ${e.clientX - rect.left - size/2}px;
            top: ${e.clientY - rect.top - size/2}px;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// Intersection Observer for Lazy Loading Images
// ===================================
const images = document.querySelectorAll('img[data-src]');

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ===================================
// Form Validation (for contact pages)
// ===================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        this.reset();
    });
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        padding: 1rem 2rem;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
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
`;
document.head.appendChild(notificationStyle);

// ===================================
// Parallax Effect for Hero Background
// ===================================
const heroBg = document.querySelector('.hero-pattern');

if (heroBg) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (scrolled < window.innerHeight) {
            heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
}

console.log('Zen Accounting Website - All animations and interactions loaded successfully!');
