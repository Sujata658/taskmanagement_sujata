import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@radix-ui/react-dropdown-menu'

interface DropdownProps {
    trigger: string;
    items: string[];
}


const Dropdown = ({trigger, items}: DropdownProps) => {
  return (
    <div>

    <DropdownMenu>
    <DropdownMenuTrigger>
        <Button variant={'outline'}>{trigger}</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-32 bg-background border  divide-y rounded">
        {
            items.map((item, index) => {
                return (
                    <DropdownMenuItem key={index} className='text-center p-1 '>{item}</DropdownMenuItem>
                )
            })
        }
    </DropdownMenuContent>
  </DropdownMenu>
    </div>
  )
}

export default Dropdown