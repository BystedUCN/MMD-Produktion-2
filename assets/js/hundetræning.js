import {burger, slider, getData, navActive, updateSlider} from "./app.js";
burger();
navActive()

getData()
init();


async function init() {
    const data = await getData();
    generateSlide(data)
    function generateSlide(data) {
        console.log('data:', data)
        const sporEl = document.querySelector(".cardSpor")
        
        const cardEl = data[0]    
        sporEl.innerHTML = ""
        sporEl.innerHTML = `
        <div class="sliderContent">
        <div id="træningCardImg">
        <img loading="lazy" class="sliderImg" src="${cardEl.acf.billede.url}" alt="Hvalpetræning">
        </div>
        <h3>${cardEl.acf.overskrift}</h3>
        <p class="sliderTxt">${cardEl.acf.brodtekst}</p> 
        
        </div>
        `
    }
    slider();       // Opsæt slider (dots, pile osv)
    updateSlider(); // Opdater navigationen til at matche de nye slides
}



slider()
updateSlider()
