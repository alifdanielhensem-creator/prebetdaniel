document.addEventListener('DOMContentLoaded', () => {

    // 1. SCROLL ANIMATION (REVEAL)
    // Ini akan buat element muncul bila kita scroll ke bawah
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    });

    const hiddenElements = document.querySelectorAll('.scroll-anim');
    hiddenElements.forEach((el) => observer.observe(el));

    // 2. LOADER
    setTimeout(() => {
        document.querySelector('.loader-container').classList.add('loader-hide');
    }, 1200);

    // 3. MENU MOBILE
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
    mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

    // 4. LOGIK iOS & WHATSAPP
    function isIOS() {
        return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    }
    const iosModal = document.getElementById('ios-modal');
    window.closeModal = function() {
        iosModal.classList.remove('active');
    }

    const form = document.getElementById('bookingForm');
    if(form) {
        const submitBtn = form.querySelector('button[type="submit"]');

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Cek iOS
            if (isIOS()) {
                iosModal.classList.add('active');
                return;
            }

            // Android Logic
            const pickup = document.getElementById('pickup').value;
            const dest = document.getElementById('destination').value;
            const time = document.getElementById('time').value;
            const pax = document.getElementById('pax').value;

            // Loading Effect
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...';
            submitBtn.style.opacity = '0.8';

            setTimeout(() => {
                const phone = '60189490784';
                const msg = `Salam Daniel, pengguna Android nak tempah:\n\n📍 Lokasi: ${pickup}\n🏁 Destinasi: ${dest}\n🕒 Masa: ${time}\n👥 Pax: ${pax}\n\nAvailable tak?`;
                
                window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');

                submitBtn.innerHTML = originalHTML;
                submitBtn.style.opacity = '1';
                form.reset();
            }, 1000);
        });
    }

    // 5. NAVBAR ACTIVE STATE
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section, aside, div[id]');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});
