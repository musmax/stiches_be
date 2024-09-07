import { Schema, model } from 'mongoose'
import { TUpload } from './upload.interface'

// Schema Definition
const uploadSchema = new Schema<TUpload>(
  {
    url: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

// Creating the model
const Upload = model<TUpload>('Upload', uploadSchema)

export default Upload
