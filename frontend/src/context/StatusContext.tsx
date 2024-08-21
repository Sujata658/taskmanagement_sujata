import { ReactNode, useContext, useEffect, useState, useCallback } from "react";
import { createContext } from "react";
import { Task } from "@/types/Task";
import { getStatusTasks } from "@/apis/tasks/getStatusTasks";

interface StatusContextType {
    ToDOtasks: Task[];
    InProgresstasks: Task[];
    Completedtasks: Task[];
    refreshStatus: () => void;
}

const StatusContext = createContext<StatusContextType>({
    ToDOtasks: [],
    InProgresstasks: [],
    Completedtasks: [],
    refreshStatus: () => {}
});

const StatusProvider = ({ children }: { children: ReactNode }) => {
    const [ToDOtasks, setToDOtasks] = useState<Task[]>([]);
    const [InProgresstasks, setInProgresstasks] = useState<Task[]>([]);
    const [Completedtasks, setCompletedtasks] = useState<Task[]>([]);

    const refreshStatus = useCallback(() => {
        Promise.all([
            getStatusTasks('ToDo'),
            getStatusTasks('InProgress'),
            getStatusTasks('Completed')
        ])
        .then(([toDoTasks, inProgressTasks, completedTasks]) => {
            setToDOtasks(toDoTasks);
            setInProgresstasks(inProgressTasks);
            setCompletedtasks(completedTasks);
        })
        .catch((err) => {
            throw err;
        });
    }, []);

    useEffect(() => {
        refreshStatus();
    }, [refreshStatus]);

    return (
        <StatusContext.Provider value={{ ToDOtasks, InProgresstasks, Completedtasks, refreshStatus }}>
            {children}
        </StatusContext.Provider>
    );
};

export const useStatus = () => useContext(StatusContext);

export default StatusProvider;
