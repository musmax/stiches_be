import { Schema, model } from 'mongoose'
import { TTransaction } from './transaction.interface'

// Schema Definition
const transactionSchema = new Schema<TTransaction>(
  {
    details: {
      type: String,
      // required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['paystack', 'flutterwave'],
      required: true,
    },
    reference: {
      type: String,
      // required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending',
      // required: true,
    },
    amount: {
      type: Number,
      // required: true,
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      // required: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      // required: true,
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      // required: true,
    },
  },
  {
    timestamps: true,
  },
)

// Creating the model
const Transaction = model<TTransaction>('Transaction', transactionSchema)

export default Transaction
