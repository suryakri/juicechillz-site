// ===== JUICE CHILLZ - MAIN JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // ===== MOBILE MENU TOGGLE =====
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
    
    // ===== ACTIVE PAGE HIGHLIGHT =====
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinkItems = document.querySelectorAll('.nav-links a');
    
    navLinkItems.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // ===== PARALLAX EFFECT =====
    const parallaxBg = document.querySelector('.parallax-bg');
    
    if (parallaxBg) {
        let ticking = false;
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    const scrolled = window.pageYOffset;
                    parallaxBg.style.transform = `translateY(${scrolled * 0.5}px)`;
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        // Mouse move parallax
        document.addEventListener('mousemove', function(e) {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    const x = (e.clientX / window.innerWidth - 0.5) * 20;
                    const y = (e.clientY / window.innerHeight - 0.5) * 20;
                    parallaxBg.style.transform = `translate(${x}px, ${y}px)`;
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    // ===== SCROLL FADE-IN ANIMATIONS =====
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const fadeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
    
    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ===== BUTTON ANIMATIONS =====
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // ===== CARD HOVER EFFECTS =====
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // ===== FLOATING ANIMATION FOR BLOBS =====
    const blobs = document.querySelectorAll('.bg-blob');
    
    blobs.forEach((blob, index) => {
        const randomDelay = Math.random() * 5;
        const randomDuration = 15 + Math.random() * 10;
        blob.style.animationDelay = `${randomDelay}s`;
        blob.style.animationDuration = `${randomDuration}s`;
    });
    
    // ===== PREFERS REDUCED MOTION =====
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        // Disable animations for users who prefer reduced motion
        document.querySelectorAll('*').forEach(el => {
            el.style.animation = 'none';
            el.style.transition = 'none';
        });
    }
    
    // ===== LAZY LOAD IMAGES (if any) =====
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // ===== PERFORMANCE OPTIMIZATION =====
    // Debounce function for scroll/resize events
    function debounce(func, wait = 20, immediate = true) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    
    // Add staggered animation delays to grid items
    const gridItems = document.querySelectorAll('.features-grid .card, .menu-grid .card, .contact-grid .card');
    gridItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });
    
    console.log('🧃 Juice Chillz - Website Loaded Successfully!');
});

// ===== WHATSAPP LINK HELPER =====
function openWhatsApp() {
    const phone = '919995552309';
    const message = encodeURIComponent('Hi Juice Chillz! I want to order.');
    const url = `https://wa.me/${phone}?text=${message}`;
    window.open(url, '_blank');
}

// ===== CALL LINK HELPER =====
function callNow() {
    window.location.href = 'tel:+919995552309';
}
