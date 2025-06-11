// Der benyttes ES6 til effektivt at importere og exportere funktioner på tværs af vores .js documenter. Alle vores functioner defineres herinde i app.js og kommer til at starte med export foran funktionsdefinationen altså: 
// export function functionName() {}; for at imortere funktionerne i et et andet .js dokument benyttes import {functionName, functionName2} from "./app.js"; Har fundet det her:https://www.w3schools.com/js/js_modules.asp
export function functionName () {
    console.log("Hello world")
}
 

// Link til mega sej burger menu https://uxdesign.cc/the-menu-210bec7ad80c
const burgerBtn = document.getElementById('burgerMenu');
const sideNav = document.getElementById('sideNav');
const overlay = document.getElementById('overlay');

export function burger() {
  burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('sideNav');
    sideNav.classList.toggle('open');
    overlay.classList.toggle('active');
  });
  overlay.addEventListener('click', () => {
    sideNav.classList.remove('open');
    overlay.classList.remove('active');
    burgerBtn.classList.remove('sideNav','opened');
  });
}

// Link til slider https://www.w3schools.com/howto/howto_js_quotes_slideshow.asp
    export function slider() {
       document.querySelectorAll('.sliderSection').forEach(slider => {
    // Hent HTML-elementer fra DOM'en
        // Hent HTML-elementer fra DOM'en
        const track = slider.querySelector('.carouselTrack'); // Selve "banen", som slides ligger i
        const slides = Array.from(track.children);               // Alle slides som et array
        const dotsContainer = slider.querySelector('.dots');   // Container til de små navigation-prikker
        const leftArrow = slider.querySelector('.arrowLeft'); // Venstre pil
        const rightArrow = slider.querySelector('.arrowRight'); // Højre pil
    
        let currentIndex = 0; // Holder styr på, hvilket slide der er aktivt
    
        // Debugging - check om vi finder den korrekte slider og antal slides
        console.log(`Initializing slider with ${slides.length} slides`);
    
        // Opret navigation-prikker dynamisk
        slides.forEach((_, index) => {
            const dot = document.createElement('div'); // Lav et nyt dot-element
            dot.classList.add('dot'); // Tilføj klasse
            if (index === 0) dot.classList.add('active'); // Gør første dot aktiv
            dot.addEventListener('click', () => {
                currentIndex = index;         // Skift til det slide, brugeren klikker på
                scrollToSlide(currentIndex); // Scroll til det slide
            });
            dotsContainer.appendChild(dot); // Tilføj dot til siden
        });
    
        const dots = dotsContainer.querySelectorAll('.dot'); // Find alle dot-elementer igen
    
        // Funktion til at scroll'e til et bestemt slide
        function scrollToSlide(index) {
            const target = slides[index]; // Find det rigtige slide
            track.scrollTo({
                left: target.offsetLeft,  // offsetLeft = hvor langt slidet er placeret fra venstre kant af track
                                          // bruges til at scroll'e direkte hen til det pågældende slide
                behavior: 'smooth'        // Med glidende bevægelse
            });
    
            updateDots(index);            // Opdater hvilke dots der er aktive
            updateArrowVisibility(index); // Skjul/vis pile efter behov
        }
    
        // Opdater aktiv dot
        function updateDots(index) {
            dots.forEach(dot => dot.classList.remove('active')); // Fjern 'active' fra alle dots
            dots[index].classList.add('active'); // Tilføj 'active' til nuværende dot
        }
    
        dots.forEach(dot => {
            dot.addEventListener('mouseenter', () => {
                dot.classList.add('active');
            });
    
            dot.addEventListener('mouseleave', () => {
                dot.classList.remove('active');
            });
        });
    
        // Skjul venstre/højre pil hvis vi er i kanten
        function updateArrowVisibility(index) {
            leftArrow.style.visibility = index === 0 ? 'hidden' : 'visible'; // Skjul venstre pil ved første slide
            rightArrow.style.visibility = index === slides.length - 1 ? 'hidden' : 'visible'; // Skjul højre pil ved sidste slide ? : fungerer som et if/else statement
        }
    
        // Synkroniser index når brugeren selv scroller manuelt
        track.addEventListener('scroll', () => {
            setTimeout(() => {
                const scrollLeft = track.scrollLeft; // Hvor langt er der scrollet?
                const closestIndex = slides.reduce((closest, slide, index) => {
                    const distance = Math.abs(slide.offsetLeft - scrollLeft); // Afstand fra nuværende scroll til hvert slide
                    return distance < Math.abs(slides[closest].offsetLeft - scrollLeft) ? index : closest; // Find nærmeste slide
                }, 0);
    
                if (closestIndex !== currentIndex) {
                    currentIndex = closestIndex; // Opdater index hvis vi er på nyt slide
                    updateDots(currentIndex);   // Opdater prikker
                    updateArrowVisibility(currentIndex); // Opdater pile
                }
            }, 100); // Lille delay for at sikre korrekt detektion
        });
    
        // Klik på venstre pil
        leftArrow.addEventListener('click', () => { 
            if (currentIndex > 0) {
                currentIndex--;           // Gå ét slide til venstre
                scrollToSlide(currentIndex); // Scroll til det nye slide
            }
        });
    
        // Klik på højre pil
        rightArrow.addEventListener('click', () => {
            if (currentIndex < slides.length - 1) {
                currentIndex++;            // Gå ét slide til højre
                scrollToSlide(currentIndex); // Scroll til det nye slide
            }
        });
    
        // Starttilstand – vis eller skjul pile afhængigt af første slide
        updateArrowVisibility(currentIndex);
    });
};

export function fetchData() {
    fetch('https://api.mby-ucn.dk/wp-json/wp/v2/posts?acf_format=standard&_embed')// `fetch()` sender en HTTP GET-request til WordPress REST API’et for at hente data (i dette tilfælde blogindlæg med ACF og embedded data).
        .then(res => {
            console.log('status:', res.status);// Logger HTTP-statuskoden for at hjælpe med fejlfinding (f.eks. 200, 404, 500).
            if (!res.ok) {// `res.ok` er `false`, hvis statuskoden ikke er mellem 200 og 299. Dette tjek sikrer, at kun succesfulde svar behandles.
                throw new Error(`HTTP-fejl! status: ${res.status}`); // Kaster en fejl, som sendes videre til `.catch()`, hvis statuskoden er problematisk.
            }
            console.log('res:', res);
            return res.json();
        })
        .then(data => {
            console.log('data:', data);
        })
        .catch(err => {
            console.log('Fejl i afhentning af data', err);
        });
};

export function navActive() {
    document.addEventListener('DOMContentLoaded', () => { // venter på at alt er loaded
        const currentPath = window.location.pathname; //erklærer konstanten 
        
        document.querySelectorAll('.nav-link').forEach(link => {
          if (link.getAttribute('href') === currentPath) {
            link.classList.add('navActive');
          }
        });
      });
};