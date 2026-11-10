// =========================================
// Gnerdywonder Landing Page Interactivity
// =========================================

document.addEventListener('DOMContentLoaded', function() {

    // Mobile navbar toggle
    const navbarToggler = document.getElementById('navbarToggler');
    const navbarNav = document.getElementById('navbarNav');

    if (navbarToggler && navbarNav) {
        navbarToggler.addEventListener('click', function() {
            navbarNav.classList.toggle('show');
        });

        document.querySelectorAll('.nav-link').forEach(function(link) {
            link.addEventListener('click', function() {
                navbarNav.classList.remove('show');
            });
        });
    }

    // FAQ accordion
    document.querySelectorAll('.faq-question').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const item = this.parentElement;
            const isActive = item.classList.contains('active');

            document.querySelectorAll('.faq-item').forEach(function(faq) {
                faq.classList.remove('active');
            });

            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Pricing toggle (monthly/yearly)
    const toggleInput = document.getElementById('pricingToggle');
    if (toggleInput) {
        toggleInput.addEventListener('change', function() {
            const isYearly = this.checked;
            document.querySelectorAll('.plan-price').forEach(function(priceEl) {
                const monthly = priceEl.getAttribute('data-monthly');
                const yearly = priceEl.getAttribute('data-yearly');
                const currency = priceEl.getAttribute('data-currency') || 'GHS';
                const period = priceEl.getAttribute('data-period') || '/year';

                if (isYearly && yearly) {
                    priceEl.querySelector('.amount').textContent = yearly;
                    priceEl.querySelector('.period').textContent = '/year';
                } else if (monthly) {
                    priceEl.querySelector('.amount').textContent = monthly;
                    priceEl.querySelector('.period').textContent = '/month';
                }
            });
        });
    }

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Active nav link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(function(section) {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                document.querySelectorAll('.nav-link').forEach(function(link) {
                    link.classList.remove('active');
                });
                const activeLink = document.querySelector('.nav-link[href="#' + id + '"]');
                if (activeLink) activeLink.classList.add('active');
            }
        });
    });

    // Initialize countdown timer
    initCountdown();

    // Plan card click handlers
    document.querySelectorAll('.btn-buy').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const card = this.closest('.pricing-card');
            if (!card) return;

            const planName = card.querySelector('.plan-name').textContent.trim().toLowerCase();
            let planKey = '';

            if (planName.includes('basic')) planKey = 'basic';
            else if (planName.includes('advanced')) planKey = 'advanced';
            else if (planName.includes('perpetual')) planKey = 'perpetual';

            if (planKey) {
                window.location.href = 'buy.html?plan=' + planKey;
            }
        });
    });
});

// =========================================
// Countdown Timer (Discount Banner)
// =========================================
function initCountdown() {
    const countdownEl = document.querySelector('.countdown');
    if (!countdownEl) return;

    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);

    const daysEl = countdownEl.querySelector('.days .value');
    const hoursEl = countdownEl.querySelector('.hours .value');
    const minutesEl = countdownEl.querySelector('.minutes .value');
    const secondsEl = countdownEl.querySelector('.seconds .value');

    function update() {
        const now = new Date().getTime();
        const distance = endDate - now;

        if (distance < 0) {
            clearInterval(timer);
            if (daysEl) daysEl.textContent = '00';
            if (hoursEl) hoursEl.textContent = '00';
            if (minutesEl) minutesEl.textContent = '00';
            if (secondsEl) secondsEl.textContent = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60 * 1000)) / 1000);

        if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
    }

    update();
    const timer = setInterval(update, 1000);
}