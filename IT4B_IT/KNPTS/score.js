//promenne pro nacteni score
let hrac_score = 0;
let pocitac_score = 0;

//funkce po nacteni stranky
window.onload = async function() {
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

    //DB
    try {
        //inicializace
        await initDB();

        //nacteni vsech zaznamu z DB
        const hry = await getAllGames();
        //najdeme div pro vypis historie
        const div = document.getElementById("history_label");
        //kontrola poctu ulozenych her
        if(hry.length === 0) {
            //nemame zadne hry
            div.innerText = "Nemate ulozene zadne hry";
        } else {
            //nejmene jedna hra je ulozena
            //vytvorime HTML seznam s hrami
            let seznam = "<ul>";
            //naplnime seznamem her
            for(let i = 0; i < hry.length; i++) {
                seznam += "<li>" + hry[i].hrac + " : " + hry[i].pocitac + " - " 
                + hry[i].result + "</li>\n";
            }
            //ukoncime seznam
            seznam += "</ul>";
            //seznam vlozime jako HTML do divu
            div.innerHTML = seznam;
        }
    } catch(error) {
        console.log("Chyba pri inicializaci DB: ", error);
    }
}

async function reset() {
    //hrac i pocitac -> score 0:0
    hrac_score = 0;
    pocitac_score = 0;
    //ulozime do localStorage
    localStorage.setItem("hrac_score", hrac_score);
    localStorage.setItem("pocitac_score", pocitac_score);
    //smazeme obsah DB
    await deleteAllGames();
    //refresh stranky
    location.reload();
}