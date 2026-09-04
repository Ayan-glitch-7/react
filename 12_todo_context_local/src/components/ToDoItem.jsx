import { useState } from "react";
import { useToDo } from "../contexts/ToDoContext";

function ToDoItem({ ToDo }) {
  const [isToDoEditable, setIsToDoEditable] = useState(false);
  const [ToDoMsg, setToDoMsg] = useState(ToDo.ToDo);

  const { updateToDo, deleteToDo, toggleComplete } = useToDo();

  const editToDo = () => {
    updateToDo(ToDo.id, {
      ...ToDo,
      ToDo: ToDoMsg,
    });

    setIsToDoEditable(false);
  };

  const toggleCompleted = () => {
    toggleComplete(ToDo.id);
  };

  return (
    <div
      className={`flex gap-x-3 rounded-lg border border-black/10 px-3 py-1.5 text-black shadow-sm shadow-white/50 duration-300 ${
        ToDo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={ToDo.completed}
        onChange={toggleCompleted}
      />

      <input
        type="text"
        className={`w-full rounded-lg border bg-transparent outline-none ${
          isToDoEditable ? "border-black/10 px-2" : "border-transparent"
        } ${ToDo.completed ? "line-through" : ""}`}
        value={ToDoMsg}
        onChange={(e) => setToDoMsg(e.target.value)}
        readOnly={!isToDoEditable}
      />

      <button
        type="button"
        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-black/10 bg-gray-50 text-sm hover:bg-gray-100 disabled:opacity-50"
        onClick={() => {
          if (ToDo.completed) return;

          if (isToDoEditable) {
            editToDo();
          } else {
            setIsToDoEditable((prev) => !prev);
          }
        }}
        disabled={ToDo.completed}
      >
        {isToDoEditable ? "📁" : "✏️"}
      </button>

      <button
        type="button"
        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-black/10 bg-gray-50 text-sm hover:bg-gray-100"
        onClick={() => deleteToDo(ToDo.id)}
      >
        ❌
      </button>
    </div>
  );
}

export default ToDoItem;
