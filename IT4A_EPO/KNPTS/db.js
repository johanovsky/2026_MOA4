const DB_NAME = "KNPTSAppDB";
const DB_VERSION = 1;
const STORE_NAME = "games";
 
let db = null;
 
function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
 
    request.onupgradeneeded = (event) => {
      const database = event.target.result;
 
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        const store = database.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
      }
    };
 
    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };
 
    request.onerror = (event) => reject(event.target.error);
  });
}
 
function addGame(player, cpu, result) {
  return new Promise((resolve, reject) => {
 
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
 
    //objekt pro zaznam jedne hry
    const game = {
      player: player,
      cpu: cpu,
      result: result
    };
 
    const request = store.add(game);
 
    request.onsuccess = () => resolve(true);
 
    request.onerror = (event) => {
      if (event.target.error.name === "ConstraintError") {
        alert("Duplicita");
        resolve(false); // toto by nemelo nastat
      } else {
        reject(event.target.error);
      }
    };
  });
}
 
function getAllGames() {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
 
    const request = store.getAll(); // nesetříděná data
 
    request.onsuccess = () => resolve(request.result);
 
    request.onerror = (event) => reject(event.target.error);
  });
}
 
function deleteAllGames() {
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        //smazeme vsechna data v dane STORE (tabulce)
        const request = store.clear();
 
        request.onsuccess = () => resolve(true);
        
        request.onerror = (event) => reject(event.target.error);
    });
}
 
// vystavíme funkce globálně, aby byly dostupné v main.js
window.initDB = initDB;
window.addGame = addGame;
window.getAllGames = getAllGames;
window.deleteAllGames = deleteAllGames;