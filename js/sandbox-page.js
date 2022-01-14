const shareOrReadIdeas = document.querySelector(".idea-link__share");
const postExample = document.querySelector(".post-example");
const exampleTile = document.querySelector(".post-example__title")
const formRegistrSandbox = document.querySelector(".form-registr__wrapper");


shareOrReadIdeas.addEventListener("click", function(evt){
	evt.preventDefault();
	shareOrReadIdeas.classList.add("display--none");
	postExample.classList.add("display--none");
	exampleTile.classList.add("display--none");
	formRegistrSandbox.classList.remove("display--none");
});



