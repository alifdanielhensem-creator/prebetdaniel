document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Loader
    setTimeout(() => {
        document.querySelector('.cyber-loader').classList.add('loader-hide');
    }, 1500);

    // 2. iOS Check
    function isIOS() {
        return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    }
    const iosModal = document.getElementById('ios-modal');
    window.closeModal = function() {
        iosModal.classList.remove('active');
    }

    // 3. Booking Logic
    const form = document.getElementById('bookingForm');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Check iOS
            if (isIOS()) {
                iosModal.classList.add('active');
                return;
            }

            const btn = form.querySelector('button');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'CONNECTING...';

            setTimeout(() => {
                const pickup = document.getElementById('pickup').value;
                const dest = document.getElementById('destination').value;
                const time = document.getElementById('time').value;
                const pax = document.getElementById('pax').value;
                
                const msg = `M.A.T.A TRANSPORT REQUEST:\n\n📍 LOC: ${pickup}\n🏁 DEST: ${dest}\n🕒 TIME: ${time}\n👥 AGENTS: ${pax}`;
                
                window.open(`https://wa.me/60189490784?text=${encodeURIComponent(msg)}`, '_blank');
                
                btn.innerHTML = originalText;
                form.reset();
            }, 800);
        });
    }
});
