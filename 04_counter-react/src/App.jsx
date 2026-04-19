import { useState } from 'react'
import './App.css'

function App() {

  const [counter, setCounter] = useState(15)

  // let counter = 15;

  const addValue = () => {
    // counter = counter + 1;   
    if (counter < 20) {
      setCounter(counter + 1);
    }
  }

  const removeValue = () => {
    if (counter > 0) {
      setCounter(counter - 1)
    }
  }

  return (
    <>
      <h1>CHAI AUR REACT</h1>
      <h2>COUNTER VALUE: </h2>

      <button onClick={addValue}>add value {counter}</button>
      <br/>
      <button onClick={removeValue}>remove value {counter}</button>
      <p>footer: {counter}</p>
    </>   
  )
}

export default App
