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
