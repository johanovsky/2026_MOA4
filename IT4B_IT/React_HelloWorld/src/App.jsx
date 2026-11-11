import { useState } from 'react'
import './App.css'

function App() {

  //stavova promenna - useState
  const [pozdrav, setPozdrav] = useState("Jeste jsi neklikl");

  function pozdravit() {
    setPozdrav("Hello World!");
  }

  return (
    <div>
      <h1>React Hello World</h1>
      <p>{pozdrav}</p>
      <button onClick={pozdravit}>click me!</button><br /><br />
      <button onClick={() => setPozdrav("Ahoj Svete!")}>click me 2!</button>
    </div>
  )
}

export default App
