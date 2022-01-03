const link=document.querySelector(".link-modal");
const modal=document.querySelector(".modal");
const popup=document.querySelector(".modal-login");
const form=popup.querySelector("form");
const login=popup.querySelector("[name=login]");
const password=popup.querySelector("[name=password]");

link.addEventListener("click", function(evt){
	evt.preventDefault();
	modal.classList.add("modal-show");
	login.focus();
})

form.addEventListener("submit", function(evt){
	if (!login.value || !password.value){
		evt.preventDefault();	
	} else{
		localStorage.setItem("login", login.value);
	}
})