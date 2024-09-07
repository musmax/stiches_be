import httpStatus from 'http-status'
import sendResponse from '../../utils/sendResponse'
import { OrderService } from './order.service'
import catchAsync from '../../utils/catchAsync'

const createOrder = catchAsync(async (req, res) => {
  const data = await OrderService.createOrder(req.body, req.user)
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Order created successfully',
    data,
  })
})
const getTransactionDetails = catchAsync(async (req, res) => {
  const data = await OrderService.getTransactionDetails(req.query.transactionId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Transaction details fetched successfully',
    data,
  })
})
const getOrderDeliveryStatus = catchAsync(async (req, res) => {
  const data = await OrderService.getOrderDeliveryStatus()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order tracker status fetched successfully',
    data,
  })
})
const updateOrderTracker = catchAsync(async (req, res) => {
  const data = await OrderService.updateOrderTracker(req.query.orderId,  req.body, req.user.id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order tracker updated successfully',
    data,
  })
})
const veiifyOrderPayment = catchAsync(async (req, res) => {
  const data = await OrderService.verifyPaymentDone(req.query)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order payment verification successfully',
    data,
  })
})
const getAllMyTransactions = catchAsync(async (req, res) => {
  const data = await OrderService.getAllMyTransactions(req.user.id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order payment histories fetched successfully',
    data,
  })
})
const getAllTailorTransactions = catchAsync(async (req, res) => {
  const data = await OrderService.getAllTailorTransactions(req.user.id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order payment histories fetched successfully',
    data,
  })
})

export const OrderController = {
  createOrder,
  veiifyOrderPayment,
  getAllMyTransactions,
  getAllTailorTransactions,
  getTransactionDetails,
  getOrderDeliveryStatus,
  updateOrderTracker,

}
