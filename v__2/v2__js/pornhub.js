const pornhub=document.querySelector(".pornhub__link");
const pornhubVisual=document.querySelector(".pornhub__alert--none");

pornhub.addEventListener("click", function (evt){
	evt.preventDefault();
	pornhubVisual.classList.add("pornhub__alert--show");
});