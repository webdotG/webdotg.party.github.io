let burger_btn = document.querySelectorAll('.burger-menu__icon');
let nav_on = document.querySelector(".nav-list");

burger_btn.forEach(burgerMenu__btn => {
    burgerMenu__btn.addEventListener('click', (event) => {
        burgerMenu__btn.classList.toggle("open");
        nav_on.classList.toggle("active")
    });
});

