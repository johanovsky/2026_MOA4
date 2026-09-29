//promenne pro nacteni score
let hrac_score = 0;
let pocitac_score = 0;

//po nacteni stranky
window.onload = function() {
    //nacteme score z localStorage
    hrac_score = parseInt(localStorage.getItem("hrac_score"));
    pocitac_score = parseInt(localStorage.getItem("pocitac_score"));
    //kontrolni vypis
    console.log("Nactene score: " + hrac_score + " - " + pocitac_score);
    //kdyz nemam obe skore -> default 0:0
    if(isNaN(hrac_score) || isNaN(pocitac_score)) {
        //chybi alespon jedno score -> 0:0
        hrac_score = 0;
        localStorage.setItem("hrac_score", hrac_score);
        pocitac_score = 0;
        localStorage.setItem("pocitac_score", pocitac_score);
        //kontrolni vypis
        console.log("Score -> default 0:0");
    }
    //zobrazime score
    document.getElementById("score_label").innerText = hrac_score + " : " + pocitac_score;
}