import mongoose, { Types } from 'mongoose';

export interface Tag {
    name: string;
    tasks?: Types.ObjectId[];
}

const TagSchema = new mongoose.Schema<Tag>(
    {
        name: {
            type: String,
            required: [true, 'Tag Name is Required'],
            unique: false,
            trim: true,
        },
        tasks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Task',
                required: false,
            },
        ],
    },
    {
        timestamps: true,
    },
);

export const TagModel = mongoose.model<Tag>('Tag', TagSchema);