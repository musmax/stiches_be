export type TErrorSources = {
  path: string | number
  message: string
}[]

export type TGenericErrorResponse = {
  statusCode: number
  message: string
  errorSources: TErrorSources
}

export interface IGenericReturnError<T> {
  statusCode: number
  message: string
  errorMessage: string
  errorDetails: T
}
