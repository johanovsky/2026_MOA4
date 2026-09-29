if ("serviceWorker" in navigator) {
    window.addEventListener("load", ()=> {
        navigator.serviceWorker.register("sw.js")
        .then(registration => {
            console.log("Service worker registered");
        })
        .catch(error => {
            console.log("Registration failed: ", error);
        });
    });
}

//pomocne promenne pro skore
let hrac_score = 0;
let pocitac_score = 0;

function hraj() {
    //volba hrace -> nalezeni vybraneho radio-buttonu
    const hrac = document.querySelector("input[name='hrac']:checked").value;
    //kontrolni vypis
    console.log("Hrac zvolil: " + hrac);
    //volba pocitace -> nahodne
    //pole moznych voleb
    const volby = ["Kámen", "Nůžky", "Papír", "Tapír", "Spock"];
    //nahodny vyber
    const index = Math.floor(Math.random() * volby.length);
    const pocitac = volby[index];
    //vypis volby pocitace
    document.getElementById("cpu_label").innerText = pocitac;
    //kontrolni vypis
    console.log("Pocitac zvolil: " + pocitac);

    //vyhodnoceni
    switch(pocitac) {
        case "Kámen":
            switch(hrac) {
                case "Nůžky":
                case "Tapír":
                    //PROHRA
                    document.getElementById("result_label").innerText = "PROHRA";
                    //zvysime skore pocitaci
                    pocitac_score++;
                    //ulozime do localStorage
                    localStorage.setItem("pocitac_score", pocitac_score);
                    break; 
                case "Papír":
                case "Spock":
                    //VYHRA
                    document.getElementById("result_label").innerText = "VÝHRA";
                    //zvysime skore hraci
                    hrac_score++;
                    //ulozime do localStorage
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
                    //zvysime skore pocitaci
                    pocitac_score++;
                    //ulozime do localStorage
                    localStorage.setItem("pocitac_score", pocitac_score);
                    break; 
                case "Kámen":
                case "Spock":
                    //VYHRA
                    document.getElementById("result_label").innerText = "VÝHRA";
                    //zvysime skore hraci
                    hrac_score++;
                    //ulozime do localStorage
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
                    //zvysime skore pocitaci
                    pocitac_score++;
                    //ulozime do localStorage
                    localStorage.setItem("pocitac_score", pocitac_score);
                    break; 
                case "Nůžky":
                case "Tapír":
                    //VYHRA
                    document.getElementById("result_label").innerText = "VÝHRA";
                    //zvysime skore hraci
                    hrac_score++;
                    //ulozime do localStorage
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
                    //zvysime skore pocitaci
                    pocitac_score++;
                    //ulozime do localStorage
                    localStorage.setItem("pocitac_score", pocitac_score);
                    break; 
                case "Kámen":
                case "Nůžky":
                    //VYHRA
                    document.getElementById("result_label").innerText = "VÝHRA";
                    //zvysime skore hraci
                    hrac_score++;
                    //ulozime do localStorage
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
                    //zvysime skore pocitaci
                    pocitac_score++;
                    //ulozime do localStorage
                    localStorage.setItem("pocitac_score", pocitac_score);
                    break; 
                case "Papír":
                case "Tapír":
                    //VYHRA
                    document.getElementById("result_label").innerText = "VÝHRA";
                    //zvysime skore hraci
                    hrac_score++;
                    //ulozime do localStorage
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

//funkce po nacteni stranky
window.onload = function() {
    //nacteme score z localStorage
    hrac_score = parseInt(localStorage.getItem("hrac_score"));
    pocitac_score = parseInt(localStorage.getItem("pocitac_score"));
    //kontrolni vypis
    console.log("Nactene score: " + hrac_score + " - " + pocitac_score);
    //kdyz alespon jedno skore nemam, tak default -> 0:0
    if(isNaN(hrac_score) || isNaN(pocitac_score)) {
        //jedno score je spatne -> default
        hrac_score = 0;
        localStorage.setItem("hrac_score", hrac_score);
        pocitac_score = 0;
        localStorage.setItem("pocitac_score", pocitac_score);
        console.log("Chyba pri nacitani score -> default 0:0");
    }

}