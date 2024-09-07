/* eslint-disable @typescript-eslint/no-explicit-any */

import { IGenericReturnError } from '../interface/error'

const handleDuplicateError = (error: any): IGenericReturnError<any> => {
  // generate error message

  const errorMessage = Object.entries(error.keyValue)
    .map(([key, value]) => `${key} '${value}' is already exist.`)
    .join('. ')

  // set status code
  const statusCode = 400

  return {
    statusCode,
    message: 'Duplicate Error',
    errorMessage,
    errorDetails: error,
  }
}

export default handleDuplicateError
