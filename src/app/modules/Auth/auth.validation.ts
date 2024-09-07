import { z } from 'zod'

const registerValidationSchema = z.object({
  body: z.object({
    firstname: z
      .string({
        invalid_type_error: 'Firstname must be a string',
      })
      .min(1, { message: 'Firstname is required' }),
    role: z.string().default('tailor'),

    lastname: z
      .string({
        invalid_type_error: 'Lastname must be a string',
      })
      .min(1, { message: 'Lastname is required' }),

    email: z
      .string({
        invalid_type_error: 'Email must be a string',
      })
      .email({ message: 'Invalid email format' }),

    password: z
      .string({
        invalid_type_error: 'Password must be a string',
      })
      .min(8, { message: 'Password must be at least 8 characters' })
      .max(20, { message: 'Password cannot be more than 20 characters' }),
  }),
})

const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        invalid_type_error: 'Email must be a string',
      })
      .email({ message: 'Invalid email format' }),

    password: z
      .string({
        invalid_type_error: 'Password must be a string',
      })
      .min(8, { message: 'Password must be at least 8 characters' })
      .max(20, { message: 'Password cannot be more than 20 characters' }),
  }),
})

export const AuthValidation = {
  registerValidationSchema,
  loginValidationSchema,
}
