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

    // Animações e eventos ao rolar a página
    window.addEventListener('scroll', () => {
        const top = window.scrollY;

        sections.forEach(sec => {
            const offset = sec.offsetTop - 100;
            const height = sec.offsetHeight;
            const id = sec.getAttribute('id');

            if (top >= offset && top < offset + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    const activeLink = document.querySelector(`header nav a[href*="${id}"]`);
                    if (activeLink) activeLink.classList.add('active');
                });
                sec.classList.add('show-animate');
            } else {
                sec.classList.remove('show-animate');
            }
        });

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