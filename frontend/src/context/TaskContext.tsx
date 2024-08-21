import { ReactNode, useContext, useEffect, useState, useCallback } from "react";
import { createContext } from "react";
import { getAllTasks } from "@/apis/tasks/getAllTasks";
import { Task } from "@/types/Task";

interface TaskContextType {
    tasks: Task[] | [];
    setTasks: (tasks: Task[]) => void;
    refreshTasks: () => void;
}

const TaskContext = createContext<TaskContextType>({
    tasks: [],
    setTasks: () => {},
    refreshTasks: () => {}
});

const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<Task[] | []>([]);

    const refreshTasks = useCallback(() => {
        getAllTasks()
            .then((res) => {
                setTasks(res);
            })
            .catch((err) => {
                throw err;
            });
    }, []);

    useEffect(() => {
        refreshTasks();
    }, [refreshTasks]);

    return (
        <TaskContext.Provider value={{ tasks, setTasks, refreshTasks }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTask = () => useContext(TaskContext);

export default TaskProvider;
