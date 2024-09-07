"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const registerValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        firstname: zod_1.z.string({
            invalid_type_error: 'Firstname must be a string',
        }).min(1, { message: 'Firstname is required' }),
        lastname: zod_1.z.string({
            invalid_type_error: 'Lastname must be a string',
        }).min(1, { message: 'Lastname is required' }),
        email: zod_1.z.string({
            invalid_type_error: 'Email must be a string',
        }).email({ message: 'Invalid email format' }),
        password: zod_1.z.string({
            invalid_type_error: 'Password must be a string',
        })
            .min(8, { message: 'Password must be at least 8 characters' })
            .max(20, { message: 'Password cannot be more than 20 characters' }),
    }),
});
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            invalid_type_error: 'Email must be a string',
        }).email({ message: 'Invalid email format' }),
        password: zod_1.z.string({
            invalid_type_error: 'Password must be a string',
        })
            .min(8, { message: 'Password must be at least 8 characters' })
            .max(20, { message: 'Password cannot be more than 20 characters' }),
    }),
});
exports.AuthValidation = {
    registerValidationSchema,
    loginValidationSchema,
};
