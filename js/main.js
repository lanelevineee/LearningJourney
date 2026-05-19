/**
 * ZEN ACCOUNTING - Main JavaScript
 * Professional animations and interactions
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    Preloader.init();
    CustomCursor.init();
    Navigation.init();
    ThemeSwitcher.init();
    GSAPAnimations.init();
    FAQ.init();
    TestimonialSlider.init();
    SmoothScroll.init();
});

/**
 * Preloader Module
 * Handles the loading animation and progress
 */
const Preloader = {
    init() {
        this.progressFill = document.querySelector('.progress-fill');
        this.preloader = document.querySelector('.preloader');
        
        if (this.progressFill && this.preloader) {
            this.animate();
        }
    },
    
    animate() {
        let progress = 0;
        const increment = () => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;
            
            this.progressFill.style.width = `${progress}%`;
            
            if (progress < 100) {
                requestAnimationFrame(increment);
            } else {
                setTimeout(() => {
                    gsap.to(this.preloader, {
                        opacity: 0,
                        duration: 0.8,
                        ease: 'power2.inOut',
                        onComplete: () => {
                            this.preloader.style.display = 'none';
                            // Trigger GSAP animations after preloader
                            GSAPAnimations.triggerHero();
                        }
                    });
                }, 300);
            }
        };
        
        increment();
    }
};

/**
 * Custom Cursor Module
 * Adds a premium cursor effect on desktop
 */
const CustomCursor = {
    init() {
        if (window.innerWidth <= 768) return;
        
        this.dot = document.querySelector('.cursor-dot');
        this.outline = document.querySelector('.cursor-outline');
        
        if (!this.dot || !this.outline) return;
        
        this.pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        this.speed = 0.15;
        
        this.addEventListeners();
        this.animate();
    },
    
    addEventListeners() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        
        // Add hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .service-card, .testimonial-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to(this.outline, { scale: 1.5, duration: 0.3 });
                gsap.to(this.dot, { scale: 0.5, duration: 0.3 });
            });
            el.addEventListener('mouseleave', () => {
                gsap.to(this.outline, { scale: 1, duration: 0.3 });
                gsap.to(this.dot, { scale: 1, duration: 0.3 });
            });
        });
    },
    
    animate() {
        const updatePosition = () => {
            this.pos.x += (this.mouse.x - this.pos.x) * this.speed;
            this.pos.y += (this.mouse.y - this.pos.y) * this.speed;
            
            this.dot.style.left = `${this.mouse.x}px`;
            this.dot.style.top = `${this.mouse.y}px`;
            this.outline.style.left = `${this.pos.x}px`;
            this.outline.style.top = `${this.pos.y}px`;
            
            requestAnimationFrame(updatePosition);
        };
        
        updatePosition();
    }
};

/**
 * Navigation Module
 * Handles navbar scroll effects and mobile menu
 */
const Navigation = {
    init() {
        this.navbar = document.querySelector('.navbar');
        this.mobileToggle = document.querySelector('.mobile-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        
        if (this.navbar) {
            this.handleScroll();
            window.addEventListener('scroll', () => this.handleScroll());
        }
        
        if (this.mobileToggle && this.navMenu) {
            this.mobileToggle.addEventListener('click', () => this.toggleMobileMenu());
        }
        
        this.setActiveLink();
    },
    
    handleScroll() {
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    },
    
    toggleMobileMenu() {
        this.mobileToggle.classList.toggle('active');
        this.navMenu.classList.toggle('active');
    },
    
    setActiveLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
};

/**
 * Theme Switcher Module
 * Handles dark/light theme toggling with localStorage persistence
 */
const ThemeSwitcher = {
    init() {
        this.toggleBtn = document.querySelector('.theme-toggle');
        this.icon = this.toggleBtn?.querySelector('i');
        
        // Check for saved theme preference or default to light
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);
        
        if (this.toggleBtn) {
            this.toggleBtn.addEventListener('click', () => this.toggleTheme());
        }
    },
    
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    },
    
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update icon
        if (this.icon) {
            this.icon.className = theme === 'dark' ? 'ri-sun-line' : 'ri-moon-line';
        }
    }
};

/**
 * GSAP Animations Module
 * Handles all scroll-triggered animations
 */
const GSAPAnimations = {
    init() {
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
        
        this.setupHeroAnimations();
        this.setupSectionAnimations();
        this.setupCounterAnimation();
        this.setupParallaxEffects();
    },
    
    triggerHero() {
        const tl = gsap.timeline({ delay: 0.2 });
        
        tl.from('.hero-badge', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' })
          .from('.hero-title', { opacity: 0, y: 40, duration: 0.8, ease: 'power3.out' }, '-=0.6')
          .from('.hero-description', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' }, '-=0.6')
          .from('.hero-cta', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' }, '-=0.6')
          .from('.hero-stats', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' }, '-=0.6')
          .from('.hero-image', { opacity: 0, scale: 0.95, duration: 1, ease: 'power3.out' }, '-=0.8')
          .from('.visual-card', { opacity: 0, x: -50, duration: 0.8, stagger: 0.2, ease: 'power3.out' }, '-=0.8')
          .from('.floating-badge', { opacity: 0, scale: 0.8, duration: 0.6, stagger: 0.2, ease: 'back.out(1.7)' }, '-=0.6');
    },
    
    setupHeroAnimations() {
        // Hero animations are triggered after preloader
    },
    
    setupSectionAnimations() {
        // About section animations
        gsap.utils.toArray('.gs-reveal-left').forEach(element => {
            gsap.from(element, {
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                x: -50,
                duration: 1,
                ease: 'power3.out'
            });
        });
        
        gsap.utils.toArray('.gs-reveal-right').forEach(element => {
            gsap.from(element, {
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                x: 50,
                duration: 1,
                ease: 'power3.out'
            });
        });
        
        gsap.utils.toArray('.gs-reveal-up').forEach((element, index) => {
            gsap.from(element, {
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                y: 50,
                duration: 0.8,
                ease: 'power3.out'
            });
        });
        
        gsap.utils.toArray('.gs-reveal').forEach(element => {
            gsap.from(element, {
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: 'power3.out'
            });
        });
        
        // Stagger service cards
        gsap.from('.service-card', {
            scrollTrigger: {
                trigger: '.services-grid',
                start: 'top 80%'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
        });
        
        // Feature items stagger
        gsap.from('.feature-item', {
            scrollTrigger: {
                trigger: '.feature-list',
                start: 'top 80%'
            },
            opacity: 0,
            x: -30,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out'
        });
        
        // FAQ items stagger
        gsap.from('.faq-item', {
            scrollTrigger: {
                trigger: '.faq-grid',
                start: 'top 80%'
            },
            opacity: 0,
            y: 30,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out'
        });
    },
    
    setupCounterAnimation() {
        const statNumbers = document.querySelectorAll('.stat-number[data-target]');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            
            ScrollTrigger.create({
                trigger: stat,
                start: 'top 85%',
                once: true,
                onEnter: () => {
                    gsap.to(stat, {
                        innerHTML: target,
                        duration: 2,
                        snap: { innerHTML: 1 },
                        ease: 'power2.out',
                        modifiers: {
                            innerHTML: value => Math.floor(value) + (target === 98 ? '%' : '+')
                        }
                    });
                }
            });
        });
    },
    
    setupParallaxEffects() {
        // Parallax for gradient orbs
        gsap.to('.orb-1', {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            },
            y: 100,
            ease: 'none'
        });
        
        gsap.to('.orb-2', {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            },
            y: -100,
            ease: 'none'
        });
        
        // Stack images parallax
        gsap.to('.img-1', {
            scrollTrigger: {
                trigger: '.visual-stack',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            },
            y: -50,
            ease: 'none'
        });
        
        gsap.to('.img-2', {
            scrollTrigger: {
                trigger: '.visual-stack',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            },
            y: 50,
            ease: 'none'
        });
    }
};

/**
 * FAQ Module
 * Handles accordion functionality
 */
const FAQ = {
    init() {
        this.faqItems = document.querySelectorAll('.faq-item');
        
        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', () => this.toggleItem(item));
            }
        });
    },
    
    toggleItem(item) {
        const isActive = item.classList.contains('active');
        
        // Close all other items
        this.faqItems.forEach(i => {
            i.classList.remove('active');
        });
        
        // Toggle current item
        if (!isActive) {
            item.classList.add('active');
        }
    }
};

/**
 * Testimonial Slider Module
 * Handles testimonial carousel
 */
const TestimonialSlider = {
    init() {
        this.track = document.querySelector('.testimonial-track');
        this.cards = document.querySelectorAll('.testimonial-card');
        this.prevBtn = document.querySelector('.slider-btn.prev');
        this.nextBtn = document.querySelector('.slider-btn.next');
        
        if (!this.track || this.cards.length === 0) return;
        
        this.currentIndex = 0;
        this.cardWidth = this.cards[0].offsetWidth + 24; // 24px gap
        
        this.updateSlide();
        this.addEventListeners();
        
        // Update on resize
        window.addEventListener('resize', () => {
            this.cardWidth = this.cards[0].offsetWidth + 24;
            this.updateSlide();
        });
    },
    
    addEventListeners() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }
        
        // Auto-play
        setInterval(() => this.next(), 5000);
    },
    
    prev() {
        const visibleCards = this.getVisibleCards();
        if (this.currentIndex > 0) {
            this.currentIndex--;
        } else {
            this.currentIndex = this.cards.length - visibleCards;
        }
        this.updateSlide();
    },
    
    next() {
        const visibleCards = this.getVisibleCards();
        const maxIndex = this.cards.length - visibleCards;
        
        if (this.currentIndex < maxIndex) {
            this.currentIndex++;
        } else {
            this.currentIndex = 0;
        }
        this.updateSlide();
    },
    
    getVisibleCards() {
        if (window.innerWidth <= 640) return 1;
        if (window.innerWidth <= 968) return 2;
        return 3;
    },
    
    updateSlide() {
        const offset = -(this.currentIndex * this.cardWidth);
        gsap.to(this.track, {
            x: offset,
            duration: 0.5,
            ease: 'power2.out'
        });
    }
};

/**
 * Smooth Scroll Module
 * Handles smooth scrolling for anchor links
 */
const SmoothScroll = {
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    gsap.to(window, {
                        scrollTo: { y: offsetPosition },
                        duration: 1,
                        ease: 'power3.inOut'
                    });
                    
                    // Close mobile menu if open
                    const mobileToggle = document.querySelector('.mobile-toggle');
                    const navMenu = document.querySelector('.nav-menu');
                    if (mobileToggle && navMenu && mobileToggle.classList.contains('active')) {
                        mobileToggle.classList.remove('active');
                        navMenu.classList.remove('active');
                    }
                }
            });
        });
    }
};

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Utility function for throttling
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
