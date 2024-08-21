import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SortableTaskProps } from '@/types/KanbanColumn';
import { IoCalendar, IoEye } from 'react-icons/io5';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import ViewDetailsDialog from '@/Components/ListView/ViewDetailsDialog';
import { formatDueDate } from '@/utils/formatDueDate';
import { getPriorityColor } from '@/utils/getPriorityColor';

const SortableTask = ({ task, columnId }: SortableTaskProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: `${columnId}:${task._id}`,
        data: {
            type: 'task',
            task,
            columnId,
        }
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    

    

    return (

        <Card className="m-3 p-4 border border-foreground/30 shadow-md flex flex-col rounded-md overflow-hidden bg-background relative">
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <div className="flex flex-wrap gap-1 mb-2">
                {task.tags && task.tags.slice(0, 4).map((tag) => (
                    <span key={tag._id} className="text-xs font-medium bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                        {'#' + tag.name}
                    </span>
                ))}
            </div>
            <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                    <h2 className="text-base font-bold">
                        {task.title}
                    </h2>
                    <div className="flex items-center">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                        </span>
                    </div>
                </div>
                <p className="text-xs text-muted-foreground">
                    {task.description}
                </p>
                <div className="flex items-center justify-between mt-2">
                    {task.dueDate && (
                        <div className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-md flex items-center gap-1 text-xs">
                            <IoCalendar size={14} />
                            {formatDueDate(task.dueDate)}
                        </div>
                    )}
                    {task.assignees && (
                        <div className="flex items-center space-x-2">
                            {task.assignees.map((assignee) => (
                                <span key={assignee._id} className="inline-flex items-center justify-center h-6 w-6 bg-primary text-white font-bold rounded-full uppercase text-xs">
                                    {assignee.name.charAt(0)}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
        <Dialog>
            <DialogTrigger asChild>
                <button className="absolute top-2 right-2 text-primary hover:text-primary-dark transition">
                    <IoEye size={18} />
                </button>
            </DialogTrigger>
            <DialogContent className='overflow-y-auto max-w-[60vw]'>
                <ViewDetailsDialog task={task} />
            </DialogContent>
        </Dialog>
    </Card>
    
    
    );
};

export default SortableTask;
