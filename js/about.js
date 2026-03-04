 (function () {
        const scroller = document.getElementById('mainContent');
        const items    = document.querySelectorAll('.will-reveal');

        function tryReveal() {
            const scrollerBottom = scroller.getBoundingClientRect().bottom;
            items.forEach(el => {
                if (el.classList.contains('reveal')) return;
                const top = el.getBoundingClientRect().top;
                if (top < scrollerBottom - 30) el.classList.add('reveal');
            });
        }

        setTimeout(tryReveal, 250);
        scroller.addEventListener('scroll', tryReveal);
    })();

    /* ══════════════════════════════════════════
       LANGUAGE RING ANIMATION
    ══════════════════════════════════════════ */
    (function () {
        const CIRCUMFERENCE = 2 * Math.PI * 35; // r=35 → ~220

        function animateRings() {
            document.querySelectorAll('.ring-fill').forEach(circle => {
                if (circle.dataset.animated) return;
                const card = circle.closest('.lang-card');
                if (!card || !card.classList.contains('reveal')) return;
                circle.dataset.animated = '1';

                const pct    = parseFloat(circle.dataset.pct) / 100;
                const offset = CIRCUMFERENCE * (1 - pct);
                circle.style.strokeDasharray  = CIRCUMFERENCE;
                circle.style.strokeDashoffset = CIRCUMFERENCE;
                // force reflow then animate
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        circle.style.strokeDashoffset = offset;
                    });
                });
            });
        }

        const scroller = document.getElementById('mainContent');
        scroller.addEventListener('scroll', animateRings);
        // also check after reveal triggers
        const obs = new MutationObserver(animateRings);
        obs.observe(document.getElementById('mainContent'), { attributes: true, subtree: true, attributeFilter: ['class'] });
        setTimeout(animateRings, 600);
    })();

    /* ══════════════════════════════════════════
       ORBIT STACK
    ══════════════════════════════════════════ */
    (function () {
        const techs = [
            { label: 'React',      icon: 'devicon-react-original',   color: '#61dafb' },
            { label: 'JavaScript', icon: 'devicon-javascript-plain', color: '#f7df1e' },
            { label: 'Django',     icon: 'devicon-django-plain',     color: '#44b78b' },
            { label: 'Spring',     icon: 'devicon-spring-plain',     color: '#6ac23a' },
            { label: 'PostgreSQL', icon: 'devicon-postgresql-plain', color: '#336791' },
            { label: 'MySQL',      icon: 'devicon-mysql-plain',      color: '#00758f' },
            { label: 'Git',        icon: 'devicon-git-plain',        color: '#f1502f' },
            { label: 'GitHub',     icon: 'devicon-github-original',  color: '#e0e0e0' },
            { label: 'VS Code',    icon: 'devicon-vscode-plain',     color: '#007acc' },
        ];

        const ring    = document.getElementById('orbitRing');
        const RING_SZ = 360, RADIUS = 180, DUR = '22s';

        const ks = document.createElement('style');
        ks.textContent = `
            @keyframes counterSpin {
                from { transform: translate(-50%,-50%) rotate(0deg); }
                to   { transform: translate(-50%,-50%) rotate(-360deg); }
            }`;
        document.head.appendChild(ks);

        techs.forEach((t, i) => {
            const angle = (2 * Math.PI / techs.length) * i - Math.PI / 2;
            const cx = RING_SZ / 2 + RADIUS * Math.cos(angle);
            const cy = RING_SZ / 2 + RADIUS * Math.sin(angle);
            const el = document.createElement('div');
            el.className = 'orbit-icon';
            el.style.cssText = `left:${cx}px;top:${cy}px;transform:translate(-50%,-50%);animation:counterSpin ${DUR} linear infinite;`;
            el.innerHTML = `<i class="${t.icon}" style="color:${t.color};font-size:1.45rem;"></i><span class="icon-label">${t.label}</span>`;
            ring.appendChild(el);
        });

        /* individual icon hover — pause only that icon's counter-spin */
        ring.querySelectorAll && setTimeout(() => {
            ring.querySelectorAll('.orbit-icon').forEach(el => {
                el.addEventListener('mouseenter', () => {
                    el.style.animationPlayState = 'paused';
                });
                el.addEventListener('mouseleave', () => {
                    el.style.animationPlayState = 'running';
                });
            });
        }, 100);
    })();