import { Schema, model } from 'mongoose'
import { TStore } from './store.interface'

// Schema Definition
const StoreSchema = new Schema<TStore>(
  {
    name: {
      type: String,
      required: true,
    },
    about: {
      type: String,
    },
    logo: {
      type: String,
    },
    addresses: {
      type: JSON,
    },
    servicesOffered: {
      type: JSON,
    },
    staffs: {
      type: JSON,
    },
    phoneNumbers: {
      type: JSON,
    },
    openingHours: {
      type: JSON,
    },
    socialMediaHandles: {
      type: JSON,
    },
    createdBy: {
      type: String,
      ref: 'User',
    },
    product: {
      type: String,
      ref: 'Product',
    },
  },
  {
    timestamps: true,
  },
)

// Creating the model
const Store = model<TStore>('Store', StoreSchema)

export default Store
