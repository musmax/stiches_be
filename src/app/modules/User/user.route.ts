import express from 'express'
import authGuard from '../../middlewares/authGuard'
import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from './user.constant'
import { UserControllers } from './user.controller'
import { UserValidation } from './user.validation'

const router = express.Router()

router.post(
  '',
  authGuard(USER_ROLE.admin),
  validateRequest(UserValidation.userValidationSchema),
  UserControllers.createUser,
)
router.get('/me', authGuard(), UserControllers.fetchMe)
router.post(
  '/address',
  authGuard(),
  validateRequest(UserValidation.userAddresValidationSchema),
  UserControllers.createUserAddress,
)
router.post(
  '/measurement',
  authGuard(),
  validateRequest(UserValidation.userMeasurementValidationSchema),
  UserControllers.createUserMeasurement,
)

// export user routes
export const UserRoutes = router
