/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZodError } from 'zod'
import { IGenericReturnError } from '../interface/error'

// define handle zod error function
const handleZodError = (
  error: ZodError,
): IGenericReturnError<ZodError<any>> => {
  // generate error message
  const errorMessage = error.issues
    .map(issue => `${issue.path[issue.path.length - 1]} is ${issue.message}.`)
    .join('. ')

  // set status code
  const statusCode = 400

  return {
    statusCode,
    message: 'Validation Error',
    errorMessage,
    errorDetails: error,
  }
}

export default handleZodError
