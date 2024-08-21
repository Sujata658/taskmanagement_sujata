import { Checkbox } from "@/components/ui/checkbox"
import { Task, Assignee } from "@/types/Task"
import { ColumnDef, CellContext, FilterFn } from "@tanstack/react-table"
import { Tag } from "@/types/Task"
import moment from "moment"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"


const filterTags: FilterFn<any> = (row, _ , filterValue) => {
  const tags: Tag[] = row.original.tags as Tag[];
  const res = tags.some((tag) => tag.name.includes(filterValue));
  if (res) {
    return true;
  }
  return false;

}
export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <>
          Title
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >

            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </>
      )
    },

  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: (props: CellContext<Task, unknown>) => {
      const dueDate = moment(props.cell.row.original.dueDate);
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
      }
      else {
        timeLeft = `${daysLeft} days left`;
      }

      return (
        <div>
          {timeLeft}
        </div>
      );
    }
  },
  {
    accessorKey: "priority",
    header: "Priority",
  },

  {
    accessorKey: "author",
    header: "Created By",
    cell: (props: CellContext<Task, unknown>) => {
      return (
        <div>
          {props.cell.row.original.author.name}
        </div>
      );
    }
  },
  {
    accessorKey: "assignees",
    header: "Assignees",
    cell: (props: CellContext<Task, unknown>) => {
      const assignees: Assignee[] = props.cell.row.original.assignees as Assignee[];
      return (
        <div className="flex flex-wrap gap-2">

          {assignees && assignees.map((assignee: Assignee, index: number) => (
            <div
              key={index}
              className="rounded-full bg-blue-500 text-white py-1 px-2 text-xs"
            >
              {assignee.name}
            </div>
          ))}
        </div>
      );
    }
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: (props: CellContext<Task, unknown>) => {
      const tags: Tag[] = props.cell.row.original.tags as Tag[];
      return (
        <div className="flex flex-wrap gap-2">
          {tags && tags.map((tag: Tag, index: number) => (
            <div
              key={index}
              className="rounded-full border border-foreground px-3 py-1 text-sm">
              {tag.name}
            </div>
          ))}
        </div>
      );
    },
    filterFn: filterTags,
  }

];