import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import moment from "moment";
import 'tailwindcss/tailwind.css';
import { HiRefresh } from "react-icons/hi";
import { useTask } from "@/context/TaskContext";
import { Task } from "@/types/Task";
import { toast, Toaster } from "sonner";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Tasks = () => {
  const { tasks, refreshTasks } = useTask();
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    refreshTasks() 
    setLoading(false);
  }, []);

  const formatDueDate = (duedate: string) => {
    const dueDate = moment(duedate);
    const now = moment();
    const hoursLeft = dueDate.diff(now, 'hours');
    const daysLeft = dueDate.diff(now, 'days');

    let timeLeft;
    if (hoursLeft <= 0) {
      timeLeft = "Overdue";
    } else if (hoursLeft <= 24) {
      timeLeft = `${hoursLeft} hours left`;
    } else if (daysLeft <= 1) {
      timeLeft = `${daysLeft} day left`;
    } else {
      timeLeft = `${daysLeft} days left`;
    }

    return <div>{timeLeft}</div>;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'text-red-500';
      case 'Normal':
        return 'text-yellow-500';
      case 'Low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  const getDueDateColor = (duedate: string) => {
    const now = moment();
    const due = moment(duedate);
    return due.isBefore(now) ? 'text-red-500' : 'text-gray-500';
  };

  const handleRefresh = () => {
    refreshTasks() 
    toast.success('Tasks refreshed');
  };

  return (
    <>
      <div className="px-8 pb-8">
        <div className="flex justify-between items-center h-full mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Tasks</h1>
            <div onClick={handleRefresh} className="cursor-pointer"><HiRefresh /></div>
          </div>
          <div>
            <Link to="/list">View all</Link>
          </div>
        </div>

        <div className="bg-background shadow-lg rounded-lg">
          <div className="overflow-y-auto max-h-[50vh] min-h-[50vh] rounded-lg border">
            <Table className="min-w-full">
              <TableHeader className="bg-secondary">
                <TableRow>
                  <TableHead className="px-6 py-3 text-left text-sm font-medium text-secondary-foreground uppercase tracking-wider">Title</TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-secondary-foreground uppercase tracking-wider">Status</TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-secondary-foreground uppercase tracking-wider">Description</TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-secondary-foreground uppercase tracking-wider">Created By</TableHead>
                  <TableHead className="px-6 py-3 text-left text-xs font-medium text-secondary-foreground uppercase tracking-wider">Priority</TableHead>
                  <TableHead className="px-6 py-3 text-right text-xs font-medium text-secondary-foreground uppercase tracking-wider">Due Date</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {
                  loading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                      <TableRow key={index} className="bg-background border-b">
                        <TableCell className="px-6 py-4"><Skeleton className="h-4 w-full" /></TableCell>
                        <TableCell className="px-6 py-4"><Skeleton className="h-4 w-full" /></TableCell>
                        <TableCell className="px-6 py-4"><Skeleton className="h-4 w-full" /></TableCell>
                        <TableCell className="px-6 py-4"><Skeleton className="h-4 w-full" /></TableCell>
                        <TableCell className="px-6 py-4"><Skeleton className="h-4 w-full" /></TableCell>
                        <TableCell className="px-6 py-4 text-right"><Skeleton className="h-4 w-full" /></TableCell>
                      </TableRow>
                    ))
                  ) : (
                    !tasks || tasks.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center">No tasks found</TableCell>
                      </TableRow>
                    ) : (
                      tasks.map((task: Task) => (
                        <TableRow key={task._id} className={`bg-background border-b`}>
                          <TableCell className="px-6 py-4 text-sm font-medium text-foreground">{task.title}</TableCell>
                          <TableCell className="px-6 py-4 text-sm font-medium text-foreground">{task.status}</TableCell>
                          <TableCell className="px-6 py-4 text-sm text-foreground">{task.description}</TableCell>
                          <TableCell className="px-6 py-4 text-sm font-medium text-foreground">{task.author.name}</TableCell>
                          <TableCell className={`px-6 py-4 text-sm font-medium ${getPriorityColor(task.priority)}`}>{task.priority}</TableCell>
                          <TableCell className={`px-6 py-4 text-fore whitespace-nowrap text-sm text-right ${getDueDateColor(task.dueDate)}`}>{formatDueDate(task.dueDate)}</TableCell>
                        </TableRow>
                      ))
                    )
                  )
                }
              </TableBody>
            </Table>
            <Toaster />
          </div>
        </div>
      </div>
    </>
  );
};

export default Tasks;
