import mongoose, { Types } from 'mongoose';

export interface Rules {
  rules: {
    [key: string]: string[];
  };
}

export interface RulesDocument extends Rules, mongoose.Document {
  author: Types.ObjectId;
}

const RulesSchema = new mongoose.Schema<RulesDocument>(
  {
    rules: {
      type: Map,
      of: [String],
      required: [true, 'Rules are required'],
      unique: false,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

export const RuleModel = mongoose.model<RulesDocument>('Rules', RulesSchema);
