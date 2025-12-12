document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Loading Screen Logic
    const loader = document.querySelector('.loader-container');
    setTimeout(() => {
        loader.classList.add('loader-hide');
    }, 1500);

    // 2. Mobile Menu Logic
    const mobileBtn = document.querySelector('.mobile-toggle');
    const closeBtn = document.querySelector('.close-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-links a');

    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        overlay.classList.toggle('active');
    }

    mobileBtn.addEventListener('click', toggleMenu);
    closeBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
    
    // Tutup menu bila link ditekan
    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // 3. Modal Success Logic
    const form = document.getElementById('bookingForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    const modal = document.getElementById('modal-success');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // UI Loading State
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...';
        submitBtn.style.opacity = '0.7';

        // Simulate sending (1.5 seconds)
        setTimeout(() => {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.style.opacity = '1';
            
            // Show Modal
            modal.classList.add('active');
            form.reset();
        }, 1500);
    });

    // Function to close modal (called by onclick in HTML)
    window.closeModal = function() {
        modal.classList.remove('active');
    }

    // 4. Smooth Scroll & Active Navbar State
    const sections = document.querySelectorAll('section, aside, div[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});
