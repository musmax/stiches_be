import { Schema, model } from 'mongoose'
import { TProductImages } from './productImages.interference'

// Schema Definition
const productImageSchema = new Schema<TProductImages>(
  {
    url: {
      type: String,
      required: true,
    },
    isMain: {
      type: Boolean,
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
const ProductImage = model<TProductImages>('ProductImage', productImageSchema)

export default ProductImage
