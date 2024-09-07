import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { UserServices } from './user.service'

const createUser = catchAsync(async (req, res) => {
  console.log('createUser')

  const user = await UserServices.createStudentIntoDB()

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User created successfully',
    data: user,
  })
})
const fetchMe = catchAsync(async (req, res) => {
  const user = await UserServices.GetMe(req.user.id)
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User fetched successfully',
    data: user,
  })
})

const createUserAddress = catchAsync(async (req, res) => {
  await UserServices.createUserAddress(req.body, req.user.id)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User address created successfully',
    data: undefined,
  })
})
const createUserMeasurement = catchAsync(async (req, res) => {
  await UserServices.createUserMeasurement(req.body, req.user.id)
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User measurement created successfully',
    data: undefined,
  })
})

export const UserControllers = {
  createUser,
  createUserAddress,
  fetchMe,
  createUserMeasurement,
}
