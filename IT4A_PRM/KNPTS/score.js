//promenne pro nacteni score
let hrac_score = 0;
let pocitac_score = 0;

//po nacteni stranky
window.onload = async function() {
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

    try {
        //inicializace DB
        await initDB();
        //zobrazeni historie
        //najdeme si div pro zobrazeni historie
        const div = document.getElementById("history_label");
        //nacteme celou historii
        const historie = await getAllGames();
        //kontrola poctu her
        if(historie.length === 0) {
            div.innerText = "Zadne hry v historii";
        } else {
            //mam alesponj jednu hru v historii
            //zacneme vytvaret seznam
            let seznam = "<ul>";
            //projdeme vsechny hry a naplnime seznam
            for(let i = 0; i < historie.length; i++) {
                seznam += "<li>" + historie[i].hrac + " : " 
                    + historie[i].cpu + " - " + historie[i].result + "</li>";
            }
            //ukoncime seznam
            seznam += "</ul>";
            //vytvoreny seznam vlozime do divu jako HTML
            div.innerHTML = seznam;
        }
    } catch(error) {
        console.log("Chyba pri inicializaci DB", error);
    }
}

async function reset() {
    //resetujeme score
    hrac_score = 0;
    pocitac_score = 0;
    //ulozime score do localStorage
    localStorage.setItem("hrac_score", hrac_score);
    localStorage.setItem("pocitac_score", pocitac_score);

    //smazeme vsechny zaznamy z DB
    await deleteAllGames();

    //vynutim refresh stranky
    location.reload();
}