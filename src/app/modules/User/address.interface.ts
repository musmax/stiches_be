import { Document, ObjectId } from 'mongoose'
export interface TUserAddress extends Document {
  content: string
  typeOfAddress: string
  userId: ObjectId
}
