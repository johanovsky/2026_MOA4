import { useState } from 'react'
import './App.css'

function App() {
  //stavova promenna -> useStates
  const [pocitadlo, setPocitadlo] = useState(0);

  //klasicka "old school" JS konstanta
  const MAX_POCITADLO = 10;
  const MIN_POCITADLO = -10;

  //klas. JS funkce
  function zvysit() {
    if(pocitadlo < MAX_POCITADLO) {
      setPocitadlo(pocitadlo + 1);
    }
  }

  /*
  function snizit() {
    if(pocitadlo > MIN_POCITADLO) {
      setPocitadlo(pocitadlo - 1);
    }
  }
  */

  //arrow function
  const snizit = () => {
    if(pocitadlo > MIN_POCITADLO) {
      setPocitadlo(pocitadlo - 1);
    }
  };

  return (
    <div>
      <h1>React Counter</h1>
      <p>Aktuální hodnota počítadla: {pocitadlo}</p> 
      <button onClick={zvysit}>Zvýšit</button>&nbsp;&nbsp;
      <button onClick={snizit}>Snížit</button><br /><br />
      <button onClick={() => setPocitadlo(0)}>Reset</button>
    </div>
  )
}

export default App
