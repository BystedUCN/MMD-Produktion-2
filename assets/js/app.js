// Der benyttes ES6 til effektivt at importere og exportere funktioner på tværs af vores .js documenter. Alle vores functioner defineres herinde i app.js og kommer til at starte med export foran funktionsdefinationen altså: 
// export function functionName() {}; for at imortere funktionerne i et et andet .js dokument benyttes import {functionName, functionName2} from "./app.js"; Har fundet det her:https://www.w3schools.com/js/js_modules.asp
export function functionName () {
    console.log("Hello world")
}

// Link til slider https://www.w3schools.com/howto/howto_js_quotes_slideshow.asp