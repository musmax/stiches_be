import { ObjectId } from 'mongoose'
import { Document } from 'mongoose'
export interface TStore extends Document {
  name: string
  ratingStarsCount: number
  about: string
  addresses: JSON
  staffs: JSON,
  logo: string,
  servicesOffered: JSON,
  socialMediaHandles: JSON,
  phoneNumbers: JSON,
  openingHours: JSON,
  createdBy: ObjectId,
  product: ObjectId,
}
