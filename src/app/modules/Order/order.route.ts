import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { OrderController } from './order.controller'
import { OrderValidation } from './order.validation'
import authGuard from '../../middlewares/authGuard'

const router = express.Router()

router.post(
  '/create',
  authGuard(),
  validateRequest(OrderValidation.orderValidationSchema),
  OrderController.createOrder,
);

router.get(
  '/verify',
  authGuard(),
  // validateRequest(OrderValidation.orderVerifyValidationSchema),
  OrderController.veiifyOrderPayment,
);
router.get(
  '/delivery-status',
  // authGuard(),
  // validateRequest(OrderValidation.orderVerifyValidationSchema),
  OrderController.getOrderDeliveryStatus,
);
router.patch(
  '/update-tracker',
  authGuard(),
  validateRequest(OrderValidation.orderTrackerValidationSchema),
  OrderController.updateOrderTracker,
);
router.get(
  '/transactions/me',
  authGuard(),
  OrderController.getAllMyTransactions,
);
router.get(
  '/transactions/details',
  authGuard(),
  OrderController.getTransactionDetails,
);
router.get(
  '/transactions/store',
  authGuard(),
  OrderController.getAllTailorTransactions,
);

// router.get(
//   '/all-products',
//   ProductController.getAllProducts,
// );
// router.get(
//   '/products-categories',
//   ProductController.getAllProductsCategories,
// );


// export order routes
export const OrderRoutes = router;
