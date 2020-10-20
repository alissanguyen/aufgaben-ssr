import * as React from "react";
import { AufgabenTodoItem } from "../types";
import { useTodosContext } from "./TodosContext";

interface Props {
  todo: AufgabenTodoItem;
}

const TodoListItem: React.FC<Props> = (props) => {
  const todosContext = useTodosContext();

  return (
    <li className="bg-white flex items-center shadow-lg rounded-lg my-2 py-2 px-4">
      <input
        type="checkbox"
        name="completed"
        id="completed"
        checked={props.todo.fields.completed}
        className="mr-2 form-checkbox h-5 w-5"
        onChange={() => {
          todosContext.updateTodo({
            ...props.todo,
            fields: {
              ...props.todo.fields,
              completed: !props.todo.fields.completed,
            },
          });
        }}
      />
      <p
        className={`flex-1 text-gray-800 ${
          props.todo.fields.completed ? "line-through" : ""
        }`}
      >
        {props.todo.fields.description}
      </p>
      <button
        onClick={() => {
          todosContext.deleteTodo(props.todo.id);
        }}
        className="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
      >
        Delete
      </button>
    </li>
  );
};

export default TodoListItem;
