// ===================================
// GSAP ScrollTrigger Animations
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // ===================================
    // Navigation Functionality
    // ===================================
    const navbar = document.querySelector('.navbar');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('ri-menu-line');
                icon.classList.add('ri-close-line');
            } else {
                icon.classList.remove('ri-close-line');
                icon.classList.add('ri-menu-line');
            }
        });
    }

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.remove('ri-close-line');
            icon.classList.add('ri-menu-line');
        });
    });

    // Active link highlighting based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ===================================
    // Hero Section Animations
    // ===================================
    
    // Hero badge animation
    gsap.from('.hero-badge', {
        duration: 1,
        opacity: 0,
        y: 30,
        ease: 'power3.out',
        delay: 0.2
    });

    // Hero title animation
    gsap.from('.hero-title', {
        duration: 1,
        opacity: 0,
        y: 40,
        ease: 'power3.out',
        delay: 0.4
    });

    // Hero description animation
    gsap.from('.hero-description', {
        duration: 1,
        opacity: 0,
        y: 30,
        ease: 'power3.out',
        delay: 0.6
    });

    // Hero buttons animation
    gsap.from('.hero-buttons', {
        duration: 1,
        opacity: 0,
        y: 30,
        ease: 'power3.out',
        delay: 0.8
    });

    // Hero stats animation with counter
    gsap.from('.stat-item', {
        duration: 1,
        opacity: 0,
        y: 30,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 1,
        onComplete: animateCounters
    });

    // Hero image animation
    gsap.from('.hero-main-image', {
        duration: 1.5,
        opacity: 0,
        x: 50,
        scale: 0.95,
        ease: 'power3.out',
        delay: 0.5
    });

    // Floating cards animation
    gsap.from('.floating-card', {
        duration: 1,
        opacity: 0,
        scale: 0.8,
        stagger: 0.3,
        ease: 'back.out(1.7)',
        delay: 1.2
    });

    // Counter animation function
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const suffix = counter.nextElementSibling?.textContent?.includes('%') ? '%' : '+';
            
            gsap.to(counter, {
                innerHTML: target,
                duration: 2,
                snap: { innerHTML: 1 },
                ease: 'power2.out',
                onUpdate: function() {
                    counter.innerHTML = Math.ceil(this.targets()[0].innerHTML) + (target === 98 ? '%' : '+');
                }
            });
        });
    }

    // ===================================
    // About Preview Section Animations
    // ===================================
    
    gsap.utils.toArray('.about-preview').forEach(section => {
        gsap.from('.about-image', {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            opacity: 0,
            x: -50,
            ease: 'power3.out'
        });

        gsap.from('.about-content', {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            opacity: 0,
            x: 50,
            ease: 'power3.out',
            delay: 0.2
        });

        gsap.from('.mv-card', {
            scrollTrigger: {
                trigger: section,
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            opacity: 0,
            y: 30,
            stagger: 0.2,
            ease: 'power3.out'
        });
    });

    // ===================================
    // Services Section Animations
    // ===================================
    
    gsap.utils.toArray('.services').forEach(section => {
        // Section header animation
        gsap.from('.section-header', {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            opacity: 0,
            y: 40,
            ease: 'power3.out'
        });

        // Service cards staggered animation
        gsap.from('.service-card', {
            scrollTrigger: {
                trigger: section,
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            opacity: 0,
            y: 50,
            stagger: 0.15,
            ease: 'power3.out'
        });
    });

    // ===================================
    // Why Choose Us Section Animations
    // ===================================
    
    gsap.utils.toArray('.why-choose').forEach(section => {
        gsap.from('.why-content', {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            opacity: 0,
            x: -50,
            ease: 'power3.out'
        });

        gsap.from('.why-image', {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            opacity: 0,
            x: 50,
            ease: 'power3.out',
            delay: 0.2
        });

        gsap.from('.feature-item', {
            scrollTrigger: {
                trigger: section,
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.6,
            opacity: 0,
            y: 30,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.4
        });
    });

    // ===================================
    // Testimonials Section Animations
    // ===================================
    
    gsap.utils.toArray('.testimonials').forEach(section => {
        gsap.from('.section-header', {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            opacity: 0,
            y: 40,
            ease: 'power3.out'
        });

        gsap.from('.testimonial-card', {
            scrollTrigger: {
                trigger: section,
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            opacity: 0,
            y: 50,
            stagger: 0.2,
            ease: 'power3.out'
        });
    });

    // ===================================
    // FAQ Section Animations
    // ===================================
    
    gsap.utils.toArray('.faq').forEach(section => {
        gsap.from('.section-header', {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            opacity: 0,
            y: 40,
            ease: 'power3.out'
        });

        gsap.from('.faq-item', {
            scrollTrigger: {
                trigger: section,
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.6,
            opacity: 0,
            y: 20,
            stagger: 0.1,
            ease: 'power3.out'
        });
    });

    // FAQ Accordion Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // ===================================
    // CTA Section Animations
    // ===================================
    
    gsap.utils.toArray('.cta').forEach(section => {
        gsap.from('.cta-content', {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            opacity: 0,
            y: 40,
            ease: 'power3.out'
        });

        gsap.from('.cta-buttons', {
            scrollTrigger: {
                trigger: section,
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            },
            duration: 1,
            opacity: 0,
            y: 30,
            ease: 'power3.out',
            delay: 0.2
        });

        // Decorative circles animation
        gsap.to('.circle-1', {
            scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            },
            x: 50,
            y: 30,
            rotation: 45
        });

        gsap.to('.circle-2', {
            scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            },
            x: -50,
            y: -30,
            rotation: -45
        });
    });

    // ===================================
    // Footer Animations
    // ===================================
    
    gsap.from('.footer-brand', {
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        opacity: 0,
        y: 30,
        ease: 'power3.out'
    });

    gsap.from('.footer-links', {
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        opacity: 0,
        y: 30,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.2
    });

    gsap.from('.footer-contact', {
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        duration: 1,
        opacity: 0,
        y: 30,
        ease: 'power3.out',
        delay: 0.4
    });

    // ===================================
    // Parallax Effect for Hero Image
    // ===================================
    
    gsap.to('.hero-main-image', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        y: 100,
        ease: 'none'
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
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: {
                            y: target,
                            offsetY: 80
                        },
                        ease: 'power3.inOut'
                    });
                }
            }
        });
    });

    // ===================================
    // Button Ripple Effect
    // ===================================
    
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                left: ${x}px;
                top: ${y}px;
                width: 100px;
                height: 100px;
                margin-left: -50px;
                margin-top: -50px;
                pointer-events: none;
            `;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation to stylesheet
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
    // Intersection Observer for Lazy Loading
    // ===================================
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px'
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });

    // ===================================
    // Performance Optimization
    // ===================================
    
    // Throttle scroll events
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                highlightNavLink();
                ticking = false;
            });
            ticking = true;
        }
    });

    // ===================================
    // Console Message
    // ===================================
    
    console.log('%c🎨 Zen Accounting Website Loaded Successfully!', 
        'background: linear-gradient(135deg, #1e40af 0%, #06b6d4 100%); color: white; padding: 10px 20px; border-radius: 5px; font-size: 14px; font-weight: bold;');
    console.log('%cBuilt with HTML, CSS, Vanilla JS & GSAP', 
        'color: #64748b; font-size: 12px;');
});
