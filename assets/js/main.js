document.addEventListener('DOMContentLoaded', () => {
    // ===== MOBILE NAVIGATION DRAWER =====
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const navLinks = document.querySelector('.nav-links');

    function openMobileNav() {
        if (!navLinks) return;
        navLinks.classList.add('mobile-open');
        if (mobileNavOverlay) mobileNavOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (mobileNavToggle) {
            mobileNavToggle.querySelector('i').className = 'fas fa-times';
        }
    }

    function closeMobileNav() {
        if (!navLinks) return;
        navLinks.classList.remove('mobile-open');
        if (mobileNavOverlay) mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = '';
        if (mobileNavToggle) {
            mobileNavToggle.querySelector('i').className = 'fas fa-bars';
        }
    }

    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (navLinks && navLinks.classList.contains('mobile-open')) {
                closeMobileNav();
            } else {
                openMobileNav();
            }
        });
    }

    if (mobileNavOverlay) {
        mobileNavOverlay.addEventListener('click', closeMobileNav);
    }

    if (navLinks) {
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                closeMobileNav();
            });
        });
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMobileNav();
        }
    });
    // ===== END MOBILE NAVIGATION DRAWER =====

    // ===== TYPING ANIMATION =====
    const typingText = document.querySelector('.hero p.typing-text');
    if (typingText) {
        const text = typingText.textContent;
        const words = text.split(' ');
        
        typingText.innerHTML = '';
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.className = 'typing-word';
            span.textContent = word;
            span.style.animationDelay = `${index * 0.15}s`;
            typingText.appendChild(span);
            
            if (index < words.length - 1) {
                typingText.appendChild(document.createTextNode(' '));
            }
        });
    }

    // ===== NAVBAR SCROLL EFFECT =====
    const siteHeader = document.querySelector('.site-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            siteHeader.classList.add('scrolled');
        } else {
            siteHeader.classList.remove('scrolled');
        }
    }, { passive: true });

    // ===== REVEAL ON SCROLL =====
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => observer.observe(el));

    // ===== ACTIVE NAV LINKS =====
    const navLinkElements = document.querySelectorAll('.nav-links a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        const scrollPos = window.scrollY + window.innerHeight / 3;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${id}"]`);
            if (!navLink) return;
            if (scrollPos >= top && scrollPos < top + height) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();

    // ===== PROMO BAR CLOSE =====
    window.closePromoBar = function() {
        const bar = document.getElementById('appPromoBar');
        if (!bar) return;
        bar.style.transition = 'max-height 0.35s ease, opacity 0.3s ease, padding 0.3s ease';
        bar.style.opacity = '0';
        bar.style.maxHeight = '0';
        bar.style.paddingTop = '0';
        bar.style.paddingBottom = '0';
        bar.style.overflow = 'hidden';
        setTimeout(() => bar.remove(), 350);
    };
});
