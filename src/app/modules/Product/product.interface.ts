import { Document, ObjectId } from "mongoose";

export interface TProduct extends Document {
    name: string
    description: string
    cost: number
    quantity: number
    sizesAvailable: JSON
    colorsAvailable: JSON
    stylesAvailable: JSON
    deliveryMode: string
    createdBy: string
    categoryName: string
    store: ObjectId
    productImages: Array<any>
}