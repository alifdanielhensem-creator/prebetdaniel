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

    // 3. WHATSAPP BOOKING LOGIC (UPDATE TERBARU)
    const form = document.getElementById('bookingForm');
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Halang form dari refresh page

        // A. Ambil Data dari Input
        const pickup = document.getElementById('pickup').value;
        const destination = document.getElementById('destination').value;
        const time = document.getElementById('time').value;
        const pax = document.getElementById('pax').value;

        // B. Ubah butang jadi loading
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...';
        submitBtn.style.opacity = '0.7';

        // C. Proses Data
        setTimeout(() => {
            
            // Nombor Driver
            const phoneNumber = '60189490784'; 

            // Susun Ayat Mesej
            const message = `Salam Daniel, saya nak book ride:

📍 *Lokasi Ambil:* ${pickup}
🏁 *Destinasi:* ${destination}
🕒 *Masa:* ${time}
👥 *Pax:* ${pax}

Available tak?`;

            // Encode untuk URL
            const encodedMessage = encodeURIComponent(message);
            const waUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

            // Buka WhatsApp
            window.open(waUrl, '_blank');

            // Reset Form & Butang
            submitBtn.innerHTML = originalText;
            submitBtn.style.opacity = '1';
            form.reset();

        }, 1000); // Delay 1 saat untuk effect 'loading'
    });

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
