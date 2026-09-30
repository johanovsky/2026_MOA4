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
let hrac_score = 0;
let pocitac_score = 0;

function hraj() {
    //stazeni volby hrace
    const hrac = document.querySelector("input[name='hrac']:checked").value;
    //kontrolni vypis
    console.log("Hrac zvolil: " + hrac);

    //pocitac vybira nahodne
    //pole moznych voleb
    const volby = ["Kámen", "Nůžky", "Papír", "Tapír", "Spock"];
    //vyberu nah. index v poli
    const index = Math.floor(Math.random() * volby.length);
    const pocitac = volby[index];
    //kontrolni vypis
    console.log("Pocitac zvolil: " + pocitac);
    //vypiseme volbu pocitace do jeho divu
    document.getElementById("cpu_label").innerText = pocitac;

    //vyhodnoceni hry
    switch(pocitac) {
        case "Kámen":
            switch(hrac) {
                case "Nůžky":
                case "Tapír":
                    //PROHRA
                    document.getElementById("result_label").innerText = "PROHRA";
                    //zvyseni score pocitaci
                    pocitac_score++;
                    //ulozime score do localStorage
                    localStorage.setItem("pocitac_score", pocitac_score);
                    break;
                case "Papír":
                case "Spock":
                    //VYHRA
                    document.getElementById("result_label").innerText = "VÝHRA";
                    //zvyseni score
                    hrac_score++;
                    //ulozime score do localStorage
                    localStorage.setItem("hrac_score", hrac_score);
                    break;
                default:
                    //REMIZA
                    document.getElementById("result_label").innerText = "REMÍZA";
                    break;
            }
            break;
        case "Nůžky":
            switch(hrac) {
                case "Papír":
                case "Tapír":
                    //PROHRA
                    document.getElementById("result_label").innerText = "PROHRA";
                    //zvyseni score pocitaci
                    pocitac_score++;
                    //ulozime score do localStorage
                    localStorage.setItem("pocitac_score", pocitac_score);
                    break;
                case "Kámen":
                case "Spock":
                    //VYHRA
                    document.getElementById("result_label").innerText = "VÝHRA";
                    //zvyseni score
                    hrac_score++;
                    //ulozime score do localStorage
                    localStorage.setItem("hrac_score", hrac_score);
                    break;
                default:
                    //REMIZA
                    document.getElementById("result_label").innerText = "REMÍZA";
                    break;
            }
            break;
        case "Papír":
            switch(hrac) {
                case "Kámen":
                case "Spock":
                    //PROHRA
                    document.getElementById("result_label").innerText = "PROHRA";
                    //zvyseni score pocitaci
                    pocitac_score++;
                    //ulozime score do localStorage
                    localStorage.setItem("pocitac_score", pocitac_score);
                    break;
                case "Nůžky":
                case "Tapír":
                    //VYHRA
                    document.getElementById("result_label").innerText = "VÝHRA";
                    //zvyseni score
                    hrac_score++;
                    //ulozime score do localStorage
                    localStorage.setItem("hrac_score", hrac_score);
                    break;
                default:
                    //REMIZA
                    document.getElementById("result_label").innerText = "REMÍZA";
                    break;
            }
            break;
        case "Tapír":
            switch(hrac) {
                case "Papír":
                case "Spock":
                    //PROHRA
                    document.getElementById("result_label").innerText = "PROHRA";
                    //zvyseni score pocitaci
                    pocitac_score++;
                    //ulozime score do localStorage
                    localStorage.setItem("pocitac_score", pocitac_score);
                    break;
                case "Kámen":
                case "Nůžky":
                    //VYHRA
                    document.getElementById("result_label").innerText = "VÝHRA";
                    //zvyseni score
                    hrac_score++;
                    //ulozime score do localStorage
                    localStorage.setItem("hrac_score", hrac_score);
                    break;
                default:
                    //REMIZA
                    document.getElementById("result_label").innerText = "REMÍZA";
                    break;
            }
            break;
        case "Spock":
            switch(hrac) {
                case "Kámen":
                case "Nůžky":
                    //PROHRA
                    document.getElementById("result_label").innerText = "PROHRA";
                    //zvyseni score pocitaci
                    pocitac_score++;
                    //ulozime score do localStorage
                    localStorage.setItem("pocitac_score", pocitac_score);
                    break;
                case "Papír":
                case "Tapír":
                    //VYHRA
                    document.getElementById("result_label").innerText = "VÝHRA";
                    //zvyseni score
                    hrac_score++;
                    //ulozime score do localStorage
                    localStorage.setItem("hrac_score", hrac_score);
                    break;
                default:
                    //REMIZA
                    document.getElementById("result_label").innerText = "REMÍZA";
                    break;
            }
            break;
    }
}

//funkce pri nacteni stranky
window.onload = function() {
    //nacteme do promennych score z localStorage
    hrac_score = parseInt(localStorage.getItem("hrac_score"));
    pocitac_score = parseInt(localStorage.getItem("pocitac_score"));
    //kontrolni vypis
    console.log("Nactene score: " + hrac_score + " - " + pocitac_score);
    //kontrola nacteni
    if(isNaN(hrac_score) || isNaN(pocitac_score)) {
        //alespon jedno skore nemam -> default 0:0
        hrac_score = 0;
        localStorage.setItem("hrac_score", hrac_score);
        pocitac_score = 0;
        localStorage.setItem("pocitac_score", pocitac_score);
        console.log("Default score 0:0");
    }

}