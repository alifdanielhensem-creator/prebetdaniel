document.addEventListener('DOMContentLoaded', () => {

    // 1. SCROLL ANIMATION OBSERVER
    // Fungsi ini akan mengesan bila elemen masuk ke dalam skrin
    // dan menambah class .scrolled untuk memulakan animasi CSS
    const scrollElements = document.querySelectorAll('.scroll-element');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
    };

    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        });
    }

    // Jalankan sekali masa load, dan setiap kali scroll
    handleScrollAnimation();
    window.addEventListener('scroll', () => { 
        handleScrollAnimation();
    });


    // 2. IOS DETECTION & BOOKING LOGIC
    function isIOS() {
        return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    }
    const iosModal = document.getElementById('iosModal');
    window.closeModal = function() {
        iosModal.classList.remove('active');
    }

    const form = document.getElementById('bookingForm');
    
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Jika iOS, buka modal
            if (isIOS()) {
                iosModal.classList.add('active');
                return;
            }

            // Jika Android/PC
            const btn = form.querySelector('button');
            const originalText = btn.innerHTML;
            
            // Effect Loading pada Button
            btn.innerHTML = 'Menghubungkan...';
            btn.style.opacity = '0.8';

            setTimeout(() => {
                const pickup = document.getElementById('pickup').value;
                const dest = document.getElementById('destination').value;
                const time = document.getElementById('time').value;
                const pax = document.getElementById('pax').value;
                
                const msg = `Hi Daniel, saya nak book ride:\n\n📍 Pickup: ${pickup}\n🏁 Destinasi: ${dest}\n🕒 Masa: ${time}\n👥 Pax: ${pax}`;
                
                // Direct Link untuk Android
                window.location.href = `https://wa.me/60189490784?text=${encodeURIComponent(msg)}`;
                
                // Reset form lepas hantar
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.opacity = '1';
                    form.reset();
                }, 2000);
            }, 800);
        });
    }
});
