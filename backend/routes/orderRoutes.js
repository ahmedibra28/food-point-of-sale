import express from 'express'
import {
  addOrderItems,
  deleteOrder,
  getOrderById,
  getOrders,
} from '../controllers/orderController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(addOrderItems).get(protect, getOrders)
router
  .route('/:id')
  .get(protect, admin, getOrderById)
  .delete(protect, admin, deleteOrder)

export default router
