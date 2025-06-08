// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks_mobile = document.querySelector('.nav-links');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks_mobile.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Navbar background on scroll
    const nav = document.querySelector('.nav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe sections for animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Observe timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        observer.observe(item);
    });

    // Observe cards
    const cards = document.querySelectorAll('.mentorship-card, .skill-category');
    cards.forEach(card => {
        observer.observe(card);
    });

    // Typing effect for hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Dynamic stats counter
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            
            if (element.textContent.includes('IDR')) {
                element.textContent = `IDR ${value}${element.textContent.includes('T') ? 'T' : 'B'}+`;
            } else {
                element.textContent = `${value}+`;
            }
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Animate stats when in view
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    if (text.includes('6+')) {
                        animateValue(stat, 0, 6, 2000);
                    } else if (text.includes('100+')) {
                        animateValue(stat, 0, 100, 2000);
                    } else if (text.includes('IDR 8T+')) {
                        animateValue(stat, 0, 8, 2000);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroCard = document.querySelector('.hero-card');
        
        if (heroCard && scrolled < window.innerHeight) {
            heroCard.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // Add hover effects to skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add floating animation to hero card and profile
    function floatingAnimation() {
        const heroCard = document.querySelector('.hero-card');
        const profileImage = document.querySelector('.profile-image');
        
        if (heroCard) {
            heroCard.style.animation = 'floating 6s ease-in-out infinite';
        }
        
        if (profileImage) {
            profileImage.style.animation = 'floatingProfile 8s ease-in-out infinite';
        }
    }

    // Add CSS for floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floating {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        
        @keyframes floatingProfile {
            0%, 100% { transform: translateY(0px) scale(1); }
            50% { transform: translateY(-8px) scale(1.02); }
        }
        
        .nav.scrolled {
            background: rgba(15, 23, 42, 0.95);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.15);
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
            transition: all 0.8s ease;
        }
        
        section {
            opacity: 0;
            transform: translateY(30px);
        }
        
        .timeline-item {
            opacity: 0;
            transform: translateX(-30px);
            transition: all 0.6s ease;
        }
        
        .timeline-item.animate-in {
            opacity: 1;
            transform: translateX(0);
        }
        
        .mentorship-card, .skill-category {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .mentorship-card.animate-in, .skill-category.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        @media (max-width: 768px) {
            .nav-links.active {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: calc(100% + 10px);
                left: 0;
                right: 0;
                background: rgba(15, 23, 42, 0.95);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 16px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                padding: 20px;
                gap: 16px;
            }
            
            .nav-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .nav-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .nav-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
        }
    `;
    document.head.appendChild(style);

    // Initialize floating animation
    setTimeout(floatingAnimation, 1000);

    // Theme color meta tag for mobile browsers
    const themeColor = document.createElement('meta');
    themeColor.name = 'theme-color';
    themeColor.content = '#667eea';
    document.head.appendChild(themeColor);

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Tab functionality for mentorship section
    function initializeTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabPanels = document.querySelectorAll('.tab-panel');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                
                // Remove active class from all buttons and panels
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanels.forEach(panel => panel.classList.remove('active'));
                
                // Add active class to clicked button and corresponding panel
                button.classList.add('active');
                const targetPanel = document.getElementById(targetTab);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
            });
        });
    }

    // Initialize tabs
    initializeTabs();

    // Portfolio navigation functionality
    function initializePortfolio() {
        const navItems = document.querySelectorAll('.portfolio-sidebar .nav-item');
        const contentPanels = document.querySelectorAll('.content-panel');
        const searchInput = document.querySelector('.search-input');
        
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const targetCategory = item.getAttribute('data-category');
                
                // Remove active class from all nav items and panels
                navItems.forEach(nav => nav.classList.remove('active'));
                contentPanels.forEach(panel => panel.classList.remove('active'));
                
                // Add active class to clicked nav item and corresponding panel
                item.classList.add('active');
                const targetPanel = document.getElementById(targetCategory);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
            });
        });
        
        // Search functionality
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                const projectCards = document.querySelectorAll('.project-card');
                
                projectCards.forEach(card => {
                    const title = card.querySelector('h4').textContent.toLowerCase();
                    const description = card.querySelector('p').textContent.toLowerCase();
                    const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
                    
                    const isMatch = title.includes(searchTerm) || 
                                   description.includes(searchTerm) || 
                                   tags.some(tag => tag.includes(searchTerm));
                    
                    card.style.display = isMatch ? 'block' : 'none';
                });
            });
        }
    }

    // Initialize portfolio
    initializePortfolio();
}); 