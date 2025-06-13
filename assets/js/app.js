// Der benyttes ES6 til effektivt at importere og exportere funktioner på tværs af vores .js documenter. Alle vores functioner defineres herinde i app.js og kommer til at starte med export foran funktionsdefinationen altså: 
// export function functionName() {}; for at imortere funktionerne i et et andet .js dokument benyttes import {functionName, functionName2} from "./app.js"; Har fundet det her:https://www.w3schools.com/js/js_modules.asp

// Link til mega sej burger menu https://uxdesign.cc/the-menu-210bec7ad80c

// BURGERMENU LOGIK
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
      burgerBtn.classList.remove('sideNav', 'opened');
    });
  }
  
  // HENTER DATA FRA WORDPRESS API
  export async function getData() {
    const res = await fetch('https://mmd2.intricateminds.dk/wp-json/wp/v2/posts?opskriftsamling=63&acf_format=standard&_embed&per_page=20');
    if (!res.ok) throw new Error(`HTTP-fejl! status: ${res.status}`);
    const dataWordpress = await res.json();
    return dataWordpress;
  }
  
  // SLIDER LOGIK
  export function slider() {
    document.querySelectorAll('.sliderSection').forEach(slider => {
      const track = slider.querySelector('.carouselTrack');
      let slides = Array.from(track.children);
      const dotsContainer = slider.querySelector('.dots');
      const leftArrow = slider.querySelector('.arrowLeft');
      const rightArrow = slider.querySelector('.arrowRight');
      let currentIndex = 0;
  
      function createDots() {
        dotsContainer.innerHTML = '';
        slides.forEach((_, index) => {
          const dot = document.createElement('div');
          dot.classList.add('dot');
          if (index === 0) dot.classList.add('active');
          dot.addEventListener('click', () => {
            currentIndex = index;
            scrollToSlide(currentIndex);
          });
          dotsContainer.appendChild(dot);
        });
      }
  
      function setupDotHoverEffects() {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach(dot => {
          dot.addEventListener('mouseenter', () => dot.classList.add('active'));
          dot.addEventListener('mouseleave', () => dot.classList.remove('active'));
        });
        return dots;
      }
  
      function scrollToSlide(index) {
        const target = slides[index];
        track.scrollTo({ left: target.offsetLeft, behavior: 'smooth' });
        updateDots(index);
        updateArrowVisibility(index);
      }
  
      function updateDots(index) {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
      }
  
      function updateArrowVisibility(index) {
        leftArrow.style.visibility = index === 0 ? 'hidden' : 'visible';
        rightArrow.style.visibility = index === slides.length - 1 ? 'hidden' : 'visible';
      }
  
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
  
      leftArrow.addEventListener('click', () => {
        if (currentIndex > 0) {
          currentIndex--;
          scrollToSlide(currentIndex);
        }
      });
  
      rightArrow.addEventListener('click', () => {
        if (currentIndex < slides.length - 1) {
          currentIndex++;
          scrollToSlide(currentIndex);
        }
      });
  
      slider.update = function () {
        slides = Array.from(track.children);
        createDots();
        setupDotHoverEffects();
        updateArrowVisibility(currentIndex);
      };
  
      createDots();
      setupDotHoverEffects();
      updateArrowVisibility(currentIndex);
    });
  }
  
  // OPDATER SLIDER VED NYE ELEMENTER
  export function updateSlider() {
    document.querySelectorAll('.sliderSection').forEach(slider => {
      if (typeof slider.update === 'function') {
        slider.update();
      }
    });
  }
  
  // AKTIV KLASSE PÅ NAVIGATION LINK
  export function navActive() {
    document.addEventListener('DOMContentLoaded', () => {
      const currentUrl = window.location.href;
      document.querySelectorAll('.navLink a').forEach(link => {
        if (currentUrl.includes(link.href)) {
          link.parentElement.classList.add('navActive');
        }
      });
    });
  }
  
  // SKIFTER VIDEO I HERO AFHÆNGIGT AF SKÆRMSTØRRELSE
  export function heroSwapper() {
    function swapHero(e) {
      const wrapper = document.getElementById("heroWrapper");
      if (!wrapper) return;
  
      if (e.matches) {
        wrapper.innerHTML = `<video autoplay muted loop playsinline id="heroVideo" src="./assets/img/HeaderVideo.mov"></video>`;
      } else {
        wrapper.innerHTML = `<video autoplay muted loop playsinline id="heroVideo" src="./assets/img/MassageHundLMHundeOgHestefokus.mov"></video>`;
      }
    }
  
    const mediaQuery = window.matchMedia("(min-width: 1100px)");
    swapHero(mediaQuery);
    mediaQuery.addEventListener("change", swapHero);
  }

  // Funktion til at lave modal med information fra data
export function modal(data) {
    // Find alle kort med klassen 'dogSlide'
    const cards = document.querySelectorAll('.dogSlide');
  
    // Find det ene dialog element med klassen 'modal' i HTML
    const modalDialog = document.querySelector('dialog.modal');
    if (!modalDialog) return; // Stop hvis dialogen ikke findes
  
    // Map af kort-klasse til index i data-arrayet
    const dataMap = {
      cardSmag: 0,
      cardRally: 1,
      cardHvalp: 2,
      cardNW: 3,
      cardSpor: 4,
      cardHF: 5,
    };
  
    // Lyt på klik for hvert enkelt kort
    cards.forEach(card => {
      card.addEventListener('click', () => {
       // Hent alle nøgler fra dataMap som en array af klasse-navne: ["cardSmag", "cardRally", "cardHvalp", "cardNW", "cardSpor", "cardHF"]
// Find det første klasse-navn (c) i arrayet hvor det aktuelle kort (card) indeholder denne klasse
const cardClass = Object.keys(dataMap).find(c => card.classList.contains(c));
  
        // Find data indeks ud fra kortklassen
        const index = dataMap[cardClass];
  
        // Hent det relevante data element
        const item = data[index];
        if (!item) return; // Stop hvis data mangler
  
        // Indsæt modal indhold baseret på data
        modalDialog.innerHTML = `
         <div class="modalContent">
        <button class="closeBtn" aria-label="Luk modal">&times;</button>
        <h3 class="modalTitle">${item.acf.overskrift}</h3>
        <div class = "modalFlex">
            <div class = "modalImgContainer">
            <img class="modalImage" src="${item.acf.billede.url}" alt="${item.acf.billede.alt}" loading="lazy">
            </div> 
            <div class = "rightGrid">
                <div class = "varighed">
                    <h4>${item.acf.varighed_overskrift}</h4>
                    <p>${item.acf.varighed_brodtekst}</p>
                </div>
                    <div class = "pris">
                    <h4>${item.acf.pris_overskrift}</h4>
                    <p>${item.acf.pris_brodtekst}</p>
                </div>
                <div class = "lokation">
                    <h4>${item.acf.lokation_overskrift}</h4>
                    <p>${item.acf.lokation_brodtekst}</p>
                </div>
                <div class = "dato">
                    <h4>${item.acf.dato_overskrift}</h4>
                    <p>${item.acf.dato_brodtekst}</p>
                </div>
            </div>
        </div>
        <p class = "modalText">${item.acf.brodtekst}</p>
        <p class = "modalText">${item.acf.ny_linje_med_tekst}</p>
        ${
            item.acf.punkter ? 
            `<ul class="punkter">
            ${item.acf.punkter.punkt_1 ? `<li>${item.acf.punkter.punkt_1}</li>` : ''}
            ${item.acf.punkter.punkt_2 ? `<li>${item.acf.punkter.punkt_2}</li>` : ''}
            ${item.acf.punkter.punkt_3 ? `<li>${item.acf.punkter.punkt_3}</li>` : ''}
            </ul>` 
            : ''
        }
        <p class = "modalText">${item.acf.ny_linje_med_tekst_2}</p>
        
        <button class = "cta">Styrk jeres bånd her!</button>
        </div>
        `
  
        // Vis modal dialogen
        modalDialog.showModal();
  
        // Luk modal når krydsknappen trykkes
        modalDialog.querySelector('.closeBtn').addEventListener('click', () => {
          modalDialog.close();
        });
  
        // Luk modal hvis man klikker udenfor modal-indholdet (på overlay)
        modalDialog.addEventListener('click', e => {
          if (e.target === modalDialog) {
            modalDialog.close();
          }
        });
  
        // Luk modal hvis ESC tasten trykkes
        function escListener(e) {
          if (e.key === 'Escape') {
            modalDialog.close();
            window.removeEventListener('keydown', escListener);
          }
        }
        window.addEventListener('keydown', escListener);
      });
    });
  }