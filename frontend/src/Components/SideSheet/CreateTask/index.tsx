import { Card } from "@/components/ui/card";
import { FaPlus } from "react-icons/fa";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import CreateTaskForm from "../CreateTaskForm";



const CreateTaskCard = () => {
    return (
        <>
            <Sheet>
                <SheetTrigger asChild>
                    <Card className="bg-background shadow-md rounded-xl p-4 transition duration-300 ease-in-out w-full transform hover:scale-105 hover:cursor-pointer">
                            <div className="flex items-center justify-between">
                                <div className="text-sm font-bold">New Task</div>
                                <div className="bg-foreground text-background rounded-full p-2">
                                    <FaPlus className="text-sm" />
                                </div>
                            </div>
                    </Card>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle className="text-xl text-center ">Create Task</SheetTitle>
                    </SheetHeader>
                    <div className="flex h-full items-center">

                    <CreateTaskForm />
                    </div>
                </SheetContent>
            </Sheet>

        </>
    )
}

export default CreateTaskCard
