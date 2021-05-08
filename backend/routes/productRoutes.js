import express from 'express'
import { admin, protect } from '../middleware/authMiddleware.js'
import {
  createProduct,
  updateProduct,
  getProducts,
  deleteProduct,
  getProductById,
} from '../controllers/productController.js'
const router = express.Router()

router.route('/').get(getProducts).post(protect, admin, createProduct)
router
  .route('/:id')
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)
  .get(protect, getProductById)

export default router
