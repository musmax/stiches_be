import { z } from 'zod'

const orderValidationSchema = z.object({
  body: z.object({
    storeId: z.string(),
    paymentMethod: z.string(),
    deliveryAddress: z.string(),
    orderCart: z.array(
      z.object({
        productId: z.string(),
        quantity: z.number(),
      }),
    ),
    deliveryMode: z.string(),
  }),
})
const orderVerifyValidationSchema = z.object({
  reference: z.string(),
});
const orderTrackerValidationSchema = z.object({
body: z.object({
  deliveryStatus: z.string(),
  sideNotes: z.string(),
})
});

export const OrderValidation = {
  orderValidationSchema,
  orderVerifyValidationSchema,
  orderTrackerValidationSchema
}
