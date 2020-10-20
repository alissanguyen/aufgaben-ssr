export type AufgabenTodoItem = {
  id: string;
  fields: {
    description: string;
    completed: boolean;
  };
};

export type AufgabenTodosRecord = Record<string, TodoItem>;
