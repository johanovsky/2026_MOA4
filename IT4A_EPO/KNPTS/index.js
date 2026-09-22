if("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("sw.js")
        .then(registration => {
            console.log("SW registred with scope: ", registration.scope);
        })
        .catch(error => {
            console.log("SW registration failed: ", error);
        });
    });
}

//promenne pro pocitani score
let player_score = 0;
let pocitac_score = 0;

function hraj() {
    //zjistime co si vybral hrac
    const hrac = document.querySelector("input[name='hrac']:checked").value;
    //kontrolni vypis
    console.log("Volba hrace: " + hrac);

    //pocitac vybere nahodne
    //pole moznych voleb
    const volby = ["Kámen", "Nůžky", "Papír", "Tapír", "Spock"];
    const index = Math.floor(Math.random() * volby.length);
    const pocitac = volby[index];
    //vypiseme volbu pocitace
    document.getElementById("cpu_label").innerText  = pocitac;
    //kontrolni vypis
    console.log("Pocitac nahodne zvolil: " + pocitac);

    //vyhodnoceni vysledku
    switch(pocitac) {
        case "Kámen":
            switch(hrac) {
                case "Nůžky":
                case "Tapír":
                    document.getElementById("result_label").innerText = "PROHRA";
                    //vyhral pocitac
                    pocitac_score++;
                    //ulozime do localStorage
                    localStorage.setItem("pocitac_score", pocitac_score);
                    break;
                case "Papír":
                case "Spock":
                    document.getElementById("result_label").innerText = "VÝHRA";
                    //vyhral hrac
                    player_score++;
                    //ulozime do localStorage
                    localStorage.setItem("player_score", player_score);
                    break;
                default:
                    document.getElementById("result_label").innerText = "REMÍZA";
                    break;
            }
            break;
        case "Nůžky":
            switch(hrac) {
                case "Papír":
                case "Tapír":
                    document.getElementById("result_label").innerText = "PROHRA";
                    //vyhral pocitac
                    pocitac_score++;
                    //ulozime do localStorage
                    localStorage.setItem("pocitac_score", pocitac_score);
                    break;
                case "Kámen":
                case "Spock":
                    document.getElementById("result_label").innerText = "VÝHRA";
                    //vyhral hrac
                    player_score++;
                    //ulozime do localStorage
                    localStorage.setItem("player_score", player_score);
                    break;
                default:
                    document.getElementById("result_label").innerText = "REMÍZA";
                    break;
            }
            break;
        case "Papír":
            switch(hrac) {
                case "Kámen":
                case "Spock":
                    document.getElementById("result_label").innerText = "PROHRA";
                    //vyhral pocitac
                    pocitac_score++;
                    //ulozime do localStorage
                    localStorage.setItem("pocitac_score", pocitac_score);
                    break;
                case "Nůžky":
                case "Tapír":
                    document.getElementById("result_label").innerText = "VÝHRA";
                    //vyhral hrac
                    player_score++;
                    //ulozime do localStorage
                    localStorage.setItem("player_score", player_score);
                    break;
                default:
                    document.getElementById("result_label").innerText = "REMÍZA";
                    break;
            }
            break;
        case "Tapír":
            switch(hrac) {
                case "Papír":
                case "Spock":
                    document.getElementById("result_label").innerText = "PROHRA";
                    //vyhral pocitac
                    pocitac_score++;
                    //ulozime do localStorage
                    localStorage.setItem("pocitac_score", pocitac_score);
                    break;
                case "Nůžky":
                case "Kámen":
                    document.getElementById("result_label").innerText = "VÝHRA";
                    //vyhral hrac
                    player_score++;
                    //ulozime do localStorage
                    localStorage.setItem("player_score", player_score);
                    break;
                default:
                    document.getElementById("result_label").innerText = "REMÍZA";
                    break;
            }
            break;
        case "Spock":
            switch(hrac) {
                case "Kámen":
                case "Nůžky":
                    document.getElementById("result_label").innerText = "PROHRA";
                    //vyhral pocitac
                    pocitac_score++;
                    //ulozime do localStorage
                    localStorage.setItem("pocitac_score", pocitac_score);
                    break;
                case "Papír":
                case "Tapír":
                    document.getElementById("result_label").innerText = "VÝHRA";
                    //vyhral hrac
                    player_score++;
                    //ulozime do localStorage
                    localStorage.setItem("player_score", player_score);
                    break;
                default:
                    document.getElementById("result_label").innerText = "REMÍZA";
                    break;
            }
            break;
    }
}

//pri aktualizaci okna
window.onload = function() {
    //nacteni score z localStorage
    player_score = parseInt(localStorage.getItem("player_score"));
    pocitac_score = parseInt(localStorage.getItem("pocitac_score"));
    //co kdyz nemam alespon jedno skore
    if((isNaN(player_score)) || (isNaN(pocitac_score))) {
        //tak default -> 0:0
        player_score = 0;
        pocitac_score = 0;
        //ulozime default do localStorage
        localStorage.setItem("player_score", player_score);
        localStorage.setItem("pocitac_score", pocitac_score);
    }
}