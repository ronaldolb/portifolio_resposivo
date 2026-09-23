document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header nav a');
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    // Menu hamburguer
    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    });

    // Revela cada seção assim que ela entra na tela e mantém revelada.
    // (o cálculo manual de scrollY x offsetTop usado antes fazia o
    // conteúdo sumir sempre que você parava de rolar fora da faixa
    // calculada; o IntersectionObserver não depende disso)
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-animate');

                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`header nav a[href*="${id}"]`);

                if (activeLink) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    activeLink.classList.add('active');
                }
            }
        });
    }, {
        threshold: 0,
        rootMargin: '-100px 0px 0px 0px'
    });

    sections.forEach(sec => revealObserver.observe(sec));

    // Eventos ao rolar a página
    window.addEventListener('scroll', () => {
        const top = window.scrollY;

        // Header Sticky
        header.classList.toggle('sticky', top > 100);

        // Fecha menu mobile ao rolar
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');

        // Animação do Footer
        const reachedBottom = window.innerHeight + window.scrollY >= document.scrollingElement.scrollHeight - 10;
        footer.classList.toggle('show-animate', reachedBottom);
    });
});