import { Schema, model } from 'mongoose'
import {TOrderTrackerLogs} from './order_tracker_log.interface'
// Schema Definition
const orderTrackerLogSchema = new Schema<TOrderTrackerLogs>(
  {
    orderTrackerId: {
      type: Schema.Types.ObjectId,
      ref: 'OrderTracker',
    },
    status: {
      type: String,
    },
    sideNotes: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

// Creating the model
const OrderTrackerLogs = model<TOrderTrackerLogs>('OrderTrackerLogs', orderTrackerLogSchema)
export default OrderTrackerLogs
