//promenne pro nacteni score
let hrac_score = 0;
let pocitac_score = 0;

//funkce po nacteni stranky
window.onload = function() {
    //nacteme score z localStorage
    hrac_score = parseInt(localStorage.getItem("hrac_score"));
    pocitac_score = parseInt(localStorage.getItem("pocitac_score"));
    //kontrolni vypis
    console.log("Nactene score: " + hrac_score + " : " + pocitac_score);
    //kontrola nacteni
    if(isNaN(hrac_score) || isNaN(pocitac_score)) {
        //minimalne jedno score nemam -> default 0:0
        hrac_score = 0;
        localStorage.setItem("hrac_score", hrac_score);
        pocitac_score = 0;
        localStorage.setItem("pocitac_score", pocitac_score);
        console.log("Neplatne score -> default 0:0");
    }
    //nactene score zobrazime
    document.getElementById("score_label").innerText = hrac_score + " : " + pocitac_score;
}