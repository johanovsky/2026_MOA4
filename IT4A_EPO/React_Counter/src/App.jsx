import { useState } from 'react'
import './App.css'

function App() {
  //useState - stavova promenna
  const [pocitadlo, setPocitadlo] = useState(0);

  //konstata - "old school JS"
  const MAX_POCITADLO = 10;
  const MIN_POCITADLO = -10;

  function zvysit() {
    if(pocitadlo < MAX_POCITADLO) {
      setPocitadlo(pocitadlo + 1);
    }
  }

  function snizit() {
    if(pocitadlo > MIN_POCITADLO) {
      setPocitadlo(pocitadlo - 1);
    }
  }

  return (
    <div>
      <h1>My React Counter</h1>
      <p>Aktuální stav pocitadla: {pocitadlo}</p>
      <br />
      <button onClick={zvysit}>Zvýšit</button>&nbsp;&nbsp;
      <button onClick={snizit}>Snížit</button><br /><br />
      <button onClick={() => setPocitadlo(0)}>Reset</button>
    </div>
  )
}

export default App
