import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeTodo } from "../features/todo/todoSlice";

function Todos({ setEditTodo }) {
  const todos = useSelector((state) => state.todos);

  const dispatch = useDispatch();

  return (
    <>
      <div>Todos</div>

      <ul className="list-none">
        {todos.map((todo) => (
          <li
            className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded"
            key={todo.id}
          >
            <div className="text-white">{todo.text}</div>

            <div className="flex gap-2">
              {/* UPDATE BUTTON */}
              <button
                onClick={() => setEditTodo(todo)}
                className="text-white bg-green-500 border-0 py-1 px-4 rounded text-md"
              >
                Update
              </button>

              {/* DELETE BUTTON */}
              <button
                onClick={() => dispatch(removeTodo(todo.id))}
                className="text-white bg-red-500 border-0 py-1 px-4 rounded text-md"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Todos;
