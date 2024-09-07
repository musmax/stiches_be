/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose'
import { IGenericReturnError } from '../interface/error'

// handle mongoose validation error
const handleValidationError = (
  error: mongoose.Error.ValidationError,
): IGenericReturnError<any> => {
  // generate error message
  const errorMessage = Object.values(error.errors)
    .map(value => value.message)
    .join(' ')

  // set status code
  const statusCode = 400

  return {
    statusCode,
    message: 'Validation Error',
    errorMessage,
    errorDetails: error,
  }
}

export default handleValidationError
