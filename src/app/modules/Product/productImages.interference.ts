import { Document, ObjectId } from 'mongoose'
export interface TProductImages extends Document {
  url: string
  isMain: boolean
  productId: ObjectId
}
