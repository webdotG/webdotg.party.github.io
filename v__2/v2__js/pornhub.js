const pornhub=document.querySelector(".pornhub__link");
const pornhubShow=document.querySelector(".pornhub__alert--none");
const pornhubClose=document.querySelector(".pornhub__button--no")

pornhub.addEventListener("click", function (evt){
	evt.preventDefault();
	pornhubShow.classList.add("pornhub__alert--show");
});

pornhubClose.addEventListener("click", function (evt){
	evt.preventDefault();
  pornhubShow.classList.remove("pornhub__alert--show");
})