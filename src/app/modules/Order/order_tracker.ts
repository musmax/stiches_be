import { Schema, model } from 'mongoose';
import { TOrderTracker } from './order_tracker.interface';


// Define the subdocument schema for product images
const orderTrackerLogSchema = new Schema({
  deliveryStatus: String,
  sideNotes: String
});

// Schema Definition
const orderTrackerSchema = new Schema<TOrderTracker>(
  {
    deliveryStatus: {
      type: String,
      required: true,
    },
    reference: {
      type: String,
      required: true,
    },
    sideNotes: {
      type: String,
    },
    orderId: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    // storeOwner: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'User',
    //   required: true,
    // },
    trackerLogs: [orderTrackerLogSchema],
  },
  {
    timestamps: true,
  },
);
// Creating the model
const OrderTracker = model<TOrderTracker>('OrderTracker', orderTrackerSchema);
export default OrderTracker;
