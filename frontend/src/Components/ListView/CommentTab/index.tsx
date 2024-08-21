import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Task } from '@/types/Task';
import { createComment } from '@/apis/comments/create';
import { deleteComment } from '@/apis/comments/delete';
import { z } from 'zod';
import { toast } from 'sonner';
import { getOneTask } from '@/apis/tasks/getOne';
import { useTask } from '@/context/TaskContext';
import { Input } from '@/components/ui/input';
import { useUser } from '@/context/UserContext';
import { AlertDialog, AlertDialogTrigger, AlertDialogAction, AlertDialogContent, AlertDialogCancel,  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { IoTrash } from 'react-icons/io5';
import { Skeleton } from '@/components/ui/skeleton';
import { useStatus } from '@/context/StatusContext';

const CommentSchema = z.object({
  content: z.string().min(1).max(500),
});

interface CommentsTabProps {
  task: Task;
}

const CommentsTab = ({ task }: CommentsTabProps) => {
  const [showtask, setShowTask] = useState<Task | null>();
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  const { refreshTasks } = useTask();
  const { refreshStatus } = useStatus();
  const { user } = useUser();

  useEffect(() => {
    setLoading(true); 
    getOneTask(task._id)
      .then((task) => {
        setShowTask(task);
        setLoading(false); 
      })
      .catch(() => {
        setLoading(false);
        toast.error('Failed to get task');
      });

  }, [task]);

  const handleAddComment = async () => {
    try {
      const validationResult = CommentSchema.safeParse({ content: newComment });
      if (!validationResult.success) {
        toast.error('Empty comment');
        return;
      }

      await createComment(task._id, { content: newComment });
      const updatedTask = await getOneTask(task._id);
      setShowTask(updatedTask);

      refreshTasks();

      toast.success('Comment added successfully');
      setNewComment('');
    } catch (error) {
      toast.error('Failed to add comment');
    }
  };

  const handleDeleteComment = (commentId: string) => {
    deleteComment(task._id, commentId)
      .then(() => {
        return getOneTask(task._id);
      })
      .then((updatedTask) => {
        setShowTask(updatedTask);
        refreshTasks();
        refreshStatus();
        toast.success('Comment deleted successfully');
      })
      .catch(() => {
        toast.error('Failed to delete comment');
      });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className='w-full h-full' />
        <Skeleton className='w-full h-full' />
        <Skeleton className='w-full h-full' />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {showtask && showtask.comments.length > 0 ? (
        showtask.comments.map((comment, index) => (
          <div key={index} className="p-4 bg-background shadow-md rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-secondary">{comment.author.name}</span>
              <span className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-foreground flex-grow">{comment.content}</p>
              {user?._id === comment.author._id && (
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Button className="py-1 px-2 bg-red-500 text-background rounded-lg hover:bg-red-400 transition duration-300 ease-in-out">
                      <IoTrash />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure you want to delete this comment?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeleteComment(comment._id)}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="p-4 bg-background shadow-md rounded-lg text-center text-foreground">No comments found.</div>
      )}
      <div className="p-4 bg-background rounded-lg">
        <div className="flex items-start space-x-4">
          <Input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
          <Button
            onClick={handleAddComment}
            className="py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-400 transition duration-300 ease-in-out"
          >
            <p>Add Comment</p>
          </Button>
        </div>

      </div>
    </div>
  );
};

export default CommentsTab;
