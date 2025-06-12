// Der benyttes ES6 til effektivt at importere og exportere funktioner på tværs af vores .js documenter. Alle vores functioner defineres herinde i app.js og kommer til at starte med export foran funktionsdefinationen altså: 
// export function functionName() {}; for at imortere funktionerne i et et andet .js dokument benyttes import {functionName, functionName2} from "./app.js"; Har fundet det her:https://www.w3schools.com/js/js_modules.asp

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

export async function getData() {
    const res = await fetch('https://mmd2.intricateminds.dk/wp-json/wp/v2/posts?opskriftsamling=63&acf_format=standard&_embed'); // 
  
    if (!res.ok) throw new Error(`HTTP-fejl! status: ${res.status}`);
  
    const dataWordpress = await res.json();
  
    console.log('data', dataWordpress);
  
    return dataWordpress;
  }
  
  // Kald funktionen og gør noget med dataen
  getData().then(data => {
    // Her kan du nu arbejde med data
    console.log("Data modtaget i .then():", data);
  }).catch(err => {
    console.error("Fejl ved hentning af data:", err);
  });
export function slider() {
    document.querySelectorAll('.sliderSection').forEach(slider => { //vælger alle elementer i dommen som tilhører slider sektionen
        const track = slider.querySelector('.carouselTrack'); // Henter det element der fungerer som "spor" for slides, altså containeren der scroller vandret
        let slides = Array.from(track.children); // Samler alle direkte child-elementer (dvs. slides) i et array for nem iteration og indeks-baseret adgang
        const dotsContainer = slider.querySelector('.dots'); // Finder den container som skal holde prikkerne (navigation-dots) under slideren
        const leftArrow = slider.querySelector('.arrowLeft'); // Finder den venstre pil (til at gå ét slide tilbage)
        const rightArrow = slider.querySelector('.arrowRight');// Finder den højre pil (til at gå ét slide frem)
        let currentIndex = 0; // Starter med at vise det første slide

        // Funktion til at (gen)oprette navigation dots baseret på slides
        function createDots() {
            dotsContainer.innerHTML = ''; // Tømmer dotsContainer for gamle dots (NYT: fjern gamle dots ved opdatering)

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
        }

        // Funktion der tilføjer hover-effekter på dots
        function setupDotHoverEffects() {
            const dots = dotsContainer.querySelectorAll('.dot');
            dots.forEach(dot => {
                dot.addEventListener('mouseenter', () => {
                    dot.classList.add('active'); // Midlertidigt tilføjer "active" ved hover
                });

                dot.addEventListener('mouseleave', () => {
                    dot.classList.remove('active'); // Fjerner "active" igen når musen fjernes
                });
            });
            return dots; // Returner dots NodeList til brug andre steder
        }

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
            const dots = dotsContainer.querySelectorAll('.dot');
            dots.forEach(dot => dot.classList.remove('active')); // Fjerner "active" fra alle dots
            dots[index].classList.add('active'); // Sætter "active" på dot der svarer til nuværende slide
        }

        // Funktion der kontrollerer om pilene skal være synlige
        function updateArrowVisibility(index) {
            leftArrow.style.visibility = index === 0 ? 'hidden' : 'visible';
            rightArrow.style.visibility = index === slides.length - 1 ? 'hidden' : 'visible';
        }

        // Håndterer manuel scrolling af track (fx brugeren swiper eller bruger scrollhjul)
        track.addEventListener('scroll', () => {
            setTimeout(() => {
                const scrollLeft = track.scrollLeft;

                const closestIndex = slides.reduce((closest, slide, index) => {
                    const distance = Math.abs(slide.offsetLeft - scrollLeft);
                    return distance < Math.abs(slides[closest].offsetLeft - scrollLeft) ? index : closest;
                }, 0);

                if (closestIndex !== currentIndex) {
                    currentIndex = closestIndex;
                    updateDots(currentIndex);
                    updateArrowVisibility(currentIndex);
                }
            }, 100);
        });

        // Klik på venstre pil
        leftArrow.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                scrollToSlide(currentIndex);
            }
        });

        // Klik på højre pil
        rightArrow.addEventListener('click', () => {
            if (currentIndex < slides.length - 1) {
                currentIndex++;
                scrollToSlide(currentIndex);
            }
        });

        // Opdater funktion som kan kaldes udefra (eksporteres separat)
        slider.update = function() {
            slides = Array.from(track.children); // Opdater slides-liste med nye slides
            createDots();
            setupDotHoverEffects();
            updateArrowVisibility(currentIndex);
        };

        // Initial setup
        createDots();
        setupDotHoverEffects();
        updateArrowVisibility(currentIndex);
    });
}

//  funktion kun til at kalde update (dots & pile) efter DOM-manipulation
export function updateSlider() {
    // Kalder din slider.update() på hver sliderSection
    document.querySelectorAll('.sliderSection').forEach(slider => {
        if (typeof slider.update === 'function') {
            slider.update();
        }
    });
}
  
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

export function heroSwapper() {
    function swapHero(e) {
      const wrapper = document.getElementById("heroWrapper");
      if (!wrapper) return;
  
      if (e.matches) {
        // Desktop: swap på desktop
        wrapper.innerHTML = `
          <video autoplay muted loop playsinline id="heroVideo" src="./assets/img/HeaderVideo.mov"></video>
        `;
      } else {
        // Mobile: swap på mobil
        wrapper.innerHTML = `
          <video autoplay muted loop playsinline id="heroVideo" src="./assets/img/MassageHundLMHundeOgHestefokus.mov"></video>
        `;
      }
    }
  
    const mediaQuery = window.matchMedia("(min-width: 1100px)");
    swapHero(mediaQuery);
    mediaQuery.addEventListener("change", swapHero);
  }



