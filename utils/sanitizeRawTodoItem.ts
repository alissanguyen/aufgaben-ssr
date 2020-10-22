import { AufgabenTodoItem } from "../types";

import * as  uuid from 'uuid'

export const sanitizeRawTodoItem = (rawTodoItem: Partial<AufgabenTodoItem>, index?: number): AufgabenTodoItem => {
    return {
        fields: {
            completed: rawTodoItem.fields?.completed ?? false,
            description: rawTodoItem.fields && rawTodoItem.fields.description ? rawTodoItem.fields.description : 'Description Missing',
            associatedColumnId: rawTodoItem.fields?.associatedColumnId ?? uuid.v4(),
            columnIndex: rawTodoItem.fields?.columnIndex ?? index ?? Math.floor(Math.random()) * 100,
            timeCreatedUtc: rawTodoItem.fields?.timeCreatedUtc ? new Date(rawTodoItem.fields.timeCreatedUtc).valueOf() : Date.now()
        },
        id: rawTodoItem.id || uuid.v4()
    }
}



