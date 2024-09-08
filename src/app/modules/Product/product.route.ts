import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { ProductController } from './product.controller'
import { ProductValidation } from './product.validation'
import authGuard from '../../middlewares/authGuard'

const router = express.Router()

router.post(
  '/add',
  authGuard(),
  validateRequest(ProductValidation.productValidationSchema),
  ProductController.createProduct,
);
router.patch(
  '/update',
  authGuard(),
  validateRequest(ProductValidation.updateProductValidationSchema),
  ProductController.updateProduct,
);
router.post(
  '/add-update/store',
  authGuard(),
  validateRequest(ProductValidation.productStoreValidationSchema),
  ProductController.createProductStore,
);
router.post(
  '/rate-store',
  authGuard(),
  validateRequest(ProductValidation.storeRatingValidationSchema),
  ProductController.rateAStore,
);

router.get(
  '/me',
  authGuard(),
  ProductController.getAllMyProducts,
);
router.get(
  '/viewProductDetails',
  authGuard(),
  ProductController.getProductById,
);

router.get(
  '/all-products',
  ProductController.getAllProducts,
);
router.get(
  '/products-categories',
  ProductController.getAllProductsCategories,
);


// export user routes
export const ProductRoutes = router;
