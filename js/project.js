/* ══ SCROLL REVEAL ══ */
(function () {
    const scroller = document.getElementById('mainContent');
    const rows = document.querySelectorAll('.project-row');
    function reveal() {
        const bottom = scroller.getBoundingClientRect().bottom;
        rows.forEach((row, i) => {
            if (row.classList.contains('reveal')) return;
            if (row.getBoundingClientRect().top < bottom - 30) {
                setTimeout(() => row.classList.add('reveal'), i * 100);
            }
        });
    }
    setTimeout(reveal, 200);
    scroller.addEventListener('scroll', reveal);
})();

/* ══ MODAL LOGIC ══ */
(function () {
    const MODAL_IDS = ['modal1', 'modal2', 'modal3', 'modal4', 'modal5'];

    function openProjectModal(id) {
        const el = document.getElementById(id);
        if (!el) return;
        el.classList.add('open');
        document.body.style.overflow = 'hidden';
        const box = el.querySelector('.modal-box');
        if (box) box.scrollTop = 0;
    }

    function closeProjectModal(id) {
        const el = document.getElementById(id);
        if (!el) return;
        el.classList.remove('open');
        document.body.style.overflow = '';
    }

    /* Open buttons — 1 à 5 */
    MODAL_IDS.forEach((modalId, i) => {
        const btn = document.getElementById('openBtn' + (i + 1));
        if (btn) btn.addEventListener('click', () => openProjectModal(modalId));
    });

    /* Close buttons — 1 à 5 */
    MODAL_IDS.forEach((modalId, i) => {
        const btn = document.getElementById('closeBtn' + (i + 1));
        if (btn) btn.addEventListener('click', () => closeProjectModal(modalId));
    });

    /* Clic en dehors du modal box pour fermer */
    MODAL_IDS.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('click', function (e) {
                if (e.target === this) closeProjectModal(id);
            });
        }
    });

    /* Touche Escape */
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            MODAL_IDS.forEach(id => closeProjectModal(id));
        }
    });
})();