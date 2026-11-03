import { useState } from 'react'
import './App.css'

function App() {
  const [pozdrav, setPozdrav] = useState("jeste nebylo kliknuto");

  function pozdravit() {
    setPozdrav("Hello World");
  }
  
  return (
    <div>
      <h1>Hello world</h1>
      <span>{pozdrav}</span><br /><br />
      <button onClick={pozdravit}>click me!</button>
      <br /><br />
      <button onClick={() => {setPozdrav("Ahoj svete")}}>click me2!</button>
    </div>
  )
}

export default App
