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
// ============================================\n// GAMIFICATION & INTERACTIVE FEATURES\n// ============================================\n\n// Financial Health Scanner\nconst HealthScanner = {\n    currentStep: 1,\n    totalSteps: 5,\n    scores: [],\n    init() { this.bindEvents(); this.updateProgress(); },\n    bindEvents() {\n        document.querySelectorAll(\".option-btn\").forEach(btn => {\n            btn.addEventListener(\"click\", (e) => {\n                const question = e.target.closest(\".question\");\n                const score = parseInt(e.target.dataset.score);\n                question.querySelectorAll(\".option-btn\").forEach(b => b.classList.remove(\"selected\"));\n                e.target.classList.add(\"selected\");\n                this.scores[this.currentStep - 1] = score;\n                setTimeout(() => this.next(), 400);\n            });\n        });\n        document.querySelector(\".scanner-nav .prev\")?.addEventListener(\"click\", () => this.prev());\n        document.querySelector(\".scanner-nav .next\")?.addEventListener(\"click\", () => this.next());\n    },\n    next() { if (this.currentStep < this.totalSteps) this.changeStep(this.currentStep + 1); else this.showResults(); },\n    prev() { if (this.currentStep > 1) this.changeStep(this.currentStep - 1); },\n    changeStep(newStep) {\n        document.querySelector(`.question[data-step=\"${this.currentStep}\"]`)?.classList.remove(\"active\");\n        this.currentStep = newStep;\n        document.querySelector(`.question[data-step=\"${this.currentStep}\"]`)?.classList.add(\"active\");\n        this.updateProgress(); this.updateNavButtons();\n    },\n    updateProgress() {\n        const progress = ((this.currentStep - 1) / this.totalSteps) * 100;\n        document.querySelector(\".scanner-progress .progress-fill\").style.width = `${progress}%`;\n        document.querySelector(\".scanner-progress .progress-text\").textContent = `Question ${this.currentStep} of ${this.totalSteps}`;\n    },\n    updateNavButtons() {\n        const prevBtn = document.querySelector(\".scanner-nav .prev\");\n        const nextBtn = document.querySelector(\".scanner-nav .next\");\n        if (prevBtn) prevBtn.disabled = this.currentStep === 1;\n        if (nextBtn) nextBtn.innerHTML = this.currentStep === this.totalSteps ? \"<span>See Results</span><i class=\\\"ri-check-line\\\"></i>\" : \"<span>Next</span><i class=\\\"ri-arrow-right-line\\\"></i>\";\n    },\n    showResults() {\n        document.querySelector(\".scanner-questions\").style.display = \"none\";\n        document.querySelector(\".scanner-nav\").style.display = \"none\";\n        document.querySelector(\".scanner-progress\").style.display = \"none\";\n        document.querySelector(\".scanner-result\").style.display = \"block\";\n        const totalScore = Math.round((this.scores.reduce((a, b) => a + b, 0) / 50) * 100);\n        setTimeout(() => {\n            const circle = document.querySelector(\".score-fill\");\n            circle.style.strokeDashoffset = 283 - (totalScore / 100) * 283;\n            let current = 0; const increment = totalScore / 50;\n            const timer = setInterval(() => { current += increment; if (current >= totalScore) { current = totalScore; clearInterval(timer); } document.querySelector(\".score-value .number\").textContent = Math.round(current); }, 30);\n        }, 100);\n        gsap.from(\".result-content\", { duration: 0.6, opacity: 0, y: 30, ease: \"power3.out\" });\n    }\n};\n\n// Tax Calculator\nconst TaxCalculator = {\n    init() { const form = document.getElementById(\"taxCalculatorForm\"); if (form) form.addEventListener(\"submit\", (e) => this.calculate(e)); },\n    calculate(e) {\n        e.preventDefault();\n        const revenue = parseFloat(document.getElementById(\"annualRevenue\").value) || 0;\n        const expenses = parseFloat(document.getElementById(\"expenses\").value) || 0;\n        const currentTax = parseFloat(document.getElementById(\"currentTax\").value) || 0;\n        const businessType = document.getElementById(\"businessType\").value;\n        const profit = Math.max(0, revenue - expenses);\n        let taxRate = 0.21;\n        switch(businessType) { case \"sole\": taxRate = 0.15; break; case \"partnership\": taxRate = 0.18; break; case \"llc\": taxRate = 0.20; break; case \"corporation\": taxRate = 0.21; break; }\n        const optimizedTax = profit * taxRate; const savings = Math.max(0, currentTax - optimizedTax);\n        document.getElementById(\"savingsValue\").textContent = Math.round(savings).toLocaleString();\n        document.getElementById(\"savingsPercent\").textContent = currentTax > 0 ? ((savings / currentTax) * 100).toFixed(1) : 0;\n        gsap.from(\".result-card\", { duration: 0.6, opacity: 0, scale: 0.95, ease: \"back.out(1.7)\" });\n    }\n};\n\n// Deadline Tracker\nconst DeadlineTracker = {\n    init() { this.updateCountdowns(); setInterval(() => this.updateCountdowns(), 60000); },\n    updateCountdowns() {\n        document.querySelectorAll(\".deadline-card\").forEach(card => {\n            const diff = new Date(card.dataset.deadline) - new Date();\n            if (diff > 0) {\n                card.querySelector(\".days\").textContent = String(Math.floor(diff / (1000*60*60*24))).padStart(2, \"0\");\n                card.querySelector(\".hours\").textContent = String(Math.floor((diff % (1000*60*60*24)) / (1000*60*60))).padStart(2, \"0\");\n                card.querySelector(\".minutes\").textContent = String(Math.floor((diff % (1000*60*60)) / (1000*60))).padStart(2, \"0\");\n            }\n        });\n    }\n};\n\n// AI Assistant with OpenRouter\nconst ZenAI = {\n    apiKey: null, model: \"google/gemma-2-9b-it:free\", messages: [],\n    init() {\n        this.apiKey = localStorage.getItem(\"zen_ai_api_key\");\n        document.querySelector(\".ai-assistant-btn\")?.addEventListener(\"click\", () => this.openModal());\n        document.getElementById(\"aiCloseBtn\")?.addEventListener(\"click\", () => this.closeModal());\n        document.getElementById(\"setApiKeyBtn\")?.addEventListener(\"click\", () => document.getElementById(\"apiModalOverlay\").style.display = \"flex\");\n        document.getElementById(\"apiKeyForm\")?.addEventListener(\"submit\", (e) => { e.preventDefault(); this.apiKey = document.getElementById(\"apiKeyInput\").value; localStorage.setItem(\"zen_ai_api_key\", this.apiKey); document.getElementById(\"apiModalOverlay\").style.display = \"none\"; document.getElementById(\"apiKeyNotice\").style.display = \"none\"; document.getElementById(\"aiInputForm\").style.display = \"flex\"; });\n        document.getElementById(\"aiInputForm\")?.addEventListener(\"submit\", (e) => this.sendMessage(e));\n        if (this.apiKey) { document.getElementById(\"apiKeyNotice\").style.display = \"none\"; document.getElementById(\"aiInputForm\").style.display = \"flex\"; }\n    },\n    openModal() { document.getElementById(\"aiModalOverlay\").style.display = \"flex\"; gsap.from(\".ai-modal\", { duration: 0.4, opacity: 0, scale: 0.9 }); },\n    closeModal() { gsap.to(\".ai-modal\", { duration: 0.3, opacity: 0, onComplete: () => document.getElementById(\"aiModalOverlay\").style.display = \"none\" }); },\n    async sendMessage(e) {\n        e.preventDefault();\n        const input = document.getElementById(\"aiInput\"); const message = input.value.trim();\n        if (!message || !this.apiKey) return;\n        input.value = \"\";\n        try {\n            const response = await fetch(\"https://openrouter.ai/api/v1/chat/completions\", {\n                method: \"POST\", headers: { \"Authorization\": `Bearer ${this.apiKey}`, \"Content-Type\": \"application/json\" },\n                body: JSON.stringify({ model: this.model, messages: [{ role: \"system\", content: \"You are Zen AI, a helpful accounting assistant.\" }, ...this.messages.slice(-10), { role: \"user\", content: message }] })\n            });\n            const data = await response.json();\n            this.addMessage(\"assistant\", data.choices?.[0]?.message?.content || \"Sorry, could not process that.\");\n            this.messages.push({ role: \"user\", content: message }, { role: \"assistant\", content: data.choices?.[0]?.message?.content });\n        } catch (error) { this.addMessage(\"assistant\", \"Error: Check your API key.\"); }\n    },\n    addMessage(role, content) {\n        const container = document.getElementById(\"aiMessages\");\n        container.innerHTML += `<div class=\"ai-message ${role}\"><div class=\"message-avatar\"><i class=\"${role === \"user\" ? \"ri-user-line\" : \"ri-sparkling-fill\"}\"></i></div><div class=\"message-content\">${content}</div></div>`;\n        container.scrollTop = container.scrollHeight;\n    }\n};\n\n// Canvas Background\nconst CanvasBackground = {\n    canvas: null, ctx: null, particles: [], mouse: { x: 0, y: 0 },\n    init() {\n        this.canvas = document.getElementById(\"bg-canvas\"); if (!this.canvas) return;\n        this.ctx = this.canvas.getContext(\"2d\"); this.resize(); this.createParticles();\n        window.addEventListener(\"resize\", () => { this.resize(); this.createParticles(); });\n        window.addEventListener(\"mousemove\", (e) => { this.mouse.x = e.clientX; this.mouse.y = e.clientY; });\n        this.animate();\n    },\n    resize() { this.canvas.width = window.innerWidth; this.canvas.height = window.innerHeight; },\n    createParticles() {\n        this.particles = [];\n        for (let i = 0; i < Math.floor((this.canvas.width * this.canvas.height) / 15000); i++) {\n            this.particles.push({ x: Math.random() * this.canvas.width, y: Math.random() * this.canvas.height, vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5, radius: Math.random() * 2 + 1, color: `rgba(37, 99, 235, ${Math.random() * 0.3 + 0.1})` });\n        }\n    },\n    animate() {\n        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n        this.particles.forEach((p1, i) => {\n            p1.x += p1.vx; p1.y += p1.vy;\n            if (p1.x < 0 || p1.x > this.canvas.width) p1.vx *= -1;\n            if (p1.y < 0 || p1.y > this.canvas.height) p1.vy *= -1;\n            this.ctx.beginPath(); this.ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2); this.ctx.fillStyle = p1.color; this.ctx.fill();\n            this.particles.slice(i + 1).forEach(p2 => { const dist = Math.sqrt((p1.x-p2.x)**2 + (p1.y-p2.y)**2); if (dist < 120) { this.ctx.beginPath(); this.ctx.moveTo(p1.x, p1.y); this.ctx.lineTo(p2.x, p2.y); this.ctx.strokeStyle = `rgba(37, 99, 235, ${0.1*(1-dist/120)}`; this.ctx.stroke(); }});\n        });\n        requestAnimationFrame(() => this.animate());\n    }\n};\n\n// Initialize\nif (document.readyState === \"loading\") document.addEventListener(\"DOMContentLoaded\", () => { HealthScanner.init(); TaxCalculator.init(); DeadlineTracker.init(); ZenAI.init(); CanvasBackground.init(); });\nelse { HealthScanner.init(); TaxCalculator.init(); DeadlineTracker.init(); ZenAI.init(); CanvasBackground.init(); }

// ============================================
// GAMIFICATION & INTERACTIVE FEATURES
// ============================================

const HealthScanner = {
    currentStep: 1, totalSteps: 5, scores: [],
    init() { this.bindEvents(); this.updateProgress(); },
    bindEvents() {
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const question = e.target.closest('.question');
                const score = parseInt(e.target.dataset.score);
                question.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
                e.target.classList.add('selected');
                this.scores[this.currentStep - 1] = score;
                setTimeout(() => this.next(), 400);
            });
        });
        document.querySelector('.scanner-nav .prev')?.addEventListener('click', () => this.prev());
        document.querySelector('.scanner-nav .next')?.addEventListener('click', () => this.next());
    },
    next() { if (this.currentStep < this.totalSteps) this.changeStep(this.currentStep + 1); else this.showResults(); },
    prev() { if (this.currentStep > 1) this.changeStep(this.currentStep - 1); },
    changeStep(newStep) {
        document.querySelector(`.question[data-step="${this.currentStep}"]`)?.classList.remove('active');
        this.currentStep = newStep;
        document.querySelector(`.question[data-step="${this.currentStep}"]`)?.classList.add('active');
        this.updateProgress(); this.updateNavButtons();
    },
    updateProgress() {
        const progress = ((this.currentStep - 1) / this.totalSteps) * 100;
        document.querySelector('.scanner-progress .progress-fill').style.width = `${progress}%`;
        document.querySelector('.scanner-progress .progress-text').textContent = `Question ${this.currentStep} of ${this.totalSteps}`;
    },
    updateNavButtons() {
        const prevBtn = document.querySelector('.scanner-nav .prev');
        const nextBtn = document.querySelector('.scanner-nav .next');
        if (prevBtn) prevBtn.disabled = this.currentStep === 1;
        if (nextBtn) nextBtn.innerHTML = this.currentStep === this.totalSteps ? '<span>See Results</span><i class="ri-check-line"></i>' : '<span>Next</span><i class="ri-arrow-right-line"></i>';
    },
    showResults() {
        document.querySelector('.scanner-questions').style.display = 'none';
        document.querySelector('.scanner-nav').style.display = 'none';
        document.querySelector('.scanner-progress').style.display = 'none';
        document.querySelector('.scanner-result').style.display = 'block';
        const totalScore = Math.round((this.scores.reduce((a, b) => a + b, 0) / 50) * 100);
        setTimeout(() => {
            const circle = document.querySelector('.score-fill');
            circle.style.strokeDashoffset = 283 - (totalScore / 100) * 283;
            let current = 0; const increment = totalScore / 50;
            const timer = setInterval(() => { current += increment; if (current >= totalScore) { current = totalScore; clearInterval(timer); } document.querySelector('.score-value .number').textContent = Math.round(current); }, 30);
        }, 100);
        gsap.from('.result-content', { duration: 0.6, opacity: 0, y: 30, ease: 'power3.out' });
    }
};

const TaxCalculator = {
    init() { const form = document.getElementById('taxCalculatorForm'); if (form) form.addEventListener('submit', (e) => this.calculate(e)); },
    calculate(e) {
        e.preventDefault();
        const revenue = parseFloat(document.getElementById('annualRevenue').value) || 0;
        const expenses = parseFloat(document.getElementById('expenses').value) || 0;
        const currentTax = parseFloat(document.getElementById('currentTax').value) || 0;
        const businessType = document.getElementById('businessType').value;
        const profit = Math.max(0, revenue - expenses);
        let taxRate = 0.21;
        switch(businessType) { case 'sole': taxRate = 0.15; break; case 'partnership': taxRate = 0.18; break; case 'llc': taxRate = 0.20; break; case 'corporation': taxRate = 0.21; break; }
        const optimizedTax = profit * taxRate; const savings = Math.max(0, currentTax - optimizedTax);
        document.getElementById('savingsValue').textContent = Math.round(savings).toLocaleString();
        document.getElementById('savingsPercent').textContent = currentTax > 0 ? ((savings / currentTax) * 100).toFixed(1) : 0;
        gsap.from('.result-card', { duration: 0.6, opacity: 0, scale: 0.95, ease: 'back.out(1.7)' });
    }
};

const DeadlineTracker = {
    init() { this.updateCountdowns(); setInterval(() => this.updateCountdowns(), 60000); },
    updateCountdowns() {
        document.querySelectorAll('.deadline-card').forEach(card => {
            const diff = new Date(card.dataset.deadline) - new Date();
            if (diff > 0) {
                card.querySelector('.days').textContent = String(Math.floor(diff / (1000*60*60*24))).padStart(2, '0');
                card.querySelector('.hours').textContent = String(Math.floor((diff % (1000*60*60*24)) / (1000*60*60))).padStart(2, '0');
                card.querySelector('.minutes').textContent = String(Math.floor((diff % (1000*60*60)) / (1000*60))).padStart(2, '0');
            }
        });
    }
};

const ZenAI = {
    apiKey: null, model: 'google/gemma-2-9b-it:free', messages: [],
    init() {
        this.apiKey = localStorage.getItem('zen_ai_api_key');
        document.querySelector('.ai-assistant-btn')?.addEventListener('click', () => this.openModal());
        document.getElementById('aiCloseBtn')?.addEventListener('click', () => this.closeModal());
        document.getElementById('setApiKeyBtn')?.addEventListener('click', () => document.getElementById('apiModalOverlay').style.display = 'flex');
        document.getElementById('apiKeyForm')?.addEventListener('submit', (e) => { e.preventDefault(); this.apiKey = document.getElementById('apiKeyInput').value; localStorage.setItem('zen_ai_api_key', this.apiKey); document.getElementById('apiModalOverlay').style.display = 'none'; document.getElementById('apiKeyNotice').style.display = 'none'; document.getElementById('aiInputForm').style.display = 'flex'; });
        document.getElementById('aiInputForm')?.addEventListener('submit', (e) => this.sendMessage(e));
        if (this.apiKey) { document.getElementById('apiKeyNotice').style.display = 'none'; document.getElementById('aiInputForm').style.display = 'flex'; }
    },
    openModal() { document.getElementById('aiModalOverlay').style.display = 'flex'; gsap.from('.ai-modal', { duration: 0.4, opacity: 0, scale: 0.9 }); },
    closeModal() { gsap.to('.ai-modal', { duration: 0.3, opacity: 0, onComplete: () => document.getElementById('aiModalOverlay').style.display = 'none' }); },
    async sendMessage(e) {
        e.preventDefault();
        const input = document.getElementById('aiInput'); const message = input.value.trim();
        if (!message || !this.apiKey) return;
        input.value = '';
        try {
            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST', headers: { 'Authorization': `Bearer ${this.apiKey}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ model: this.model, messages: [{ role: 'system', content: 'You are Zen AI, a helpful accounting assistant.' }, ...this.messages.slice(-10), { role: 'user', content: message }] })
            });
            const data = await response.json();
            this.addMessage('assistant', data.choices?.[0]?.message?.content || 'Sorry, could not process that.');
            this.messages.push({ role: 'user', content: message }, { role: 'assistant', content: data.choices?.[0]?.message?.content });
        } catch (error) { this.addMessage('assistant', 'Error: Check your API key.'); }
    },
    addMessage(role, content) {
        const container = document.getElementById('aiMessages');
        container.innerHTML += `<div class="ai-message ${role}"><div class="message-avatar"><i class="${role === 'user' ? 'ri-user-line' : 'ri-sparkling-fill'}"></i></div><div class="message-content">${content}</div></div>`;
        container.scrollTop = container.scrollHeight;
    }
};

const CanvasBackground = {
    canvas: null, ctx: null, particles: [], mouse: { x: 0, y: 0 },
    init() {
        this.canvas = document.getElementById('bg-canvas'); if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d'); this.resize(); this.createParticles();
        window.addEventListener('resize', () => { this.resize(); this.createParticles(); });
        window.addEventListener('mousemove', (e) => { this.mouse.x = e.clientX; this.mouse.y = e.clientY; });
        this.animate();
    },
    resize() { this.canvas.width = window.innerWidth; this.canvas.height = window.innerHeight; },
    createParticles() {
        this.particles = [];
        for (let i = 0; i < Math.floor((this.canvas.width * this.canvas.height) / 15000); i++) {
            this.particles.push({ x: Math.random() * this.canvas.width, y: Math.random() * this.canvas.height, vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5, radius: Math.random() * 2 + 1, color: `rgba(37, 99, 235, ${Math.random() * 0.3 + 0.1})` });
        }
    },
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles.forEach((p1, i) => {
            p1.x += p1.vx; p1.y += p1.vy;
            if (p1.x < 0 || p1.x > this.canvas.width) p1.vx *= -1;
            if (p1.y < 0 || p1.y > this.canvas.height) p1.vy *= -1;
            this.ctx.beginPath(); this.ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2); this.ctx.fillStyle = p1.color; this.ctx.fill();
            this.particles.slice(i + 1).forEach(p2 => { const dist = Math.sqrt((p1.x-p2.x)**2 + (p1.y-p2.y)**2); if (dist < 120) { this.ctx.beginPath(); this.ctx.moveTo(p1.x, p1.y); this.ctx.lineTo(p2.x, p2.y); this.ctx.strokeStyle = `rgba(37, 99, 235, ${0.1*(1-dist/120)})`; this.ctx.stroke(); }});
        });
        requestAnimationFrame(() => this.animate());
    }
};

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => { HealthScanner.init(); TaxCalculator.init(); DeadlineTracker.init(); ZenAI.init(); CanvasBackground.init(); });
else { HealthScanner.init(); TaxCalculator.init(); DeadlineTracker.init(); ZenAI.init(); CanvasBackground.init(); }
