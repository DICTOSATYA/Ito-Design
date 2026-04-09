/* ============================================
   JAVASCRIPT - INTERACTIVITY & ANIMATIONS
   ============================================ */

// ============================================
// 1. NAVBAR SCROLL EFFECT & AUTO HIDE
// ============================================

const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navbarMenu = document.querySelector('.navbar-menu');
const navLinks = document.querySelectorAll('.navbar-menu a');

let lastScrollTop = 0;

// Navbar scroll detection & auto hide
window.addEventListener('scroll', () => {
    let currentScroll = window.scrollY;
    
    // Hide navbar when scrolling down, show when scrolling up
    if (currentScroll > lastScrollTop && currentScroll > 200) {
        // Scrolling DOWN - hide navbar
        navbar.classList.add('hide');
    } else {
        // Scrolling UP - show navbar
        navbar.classList.remove('hide');
    }
    
    // Add scrolled class for background styling
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// ============================================
// 2. HAMBURGER MENU TOGGLE
// ============================================

hamburger.addEventListener('click', () => {
    navbarMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbarMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (event) => {
    if (!event.target.closest('.navbar-container')) {
        navbarMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ============================================
// 3. INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            // Optional: remove observer after animation
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all fade-in-on-scroll elements
document.querySelectorAll('.fade-in-on-scroll').forEach(element => {
    element.style.animationPlayState = 'paused';
    observer.observe(element);
});

// ============================================
// 4. GOOGLE FORM REDIRECT (No longer needed - form opens in new tab)
// ============================================
// Form link: https://docs.google.com/forms/d/1jUj-RqxRdTedetv3vOoLs7hSzXipnVn64OOkm6_MJws/viewform
// The button in HTML has a direct link with target="_blank"

// ============================================
// 5. SMOOTH SCROLLING
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if href is just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 70; // 70px for navbar height
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// 6. PARALLAX EFFECT (Optional Enhancement)
// ============================================

let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.scrollY;
            
            // Parallax for hero spheres
            const sphere1 = document.querySelector('.sphere-1');
            const sphere2 = document.querySelector('.sphere-2');
            
            if (sphere1) {
                sphere1.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
            if (sphere2) {
                sphere2.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
            
            ticking = false;
        });
        ticking = true;
    }
});

// ============================================
// 7. ANIMATE NUMBERS ON SCROLL (Optional)
// ============================================

function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.innerText = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// ============================================
// 8. PAGE LOAD ANIMATION
// ============================================

window.addEventListener('load', () => {
    // Add animation to hero elements
    document.querySelectorAll('.fade-in').forEach(element => {
        element.style.opacity = '1';
    });
});

// ============================================
// 9. ACTIVE LINK HIGHLIGHTING
// ============================================

const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ============================================
// 10. CONSOLE MESSAGE (Brand Message)
// ============================================

console.log('%c🎨 Welcome to ITO DESIGN 🎨', 'font-size: 20px; font-weight: bold; color: #0066FF; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);');
console.log('%cMembangun identitas visual yang kuat untuk masa depan bisnis Anda.', 'font-size: 14px; color: #00D4FF; font-style: italic;');
console.log('%cDesigned & Developed with ❤️', 'font-size: 12px; color: #666;');

// ============================================
// 11. PERFORMANCE OPTIMIZATION
// ============================================

// Throttle scroll events for better performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ============================================
// 12. DARK MODE TOGGLE (Optional Future Feature)
// ============================================

// Check for saved dark mode preference
const isDarkMode = localStorage.getItem('darkMode') === 'true';

if (isDarkMode) {
    document.body.classList.add('dark-mode');
}

// ============================================
// 13. REFRESH ANIMATIONS ON ORIENTATION CHANGE
// ============================================

window.addEventListener('orientationchange', () => {
    // Re-trigger animations on orientation change
    document.querySelectorAll('.fade-in-on-scroll').forEach(element => {
        element.style.animationPlayState = 'paused';
        setTimeout(() => {
            element.style.animationPlayState = 'running';
        }, 100);
    });
});

console.log('Script loaded successfully! ✅');
