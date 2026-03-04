 document.addEventListener('DOMContentLoaded', function () {

        // ── TYPEWRITER ──
        const titleText = "Hello, I'm Hanane.";
        const descText  = "Software Engineering student with a strong interest in web development.Passionate about building clean, responsive, and user-focused web applications.Currently strengthening my skills in front-end and back-end technologies, with the goal of expanding into mobile development in the near future.Curious, motivated, and always eager to learn new technologies.";

        const typedEl = document.getElementById('typedText');
        const cursor  = document.getElementById('cursor');
        const descEl  = document.getElementById('heroDesc');
        const badge   = document.getElementById('heroBadge');
        const divider = document.getElementById('heroDivider');
        const cta     = document.getElementById('heroCta');

        let titleIdx = 0, descIdx = 0;

        function renderTitle(str) {
            typedEl.innerHTML = str.replace("I'm Hanane.", "I'm <span class='accent'>Hanane.</span>");
        }

        function revealServices() {
            const header = document.getElementById('servicesHeader');
            const items  = ['srv1','srv2','srv3'].map(id => document.getElementById(id));
            if (!header.classList.contains('reveal')) {
                header.classList.add('reveal');
                items.forEach((el, i) => setTimeout(() => el.classList.add('reveal'), 120 + i * 130));
            }
        }

        // start animation
        setTimeout(() => {
            badge.classList.add('visible');

            const typeTitle = setInterval(() => {
                titleIdx++;
                renderTitle(titleText.slice(0, titleIdx));
                if (titleIdx === titleText.length) {
                    clearInterval(typeTitle);
                    setTimeout(() => {
                        divider.classList.add('visible');
                        descEl.classList.add('visible');
                        const typeDesc = setInterval(() => {
                            descIdx++;
                            descEl.textContent = descText.slice(0, descIdx);
                            if (descIdx === descText.length) {
                                clearInterval(typeDesc);
                                cursor.style.display = 'none';
                                setTimeout(() => {
                                    cta.classList.add('visible');
                                    setTimeout(revealServices, 350);
                                }, 400);
                            }
                        }, 15);
                    }, 500);
                }
            }, 52);
        }, 400);

        // also reveal on scroll (if user scrolls down before typing ends)
        document.getElementById('mainContent').addEventListener('scroll', revealServices);
    });