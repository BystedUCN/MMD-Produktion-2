import {burger, slider, getData, navActive, updateSlider, modal} from "./app.js";
burger();
navActive();
getData();
init();


async function init() {
    const data = await getData();
    generateSlides(data)
    function generateSlides(data) {
        console.log('data:', data)
        const hvalpCard = document.querySelector(".cardHvalp")
        
        const hvalpeEl = data[7]    
        hvalpCard.innerHTML = ""
        hvalpCard.innerHTML = `
        <div class="sliderContent">
        <div id="træningCardImg">
        <img loading="lazy" class="sliderImg" src="${hvalpeEl.acf.billede.url}" alt="${hvalpeEl.acf.billede.alt}">
        </div>
        <h3>${hvalpeEl.acf.overskrift}</h3>
        <p class="sliderTxt">${hvalpeEl.acf.brodtekst}</p> 
        
        </div>
        `
        const smagCard = document.querySelector(".cardSmag")
        const smagEl = data[8]
        smagCard.innerHTML = ""
        smagCard.innerHTML = `
        <div class="sliderContent">
        <div id="træningCardImg">
        <img loading="lazy" class="sliderImg" src="${smagEl.acf.billede.url}" alt="${smagEl.acf.billede.alt}">
        </div>
        <h3>${smagEl.acf.overskrift}</h3>
        <p class="sliderTxt">${smagEl.acf.brodtekst}</p> 
        
        </div>
        `

        const rallyCard = document.querySelector(".cardRally")
        const rallyEl = data[9]
        rallyCard.innerHTML = ""
        rallyCard.innerHTML = `
        <div class="sliderContent">
        <div id="træningCardImg">
        <img loading="lazy" class="sliderImg" src="${rallyEl.acf.billede.url}" alt="${rallyEl.acf.billede.alt}">
        </div>
        <h3>${rallyEl.acf.overskrift}</h3>
        <p class="sliderTxt">${rallyEl.acf.brodtekst}</p> 
        
        </div>
        `

        const HFCard = document.querySelector(".cardHF")
        const HFEl = data[10]
        HFCard.innerHTML = ""
        HFCard.innerHTML = `
        <div class="sliderContent">
        <div id="træningCardImg">
        <img loading="lazy" class="sliderImg" src="${HFEl.acf.billede.url}" alt="${HFEl.acf.billede.alt}">
        </div>
        <h3>${HFEl.acf.overskrift}</h3>
        <p class="sliderTxt">${HFEl.acf.brodtekst}</p> 
        
        </div>
        `
        const sporCard = document.querySelector(".cardSpor")
        const sporEl = data[6]
        sporCard.innerHTML = ""
        sporCard.innerHTML = `
        <div class="sliderContent">
        <div id="træningCardImg">
        <img loading="lazy" class="sliderImg" src="${sporEl.acf.billede.url}" alt="${sporEl.acf.billede.alt}">
        </div>
        <h3>${sporEl.acf.overskrift}</h3>
        <p class="sliderTxt">${sporEl.acf.brodtekst}</p> 
        
        </div>
        `

        const NWCard = document.querySelector(".cardNW")
        const NWCardEl = data[11]
        NWCard.innerHTML = ""
        NWCard.innerHTML = `
        <div class="sliderContent">
        <div id="træningCardImg">
        <img loading="lazy" class="sliderImg" src="${NWCardEl.acf.billede.url}" alt="${NWCardEl.acf.billede.alt}">
        </div>
        <h3>${NWCardEl.acf.overskrift}</h3>
        <p class="sliderTxt">${NWCardEl.acf.brodtekst}</p> 
        
        </div>
        `

    }
    slider();       // Opsæt slider (dots, pile osv)
    updateSlider(); // Opdater navigationen til at matche de nye slides
    modal(data);
}



// slider()
// updateSlider()
