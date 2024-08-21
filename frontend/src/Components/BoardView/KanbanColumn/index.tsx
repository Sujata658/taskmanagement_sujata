import { Card } from '@/components/ui/card';
import { KanbanColumnProps } from '@/types/KanbanColumn';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableTask from '../SortableTask';
import { useDroppable } from '@dnd-kit/core';
import { ScrollArea } from '@/components/ui/scroll-area';

const KanbanColumn = ({ column }: KanbanColumnProps) => {
    const taskIds = column.tasks.map((task) => `${column.id}:${task._id}`);
    const { setNodeRef } = useDroppable({
        id: column.id,
    });

    return (
        <ScrollArea ref={setNodeRef} className="max-h-[500px]flex flex-col gap-4">
    <div className='my-3'>
        <h1 className='text-md font-semibold p-2 rounded'>{column.title}</h1>
    </div>
    <Card className='min-h-[420px] border border-foreground/40'>
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
            {column.tasks.map((task) => (
                <div key={task._id}>
                    <SortableTask key={task._id} task={task} columnId={column.id} />
                </div>
            ))}
        </SortableContext>
    </Card>
</ScrollArea>

    );
};

export default KanbanColumn;
