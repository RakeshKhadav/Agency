// Header scroll effect
document.addEventListener('DOMContentLoaded', function() {
    // Initial element queries
    const header = document.querySelector('.header');
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    });
    
    // Initialize mobile menu handling
    initMobileMenu();
    
    // Initialize pricing toggle if it exists
    initPricingToggle();
    
    // Initialize contact form validation
    initContactForm();
    
    // Initialize portfolio filtering
    initPortfolioFilter();
    
    // Initialize blog modal functionality - ONLY call this once
    initBlogModal();
    
    // Periodically check if elements are loaded via HTML imports
    let checkInterval = setInterval(function() {
        if (document.querySelector('.navigation') && document.querySelector('.mobile-menu-toggle')) {
            initMobileMenu();
            clearInterval(checkInterval);
        }
    }, 100);
    
    // Remove this duplicate call to setupBlogModal
    // setupBlogModal();
    
    // Also check if blog elements are loaded
    let blogCheckInterval = setInterval(function() {
        if (document.querySelectorAll('.blog-link').length > 0 && document.getElementById('blogModal')) {
            console.log('Blog elements detected, initializing modal');
            initBlogModal();
            clearInterval(blogCheckInterval);
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
            // Skip processing for blog-link class
            if (anchor.classList.contains('blog-link')) {
                return;
            }
            
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
        const sections = document.querySelectorAll('section[id]');
        if (sections.length > 0) {
            window.addEventListener('scroll', function() {
                let current = '';
                const headerHeight = header ? header.offsetHeight : 0;
                const headerMargin = header ? parseInt(window.getComputedStyle(header).getPropertyValue('top')) || 0 : 0;
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
    
    function initPortfolioFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        if (!filterButtons.length || !portfolioItems.length) return;
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to current button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter items
                portfolioItems.forEach(item => {
                    const categories = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || categories.includes(filterValue)) {
                        item.classList.remove('hide');
                        item.classList.add('show');
                    } else {
                        item.classList.remove('show');
                        item.classList.add('hide');
                    }
                });
            });
        });
    }
    
    // Function to initialize blog modal
    function initBlogModal() {
        console.log('Initializing blog modal');
        const blogLinks = document.querySelectorAll('.blog-link');
        const blogModal = document.getElementById('blogModal');
        
        if (!blogLinks.length || !blogModal) {
            console.log('Blog links or modal not found, will try again later');
            return;
        }
        
        console.log(`Found ${blogLinks.length} blog links and modal`);
        
        // Remove any existing event listeners by cloning and replacing elements
        blogLinks.forEach(link => {
            const newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);
            
            // Add click event listener to the new link
            newLink.addEventListener('click', function(e) {
                console.log('Blog link clicked');
                e.preventDefault();
                e.stopPropagation();
                
                // Get blog data
                const blogCard = this.closest('.blog-card');
                const category = blogCard.querySelector('.blog-category').textContent;
                const title = blogCard.querySelector('.blog-title').textContent.replace(/2023/g, '2025'); // Replace 2023 with 2025 in titles
                // const date = blogCard.querySelector('.blog-date').innerHTML; // Remove date
                const author = blogCard.querySelector('.blog-author').innerHTML;
                const imageSrc = blogCard.querySelector('.blog-image img').src;
                
                console.log('Opening blog:', title);
                
                // Fill modal with content
                const modalCategory = blogModal.querySelector('.modal-category');
                const modalTitle = blogModal.querySelector('.modal-title');
                const modalDate = blogModal.querySelector('.modal-date');
                const modalAuthor = blogModal.querySelector('.modal-author');
                const modalImage = blogModal.querySelector('.modal-featured-image img');
                const modalText = blogModal.querySelector('.modal-text');
                
                if (modalCategory) modalCategory.textContent = category;
                if (modalTitle) modalTitle.textContent = title;
                if (modalDate) modalDate.style.display = 'none'; // Hide date element
                if (modalAuthor) modalAuthor.innerHTML = author;
                if (modalImage) {
                    modalImage.src = imageSrc;
                    modalImage.alt = title;
                }
                
                // Get content based on title
                if (modalText) {
                    // Use the existing content database with updated years
                    const blogContent = {
                        "5 UX Design Trends That Will Dominate in 2025": {
                            content: `
                                <p>The world of UX design is constantly evolving, with new trends and techniques emerging each year. As we move through 2025, several key trends are shaping how users interact with digital interfaces across websites and applications.</p>
                                
                                <h3>1. Advanced 3D Elements</h3>
                                <p>3D design elements are becoming increasingly popular, allowing designers to create more immersive and engaging user experiences. With improvements in technology and browser capabilities, incorporating 3D elements is more accessible than ever, adding depth and interactivity to otherwise flat interfaces.</p>
                                
                                <h3>2. Voice User Interfaces (VUI)</h3>
                                <p>Voice-controlled interfaces continue to gain traction, with more users relying on voice commands to navigate websites and applications. Designers are now focusing on creating seamless voice interactions that complement traditional visual interfaces, making digital products more accessible and convenient.</p>
                                
                                <h3>3. Micro-interactions</h3>
                                <p>These subtle animations and feedback elements greatly enhance user experience by providing visual cues and making interfaces feel more responsive. From button state changes to loading animations, micro-interactions add personality to digital products while guiding users through their journey.</p>
                                
                                <h3>4. Dark Mode as Standard</h3>
                                <p>Dark mode has evolved from a trend to an expected feature. Users appreciate the reduced eye strain, especially in low-light conditions, as well as the potential battery savings on OLED screens. Designing for both light and dark modes is now considered best practice.</p>
                                
                                <h3>5. Augmented Reality Integration</h3>
                                <p>AR experiences are becoming more common in everyday applications, particularly in e-commerce and education. Users can now visualize products in their space before purchasing or interact with educational content in new, immersive ways.</p>
                            `
                        },
                        "How Core Web Vitals Affect Your SEO Rankings": {
                            content: `
                                <p>Google's Core Web Vitals have become essential metrics for website owners and SEO professionals to monitor. These user-centric performance measurements directly impact search rankings and overall user experience.</p>
                                
                                <h3>Understanding Core Web Vitals</h3>
                                <p>Core Web Vitals consist of three specific measurements of user experience: Largest Contentful Paint (LCP), First Input Delay (FID), and Cumulative Layout Shift (CLS). Each metric evaluates a different aspect of page loading, interactivity, and visual stability.</p>
                                
                                <h3>Impact on Search Rankings</h3>
                                <p>Since Google's Page Experience update in 2025, Core Web Vitals have become official ranking factors. Websites that meet the recommended thresholds for all three metrics are more likely to rank higher in search results, potentially gaining a competitive edge over similar content that performs poorly.</p>
                                
                                <h3>Improving Your Core Web Vitals</h3>
                                <p>To enhance your website's performance scores, consider implementing these strategies:</p>
                                <ul>
                                    <li>Optimize image sizing and formats to improve loading speed</li>
                                    <li>Minimize or defer non-critical JavaScript</li>
                                    <li>Implement proper dimension attributes for images and embed elements</li>
                                    <li>Leverage browser caching and CDN services</li>
                                    <li>Reduce server response times</li>
                                </ul>
                                
                                <h3>Measuring Your Performance</h3>
                                <p>Tools like Google PageSpeed Insights, Lighthouse, and the Core Web Vitals report in Google Search Console provide valuable insights into your website's performance. Regular monitoring helps identify issues that need addressing before they significantly impact your rankings.</p>
                            `
                        },
                        "Creating Engaging Mobile Experiences That Convert": {
                            content: `
                                <p>With mobile traffic continuing to dominate internet usage in 2025, designing effective mobile experiences has never been more crucial. A well-designed mobile interface not only engages users but also drives meaningful conversions for your business.</p>
                                
                                <h3>Prioritize Speed and Performance</h3>
                                <p>Mobile users expect instant results. Even a one-second delay in page load time can significantly impact conversion rates. Optimize images, leverage browser caching, and implement lazy loading to ensure your mobile experience is lightning-fast.</p>
                                
                                <h3>Design for Thumb-Friendly Navigation</h3>
                                <p>Consider how users physically interact with their devices. Place important navigation elements and call-to-action buttons within easy reach of thumbs. The most accessible areas are in the center and bottom portions of the screen.</p>
                                
                                <h3>Simplify Forms and Checkout Processes</h3>
                                <p>Long, complicated forms are conversion killers on mobile devices. Minimize form fields, use appropriate input types (like number pads for phone numbers), and offer alternative payment methods like digital wallets to streamline the conversion process.</p>
                                
                                <h3>Implement Persuasive Micro-Interactions</h3>
                                <p>Subtle animations and feedback mechanisms can guide users toward desired actions. From progress indicators to satisfying button animations, these small details create engaging experiences that encourage users to complete conversion paths.</p>
                                
                                <h3>Optimize for Different Screen Sizes</h3>
                                <p>Mobile devices come in countless screen dimensions. Ensure your design responds appropriately to different sizes while maintaining critical elements' visibility and functionality, especially conversion-focused components like add-to-cart buttons.</p>
                            `
                        },
                        "7 Essential Features Every E-commerce Website Should Have": {
                            content: `
                                <p>In today's competitive online marketplace of 2025, having a well-designed e-commerce website with the right features can significantly impact your business success. Here are seven essential features that every e-commerce site should implement:</p>
                                
                                <h3>1. Advanced Product Filtering</h3>
                                <p>Help customers find exactly what they're looking for with robust filtering options. Allow sorting by price, popularity, ratings, and product-specific attributes. Faceted navigation enables users to narrow down options quickly, reducing frustration and abandoned searches.</p>
                                
                                <h3>2. High-Quality Product Images</h3>
                                <p>Since customers can't physically examine products, provide multiple high-resolution images from different angles. Zoom functionality, 360-degree views, and videos further enhance the shopping experience by giving customers a comprehensive look at what they're purchasing.</p>
                                
                                <h3>3. Transparent Pricing and Shipping Information</h3>
                                <p>Hidden costs are one of the leading causes of cart abandonment. Display all costs upfront, including taxes and shipping fees. Offering a shipping calculator early in the shopping process builds trust and reduces checkout surprises.</p>
                                
                                <h3>4. Customer Reviews and Ratings</h3>
                                <p>Social proof is powerful in influencing purchase decisions. Implement a robust review system that allows customers to share their experiences and rate products. Consider including features like verified purchase badges and the ability to upload photos of products in use.</p>
                                
                                <h3>5. Streamlined Checkout Process</h3>
                                <p>A complicated checkout process leads to abandoned carts. Simplify yours by reducing the number of steps, offering guest checkout, and providing multiple payment options. Progress indicators help customers understand where they are in the process.</p>
                                
                                <h3>6. Mobile-Optimized Shopping Experience</h3>
                                <p>With more than half of e-commerce traffic coming from mobile devices in 2025, your site must provide an exceptional mobile shopping experience with easy navigation, appropriately sized buttons, and simplified forms.</p>
                                
                                <h3>7. Related Products and Recommendations</h3>
                                <p>Increase average order value by intelligently suggesting complementary or alternative products based on browsing history and purchase patterns. Well-implemented recommendation engines can significantly boost revenue while improving the shopping experience.</p>
                            `
                        },
                        "The Rise of Jamstack: Why Modern Websites Are Going Headless": {
                            content: `
                                <p>The Jamstack architecture has emerged as a revolutionary approach to web development, offering significant advantages over traditional monolithic systems. This modern web architecture is changing how developers build and deploy websites and applications.</p>
                                
                                <h3>What is Jamstack?</h3>
                                <p>Jamstack stands for JavaScript, APIs, and Markup. It's an architecture that decouples the frontend from the backend, with pre-rendered content served directly from a CDN, and dynamic functionality handled through API calls. This separation creates more flexible, scalable, and secure websites.</p>
                                
                                <h3>Performance Benefits</h3>
                                <p>By serving pre-rendered files over a CDN, Jamstack sites achieve incredibly fast loading times. There's no server-side rendering or database queries needed for each request, which dramatically reduces Time to First Byte (TTFB) and improves Core Web Vitals scores.</p>
                                
                                <h3>Enhanced Security</h3>
                                <p>With no direct connection between the frontend and the database or backend systems, Jamstack sites present a smaller attack surface. The decoupled nature means fewer vulnerabilities and reduced risk of database breaches or server-side exploits.</p>
                                
                                <h3>Better Developer Experience</h3>
                                <p>Developers enjoy working with Jamstack because it allows them to use their preferred frameworks and tools. The clear separation of concerns makes codebases more maintainable, and the ability to use version control for the entire site improves collaboration.</p>
                                
                                <h3>Scalability Without Complexity</h3>
                                <p>Traditional sites often require complex scaling solutions as traffic grows. Jamstack sites, served entirely from CDNs, scale automatically to handle virtually any traffic level without additional configuration or infrastructure concerns.</p>
                            `
                        },
                        "Effective Social Media Strategies for Small Businesses in 2025": {
                            content: `
                                <p>For small businesses with limited resources in 2025, creating an effective social media strategy is about working smarter, not harder. By focusing on the right platforms, content, and engagement tactics, even businesses with modest budgets can achieve significant results.</p>
                                
                                <h3>Focus on Platform Selection</h3>
                                <p>Rather than trying to maintain a presence on every social platform, small businesses should identify where their target audience is most active. For B2B companies, LinkedIn and Twitter often provide the best ROI, while visual brands might focus on Instagram and Pinterest. Research your audience demographics and platform usage patterns before investing your resources.</p>
                                
                                <h3>Content Strategy: Quality Over Quantity</h3>
                                <p>Consistency matters more than volume. Develop a realistic posting schedule that you can maintain, focusing on high-quality, valuable content rather than frequency. Create a content calendar that incorporates different content types—educational posts, behind-the-scenes glimpses, customer spotlights, and promotional content—to keep your audience engaged.</p>
                                
                                <h3>Leverage User-Generated Content</h3>
                                <p>Encourage customers to share their experiences with your products or services. User-generated content not only provides authentic social proof but also helps fill your content calendar without requiring extensive resources. Create branded hashtags and consider running contests that incentivize customers to share their stories.</p>
                                
                                <h3>Invest in Community Building</h3>
                                <p>Social media isn't just a broadcasting platform—it's an opportunity to build relationships. Allocate time for engaging with your audience through comments, messages, and shares. This community-building approach often yields better results than purely promotional strategies and helps develop brand loyalty.</p>
                                
                                <h3>Optimize with Analytics</h3>
                                <p>Use platform analytics to understand what's working and what isn't. Track engagement metrics, click-through rates, and conversions to refine your approach over time. Small businesses can't afford to waste resources on ineffective strategies, so let data guide your decisions.</p>
                            `
                        }
                    };
                    
                    // Get the updated title key (with 2025)
                    const contentKey = Object.keys(blogContent).find(key => 
                        key.toLowerCase().includes(title.toLowerCase().replace('2023', '2025')));
                    
                    modalText.innerHTML = contentKey && blogContent[contentKey] ? 
                        blogContent[contentKey].content : 
                        `<p>Full article content for "${title}" is coming soon. Stay tuned for the complete post!</p>`;
                }
                
                // Create a backdrop element with proper z-index
                if (!document.querySelector('.modal-backdrop-element')) {
                    const backdrop = document.createElement('div');
                    backdrop.className = 'modal-backdrop-element';
                    // Insert backdrop as the first child of body so it's behind other elements
                    document.body.insertBefore(backdrop, document.body.firstChild);
                }
                
                // Add modal-open to body to prevent scrolling
                document.body.classList.add('modal-open');
                
                // Show the modal
                blogModal.classList.add('active');
                
                return false; // Prevent any other handlers from executing
            });
        });
        
        // Set up closing functionality
        const modalClose = blogModal.querySelector('.blog-modal-close');
        if (modalClose) {
            const newClose = modalClose.cloneNode(true);
            modalClose.parentNode.replaceChild(newClose, modalClose);
            
            newClose.addEventListener('click', function() {
                console.log('Closing modal via close button');
                closeModal();
            });
        }
        
        // Close modal when clicking outside
        blogModal.addEventListener('click', function(e) {
            if (e.target === blogModal) {
                console.log('Closing modal via outside click');
                closeModal();
            }
        });
        
        // Close with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && blogModal.classList.contains('active')) {
                closeModal();
            }
        });
        
        function closeModal() {
            blogModal.classList.remove('active');
            
            setTimeout(() => {
                // Remove body class
                document.body.classList.remove('modal-open');
                
                // Remove backdrop element
                const backdrop = document.querySelector('.modal-backdrop-element');
                if (backdrop) {
                    backdrop.remove();
                }
            }, 300);
        }
        
        console.log('Blog modal initialization complete');
    }
    
});
