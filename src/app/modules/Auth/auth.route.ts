import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AuthControllers } from './auth.controller'
import { AuthValidation } from './auth.validation'

const router = express.Router()

router.post(
  '/register',
  validateRequest(AuthValidation.registerValidationSchema),
  AuthControllers.register,
);

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.login,
);

// export user routes
export const AuthRoutes = router;
