import { Task } from "./Task";

export interface Column {
    id: string;
    title: string;
    tasks: Task[];
}

export interface KanbanColumnProps {
    column: Column;
}

export interface SortableTaskProps {
    task: Task;
    columnId: string;
}