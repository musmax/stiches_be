import { Schema, model } from 'mongoose'
import { TOrder } from './order.interface'

// Schema Definition
const orderSchema = new Schema<TOrder>(
  {
    amount: {
      type: Number,
      // required: true,
    },
    chosenSize: {
      type: String,
    },
    chosenColor: {
      type: String,
    },
    deliveryMode: {
      type: String,
      enum: ['pickup', 'express'],
    },
    orderInitiator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    order_payment_receipt: {
      type: Schema.Types.ObjectId,
      ref: 'Transaction',
    },
    orderTracker: {
      type: Schema.Types.ObjectId,
      ref: 'OrderTracker',
    },
  },
  {
    timestamps: true,
  },
)

// Adding a virtual field for `OrderProduct`
orderSchema.virtual('orderProducts', {
  ref: 'OrderProduct', // Reference the OrderProduct model
  localField: '_id', // The field in the Order schema
  foreignField: 'orderId', // The field in the OrderProduct schema
})

orderSchema.set('toObject', { virtuals: true })
orderSchema.set('toJSON', { virtuals: true })

// Creating the model
const Order = model<TOrder>('Order', orderSchema)

export default Order
