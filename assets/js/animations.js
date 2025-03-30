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
});
