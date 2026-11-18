import { useState } from 'react'
import './App.css'

function App() {
  //useStates
  //akt. stav pocitadla
  const [pocitadlo, setPocitadlo] = useState(0);
  //rezim 2x
  const [dvakrat, setDvakrat] = useState(false);

  //"old-school" konstanta se da taky pouzit
  const MAX_POCITADLO = 10;
  const MIN_POCITADLO = -10;

  //arrow function
  const zvysit = () => {
    if(pocitadlo < MAX_POCITADLO) {
      if(dvakrat == true) {
        setPocitadlo(pocitadlo + 2);
      } else {
        setPocitadlo(pocitadlo + 1);
      }
    }
  };

  //klasicka funkce
  function snizit() {
    if(pocitadlo > MIN_POCITADLO) {
      if(dvakrat == true) {
        setPocitadlo(pocitadlo - 2);
      } else {
        setPocitadlo(pocitadlo - 1);
      }
    }
  }

  //---

  return (
    <div>
      <h1>React Counter</h1>
      <p>Aktuální stav počítadla je: {pocitadlo}</p>
      <button 
        onClick={zvysit}
        disabled={pocitadlo >= MAX_POCITADLO}
      >
          Pridat
      </button>
      &nbsp;&nbsp;
      <button 
        onClick={snizit}
        disabled={pocitadlo <= MIN_POCITADLO}
      >
        Ubrat
      </button>
      <br />
      <br />
      <button onClick={() => setPocitadlo(0)}>Reset</button>
      <br />
      <br />
      Double: <input
        type="checkbox"
        checked={dvakrat}
        onChange={() => setDvakrat(!dvakrat)}
      />
    </div>
  )
}

export default App
