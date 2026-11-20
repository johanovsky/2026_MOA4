const DB_NAME = "KNPTSAppDB";
const DB_VERSION = 1;
const STORE_NAME = "games";

let db = null;
let dbPromise = null;

function initDB() {
    if (db) return Promise.resolve(db);
    if (dbPromise) return dbPromise;
    if (!("indexedDB" in window)) {
        return Promise.reject(new Error("IndexedDB není v tomto prohlížeči dostupné."));
    }

    dbPromise = new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = event => {
            const database = event.target.result;
            if (!database.objectStoreNames.contains(STORE_NAME)) {
                database.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
            }
        };

        request.onsuccess = event => {
            db = event.target.result;
            db.onversionchange = () => {
                db.close();
                db = null;
                dbPromise = null;
            };
            resolve(db);
        };

        request.onerror = () => {
            dbPromise = null;
            reject(request.error || new Error("Databázi se nepodařilo otevřít."));
        };

        request.onblocked = () => {
            reject(new Error("Aktualizaci databáze blokuje jiné otevřené okno."));
        };
    });

    return dbPromise;
}

async function addGame(player, cpu, result) {
    // Vytvoříme objekt hry a uložíme ho do databáze.
    await initDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        tx.objectStore(STORE_NAME).add({
            hrac: player,
            pocitac: cpu,
            result,
            timestamp: Date.now()
        });
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => reject(tx.error || new Error("Hru se nepodařilo uložit."));
        tx.onabort = () => reject(tx.error || new Error("Ukládání hry bylo přerušeno."));
    });
}

async function getAllGames() {
    await initDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readonly");
        const request = tx.objectStore(STORE_NAME).getAll();
        let games = [];
        request.onsuccess = () => {
            games = request.result || [];
        };
        tx.oncomplete = () => resolve(games.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0)));
        tx.onerror = () => reject(tx.error || new Error("Historii se nepodařilo načíst."));
        tx.onabort = () => reject(tx.error || new Error("Načítání historie bylo přerušeno."));
    });
}

async function deleteAllGames() {
    await initDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        tx.objectStore(STORE_NAME).clear();
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => reject(tx.error || new Error("Historii se nepodařilo smazat."));
        tx.onabort = () => reject(tx.error || new Error("Mazání historie bylo přerušeno."));
    });
}

// Vystavíme funkce globálně, aby byly dostupné i v index.js a score.js.
window.initDB = initDB;
window.addGame = addGame;
window.getAllGames = getAllGames;
window.deleteAllGames = deleteAllGames;
