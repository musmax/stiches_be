/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose'
import { IGenericReturnError } from '../interface/error'

// handle cast errors
const handleCastError = (
  error: mongoose.Error.CastError,
): IGenericReturnError<any> => {
  // generate error message
  const errorMessage = `${error.value} is not a valid ID!`

  // set status code
  const statusCode = 400

  return {
    statusCode,
    message: 'Invalid ID',
    errorMessage,
    errorDetails: error,
  }
}

export default handleCastError
