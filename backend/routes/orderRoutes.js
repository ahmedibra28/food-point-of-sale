import express from 'express'
import {
  addOrderItems,
  deleteOrder,
  getOrderById,
  getOrders,
  updateOrderToPaid,
} from '../controllers/orderController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(addOrderItems).get(protect, getOrders)
router
  .route('/:id')
  .get(protect, admin, getOrderById)
  .delete(protect, admin, deleteOrder)
  .put(protect, admin, updateOrderToPaid)

export default router
