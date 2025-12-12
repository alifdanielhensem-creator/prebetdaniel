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

    if(mobileBtn) mobileBtn.addEventListener('click', toggleMenu);
    if(closeBtn) closeBtn.addEventListener('click', toggleMenu);
    if(overlay) overlay.addEventListener('click', toggleMenu);
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // 3. FUNGSI PENGESAN IOS (IPHONE/IPAD)
    function isIOS() {
        return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    }

    // Modal Variables
    const iosModal = document.getElementById('ios-modal');
    window.closeModal = function() {
        iosModal.classList.remove('active');
    }

    // 4. LOGIK TEMPAHAN
    const form = document.getElementById('bookingForm');
    
    if(form) {
        const submitBtn = form.querySelector('button[type="submit"]');

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // A. CEK JIKA PENGGUNA ADALAH IOS
            if (isIOS()) {
                // Jika iPhone, JANGAN auto redirect. Tunjuk Modal Warning/Sorry
                iosModal.classList.add('active');
                return; // Berhenti di sini
            }

            // B. JIKA ANDROID / PC - TERUSKAN AUTO BOOKING
            const pickup = document.getElementById('pickup').value;
            const destination = document.getElementById('destination').value;
            const time = document.getElementById('time').value;
            const pax = document.getElementById('pax').value;

            // Ubah Button Text
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...';
            submitBtn.style.opacity = '0.8';

            setTimeout(() => {
                const phoneNumber = '60189490784'; 
                const message = `Salam Daniel, saya pengguna Android nak book ride:

📍 *Lokasi Ambil:* ${pickup}
🏁 *Destinasi:* ${destination}
🕒 *Masa:* ${time}
👥 *Pax:* ${pax}

Available tak?`;

                const encodedMessage = encodeURIComponent(message);
                const waUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

                window.open(waUrl, '_blank');

                submitBtn.innerHTML = originalText;
                submitBtn.style.opacity = '1';
                form.reset();
            }, 1000);
        });
    }

    // 5. Smooth Scroll
    const sections = document.querySelectorAll('section, aside, div[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
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
