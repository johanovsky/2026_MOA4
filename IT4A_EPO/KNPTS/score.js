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
        //inicializace DB
        await initDB();
        //vypis her z historie
        //najdeme div pro vypis historie
        const div = document.getElementById("history_label");
        //z DB nacteme celou historii
        const history = await getAllGames();
        //test na pocet prvku
        if(history.length === 0) {
            //smutny vypis
            div.innerText = "Nemate zadne hry v historii";
        } else {
            //mame alespon jednu hru -> budeme vypisovat
            //zacneme seznam
            let seznam = "<ul>";
            //naplnime seznam polozkama
            for(let i = 0; i < history.length; i++) {
                seznam += "<li>" + history[i].player + " : " + history[i].cpu + " - " + history[i].result + "</li>";
            }
            //uzavreme seznam
            seznam += "</ul>";
            //slepeny HTML seznam vlozime do divu
            div.innerHTML = seznam;
        }
    } catch(error) {
        console.log("Chyba pri inicializaci, nebo pri cteni z DB");
    }
}

//zkracena verze
async function reset() {
    //nastavime obe skore na 0
    player_score = 0;
    pocitac_score = 0;
    //ulozime do localStorage
    localStorage.setItem("player_score", player_score);
    localStorage.setItem("pocitac_score", pocitac_score);
    //zobrazime zresetovane score - ve zkracene verzi to nepotrebuju
    //document.getElementById("score_label").innerText = player_score + " : " + pocitac_score;
    //smazeme vsechny zaznamy v DB
    await deleteAllGames();
    //prepiseme div s historii - ve zkracene verzi to nepotrebuju
    //document.getElementById("history_label").innerText = "Nemate zadne hry v historii";
    //ve zkracene verzi refreshnu stranku
    location.reload();
}