import { createContext, useContext } from "react";

export const ToDoContext = createContext({
  Todos: [],
  addToDo: (ToDo) => {},
  updateToDo: (id, ToDo) => {},
  deleteToDo: (id) => {},
  toggleComplete: (id) => {},
});

export const useToDo = () => {
  return useContext(ToDoContext);
};

export const ToDoProvider = ToDoContext.Provider;
