import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Card from './components/Card'

function App() {
  const [count, setCount] = useState(0);
  let myObject = {
    name: "ayan",
    age: 21
  }
  let newArr = [1, 2, 3, 4, 5];

  return (
    <>
      <h3 className="bg-green-500 text-black p-4 rounded-b-xl mb-4">TAILWIND TEST</h3>
      <Card username="ayan" btnText="click me"/>
      <Card username="aditi"/>
    </>
  );
}

export default App;
