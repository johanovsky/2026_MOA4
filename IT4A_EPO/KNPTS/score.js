//promenne pro skore
let player_score = 0;
let pocitac_score = 0;

//metoda po nacteni stranky
window.onload = async function() {
    //nacteme score z localStorage
    player_score = parseInt(localStorage.getItem("player_score"));
    pocitac_score = parseInt(localStorage.getItem("pocitac_score"));
    //kontrolni vypis
    console.log("Nactene skore: player: " + player_score + " - cpu: " + pocitac_score);
    //kdyz nemam obe hodnoty -> chyba -> reset
    if(isNaN(player_score) || isNaN(pocitac_score)) {
        console.log("Chyba pri nacitani score -> reset 0:0");
        player_score = 0;
        pocitac_score = 0;
        //ulozime zresetovane skore do localStorage
        localStorage.setItem("player_score", player_score);
        localStorage.setItem("pocitac_score", pocitac_score);
    }
    //zobrazime nactene / resetovane skore
    document.getElementById("score_label").innerText = player_score + " : " + pocitac_score;
    //priprava Indexed DB
    try {
        await initDB();
    } catch(error) {
        console.log("Chyba pri inicializaci DB");
    }
}

async function reset() {
    //nastavime obe skore na 0
    player_score = 0;
    pocitac_score = 0;
    //ulozime do localStorage
    localStorage.setItem("player_score", player_score);
    localStorage.setItem("pocitac_score", pocitac_score);
    //zobrazime zresetovane score
    document.getElementById("score_label").innerText = player_score + " : " + pocitac_score;
    //smazeme vsechny zaznamy v DB
    await deleteAllGames();
}