import { Schema, model } from 'mongoose'
import { TUserMeasurement } from './userMeasurement.interface'

// Schema Definition
const userMeasurementSchema = new Schema<TUserMeasurement>(
  {
    content: {
      type: JSON,
      required: true, // Add this if URL is mandatory
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
)

// Creating the model
const Measurement = model<TUserMeasurement>(
  'Measurement',
  userMeasurementSchema,
)

export default Measurement
