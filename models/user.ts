import { Schema, model, Model } from 'mongoose'

export type UserAttributes = {
  _id: Schema.Types.ObjectId
  name: string
  email: string
  isAdmin: boolean
  productCreated?: Schema.Types.ObjectId[]
  password: string
  token: string
}

export const UserSchema = new Schema<UserAttributes>({
  name: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  productCreated: {
    type: [Schema.Types.ObjectId],
    ref: 'Product',
  },
})

export type UserDocument = UserAttributes & Document
export type UserModel = Model<UserDocument>

export const User = model<UserAttributes>('User', UserSchema)
