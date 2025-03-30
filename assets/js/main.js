// Header scroll effect
document.addEventListener('DOMContentLoaded', function() {
    // Initial element queries
    const header = document.querySelector('.header');
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Initialize mobile menu handling
    initMobileMenu();
    
    // Initialize pricing toggle if it exists
    initPricingToggle();
    
    // Initialize contact form validation
    initContactForm();
    
    // Periodically check if elements are loaded via HTML imports
    let checkInterval = setInterval(function() {
        if (document.querySelector('.navigation') && document.querySelector('.mobile-menu-toggle')) {
            initMobileMenu();
            clearInterval(checkInterval);
        }
    }, 100);
    
    // Function to initialize mobile menu
    function initMobileMenu() {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const navigation = document.querySelector('.navigation');
        const navLinks = document.querySelectorAll('.nav-link');
        const menuOverlay = document.querySelector('.menu-overlay');
        const sidebarClose = document.querySelector('.sidebar-close');
        
        if (!mobileMenuToggle || !navigation) return;
        
        // Add index for staggered animation of nav links
        navLinks.forEach((link, index) => {
            link.style.setProperty('--item-index', index);
        });
        
        // Mobile menu toggle with better event handling
        mobileMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMobileMenu(!navigation.classList.contains('active'));
        });
        
        // Close button inside sidebar
        if (sidebarClose) {
            sidebarClose.addEventListener('click', function() {
                toggleMobileMenu(false);
            });
        }
        
        // Close menu when clicking the overlay
        if (menuOverlay) {
            menuOverlay.addEventListener('click', function() {
                toggleMobileMenu(false);
            });
        }
        
        // Improved nav links click handler
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Don't immediately close the menu to allow the click to register
                setTimeout(() => {
                    toggleMobileMenu(false);
                }, 300);
            });
        });
        
        // Close menu when escape key is pressed
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navigation.classList.contains('active')) {
                toggleMobileMenu(false);
            }
        });
        
        // Toggle mobile menu function
        function toggleMobileMenu(open) {
            if (open) {
                navigation.classList.add('active');
                mobileMenuToggle.classList.add('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'true');
                if (menuOverlay) menuOverlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            } else {
                navigation.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                if (menuOverlay) menuOverlay.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
            }
        }
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Adjust scroll position to account for floating header
                    const headerHeight = header ? header.offsetHeight : 0;
                    const headerMargin = header ? parseInt(window.getComputedStyle(header).getPropertyValue('top')) || 0 : 0;
                    const scrollMargin = headerHeight + headerMargin + 20;
                    
                    // Smoothly scroll to the target element
                    window.scrollTo({
                        top: targetElement.offsetTop - scrollMargin,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link
                    const navLinks = document.querySelectorAll('.nav-link');
                    navLinks.forEach(link => link.classList.remove('active'));
                    if (this.classList.contains('nav-link')) {
                        this.classList.add('active');
                    } else {
                        // If clicked from a button, find and activate corresponding nav link
                        const correspondingNavLink = document.querySelector(`.nav-link[href="${targetId}"]`);
                        if (correspondingNavLink) {
                            correspondingNavLink.classList.add('active');
                        }
                    }
                    
                    // Close mobile menu if open
                    const navigation = document.querySelector('.navigation');
                    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
                    const menuOverlay = document.querySelector('.menu-overlay');
                    
                    if (navigation && navigation.classList.contains('active')) {
                        navigation.classList.remove('active');
                        if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
                        if (menuOverlay) menuOverlay.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                }
            });
        });
        
        // Highlight active section while scrolling
        window.addEventListener('scroll', function() {
            let current = '';
            const sections = document.querySelectorAll('section');
            const headerHeight = header.offsetHeight;
            const headerMargin = parseInt(window.getComputedStyle(header).getPropertyValue('top'));
            const scrollOffset = headerHeight + headerMargin + 20;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                
                if (window.scrollY >= (sectionTop - scrollOffset)) {
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
    
    function initPricingToggle() {
        const pricingSwitch = document.getElementById('pricing-switch');
        if (!pricingSwitch) return;
        
        pricingSwitch.addEventListener('change', function() {
            const monthlyPrices = document.querySelectorAll('.price.monthly');
            const yearlyPrices = document.querySelectorAll('.price.yearly');
            
            if (this.checked) {
                // Yearly pricing
                monthlyPrices.forEach(price => price.classList.add('hide'));
                yearlyPrices.forEach(price => price.classList.remove('hide'));
            } else {
                // Monthly pricing
                monthlyPrices.forEach(price => price.classList.remove('hide'));
                yearlyPrices.forEach(price => price.classList.add('hide'));
            }
        });
    }
    
    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', function(e) {
            let valid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            // Simple validation
            if (name.value.trim() === '') {
                showError(name, 'Name is required');
                valid = false;
            } else {
                removeError(name);
            }
            
            if (email.value.trim() === '') {
                showError(email, 'Email is required');
                valid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email');
                valid = false;
            } else {
                removeError(email);
            }
            
            if (message.value.trim() === '') {
                showError(message, 'Message is required');
                valid = false;
            } else {
                removeError(message);
            }
            
            if (!valid) {
                e.preventDefault();
            }
        });
        
        // Helper functions
        function showError(input, message) {
            const formGroup = input.parentElement;
            const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
            
            errorElement.className = 'error-message';
            errorElement.textContent = message;
            
            if (!formGroup.querySelector('.error-message')) {
                formGroup.appendChild(errorElement);
            }
            
            input.classList.add('input-error');
        }
        
        function removeError(input) {
            const formGroup = input.parentElement;
            const errorElement = formGroup.querySelector('.error-message');
            
            if (errorElement) {
                formGroup.removeChild(errorElement);
            }
            
            input.classList.remove('input-error');
        }
        
        function isValidEmail(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        }
    }
});
