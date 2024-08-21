import { Button } from "@/components/ui/button";
import { DialogClose, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { useUser } from "@/context/UserContext";
import { Task } from "@/types/Task";
import moment from "moment";
import { IoCalendar, IoTrash } from "react-icons/io5";
import EditTask from "../EditTask";
import { AlertDialog, AlertDialogAction, AlertDialogTrigger, AlertDialogDescription, AlertDialogTitle, AlertDialogContent, AlertDialogCancel, AlertDialogFooter, AlertDialogHeader } from "@/components/ui/alert-dialog";

import { deleteTask } from "@/apis/tasks/deleteTask";
import { toast } from "sonner";
import { useStatus } from "@/context/StatusContext";
import { useTask } from "@/context/TaskContext";
import DescriptionCommentTabs from "../DescriptionCommentTab";

interface ViewDetailsDialogProps {
    task: Task;
}

const formatDueDate = (duedate: string) => {
    const dueDate = moment(duedate);
    const now = moment();
    const hoursLeft = dueDate.diff(now, 'hours');
    const daysLeft = dueDate.diff(now, 'days');

    if (hoursLeft <= 0) {
        return "Overdue";
    } else if (hoursLeft <= 24) {
        return `${hoursLeft} hours left`;
    } else if (daysLeft <= 1) {
        return `${daysLeft} day left`;
    } else {
        return `${daysLeft} days left`;
    }
};

const ViewDetailsDialog: React.FC<ViewDetailsDialogProps> = ({ task }) => {
    const { user } = useUser();
    const { refreshTasks } = useTask();
    const { refreshStatus } = useStatus();



    const handleDelete = async () => {
        try {
            const response = await deleteTask(task._id);

            if (response) {
                refreshTasks();
                refreshStatus();
                toast.success("Task deleted successfully");
            } else {
                return false
            }
        } catch (error) {
            toast.error("Failed to delete task");
        }
    };



    return (
        <div className="h-[80vh]">
            <DialogTitle>
                <div className="flex justify-between border-b border-muted-foreground items-center">
                <div className="text-2xl font-bold ">
                    {(
                        task.title
                    )}
                </div>
                <div className="flex gap-2 mr-8">
                {user?._id === task.author._id ? (
                    <Button variant="secondary" className="mb-4">
                        <EditTask task={task} />
                    </Button>
                ) : (
                    <Button variant="secondary" disabled className="mb-4">
                       <p>Edit
                        </p> 
                    </Button>
                )}
                {user?._id === task.author._id ? (
                    <AlertDialog>
                        <AlertDialogTrigger>
                            <Button variant="destructive" className="mb-4">
                                <IoTrash />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the task
                                    and remove the task from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <DialogClose asChild>

                                    <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                                </DialogClose>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                ) : (
                    <Button variant="destructive" disabled className="mb-4">
                      <p>Delete</p>  
                    </Button>
                )}
                </div>
                

                </div>
            </DialogTitle>
            <DialogDescription className="p-4 text-foreground flex flex-col gap-1">
                <div className="flex justify-between mb-4">
                    <div className="flex flex-wrap gap-4 items-center w-full md:w-1/2">
                        <div className="text-lg font-bold">Priority:</div>
                        <p>{task.priority}</p>
                    </div>
                    <div>
                        <p className="py-2 px-4 border rounded bg-yellow-500">{task.status}</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="text-lg font-bold">Author:</div>
                    <div className="text-md text-white bg-blue-600 p-2 rounded-full">
                        {task.author.name}
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex gap-4 items-center">
                        <div className="text-lg font-bold">Due Date:</div>
                        <p>{moment(task.dueDate).format('DD MMM YYYY')}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <IoCalendar />
                        <span>{formatDueDate(task.dueDate)}</span>
                    </div>
                </div>
                <div className="flex justify-between items-center my-4">
                    <div className="flex items-center gap-4 flex-wrap">
                        <div className="text-lg font-bold">Tags:</div>
                        {task.tags.length > 0 ? (
                            task.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 bg-muted border border-muted-foreground text-muted-foreground rounded-full"
                                >
                                    {tag.name}
                                </span>
                            ))
                        ) : (
                            <span className="text-muted-foreground">None</span>
                        )}
                    </div>
                </div>
                <div className="flex flex-wrap mb-4">
                    <div className="flex flex-wrap gap-4 items-center w-full md:w-1/2">
                        <div className="text-lg font-bold">Assignees:</div>
                        <ul className="flex gap-2 flex-wrap">
                            {task.assignees.length > 0 ? (
                                task.assignees.map((assignee, index) => (
                                    <li key={index}>
                                        <span className="text-yellow-600 list-disc list-inside bg-muted px-3 py-1 border border-muted-foreground rounded-full">
                                            {assignee.name}
                                        </span>
                                    </li>
                                ))
                            ) : (
                                <span className="text-muted-foreground">None</span>
                            )}
                        </ul>
                    </div>
                </div>

                <DescriptionCommentTabs task={task} />
            </DialogDescription>
            <DialogFooter>

            </DialogFooter>
        </div>
    );
};

export default ViewDetailsDialog;
