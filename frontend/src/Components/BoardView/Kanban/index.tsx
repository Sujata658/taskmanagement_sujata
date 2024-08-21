import KanbanColumn from "../KanbanColumn";
import { useStatus } from "@/context/StatusContext";
import { Column } from "@/types/KanbanColumn";
import { DndContext, closestCorners, DragOverlay, DragStartEvent, DragEndEvent } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Task } from "@/types/Task";
import { arrayMove } from "@dnd-kit/sortable";
import { changeStatus } from "@/apis/tasks/changeStatus";
import { Toaster, toast } from "sonner";
import { useTask } from "@/context/TaskContext";
import { IoMdCalendar } from "react-icons/io";
import { useRules } from "@/context/RulesContext";
import { useLocation } from "react-router-dom";

const Kanban = () => {
    const { ToDOtasks, InProgresstasks, Completedtasks, refreshStatus } = useStatus();
    const { rules } = useRules()
    const { refreshTasks } = useTask();

    const location = useLocation();

    const [todo, setTodo] = useState<Task[]>(ToDOtasks);
    const [inprogress, setInprogress] = useState<Task[]>(InProgresstasks);
    const [completed, setCompleted] = useState<Task[]>(Completedtasks);

    const [activeTask, setActiveTask] = useState<Task | null>(null);

    useEffect(() => {
        refreshStatus();
    },[location]);



    useEffect(() => {
        setTodo(ToDOtasks);
        setInprogress(InProgresstasks);
        setCompleted(Completedtasks);
    }, [ToDOtasks, InProgresstasks, Completedtasks]);

    useEffect(() => {
        const initialColumns:Column[] = [
            { id: 'ToDo', title: 'To Do', tasks: todo },
            { id: 'InProgress', title: 'In Progress', tasks: inprogress },
            { id: 'Completed', title: 'Completed', tasks: completed },
        ];
        setColumns(initialColumns);
    }, [todo, inprogress, completed]);

    const [columns, setColumns] = useState<Column[]>([]);
    
    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        const { task } = active.data.current as { task: Task };
        setActiveTask(task);
    };

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return;

        const activeColumnId = active.id.toString().split(':')[0]
        const activeTaskId: string = active.id.toString().split(':')[1];
        const [overColumnId, overTaskId] = over.id.toString().split(':');

        if(activeColumnId === overColumnId) return;

        console.log(rules[0][activeColumnId]?.includes(overColumnId))

        if (rules[0][activeColumnId]?.includes(overColumnId)) {
        
            if (activeColumnId === overColumnId && activeTaskId !== overTaskId) {
                setColumns((columns) => {
                    const columnIndex = columns.findIndex(column => column.id === activeColumnId);
                    if (columnIndex === -1) return columns;

                    const column = columns[columnIndex];
                    const activeTaskIndex = column.tasks.findIndex(task => task._id === activeTaskId);
                    const overTaskIndex = column.tasks.findIndex(task => task._id === overTaskId);

                    column.tasks = arrayMove(column.tasks, activeTaskIndex, overTaskIndex);

                    const updatedColumns = [...columns];
                    updatedColumns[columnIndex] = column;

                    return updatedColumns;
                });
            }

            if (activeColumnId !== overColumnId) {
                try {
                    await changeStatus(activeTaskId, activeColumnId, overColumnId);

                    setColumns((columns) => {
                        const activeColumnIndex = columns.findIndex(column => column.id === activeColumnId);
                        const overColumnIndex = columns.findIndex(column => column.id === overColumnId);

                        if (activeColumnIndex === -1 || overColumnIndex === -1) return columns;

                        const activeColumn = columns[activeColumnIndex];
                        const overColumn = columns[overColumnIndex];

                        const activeTaskIndex = activeColumn.tasks.findIndex(task => task._id === activeTaskId);

                        if (activeTaskIndex === -1) return columns;

                        const [movedTask] = activeColumn.tasks.splice(activeTaskIndex, 1);
                        overColumn.tasks.push(movedTask);

                        const updatedColumns = [...columns];
                        updatedColumns[activeColumnIndex] = activeColumn;
                        updatedColumns[overColumnIndex] = overColumn;


                        return updatedColumns;
                    });
                    refreshTasks();
                    refreshStatus();

                    toast.success("Task status changed successfully.");
                } catch (error) {
                    toast.error("Failed to change status. Please check settings and try again.");
                }
            }
        } else {
            toast.error('Transition not allowed. Please see settings to change the rules.')
        }

        setActiveTask(null);
    };


    return (
        <DndContext
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="grid grid-cols-3 m-8 mt-10 gap-2">
                {columns.map(column => (
                    <KanbanColumn key={column.id} column={column} />
                ))}
            </div>
            <DragOverlay>
                {activeTask && (
                    <Card className="m-3 p-4 border shadow-md rounded-md overflow-hidden bg-background">
                        <div className="flex flex-wrap gap-1 mb-2">
                            {activeTask.tags && activeTask.tags.map((tag) => (
                                <span key={tag._id} className="text-xs font-medium bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                                    {'#' + tag.name}
                                </span>
                            ))}
                        </div>
                        <div className="flex flex-col space-y-2">
                            <div className="flex items-center justify-between">
                                <h2 className="text-base font-bold">
                                    {activeTask.title}
                                </h2>
                                <div className="flex items-center">
                                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full `}>
                                        {activeTask.priority}
                                    </span>
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {activeTask.description}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                                {activeTask.dueDate && (
                                    <div className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-md flex items-center gap-1 text-xs">
                                        <IoMdCalendar size={14} />
                                    </div>
                                )}
                                {activeTask.assignees && (
                                    <div className="flex items-center space-x-2">
                                        {activeTask.assignees.map((assignee) => (
                                            <span key={assignee._id} className="inline-flex items-center justify-center h-6 w-6 bg-primary text-white font-bold rounded-full uppercase text-xs">
                                                {assignee.name.charAt(0)}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>
                )}
            </DragOverlay>
            <Toaster />
        </DndContext>
    );
};

export default Kanban;
