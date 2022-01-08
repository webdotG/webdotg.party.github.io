const buttonSubmit = document.querySelector(".form__submit");
const formWrapper = document.querySelector(".form__wrapper")
buttonSubmit.addEventListener("click", function (evt){
	evt.preventDefault();
formWrapper.classList.add("form__wrapper--none");
});
