let icons = document.querySelectorAll('.burger-menu__icon');
icons.forEach (burgerMenu__icon => {
    burgerMenu__icon.addEventListener('click', (event) => {
        burgerMenu__icon.classList.toggle("open");
    });
});
