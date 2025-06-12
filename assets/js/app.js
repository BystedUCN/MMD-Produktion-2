// Der benyttes ES6 til effektivt at importere og exportere funktioner på tværs af vores .js documenter. Alle vores functioner defineres herinde i app.js og kommer til at starte med export foran funktionsdefinationen altså: 
// export function functionName() {}; for at imortere funktionerne i et et andet .js dokument benyttes import {functionName, functionName2} from "./app.js"; Har fundet det her:https://www.w3schools.com/js/js_modules.asp
export function functionName () {
    console.log("Hello world")
}
 

// Link til mega sej burger menu https://uxdesign.cc/the-menu-210bec7ad80c

export function burger() {
    const burgerBtn = document.getElementById('burgerMenu');
    const sideNav = document.getElementById('sideNav');
    const overlay = document.getElementById('overlay');
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
        document.querySelectorAll('.sliderSection').forEach(slider => { //vælger alle elementer i dommen som tilhører slider sektionen
            const track = slider.querySelector('.carouselTrack'); // Henter det element der fungerer som "spor" for slides, altså containeren der scroller vandret
            const slides = Array.from(track.children);// Samler alle direkte child-elementer (dvs. slides) i et array for nem iteration og indeks-baseret adgang
            const dotsContainer = slider.querySelector('.dots'); // Finder den container som skal holde prikkerne (navigation-dots) under slideren
            const leftArrow = slider.querySelector('.arrowLeft'); // Finder den venstre pil (til at gå ét slide tilbage)
            const rightArrow = slider.querySelector('.arrowRight');// Finder den højre pil (til at gå ét slide frem)
            let currentIndex = 0; // Starter med at vise det første slide

            // Dynamisk opretter én dot per slide
            slides.forEach((_, index) => {
                const dot = document.createElement('div'); // Opretter et nyt <div>-element
                dot.classList.add('dot'); // Tilføjer CSS-klassen "dot" for styling
                if (index === 0) dot.classList.add('active'); // Første dot sættes som aktiv fra starten
        
                // Når brugeren klikker på en dot, scrolles der til det tilsvarende slide
                dot.addEventListener('click', () => {
                    currentIndex = index; // Opdaterer index så vi ved hvilket slide der er aktivt
                    scrollToSlide(currentIndex); // Kalder funktion der scroll'er til det valgte slide
                });
        
                // Tilføjer dotten til containeren
                dotsContainer.appendChild(dot);
            });
        
            // Efter at dots er tilføjet i DOM'en, henter vi dem igen for at bruge dem senere
            const dots = dotsContainer.querySelectorAll('.dot');
        
            // Funktion der scroll'er til et bestemt slide givet et index
            function scrollToSlide(index) {
                const target = slides[index]; // Får fat i selve DOM-elementet for det ønskede slide
        
                track.scrollTo({
                    left: target.offsetLeft, // Scroller vandret til den præcise position hvor slide starter
                    behavior: 'smooth' // Animeret scroll
                });
        
                updateDots(index); // Opdaterer hvilken dot der er aktiv
                updateArrowVisibility(index); // Viser eller skjuler pile afhængigt af placering
            }
        
            // Funktion der sørger for at kun den dot der matcher currentIndex har klassen "active"
            function updateDots(index) {
                dots.forEach(dot => dot.classList.remove('active')); // Fjerner "active" fra alle dots
                dots[index].classList.add('active'); // Sætter "active" på dot der svarer til nuværende slide
            }
        
            // Tilføjer visuel feedback på dots ved mouseover
            dots.forEach(dot => {
                dot.addEventListener('mouseenter', () => {
                    dot.classList.add('active'); // Midlertidigt tilføjer "active" ved hover
                });
        
                dot.addEventListener('mouseleave', () => {
                    dot.classList.remove('active'); // Fjerner "active" igen når musen fjernes
                });
            });
        
            // Funktion der kontrollerer om pilene skal være synlige
            function updateArrowVisibility(index) {
                // Hvis vi er på første slide: skjul venstre pil
                leftArrow.style.visibility = index === 0 ? 'hidden' : 'visible';
        
                // Hvis vi er på sidste slide: skjul højre pil
                rightArrow.style.visibility = index === slides.length - 1 ? 'hidden' : 'visible'; // -1 kommer fordi at et array starter på 0, så længden af et array er altid +1 ift nummeret på indekset
            }
        
            // Håndterer manuel scrolling af track (fx brugeren swiper eller bruger scrollhjul)
            track.addEventListener('scroll', () => {
                setTimeout(() => {
                    const scrollLeft = track.scrollLeft; // Hvor langt er der scrollet fra venstre
        
                    // Finder det slide der er tættest på nuværende scroll-position
                    const closestIndex = slides.reduce((closest, slide, index) => { // reducerer summen af hvert enkelt index til en samlet sum 
                        const distance = Math.abs(slide.offsetLeft - scrollLeft); //måler den den længde vi har scrollet i positive tal
                        return distance < Math.abs(slides[closest].offsetLeft - scrollLeft) ? index : closest; //hvis den beregnede distance til et andet slide er mindre end det slide vi var på, så gør det nye slide til index, ellers returner til det vi var på 
                    }, 0);
        
                    // Hvis vi er på et nyt slide, opdater indeks og UI
                    if (closestIndex !== currentIndex) {
                        currentIndex = closestIndex;
                        updateDots(currentIndex);
                        updateArrowVisibility(currentIndex);
                    }
                }, 100); // Delay så vi ikke opdaterer midt i en scroll
            });
        
            // Klik på venstre pil: gå ét slide tilbage, hvis muligt
            leftArrow.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    scrollToSlide(currentIndex);
                }
            });
        
            // Klik på højre pil: gå ét slide frem, hvis muligt
            rightArrow.addEventListener('click', () => {
                if (currentIndex < slides.length - 1) {
                    currentIndex++;
                    scrollToSlide(currentIndex);
                }
            });
        
            // Initial visning: viser eller skjuler pile afhængigt af om vi starter på første eller sidste slide
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
    document.addEventListener('DOMContentLoaded', () => {
        const currentUrl = window.location.href;
      
        document.querySelectorAll('.navLink a').forEach(link => {
          if (currentUrl.includes(link.href)) {
            link.parentElement.classList.add('navActive');
          }
        });
      });
};

export function heroSwapper () {
   function swapHero(e) { 
        if (e.matches) {
            const container = document.getElementById("heroVideo");
            if (container) {
            container.outerHTML = `
            <video autoplay muted loop playsinline id="heroVideo" src="./assets/img/HeaderVideo.mov"></video>
            `;
            }
        }
    };
  
  const mediaQuery = window.matchMedia("(min-width: 1100px)");
  swapHero(mediaQuery);
  mediaQuery.addEventListener("change", swapHero);
};