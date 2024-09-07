import { Document, ObjectId } from 'mongoose'
export interface TUserMeasurement extends Document {
  content: JSON
  owner: ObjectId
}
