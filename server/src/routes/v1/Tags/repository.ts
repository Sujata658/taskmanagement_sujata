import { TaskModel } from "../Tasks/model";
import { TagModel } from "./model";

export const createTag = (tagName: string, taskId: string) => {
    const newTag = new TagModel({
        name: tagName,
        tasks: [taskId]
    });
    return newTag.save();
};

export const getTagById = (tagId: string) => {
    return TagModel.findById({ tagId })
}
export const getTag = (tag: string) => {
    return TagModel.findOne({name: tag})
}

export const getAllTags = () => {
    return TagModel.find()
}
export const getTasksByTag = (query:string) => {
    const regex = new RegExp(query, 'i');
    
    return TagModel.find({ name: { $regex: regex } })
      .populate({
        path: 'tasks',
        populate: [
            {
                path: 'author',
                select: 'name -_id',
                options: { lean: true }
              },
              { path: 'tags', select: 'name' },
              { path: 'assignees', select: 'name email' },
              { path: 'comments', select: 'content author createdAt' }
        ]
      });
  };
  
  

export const addTagToTask = (taskId: string, tagId: string) => {
    return TaskModel.findByIdAndUpdate(
        taskId,
        { $push: { tags: tagId } },
        { new: true }
    );
};

export const addTaskToTag = (taskId: string, tagId: string) => {
    return TagModel.findByIdAndUpdate
    (
        tagId,
        { $push: { tasks: taskId } },
        { new: true }
    );
}