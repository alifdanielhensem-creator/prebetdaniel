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

    // 3. IOS-FRIENDLY WHATSAPP LOGIC
    const form = document.getElementById('bookingForm');
    
    if(form) {
        const submitBtn = form.querySelector('button[type="submit"]');

        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Halang refresh page

            // A. Ambil Data
            const pickup = document.getElementById('pickup').value;
            const destination = document.getElementById('destination').value;
            const time = document.getElementById('time').value;
            const pax = document.getElementById('pax').value;

            // B. Ubah Button Text (Feedback)
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Buka WhatsApp...';
            submitBtn.style.opacity = '0.8';

            // C. Susun Link WhatsApp
            const phoneNumber = '60189490784'; 
            
            // Format Mesej Kemas
            const message = `Salam Daniel, saya nak book ride:

📍 *Pickup:* ${pickup}
🏁 *Destinasi:* ${destination}
🕒 *Masa:* ${time}
👥 *Pax:* ${pax}

Available tak?`;

            // Encode & Bina URL
            const encodedMessage = encodeURIComponent(message);
            const waUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

            // D. [CRITICAL IOS FIX]
            // Gunakan window.location.href (Direct Redirect)
            // Jangan guna window.open dalam setTimeout
            window.location.href = waUrl;

            // E. Reset Form (Hanya selepas redirect berlaku)
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.opacity = '1';
                form.reset();
            }, 3000); // Reset selepas 3 saat
        });
    }

    // 4. Smooth Scroll & Navbar Active State
    const sections = document.querySelectorAll('section, aside, div[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Adjustment for offset
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
