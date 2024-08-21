import { Task } from '@/types/Task';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from 'react';

interface DetailsDialogProps {
  trigger: ReactNode;
  task: Task;
}

const DetailsDialog = ({ trigger, task }: DetailsDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        
          <DialogTitle>{task.title}</DialogTitle>
          <DialogDescription>{task.description}</DialogDescription>
        
      </DialogContent>
    </Dialog>
  );
};

export default DetailsDialog;
