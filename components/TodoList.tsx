import * as React from "react";
import TodoListItem from "./TodoListItem";
import { useTodosContext } from "./TodosContext";

const TodoList: React.FC = () => {
  const x = useTodosContext();
  

  return (
    <ul>
      {Object.values(x.todos).map((todo) => {
        return <TodoListItem key={todo.id} todo={todo} />;
      })}
    </ul>
  );
};

export default TodoList;
