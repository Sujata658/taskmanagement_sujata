import { messages } from "../../../utils/Messages";
import CustomError from "../../../utils/Error";
import { createTag,  getTagById, getAllTags, getTasksByTag, addTagToTask, getTag, addTaskToTag } from "./repository";
import { getTaskById } from "../Tasks/repository";

const TagsServices = {
    async createTag(tagName: string, taskId: string){
        const task = getTaskById(taskId)
        if(!task) throw new CustomError(messages.task.not_found, 404)

        const tag = await createTag( tagName, taskId)

        if(!tag) throw new CustomError(messages.tag.creation_failed, 500)
            
        await addTagToTask(taskId, tag._id!.toString())
        return tag
    },
    getTag(tagId: string){
        return getTagById(tagId)
    },
    getAllTags(){
        return getAllTags()
    },
    async getTasksByTag(query: string){
        return getTasksByTag(query)
        
    },
    async updateNewTags(tags: string[] | undefined, taskId: string): Promise<string[]> {
        if (!tags) return []; 
    
        const tagIds = await Promise.all(tags.map(async (tag) => {
            const tagId = await getTag(tag);
            if (!tagId) {
                const newTag = await createTag(tag, taskId);
                if (!newTag) throw new CustomError(messages.tag.creation_failed, 500);
                await addTagToTask(taskId, newTag._id!.toString());
                return newTag._id!.toString();
            } else {
                await addTaskToTag(taskId, tagId._id!.toString());
                await addTagToTask(taskId, tagId._id!.toString());
                return tagId._id!.toString();
            }
        }));
        return tagIds;
    },
    async updateTasksTags(tags: string[] | undefined, taskId: string) {
        if (!tags || tags.length === 0) return;
        await Promise.all(tags.map(async (tag) => {
            const tagId = await getTag(tag);
            if (!tagId) {
                const newTag = await createTag(tag, taskId);
                if (!newTag) throw new CustomError(messages.tag.creation_failed, 500);
                await addTagToTask(taskId, newTag._id!.toString());
            }
        }));
        return
    }
    
    

}
export default TagsServices;