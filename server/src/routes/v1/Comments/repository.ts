import { Comment, CommentModel } from './model';

export const createComment = (data: Comment, userId: string)=> {
  const comment = new CommentModel({ ...data, author: userId });
  return comment.save();
};

export const editComment = (commentId: string,userId: string, data: Partial<Comment>)=> {
  return CommentModel.findOneAndUpdate({ _id: commentId , author: userId}, data, { new: true });
};
export const deleteComment = (commentId: string, userId: string)=> {
  return CommentModel.findOneAndDelete({ _id: commentId, author: userId });
};
