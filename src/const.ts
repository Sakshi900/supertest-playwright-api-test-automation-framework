export interface TaskAction {
    name: string
}

export const TASK_ACTION = {
    all: <TaskAction>{
        name: 'All'
    },
    active: <TaskAction>{
        name: 'Active'
    },
    completed: <TaskAction>{
        name: 'Completed'
    }
}
export interface TodoItems {
    taskValue: string[]
}

export const Todo_Items =
{
    task1: <TodoItems>{
        taskValue: [' Stay Positive ']
    },
    task2: <TodoItems>{
        taskValue: [' Work Hard ']
    },
    task3: <TodoItems>{
        taskValue: [' Make It Happen ']
    }
}

export const TODO_ITEMS = [
    Todo_Items.task1.taskValue,
    Todo_Items.task2.taskValue,
    Todo_Items.task3.taskValue
];
