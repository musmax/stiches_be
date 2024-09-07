import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AuthServices } from './auth.service'

const register = catchAsync(async (req, res) => {

  const user = await AuthServices.createUser(req.body)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User registered successfully',
    data: user,
  })
})

const login = catchAsync(async (req, res) => {

  const user = await AuthServices.login(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User login successfully',
    data: user,
  })
})

export const AuthControllers = {
  register,
  login,
}
