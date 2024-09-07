import { z } from 'zod'

const productValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    quantity: z.number(),
    cost: z.number(),
    // sizesAvailable : z.array(z.string()),
    // colorsAvailable : z.array(z.string()),
    // stylesAvailableSchema : z.array(z.string()),
    categoryName: z.string(),
    // deliveryMode: z.string(),
    productImages: z.array(z.object({
      url: z.string(),
      isMain: z.boolean().default(false)
    })),
  }),
})

const updateProductValidationSchema = z.object({
  // params: z.object({
  //   productId: z.string().uuid(),
  // }),
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    quantity: z.number().optional(),
    cost: z.number().optional(),
    sizesAvailable: z.array(z.string()).optional(),
    colorsAvailable: z.array(z.string()).optional(),
    stylesAvailableSchema: z.array(z.string()).optional(),
    categoryName: z.string().optional(),
    deliveryMode: z.string().optional(),
  }),
});

const productStoreValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    about: z.string(),
    addresses: z.array(z.string()),
    // staffs: z.array(z.string()),
    phoneNumbers: z.array(z.string()),
    openingHours: z.array(z.string()),
    // socialMediaHandles: z.array(z.string()),
    // storeId: z.string(),
    logo: z.string(),
  }),
})

export const ProductValidation = {
  productValidationSchema,
  productStoreValidationSchema,
  updateProductValidationSchema
}
