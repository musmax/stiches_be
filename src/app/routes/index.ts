import { Router } from 'express'
import { UserRoutes } from '../modules/User/user.route'
import { AuthRoutes } from '../modules/Auth/auth.route'
import { ProductRoutes } from '../modules/Product/product.route'
import { OrderRoutes } from '../modules/Order/order.route'
import { UploadRoutes } from '../modules/Upload/upload.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
  {
    path: '/images',
    route: UploadRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
