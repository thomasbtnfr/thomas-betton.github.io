/**
 * Portfolio Website JavaScript
 * Gère les fonctionnalités interactives du site
 */

// Theme toggle functionality
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        themeIcon.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeIcon.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    }
}

function toggleExperienceDetails(button) {
    const experienceItem = button.closest('.experience-item');
    const extendedContent = experienceItem.querySelector('.experience-extended');
    
    if (extendedContent.classList.contains('expanded')) {
        extendedContent.classList.remove('expanded');
        button.textContent = 'See more';
    } else {
        extendedContent.classList.add('expanded');
        button.textContent = 'See less';
    }
}

// Load saved theme
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeIcon = document.getElementById('theme-icon');
    
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        themeIcon.textContent = '☀️';
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Navigation highlight on scroll
function initNavigationHighlight() {
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Subtle parallax effect for hero section
function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        const heroHeight = hero ? hero.offsetHeight : 0;
        
        // Effet parallaxe très subtil qui ne cause pas de chevauchement
        if (hero && heroContent && scrolled < heroHeight) {
            // Valeurs beaucoup plus petites pour éviter le chevauchement
            const parallaxValue = scrolled * 0.1;
            const contentParallaxValue = scrolled * 0.05;
            
            hero.style.transform = `translateY(${parallaxValue}px)`;
            heroContent.style.transform = `translateY(${contentParallaxValue}px)`;
        }
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    initSmoothScrolling();
    initScrollAnimations();
    initNavigationHighlight();
    initParallaxEffect();
});

// Additional utility functions
const Utils = {
    // Debounce function for performance optimization
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Get scroll percentage
    getScrollPercentage: () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        return (scrollTop / scrollHeight) * 100;
    }
};

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Utils, toggleTheme };
}

function showLastUpdate(elementId) {
  const date = new Date(document.lastModified);
  const formatted = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long"
  });
  const el = document.getElementById(elementId);
  if (el) {
    el.textContent = "Last update: " + formatted;
  }
}