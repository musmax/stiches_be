import { Schema, model } from 'mongoose'
import { TProduct } from './product.interface'

// Define the subdocument schema for product images
const productImageSchema = new Schema({
  url: String,
  isMain: Boolean
});

// Schema Definition
const productSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    cost: {
      type: Number,
    },
    sizesAvailable: {
      type: JSON,
    },
    colorsAvailable: {
      type: JSON,
    },
    stylesAvailable: {
      type: JSON,
    },
    deliveryMode: {
      type: String,
    },
    categoryName: {
      type: String,
    },
    createdBy: {
      type: String,
      ref: 'User',
      as: 'creator',
    },
    store: {
      type: Schema.Types.ObjectId,
      ref: 'Store',
    },
    productImages: [productImageSchema],
  },
  {
    timestamps: true,
  },
)

// Creating the model
const Product = model<TProduct>('Product', productSchema)

export default Product
