const pornhub=document.querySelector(".pornhub__link");
const pornhubShow=document.querySelector(".pornhub__alert--none");
const pornhubClose=document.querySelector(".pornhub__button--no")
const onlyfans=document.querySelector(".onlyfans__link");
const onlyfansShow=document.querySelector(".onlyfans__alert--none");
const onlyfansClose=document.querySelector(".onlyfans__button--no")

pornhub.addEventListener("click", function (evt){
	evt.preventDefault();
	pornhubShow.classList.add("pornhub__alert--show");
});

pornhubClose.addEventListener("click", function (evt){
	evt.preventDefault();
  pornhubShow.classList.remove("pornhub__alert--show");
})
onlyfans.addEventListener("click", function (evt){
	evt.preventDefault();
	onlyfansShow.classList.add("onlyfans__alert--show");
});

onlyfansClose.addEventListener("click", function (evt){
	evt.preventDefault();
  onlyfansShow.classList.remove("onlyfans__alert--show");
})