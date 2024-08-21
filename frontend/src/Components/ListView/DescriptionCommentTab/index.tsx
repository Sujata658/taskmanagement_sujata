import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Task } from '@/types/Task'
import CommentsTab from '../CommentTab'

interface DescriptionCommentTabsProps {
    task: Task
}
const DescriptionCommentTabs = ({ task }: DescriptionCommentTabsProps) => {
    return (
        <Tabs defaultValue="Description">
            <TabsList className="grid w-full grid-cols-2 border p-1 rounded-lg my-2 bg-background">
                <TabsTrigger value="Description" className="p-2 font-semibold text-muted-foreground rounded-lg hover:bg-indigo-200 transition">
                    Description
                </TabsTrigger>
                <TabsTrigger value="Comments" className="p-2 font-semibold text-muted-foreground rounded-lg hover:bg-indigo-200 transition">
                    Comments
                </TabsTrigger>
            </TabsList>
            <TabsContent value="Description">
                <div className="p-4 bg-background shadow rounded-lg">
                    <p className="text-muted-foreground">{task.description}</p>
                </div>
            </TabsContent>
            <TabsContent value="Comments">
                <CommentsTab task={task} />
            </TabsContent>
        </Tabs>
    )
}

export default DescriptionCommentTabs