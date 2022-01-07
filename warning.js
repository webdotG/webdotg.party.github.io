const firstVersion=document.querySelector(".resp");
const warningBlock=document.querySelector(".warning");
const linkGood=document.querySelector(".warning-list__link--good");
const warningClose=document.querySelector(".warning__close");

firstVersion.addEventListener("click", function(evt){
	evt.preventDefault();
	warningBlock.classList.add("warning--show");
	linkGood.focus();
})

warningClose.addEventListener("click", function(evt){
	evt.preventDefault();
	warningBlock.classList.remove("warning--show");
})

firstVersion.addEventListener(`click`,  (e) => {
	event.stopPropagation()
})

document.addEventListener(`click`, (e) => {
	warningBlock.classList.remove("warning--show");
})
