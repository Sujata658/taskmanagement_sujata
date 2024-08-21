import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import moment from "moment";
import TagInput from "../../General/TagInput";
import AssigneeInput from "../../General/AssigneeInput";
import { createTask } from "@/apis/tasks/createTask";
import { TaskProps } from "@/types/Task";
import { useTask } from "@/context/TaskContext";
import TagProvider, { useTag } from "@/context/TagContext";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { useStatus } from "@/context/StatusContext";

const getDefaultDate = () => {
  return moment().add(1, 'day').format('YYYY-MM-DD');
};

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

const CreateTaskForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: getDefaultDate(),
    },
  });


  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedAssignees, setSelectedAssignees] = useState<{ id: string; displayName: string }[]>([]);
  const { refreshTasks } = useTask();
  const  {refreshStatus} = useStatus();
  const { refreshTags } = useTag();

  useEffect(() => {
    setValue('tags', selectedTags);
    setValue('assignees', selectedAssignees);
  }, [selectedTags, selectedAssignees, setValue]);

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    try {
      const formattedDueDate = data.dueDate ? moment(data.dueDate).toISOString() : undefined;

      const taskProps: TaskProps = {
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
      
      const response = await createTask(taskProps);
      if (response.status === 200) {
        refreshTasks();
        refreshStatus();
        refreshTags();
        toast.success('Task created successfully');
        reset({
          title: "",
          description: "",
          dueDate: getDefaultDate(),
          tags: [],
          assignees: []
        });
        setSelectedTags([]);
        setSelectedAssignees([]);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to create task');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-background border rounded-lg shadow-md flex justify-center items-center">
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
                defaultValue={getDefaultDate()}
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
            <TagInput selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
          </TagProvider>
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <Textarea className="mt-1 block border-gray-500 rounded-md" placeholder="Task description" {...register("description")} />
          {errors.description && <span className="text-red-600 text-sm">{errors.description.message}</span>}
        </div>

        <Button type="submit" className="w-full bg-primary text-white py-2 px-4 rounded-md">Add Task</Button>
      </form>
    </div>
  );
};

export default CreateTaskForm;
