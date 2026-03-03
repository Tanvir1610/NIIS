/**
 * NIIS 2026 - Shared JavaScript Utilities
 * Used across all pages for common functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    // ===== Sticky Header =====
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    });

    // ===== Mobile Menu Toggle =====
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            updateMenuIcon();
        });

        // Close menu when clicking on a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                updateMenuIcon();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!header.contains(e.target)) {
                navMenu.classList.remove('active');
                updateMenuIcon();
            }
        });
    }

    function updateMenuIcon() {
        const icon = menuToggle?.querySelector('i');
        if (navMenu?.classList.contains('active')) {
            icon?.classList.remove('fa-bars');
            icon?.classList.add('fa-times');
        } else {
            icon?.classList.remove('fa-times');
            icon?.classList.add('fa-bars');
        }
    }

    // ===== Modal Functionality =====
    window.openModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeModal = (modalId) => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(modal => {
                modal.classList.remove('active');
            });
            document.body.style.overflow = '';
        }
    });

    // Close modal when clicking on close button
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close modal when clicking on backdrop
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // ===== Countdown Timer =====
    function initCountdown() {
        const countdownElement = document.getElementById('countdown');
        if (!countdownElement) return;

        const conferenceDate = new Date('2026-12-15T00:00:00').getTime();

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = conferenceDate - now;

            if (distance < 0) {
                countdownElement.innerHTML = '<span>Conference is Live!</span>';
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            countdownElement.innerHTML = `
                <div style="text-align: center;">
                    <div style="font-size: 2rem; font-weight: 700; display: flex; gap: 1rem; justify-content: center;">
                        <span>${String(days).padStart(2, '0')}</span>
                        <span>:</span>
                        <span>${String(hours).padStart(2, '0')}</span>
                        <span>:</span>
                        <span>${String(minutes).padStart(2, '0')}</span>
                        <span>:</span>
                        <span>${String(seconds).padStart(2, '0')}</span>
                    </div>
                    <div style="font-size: 0.75rem; margin-top: 0.5rem; opacity: 0.8;">
                        Days : Hours : Minutes : Seconds
                    </div>
                </div>
            `;
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    initCountdown();

    // ===== Smooth Scroll for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ===== Add Active Class to Current Nav Link =====
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '/' && href === '/')) {
            link.classList.add('active');
        }
    });

    // ===== Intersection Observer for Fade-in Effects =====
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card, .topic-card, .glass-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
