import mongoose, { Document } from 'mongoose';

export interface Stage {
  name: string;
}

export interface StageDocument extends Document, Stage {
  tasks?: [];
}

const StageSchema = new mongoose.Schema<StageDocument>(
  {
    name: {
      type: String,
      required: [true, 'Name is Required'],
      unique: false,
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'task',
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const StageModel = mongoose.model<StageDocument>('Stage', StageSchema);