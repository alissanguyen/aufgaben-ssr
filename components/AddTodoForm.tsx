import * as React from "react";
import { useTodosContext } from "./TodosContext"; 

const AddTodoForm: React.FC = () => {
  const [todo, setTodo] = React.useState('');
  const { addTodo } = useTodosContext()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todo) {
      return;
    }
    addTodo(todo).then(() => setTodo('')).catch(() => {
      // TODO: improve user experience for errors
      alert("Sorry, there was an error. Please try again later.")
    })
  }
  return (
    <form className="form my-6" onSubmit={handleSubmit}>
      <div className="flex flex-col flex-sm mb-2">
        <label className="font-bold mb-2 text-gray-800" htmlFor="todo">Todo</label>
        <input className="border border-gray-200 p-2 rounded-lg appearance-none focus:outline-none focus:border-gray-500" type="text" name="todo" id="todo" value={todo} onChange={(e) => setTodo(e.target.value)} placeholder="ex. Go buy a Tesla"/>
      </div>
      <button className="w-full rounded bg-blue-500 hover:bg-blue-600 text-white py-2" type="submit">Submit</button>
    </form>
  );
};

export default AddTodoForm;
