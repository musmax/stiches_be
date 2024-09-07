/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler } from 'express'
// import config from "../config";
import httpStatus from 'http-status'
import config from '../config'
import AppError from '../errors/AppError'
import handleCastError from '../errors/handleCastError'
import handleDuplicateError from '../errors/handleDuplicateError'
import handleValidationError from '../errors/handleValidationError'
import handleZodError from '../errors/handleZodError'

// define simplified error function
const simplifiedError = (err: any) => {
  // set default error properties
  const statusCode = 400
  const message = 'Something went wrong'
  const errorMessage = 'Something went wrong or missing or invalid'
  const errorDetails = err

  // handle zod validation error
  if (err?.name === 'ZodError') {
    return handleZodError(err)
  }

  // handle duplicate error
  if (err?.code === 11000) {
    return handleDuplicateError(err)
  }

  // handle cast error
  if (err?.name === 'CastError') {
    return handleCastError(err)
  }

  // handle mongoose validation error
  if (err?.name === 'ValidationError') {
    return handleValidationError(err)
  }
  // handle json web token error
  if (err?.statusCode === 401 || err?.statusCode === 403) {
    return {
      success: false,
      statusCode: httpStatus.UNAUTHORIZED,
      message: 'Unauthorized Access',
      errorMessage:
        err.message ? err.message :
        'You do not have the necessary permissions to access this resource.',
      errorDetails: null,
      stack: null,
    }
  }

  // handle AppError
  if (err instanceof AppError) {
    return {
      statusCode: err.statusCode,
      message,
      errorMessage: err.message,
      errorDetails,
    }
  }

  // handle other errors
  if (err instanceof Error) {
    return {
      statusCode,
      message,
      errorMessage: err.message,
      errorDetails,
    }
  }

  return { statusCode, message, errorMessage, errorDetails }
}

// define a global error handler middleware
const globalErrorHandler: ErrorRequestHandler = async (err, req, res, next) => {
  // simplified error
  const { statusCode, message, errorMessage, errorDetails } =
    simplifiedError(err)

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    errorDetails,
    stack: config.NODE_ENV === 'production' ? null : err?.stack,
    // stack: err?.stack,
  })
}

export default globalErrorHandler
