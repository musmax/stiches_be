import express from 'express'
import authGuard from '../../middlewares/authGuard'
import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from './user.constant'
import { UserControllers } from './user.controller'
import { UserValidation } from './user.validation'

const router = express.Router()

router.post(
  '',
  authGuard(),
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
router.patch(
  '/edit-profile',
  authGuard(),
  validateRequest(UserValidation.editProfileValidationSchema),
  UserControllers.editUserById,
)
router.get(
  '/fetch-user',
  authGuard(),
  UserControllers.fetchUserById,
)
router.get(
  '/fetch-users',
  authGuard(),
  UserControllers.queryAllUsers,
)
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
