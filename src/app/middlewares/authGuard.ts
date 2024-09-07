import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config'
import AppError from '../errors/AppError'
import { TUserRole } from '../modules/User/user.interface'
import { User } from '../modules/User/user.model'
import catchAsync from '../utils/catchAsync'

const authGuard = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization

    // checking if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authenticated!')
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload

    const { role, id, iat } = decoded

    // checking if the user is exist
    const user = await User.findById(id)

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
    }
    // checking if the user is already deleted
    const isDeleted = user?.isDeleted
    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
    }
    // checking if the user is blocked
    const userStatus = user?.status
    if (userStatus === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !')
    }
    if (
      user.passwordChangedAt &&
      User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !')
    }

    if (requiredRoles.length && !requiredRoles.includes(role)) {
      console.log(requiredRoles)
      throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized!!!')
    }

    req.user = decoded as JwtPayload & { role: string }
    next()
  })
}

export default authGuard
