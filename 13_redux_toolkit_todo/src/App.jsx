import { useState } from "react";
import "./App.css";
import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";

function App() {
  const [editTodo, setEditTodo] = useState(null);

  return (
    <>
      <div className="min-h-screen bg-gray-500 p-10">
        <h1 className="text-center text-2xl">Learn Redux Toolkit</h1>

        <div className="flex justify-center">
          <AddTodo editTodo={editTodo} setEditTodo={setEditTodo} />
        </div>

        <Todos setEditTodo={setEditTodo} />
      </div>
    </>
  );
}

export default App;
