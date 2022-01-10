const shareOrReadIdeas = document.querySelector(".idea-link__share");
const postExample = document.querySelector(".post-example__wrapper");
const registrWrapper = document.querySelector(".form-registr__wrapper");


shareOrReadIdeas.addEventListener("click", function(evt){
	evt.preventDefault();
	shareOrReadIdeas.classList.add("display--none");
	postExample.classList.add("display--none");
	registrWrapper.classList.remove("display--none");
});



