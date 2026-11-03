if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register(new URL("sw.js", document.baseURI).href).catch(error => {
            console.error("Registrace service workeru selhala:", error);
        });
    });
}

// Proměnné pro počítání skóre.
let hrac_score = 0;
let pocitac_score = 0;
let gameInProgress = false;

function loadScore(key) {
    try {
        const raw = localStorage.getItem(key);
        if (raw === null || raw.trim() === "") return 0;
        const value = Number(raw);
        return Number.isSafeInteger(value) && value >= 0 ? value : 0;
    } catch (error) {
        console.error("Úložiště skóre není dostupné:", error);
        return 0;
    }
}

function saveScores() {
    try {
        localStorage.setItem("hrac_score", String(hrac_score));
        localStorage.setItem("pocitac_score", String(pocitac_score));
        return true;
    } catch (error) {
        console.error("Skóre se nepodařilo uložit:", error);
        return false;
    }
}

async function hraj() {
    // Zabráníme spuštění další hry, dokud se aktuální hra neuloží.
    const button = document.getElementById("play_btn");
    if (gameInProgress || !button || button.disabled) return;

    const selected = document.querySelector("input[name='hrac']:checked");
    if (!selected) return;

    gameInProgress = true;
    button.disabled = true;

    try {
        await initDB();

        // Načteme volbu hráče a počítač vybere náhodnou možnost.
        const hrac = selected.value;
        const volby = ["Kámen", "Nůžky", "Papír", "Tapír", "Spock"];
        const pocitac = volby[Math.floor(Math.random() * volby.length)];
        // Pravidla hry: každá volba poráží právě dvě jiné volby.
        const beats = {
            "Kámen": ["Nůžky", "Tapír"],
            "Nůžky": ["Papír", "Tapír"],
            "Papír": ["Kámen", "Spock"],
            "Tapír": ["Papír", "Spock"],
            "Spock": ["Kámen", "Nůžky"]
        };

        // Vyhodnocení hry.
        const result = hrac === pocitac ? "REMÍZA" : beats[hrac].includes(pocitac) ? "VÝHRA" : "PROHRA";

        // Výsledek nejprve uložíme do databáze, až poté upravíme skóre.
        await addGame(hrac, pocitac, result);

        // Aktualizujeme skóre a uložíme ho do localStorage.
        if (result === "VÝHRA") hrac_score++;
        if (result === "PROHRA") pocitac_score++;
        saveScores();

        // Zobrazíme volbu počítače a výsledek hry.
        document.getElementById("cpu_label").textContent = pocitac;
        document.getElementById("result_label").textContent = result;
    } catch (error) {
        console.error("Hru se nepodařilo dokončit:", error);
        document.getElementById("result_label").textContent = "Hru se nepodařilo uložit. Zkuste to znovu.";
    } finally {
        gameInProgress = false;
        button.disabled = false;
    }
}

// Po načtení stránky obnovíme skóre a inicializujeme databázi.
window.addEventListener("DOMContentLoaded", async () => {
    hrac_score = loadScore("hrac_score");
    pocitac_score = loadScore("pocitac_score");
    saveScores();

    const button = document.getElementById("play_btn");
    if (button) button.disabled = true;

    try {
        await initDB();
        if (button) button.disabled = false;
    } catch (error) {
        console.error("Chyba při inicializaci databáze:", error);
        document.getElementById("result_label").textContent = "Databáze není dostupná. Hru nelze bezpečně uložit.";
    }
});
