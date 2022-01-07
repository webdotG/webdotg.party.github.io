
const link = document.querySelector(`.resp`);
link.addEventListener(`click`,  (e) => {
	event.stopPropagation()
  console.log(`Inner`)
})

document.addEventListener(`click`, (e) => {
	console.log(`Document`)
})