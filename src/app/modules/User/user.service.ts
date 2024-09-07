// import { model } from 'mongoose'
import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import Address from './address.model'
import { User } from './user.model'
import Measurement from './userMeasurement.model'

const createStudentIntoDB = async () => {
  console.log('createStudentIntoDB')
  return 'createStudentIntoDB'
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createUserAddress = async (body: any, userId: any) => {
  // Create a new address associated with the user
  const address = await Address.create({ ...body, userId })
  // Update the user's `userSavedAddresses` array by pushing the new address ID
  await User.findByIdAndUpdate(userId, {
    $push: { userSavedAddresses: address._id },
  })
  return address
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createUserMeasurement = async (body: any, userId: any) => {
  if (body.measurementId) {
    const measurement = await Measurement.findById(body.measurementId)
    if (measurement) {
      Object.assign(measurement, body)
      return measurement.save()
    } else {
      throw new AppError(httpStatus.NOT_FOUND, 'Measurement not found')
    }
  }
  const existingMeasurement = await Measurement.findOne({ owner: userId })
  if (existingMeasurement) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Kindly update your existing measurement',
    )
  }
  // Await the creation of the measurement
  const measurement = await Measurement.create({ ...body, owner: userId })
  // Find the user and update their measurement reference
  await User.findByIdAndUpdate(userId, { userMeasurement: measurement._id })
  return measurement
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GetMe = async (userId: any) => {
  console.log(userId)
  const user = await User.findOne({ _id: userId }).populate([
    'userSavedAddresses',
    'userMeasurement',
    'store',
  ])
  if (!user) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'User not found')
  }
  console.log(user)
  return user
}

export const UserServices = {
  createStudentIntoDB,
  createUserAddress,
  GetMe,
  createUserMeasurement,
}
