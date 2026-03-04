  /* reveal on load */
    (function () {
        const scroller = document.getElementById('mainContent');
        const items    = document.querySelectorAll('.will-reveal');
        function tryReveal() {
            const bottom = scroller.getBoundingClientRect().bottom;
            items.forEach(el => {
                if (el.classList.contains('reveal')) return;
                if (el.getBoundingClientRect().top < bottom - 20) el.classList.add('reveal');
            });
        }
        setTimeout(tryReveal, 200);
        scroller.addEventListener('scroll', tryReveal);
    })();

    /* char counter */
    function updateCount(el) {
        document.getElementById('charCount').textContent = el.value.length + ' / 500';
    }

    /* form submit (demo — no backend) */
    function handleSubmit(e) {
        e.preventDefault();
        const btn     = e.target.querySelector('.btn-submit');
        const success = document.getElementById('formSuccess');

        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
        btn.disabled  = true;

        setTimeout(() => {
            btn.style.display = 'none';
            success.classList.add('show');
            e.target.reset();
            document.getElementById('charCount').textContent = '0 / 500';
        }, 1400);
    }