const prev = document.getElementById('#slider-button__prev');
const next = document.getElementById('#slider-button__next');
const slides = document.querySelectorAll('.slider-nav__item');
const dots = document.querySelectorAll('.slider-paginator');
//peremennaya dlya otslegivaniya activnogo slaida
let index = 0;

//dlya pervichnoi proverki v consoli chtobi ponyat chto proishodit na dannii momemnt v massive slides
console.log(slides);

//funkciya dlya dobavleniya classa activ
//chto bi ne viyasnyat na kakom seichas slide visit class proshe vsego sdelat tak
//ubrat class activ so vseh a potom dobavit na tot kotorii ceichas pokazivsetsya

const activeSlide = n => {
		console.log(n);//chtobi ponyat na kakom inekse ya seichas nahogus
		//cikl for of dlya togo chtobi probegats'sya po html collekciyam eto psevdo massiv 
		//on ne imeet te metodi kotorii imeet obichnii massiv on slugit specialno dlya talih collekcii
		for(slide of slides){//beru peremennuy SLIDE i prohogus po kagdomu iz psevdomassiva SLIDES
				slide.classList.remove('active');
		}
		slides[n].classList.add('active');//dlya tekushego dobavlyay class activ

}
const activeDot = n => {
	for(dot of dots){
		dot.classList.remove('active');
		}
		dots[n].classList.add('active');
	}

//funkciya dlya opredeleniya tekushego slaida i dlya nahogdeniya argumenta fukcii napisanoi vishe 
 const nextSlide = () => {
	 //fukciya dlya togo chtobi esi ya doshel do poslednego slida to ona perekidivala menya na pervii slid i naoborot
	  if(index == slides.length -1 ){
			index = 0;
			activeSlide(index);
			activeDot(index);
		} else{
			index ++ ;
			activeSlide(index);	
			activeDot(index);
		}
 }

 const prevSlide = () => {
	 if(index == 0 ){
		index = slides.length -1
		 activeSlide(index);
	 } else{
		 index -- ;
		 activeSlide(index);
	 }
}

//chtobi kagdaya knopka sootvetstvovala svoei foto 
//
dots.forEach((item, indexDot) => {
	item.addEventListener('click', () => {
		index = indexDot;
		activeSlide(index);	
			activeDot(index);
	})
})

next.addEventListener('click', nextSlide);
prev.addEventListener('click', prevSlide);

//dlya postoyannoi prokrutki vpered po defoltu
setInterval(nextSlide,2500);//eto ne JS a BROWSERnaya funkciya
