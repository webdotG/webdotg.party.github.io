if (typeof slideShow === 'object') {
    let styles = document.createElement('link');
    styles.rel="stylesheet";
    styles.href="css/slideShow.css";
    document.head.appendChild(styles);
    document.querySelector(slideShow.container).innerHTML = `
<button id="slideshow-next">▶</button>
<button id="slideshow-prev">◀</button>
<button id="slideshow-autoplay"></button>
<div class="slideshow-wrapper">
</div>
`;
    const next = document.querySelector('#slideshow-next');
    const prev = document.querySelector('#slideshow-prev');
    const autoplay = document.querySelector('#slideshow-autoplay');
    let hash = 'counter' + slideShow.folder;
    let counter = localStorage.getItem(hash)||0;
    let autoincrease = slideShow.autoplay === 'no' ? false : true;
    let restart = slideShow.endless === 'no' ? false : true;
    let first = false;
    let last = false;
    let timeout = false;
    let speed = slideShow.speed || 3000;
    let all = slideShow.media.length

    function validatecounter() {
        autoplay.innerHTML = autoincrease ? "▶️" : '⏸';
        if (restart) {
            if (counter < 0) counter = all - 1;
            counter = counter % all;
        } else {
            if (counter <= 0) {
                counter = 0;
            }
            if (counter === all) counter = all - 1;
        }
        if (!restart) {
            first = counter === 0;
            last = counter === all - 1;
            if (counter === 0) {
                prev.classList.add('hidden');
            } else {
                prev.classList.remove('hidden');
            }
            if (counter === all - 1) {
                next.classList.add('hidden');
                autoplay.classList.add('hidden');
            } else {
                next.classList.remove('hidden');
                autoplay.classList.remove('hidden');
            }
        }

        localStorage.setItem(hash,counter);
        show();
    }
    function show() {
        clearTimeout(timeout);
        out.innerHTML = `${slideShow.media[counter]} ${counter+1}/${all}`;
        wrapper.innerHTML = '';
        wrapper.dataset.loaded = 'false';

        if(slideShow.media[counter].endsWith('.mp4')) {
            wrapper.style.backgroundImage = ``;
            let vid = document.createElement('video');
            vid.setAttribute('loop','true');
            vid.setAttribute('autoplay','true');
            vid.setAttribute('src', slideShow.folder + slideShow.media[counter]);
            if (wrapper.dataset.loaded === 'false') {
                vid.addEventListener('canplaythrough', ev => {
                    wrapper.appendChild(vid);
                    loaded();
                },{passive:true});
            }
        } else {
            wrapper.innerHTML = ' ';
            let url = slideShow.folder + slideShow.media[counter];
            let i = new Image();
            i.src = url;
            i.onload = function() {
                wrapper.style.backgroundImage = `url(${url})`;
                loaded();
            }
        }
    }
    function loaded() {
        wrapper.dataset.loaded = 'true';
        if (autoincrease && !last) {
            timeout = window.setTimeout(function(){
                counter++;
                validatecounter();
            },speed);
        }
    }
    function nextslide() {
        if(!last) {
            counter++;
            autoincrease = false;
            validatecounter();
        }
    };
    function prevslide() {
        if(!first) {
            counter--;
            autoincrease = false;
            validatecounter();
        }
    };
    function toggleauto() {
        autoincrease = !autoincrease;
        validatecounter();
    };
    next.addEventListener('click', nextslide);
    prev.addEventListener('click', prevslide);
    autoplay.addEventListener('click',toggleauto);
    document.addEventListener('keyup', ev => {
        ev.preventDefault();
        if (ev.key === "ArrowRight") { nextslide(); }
        if (ev.key === "ArrowUp") { history.back(); }
        if (ev.key === "ArrowLeft") { prevslide(); }
        if (ev.key === " ") { toggleauto(); }
    });
    validatecounter();
} else {
    console.error('Please define a slideshow object first');
    document.body.innerHTML = "⚠️ Can't find slideshow object"
}