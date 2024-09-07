import { Document, ObjectId } from 'mongoose'
export interface TUpload extends Document {
    url: string
    publicId: string
    type: string
}
