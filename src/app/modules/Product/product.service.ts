import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import Store from '../User/store.model'
import Product from './product.model'
import { categories } from './products.constant'
import { User } from '../User/user.model'
import ProductImage from './productImages.model'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createProduct = async (body: any, createdBy: any) => {
  const user = await User.findById(createdBy);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (user.role !== "tailor") {
    throw new AppError(httpStatus.FORBIDDEN, 'Only tailors can create products');
  }
  const { productImages } = body;
  const store = await Store.findOne({createdBy:user._id})
  if (!store) {
    throw new AppError(httpStatus.NOT_FOUND, 'Store not found')
  }
  // Create the product
  const product = await Product.create({ ...body, createdBy, store: store._id });
  // Check if there are images to process
  if (productImages && productImages.length > 0) {
    // Create product images asynchronously
    const images = await Promise.all(
      productImages.map(async (productImage: { url: string; isMain: boolean }) => {
        return ProductImage.create({
          productId: product._id,
          url: productImage.url,
          isMain: productImage.isMain,
        });
      })
    );
    // Push the image IDs into the product's productImages array
    const imageIds = images.map((img) => img._id);
    // Update the product with the image references
    await Product.findByIdAndUpdate(
      product._id,
      { $push: { productImages: { $each: imageIds } } },
      { new: true }
    );
  }

  return product;
};

const updateProduct = async (body: any, createdBy: any, productId: any) => {
  // Find the product by ID
  const product = await Product.findById(productId);
  // Check if product exists
  if (!product) {
    throw new Error('Product not found');
  }
  // Check if the body object is empty
  if (!body || Object.keys(body).length === 0) {
    throw new Error('Product body is required');
  }
  // Update the product fields with the provided body
  Object.assign(product, body);
  // Save the updated product
  await product.save();
  return product;
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createProductStore = async (body: any, createdBy: any) => {
  const user = await User.findById(createdBy);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found')
  }
  if (user.role !== "tailor") {
    throw new AppError(httpStatus.FORBIDDEN, 'Only tailors can create product store');
  }
  if (body.storeId) {
    const store = await Store.findById(body.storeId)
    if (!store) {
      throw new Error('Store not found')
    }
    Object.assign(store, body)
    store.save()
    return store
  }
  // lets ensure that u can only have one store at the moment
  const existingStore = await Store.findOne({ createdBy: createdBy })
  if (existingStore) {
    throw new AppError(httpStatus.FORBIDDEN, 'You already have a store')
  }
  const store = await Store.create({ ...body, createdBy, store: body.storeId })
  await User.findByIdAndUpdate(createdBy, { store: store._id })
  return store
}

const rateAStore = async(body: any, userId: any) => {
  const {storeId, rating} = body;
  const store = await Store.findById(storeId);
  if (!store) {
    throw new AppError(httpStatus.NOT_FOUND, 'Store not found')
  }
  if (store.createdBy === userId) {
    throw new AppError(httpStatus.FORBIDDEN, 'You cannot rate your own store')
  }
  const currentRatings = store.ratingStarsCount;
  const newRating = currentRatings + rating;
  store.ratingStarsCount = newRating;
  await store.save();
  return store;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAllProducts = async () => {
  return Product.find({ quantity: { $gt: 0 } })
    .populate(['createdBy', 'store', 'productImages'])
    .exec()
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAllMyProducts = async (userId: any) => {
  return Product.find({ createdBy: userId }).populate(['productImages'])
  .exec()
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAllProductsCategories = async () => {
  return categories
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
const getProductById = async (productId: any) => {
  return Product.findById(productId.productId)
    .populate(['createdBy', 'store'])
    .exec()
}

export const ProductService = {
  createProduct,
  getAllProducts,
  getAllMyProducts,
  getAllProductsCategories,
  createProductStore,
  getProductById,
  updateProduct,
  rateAStore,
}
