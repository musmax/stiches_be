import { Schema, model } from 'mongoose'
import { TOrderProduct } from './order_product.interface'

// Schema Definition
const orderProductSchema = new Schema<TOrderProduct>(
  {
    quantity: {
      type: Number,
      required: true,
    },
    originalAmount: {
      type: Number,
      required: true,
    },
    amountPaid: {
      type: Number,
      required: true,
    },
    chosenSize: {
      type: String,
    },
    chosenColor: {
      type: String,
    },
    chosenStyle: {
      type: String,
    },
    orderId: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

// Creating the model
const OrderProduct = model<TOrderProduct>('OrderProduct', orderProductSchema)

export default OrderProduct
