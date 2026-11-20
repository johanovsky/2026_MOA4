// Proměnné pro načtení skóre.
let hrac_score = 0;
let pocitac_score = 0;
let resetInProgress = false;

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

// Vypíšeme historii her bezpečně pomocí DOM metod a textContent.
function displayHistory(games, container) {
    if (!games.length) {
        container.textContent = "Nemáte uložené žádné hry.";
        return;
    }

    const list = document.createElement("ul");
    games.forEach(game => {
        const item = document.createElement("li");
        const date = Number.isFinite(game.timestamp)
            ? new Date(game.timestamp).toLocaleString("cs-CZ")
            : "";
        item.textContent = `${game.hrac} : ${game.pocitac} - ${game.result}${date ? " (" + date + ")" : ""}`;
        list.appendChild(item);
    });
    container.replaceChildren(list);
}

// Po načtení stránky načteme skóre a historii z databáze.
window.addEventListener("DOMContentLoaded", async () => {
    hrac_score = loadScore("hrac_score");
    pocitac_score = loadScore("pocitac_score");
    document.getElementById("score_label").textContent = `${hrac_score} : ${pocitac_score}`;

    const history = document.getElementById("history_label");
    const resetButton = document.getElementById("reset_btn");
    if (resetButton) resetButton.disabled = true;

    try {
        await initDB();
        const games = await getAllGames();
        displayHistory(games, history);
        if (resetButton) resetButton.disabled = false;
    } catch (error) {
        console.error("Historii se nepodařilo načíst:", error);
        history.textContent = "Historii se nepodařilo načíst.";
    }
});

async function reset() {
    // Hráč i počítač začínají znovu se skóre 0:0; historii smažeme před obnovením stránky.
    const button = document.getElementById("reset_btn");
    if (resetInProgress || (button && button.disabled)) return;

    resetInProgress = true;
    if (button) button.disabled = true;

    try {
        await deleteAllGames();
        hrac_score = 0;
        pocitac_score = 0;
        localStorage.setItem("hrac_score", "0");
        localStorage.setItem("pocitac_score", "0");
        location.reload();
    } catch (error) {
        console.error("Reset se nepodařil:", error);
        const history = document.getElementById("history_label");
        if (history) history.textContent = "Reset se nepodařil. Zkuste to znovu.";
        resetInProgress = false;
        if (button) button.disabled = false;
    }
}
