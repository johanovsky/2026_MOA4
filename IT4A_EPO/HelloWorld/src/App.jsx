import { useState } from 'react'
import './App.css'

function App() {
  const [pozdrav, setPozdrav] = useState("jeste jsi neklikl");

  function pozdravit() {
    setPozdrav("Hello World");
  }

  return (
    <div>
      <h1>Hello World</h1> 
      <span>{pozdrav}</span><br /><br />
      <button onClick={pozdravit}>click me!</button>
    </div>
  )
}

export default App
