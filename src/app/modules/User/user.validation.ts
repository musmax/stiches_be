import { z } from 'zod'
import { UserStatus } from './user.constant'

const userValidationSchema = z.object({
  pasword: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .max(20, { message: 'Password can not be more than 20 characters' })
    .optional(),
})
const userAddresValidationSchema = z.object({
  body: z.object({
    content: z.string(),
    // typeOfAddress: z.string(),
  }),
})
const userMeasurementValidationSchema = z.object({
  body: z.object({
    content: z.array(z.string()),
  }),
})
const editProfileValidationSchema = z.object({
  body: z.object({
    firstname: z.string().optional(),
    lastname: z.string().optional(),
    profileImage: z.string().optional(),
  }),
})

const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
})
export const UserValidation = {
  userValidationSchema,
  changeStatusValidationSchema,
  userAddresValidationSchema,
  userMeasurementValidationSchema,
  editProfileValidationSchema,
}
