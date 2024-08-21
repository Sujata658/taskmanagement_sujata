import { overviews } from "@/Components/SideSheet/const";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useStatus } from "@/context/StatusContext";
import { Task } from "@/types/Task";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const TaskSummary = () => {
    const { ToDOtasks, InProgresstasks, Completedtasks } = useStatus();

    const [todo, setTodo] = useState<Task[]>([]);
    const [inprogress, setInprogress] = useState<Task[]>([]);
    const [completed, setCompleted] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        if (ToDOtasks && InProgresstasks && Completedtasks) {
            setTodo(ToDOtasks);
            setInprogress(InProgresstasks);
            setCompleted(Completedtasks);
            setLoading(false);
        }
    }, [ToDOtasks, InProgresstasks, Completedtasks]);

    if (!loading) {
        overviews[1].total = todo.length;
        overviews[2].total = inprogress.length;
        overviews[3].total = completed.length;
        overviews[0].total = overviews[1].total + overviews[2].total + overviews[3].total;
    }

    const handleTabClick = (title: string) => {
        switch (title) {
            case "To Do":
                navigate('/list', { state: { tab: 'ToDo' } });
                break;
            case "In Progress":
                navigate('/list', { state: { tab: 'InProgress' } });
                break;
            case "Completed":
                navigate('/list');
                break;
            default:
                navigate('/list');
                break;
        }
    }

    return (
        <div className="m-8">
            <div className="grid grid-cols-4 gap-4">
                {loading ? (
                    Array.from({ length: 4 }).map((_, index) => (
                        <Card key={index} className="w-full">
                            <Skeleton className="w-full h-6 mb-2" />
                            <Skeleton className="w-full h-4" />
                        </Card>
                    ))
                ) : (
                    overviews.map((overview) => (
                        <Card
                            key={overview.id}
                            className="w-full transition-transform transform hover:scale-105 cursor-pointer"
                            onClick={() => handleTabClick(overview.title)} 
                        >
                            <div className="flex items-center justify-between p-4">
                                <div className="flex items-center">
                                    <overview.icon className="text-2xl" />
                                    <div className="ml-4">
                                        <p className="text-lg font-bold">{overview.title}</p>
                                        <p className="text-sm text-green-600 font-semibold">{overview.total}</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}

export default TaskSummary;
