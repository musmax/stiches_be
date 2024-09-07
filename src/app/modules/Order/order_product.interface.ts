import { Document, ObjectId } from "mongoose";

export interface TOrderProduct extends Document {
    chosenSize: string
    chosenStyle: string
    chosenColor: string
    originalAmount: number
    amountPaid: number
    quantity: number
    productId: ObjectId
    orderId: ObjectId
}