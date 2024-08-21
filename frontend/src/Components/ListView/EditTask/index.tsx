import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import moment from "moment";
import AssigneeInput from "../../General/AssigneeInput";
import { updateTask } from "@/apis/tasks/updateTask";
import { Task, TaskProps } from "@/types/Task";
import { useTask } from "@/context/TaskContext";
import TagProvider, { useTag } from "@/context/TagContext";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { useStatus } from "@/context/StatusContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AiOutlineEdit } from "react-icons/ai";
import TagInput from "@/Components/General/TagInput";
const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  dueDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
  tags: z.array(z.string()).optional(),
  assignees: z.array(z.object({ id: z.string(), displayName: z.string() })).optional(),
  priority: z.string().optional(),
  status: z.string().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

interface EditTaskProps {
  task: Task;
}

const EditTask: React.FC<EditTaskProps> = ({ task }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
      dueDate: task.dueDate ? moment(task.dueDate).format('YYYY-MM-DD') : '',
      tags: task.tags.map(tag => tag._id),
      assignees: task.assignees.map(assignee => ({ id: assignee._id, displayName: assignee.name })),
      priority: task.priority,
      status: task.status,
    },
  });

  const [selectedTags, setSelectedTags] = useState<string[]>(task.tags.map(tag => tag._id));
  const [selectedAssignees, setSelectedAssignees] = useState<{ id: string; displayName: string }[]>(task.assignees.map(assignee => ({ id: assignee._id, displayName: assignee.name })));
  const { refreshTasks } = useTask();
  const { refreshStatus } = useStatus();
  const { refreshTags } = useTag();

  useEffect(() => {
    setValue('tags', selectedTags);
    setValue('assignees', selectedAssignees);
  }, [selectedTags, selectedAssignees, setValue]);

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    try {
      const formattedDueDate = data.dueDate ? moment(data.dueDate).toISOString() : undefined;

      const taskProps: Partial<TaskProps> = {
        title: data.title,
        description: data.description,
        dueDate: formattedDueDate,
        tags: (data.tags || []).map(tag => ({
          _id: tag,
          name: tag,
          tasks: [],
          createdAt: '',
          updatedAt: '',
          __v: 0,
        })),
        assignees: (data.assignees || []).map(assignee => assignee.id),
        priority: data.priority,
        status: data.status,
      };


      const response = await updateTask(task._id, taskProps);
      if (response.status === 200) {
        refreshTasks();
        refreshStatus();
        refreshTags();
        toast.success('Task updated successfully');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update task');
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
          <AiOutlineEdit className="text-lg"/>

      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        {/* <ScrollArea> */}
        <div className="p-4 ">
          <h1 className="text-2xl font-bold">Edit Task</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Title</label>
              <Input className="mt-1 block border-gray-500 rounded-md" placeholder="Task title" {...register("title")} />
              {errors.title && <span className="text-red-600 text-sm">{errors.title.message}</span>}
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-sm font-medium">Priority</label>
                <select
                  className="mt-1 block w-full bg-background border border-gray-600 rounded-md p-2"
                  {...register("priority")}
                >
                  <option value="Low">Low</option>
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium">Due Date</label>
                  <Input
                    type="date"
                    className="mt-1 block w-full border-gray-600 rounded-md"
                    {...register("dueDate")}
                  />
                  {errors.dueDate && <span className="text-red-600 text-sm">{errors.dueDate.message}</span>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">Status</label>
                <select
                  className="mt-1 block w-full bg-background border border-gray-600 rounded-md p-2"
                  {...register("status")}
                >
                  <option value="ToDo">To Do</option>
                  <option value="InProgress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            <div>
              <AssigneeInput selectedAssignees={selectedAssignees} setSelectedAssignees={setSelectedAssignees} />
            </div>

            <div>
              <TagProvider>
                <TagInput
                  selectedTags={selectedTags}
                  setSelectedTags={setSelectedTags}
                  existingTags={task.tags}
                />

              </TagProvider>
            </div>

            <div>
              <label className="block text-sm font-medium">Description</label>
              <Textarea className="mt-1 block border-gray-500 rounded-md" placeholder="Task description" {...register("description")} />
              {errors.description && <span className="text-red-600 text-sm">{errors.description.message}</span>}
            </div>

            <Button type="submit" className="w-full bg-primary text-background py-2 px-4 rounded-md"><p>Update Task</p></Button>
          </form>
        </div>
        
      </SheetContent>
    </Sheet>
  );
};

export default EditTask;
