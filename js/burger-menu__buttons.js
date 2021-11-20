let burger_btn = document.querySelectorAll('.burger-menu__icon');
let  nav_on = document.querySelectorAll( ".nav-list");

burger_btn.forEach (burgerMenu__btn => {
    burgerMenu__btn.addEventListener('click', (event) => {
        burgerMenu__btn.classList.toggle("open");
    });
});


/*
let nav_menu = document.querySelectorAll(".nav-list");
nav_menu.forEach (nav_menu => {
    nav_menu.addEventListener('click', (event) => {
        nav_menu.classList.toggle("active");
    });
});*/
