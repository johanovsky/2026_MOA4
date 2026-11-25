import { useState } from 'react'
import './App.css'

function App() {
  //useStates
  const [operand1, setOperand1] = useState("");
  const [operand2, setOperand2] = useState("");
  const [operace, setOperace] = useState("+");
  const [vysledek, setVysledek] = useState(null);
  const [chyba, setChyba] = useState(null);

  return (
    <div>
      <h1>Kalkulačka</h1>
    </div>
  )
}

export default App
