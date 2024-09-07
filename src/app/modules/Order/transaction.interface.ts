import { Document, ObjectId } from "mongoose";

export interface TTransaction extends Document {
    details: string
    paymentMethod: string
    reference: string
    status: string
    buyer: ObjectId
    seller: ObjectId
    order: ObjectId
    product: ObjectId
    amount: number
}