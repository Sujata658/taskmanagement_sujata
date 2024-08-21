import CustomError from '../../../utils/Error';
import { addCommentToTask, deleteTaskComment,getTaskById } from '../Tasks/repository';
import { Comment, CommentModel } from './model';
import { createComment, deleteComment, editComment } from './repository';
import { messages } from '../../../utils/Messages';
import InputValidation from '../../../utils/InputValidation';

export const CommentsService = {
  async getComment(id:string){
    InputValidation.validateid(id)
    const comment = await CommentModel.findById(id)
    if (!comment) throw new CustomError(messages.comment.not_found, 404);

    const { _id, ...rest} = comment.toObject()
    return rest
  },

  async createComment(data: Comment, taskId: string, userId: string) {
    InputValidation.validateComment(data)
    const task = await getTaskById(taskId)
    if(!task) throw new CustomError(messages.task.not_found, 404)

    const comment = await createComment(data, userId);
    if (!comment) throw new CustomError(messages.comment.creation_failed, 500);

    await addCommentToTask(taskId, comment._id!.toString());

    return comment;
  },

  async updateComment(id: string, taskId: string, data: Partial<Comment>, userId: string) {
    InputValidation.validateid(id)
    InputValidation.validateid(taskId)

    const task = await getTaskById(taskId)
    if(!task) throw new CustomError(messages.task.not_found, 404)


    const comment = await this.getComment(id)
    if(!comment)throw new CustomError(messages.comment.not_found,404)

    const author= comment.author.toString()

    if(author !== userId) throw new CustomError(messages.comment.edit_forbidden, 403)
      
    const res = await editComment(id,author,  data);
    if (!res) throw new CustomError(messages.comment.edit_forbidden, 403);

    return res;
  },

  async deleteComment(id:string, taskId: string, userId: string) {
    InputValidation.validateid(id)
    InputValidation.validateid(taskId)
    InputValidation.validateid(userId)

    const task = await getTaskById(taskId)
    if(!task) throw new CustomError(messages.task.not_found, 404)
    const comment = await this.getComment(id)
    if(!comment) throw new CustomError(messages.comment.not_found, 404)

    if(comment.author.toString() !== userId) throw new CustomError(messages.comment.delete_forbidden, 403)
    
    await deleteTaskComment(id, taskId, comment.author.toString())
    const result = await deleteComment(id, comment.author.toString())

    if (!result) throw new CustomError(messages.comment.delete_forbidden, 403);
    
    return {comment}
  },
};
