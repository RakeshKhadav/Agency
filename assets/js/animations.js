// Animations for Creative Nests Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP animations when the DOM is fully loaded
    initAnimations();
    
    function initAnimations() {
        // Check if GSAP and ScrollTrigger are loaded
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            // Register ScrollTrigger plugin
            gsap.registerPlugin(ScrollTrigger);
            
            // Hero section animations
            const heroText = document.querySelector('.hero-text');
            const heroImage = document.querySelector('.hero-image');
            const heroClients = document.querySelector('.hero-clients');
            
            if (heroText && heroImage) {
                // Create a timeline for hero animations
                const heroTl = gsap.timeline({
                    defaults: { duration: 1, ease: 'power3.out' }
                });
                
                heroTl.from(heroText, { 
                    opacity: 0, 
                    y: 50, 
                    delay: 0.5 
                })
                .from(heroImage, { 
                    opacity: 0, 
                    y: 50 
                }, '-=0.7')
                .from('.hero-shapes .shape', { 
                    opacity: 0, 
                    scale: 0.5, 
                    stagger: 0.2 
                }, '-=0.5');
                
                if (heroClients) {
                    heroTl.from(heroClients, { 
                        opacity: 0, 
                        y: 30 
                    }, '-=0.3');
                }
            }
            
            // Animate elements with data-animation attribute
            initScrollAnimations();
            
            // Header reveal animation
            animateHeader();
            
            // Service cards staggered animation
            animateServiceCards();
            
            // Pricing cards animation
            animatePricingCards();
            
            // Team members animation
            animateTeamMembers();
            
            // Contact section animation
            animateContactSection();
            
            // Footer animation
            animateFooter();
            
            // Portfolio items animation
            animatePortfolioItems();
            
            // Blog items animation
            animateBlogItems();
            
            // Add page transition effect for internal links
            setupPageTransitions();
        } else {
            console.warn('GSAP or ScrollTrigger not loaded. Animations may not work.');
        }
    }
    
    function initScrollAnimations() {
        // Select all elements with data-animation attribute
        const animatedElements = document.querySelectorAll('[data-animation]');
        
        animatedElements.forEach(element => {
            const animation = element.dataset.animation;
            let animationProps = {};
            
            // Define animation properties based on the animation type
            switch (animation) {
                case 'fade-in':
                    animationProps = { opacity: 0, y: 0 };
                    break;
                case 'fade-up':
                    animationProps = { opacity: 0, y: 50 };
                    break;
                case 'fade-down':
                    animationProps = { opacity: 0, y: -50 };
                    break;
                case 'fade-left':
                    animationProps = { opacity: 0, x: -50 };
                    break;
                case 'fade-right':
                    animationProps = { opacity: 0, x: 50 };
                    break;
                case 'fade-up-delay':
                    animationProps = { opacity: 0, y: 50, delay: 0.4 };
                    break;
                case 'zoom-in':
                    animationProps = { opacity: 0, scale: 0.8 };
                    break;
                case 'zoom-out':
                    animationProps = { opacity: 0, scale: 1.2 };
                    break;
                case 'rotate-in':
                    animationProps = { opacity: 0, rotation: -15, y: 50 };
                    break;
                case 'blur-in':
                    animationProps = { opacity: 0, filter: 'blur(15px)', y: 30 };
                    break;
                default:
                    animationProps = { opacity: 0 };
            }
            
            // Create scroll-triggered animation
            gsap.from(element, {
                ...animationProps,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        });
    }
    
    function animateHeader() {
        const header = document.querySelector('.header');
        if (!header) return;
        
        gsap.from(header, {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            delay: 0.2
        });
        
        // Animate navigation links staggered
        gsap.from('.nav-link', {
            opacity: 0,
            y: -20,
            stagger: 0.1,
            duration: 0.8,
            delay: 0.5,
            ease: 'power2.out'
        });
    }
    
    function animateServiceCards() {
        const serviceCards = document.querySelectorAll('.service-card');
        if (serviceCards.length === 0) return;
        
        gsap.from(serviceCards, {
            opacity: 0,
            y: 50,
            stagger: 0.1,
            duration: 0.8,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: '.services-grid',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
        
        // Animate service icons with elastic bounce
        gsap.from('.service-icon', {
            scale: 0,
            rotation: -30,
            stagger: 0.1,
            duration: 1,
            ease: 'elastic.out(1, 0.3)',
            scrollTrigger: {
                trigger: '.services-grid',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    }
    
    function animatePricingCards() {
        const pricingCards = document.querySelectorAll('.pricing-card');
        if (pricingCards.length === 0) return;
        
        gsap.from(pricingCards, {
            opacity: 0,
            y: 70,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.pricing-cards',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
        
        // Special animation for the popular pricing card
        gsap.from('.pricing-card.popular', {
            scale: 0.8,
            boxShadow: '0 0 0 rgba(94, 23, 235, 0)',
            delay: 0.4,
            duration: 1,
            ease: 'elastic.out(1, 0.3)',
            scrollTrigger: {
                trigger: '.pricing-cards',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    }
    
    function animateTeamMembers() {
        const teamMembers = document.querySelectorAll('.team-member');
        if (teamMembers.length === 0) return;
        
        gsap.from(teamMembers, {
            opacity: 0,
            y: 50,
            stagger: 0.2,
            duration: 0.8,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: '.team-grid',
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
        
        // Image reveal animation
        gsap.from('.member-image img', {
            opacity: 0,
            scale: 1.2,
            stagger: 0.2,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.team-grid',
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    }
    
    function animateContactSection() {
        const contactInfo = document.querySelector('.contact-info');
        const contactForm = document.querySelector('.contact-form-wrapper');
        
        if (!contactInfo || !contactForm) return;
        
        // Create a timeline for contact section
        const contactTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.contact-wrapper',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
        
        contactTl.from(contactInfo, {
            x: -50,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        })
        .from(contactForm, {
            x: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.5')
        .from('.contact-info-item', {
            y: 20,
            opacity: 0,
            stagger: 0.2,
            duration: 0.5,
            ease: 'power2.out'
        }, '-=0.3')
        .from('.form-group', {
            y: 20,
            opacity: 0,
            stagger: 0.1,
            duration: 0.5,
            ease: 'power2.out'
        }, '-=0.6');
        
        // Add subtle pulse animation to submit button
        gsap.to('.contact-form button', {
            boxShadow: '0 6px 25px rgba(94, 23, 235, 0.4)',
            scale: 1.03,
            repeat: -1,
            yoyo: true,
            duration: 1.5,
            ease: 'sine.inOut',
            delay: 2
        });
    }
    
    function animateFooter() {
        const footer = document.querySelector('.footer-section');
        if (!footer) return;
        
        gsap.from('.footer-content > *', {
            y: 50,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: footer,
                start: 'top 90%',
                toggleActions: 'play none none none'
            }
        });
        
        // Logo bounce animation
        gsap.from('.footer-logo', {
            scale: 0.8, 
            opacity: 0,
            duration: 1,
            ease: 'elastic.out(1, 0.3)',
            scrollTrigger: {
                trigger: footer,
                start: 'top 90%',
                toggleActions: 'play none none none'
            }
        });
    }
    
    function animatePortfolioItems() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        if (portfolioItems.length === 0) return;
        
        gsap.from(portfolioItems, {
            opacity: 0,
            y: 50,
            scale: 0.9,
            stagger: 0.1,
            duration: 0.8,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: '.portfolio-grid',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
        
        // Staggered animation for filter buttons
        gsap.from('.filter-btn', {
            opacity: 0,
            y: 20,
            stagger: 0.1,
            duration: 0.5,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.portfolio-filter',
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    }
    
    function animateBlogItems() {
        const blogCards = document.querySelectorAll('.blog-card');
        if (blogCards.length === 0) return;
        
        gsap.from(blogCards, {
            opacity: 0,
            y: 50,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.blog-grid',
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
        
        // Add hover animations for blog cards
        blogCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                gsap.to(this.querySelector('.blog-link i'), {
                    x: 5,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            card.addEventListener('mouseleave', function() {
                gsap.to(this.querySelector('.blog-link i'), {
                    x: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
    }
    
    function setupPageTransitions() {
        // Smooth scroll and page transition for internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                // Add a subtle flash animation when clicking on links
                gsap.to('body', {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1
                });
            });
        });
        
        // Add hover effects to buttons
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                gsap.to(this, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: 'power1.out'
                });
            });
            
            btn.addEventListener('mouseleave', function() {
                gsap.to(this, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power1.out'
                });
            });
        });
    }
});
