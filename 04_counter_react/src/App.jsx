import { useState } from "react";

function App() {
  let [counter, setCounter] = useState(5);

  // let counter = 5;

  const addValue = () => {
    counter = counter + 1;
    setCounter(counter);
    console.log("clicked", counter);
  };

  const removeValue = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };
  return (
    <>
      <h1>chai aur react</h1>
      <h2>counter value: {counter}</h2>
      <br />
      <br />
      <button onClick={addValue}>increase value {counter}</button>
      <br />
      <button onClick={removeValue}>decrease value {counter}</button>
      <br />
      <p>footer: {counter}</p>
    </>
  );
}

export default App;
