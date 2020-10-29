/**
 * 1. AufgabenTodoitem has an additional loading property
 * 2. We create a Map of todo IDs to a boolean indicating whether a todo with that ID is loading or not
 * 
 * {
 *   id: 'todo-1',
 *   description: 'have a great time',
 * } 
 * 
 * {
 *   'todo-1': false, // todo-1 is not loading
 *   'todo-2': true // todo-2 is loading
 * }
 */

export type AufgabenTodoItem = {
  id: string;
  fields: {
    description: string;
    completed: boolean;
    columnIndex: number;
    associatedColumnId: string;
    timeCreatedUtc: number;
  };
};

export type AufgabenTodoItemFields = Pick<AufgabenTodoItem, 'fields'>

export type AufgabenTodosRecord = Record<string, TodoItem>;
