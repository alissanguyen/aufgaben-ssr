import * as React from "react";
import { AufgabenTodoItem, AufgabenTodosRecord } from "../types";

export interface TodosContextValue {
  todos: AufgabenTodosRecord;
  setTodos: (newTodos: AufgabenTodosRecord) => void;
  refreshTodos: () => Promise<AufgabenTodosRecord>;
  updateTodo: (todo: AufgabenTodoItem) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  addTodo: (description: string) => Promise<void>;
}

const TodosContext = React.createContext<TodosContextValue | undefined>(
  undefined
);

export const TodosProvider: React.FC<{
  initialTodos: AufgabenTodosRecord;
}> = (props) => {
  const [todos, setTodos] = React.useState(props.initialTodos);

  const refreshTodos = async () => {
    try {
      const res = await fetch("/api/getTodos");

      const latestTodos = await res.json();

      setTodos(latestTodos);
      return latestTodos;
    } catch (err) {
      console.error(err);
      return todos;
    }
  };

  const updateTodo = async (updatedTodo: AufgabenTodoItem) => {
    try {
      const res = await fetch("/api/updateTodo", {
        method: "PUT",
        body: JSON.stringify(updatedTodo),
        headers: {
          "Content-Type": "application/json",
        },
      });

      await res.json();

      setTodos((prevTodos) => {
        return {
          ...prevTodos,
          [updatedTodo.id]: updatedTodo,
        };
      });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await fetch("/api/deleteTodo", {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setTodos((prevTodos) => {
        const newTodos = { ...prevTodos };

        delete newTodos[id];

        return newTodos;
      });
    } catch (err) {
      console.error(err);
    }
  };

  const addTodo = async (description: string) => {
    try {
      const res = await fetch("/api/createTodo", {
        method: "POST",
        body: JSON.stringify({ description }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const newTodo = (await res.json()) as unknown;

      if (!newTodo || !validateTodo(newTodo)) {
        console.warn("Invalid todo", newTodo);
        return;
      }

      setTodos((prevTodos) => {
        return {
          ...prevTodos,
          [newTodo.id]: newTodo,
        };
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <TodosContext.Provider
      value={{ todos, setTodos, refreshTodos, updateTodo, deleteTodo, addTodo }}
    >
      {props.children}
    </TodosContext.Provider>
  );
};

export const useTodosContext = () => {
  const contextValue = React.useContext(TodosContext);

  if (!contextValue) {
    throw new Error("No initial value provided for TodosContext");
  }

  return contextValue;
};

const validateTodo = (obj: any): obj is AufgabenTodoItem => {
  return (
    obj &&
    typeof obj === "object" &&
    typeof obj.fields === "object" &&
    typeof obj.fields.completed === "boolean" &&
    typeof obj.fields.description === "string"
  );
};
