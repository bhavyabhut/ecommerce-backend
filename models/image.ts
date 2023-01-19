import { Schema, Model, model } from 'mongoose';

export type ImageAttributes = {
  _id: Schema.Types.ObjectId;
  url: string;
};

const ImageSchema = new Schema<ImageAttributes>({
  url: {
    type: String,
    required: true,
  },
});

export const Image = model<ImageAttributes>('Image', ImageSchema);
