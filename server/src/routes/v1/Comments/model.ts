import mongoose, {  Types } from 'mongoose';

export interface Comment {
  content: string;
  author: Types.ObjectId;
}

const commentSchema = new mongoose.Schema<Comment>(
  {
    content: {
      type: String,
      required: [true, 'Content is Required'],
      unique: false,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Author is Required'],
      unique: false,
    },
  },
  {
    timestamps: true,
  },
);

export const CommentModel = mongoose.model<Comment>('comment', commentSchema);