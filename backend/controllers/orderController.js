import asyncHandler from 'express-async-handler'
import OrderModel from '../models/orderModel.js'

export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    order: { orderType, mobile, totalPrice },
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
  } else {
    const order = new OrderModel({
      orderItems,
      totalPrice,
      mobile,
      orderType,
    })

    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await OrderModel.findById(req.params.id)
  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

export const getOrders = asyncHandler(async (req, res) => {
  let query = OrderModel.find()

  const page = parseInt(req.query.page) || 1
  const pageSize = parseInt(req.query.limit) || 30
  const skip = (page - 1) * pageSize
  const total = await OrderModel.countDocuments()

  const pages = Math.ceil(total / pageSize)

  query = query.skip(skip).limit(pageSize).sort({ createdAt: -1 })

  if (page > pages) {
    res.status(404)
    throw new Error('Page not found')
  }
  const result = await query

  res.status(200).json({
    count: result.length,
    page,
    pages,
    total,
    data: result,
  })
})

export const deleteOrder = asyncHandler(async (req, res) => {
  const order = await OrderModel.findById(req.params.id)
  if (order) {
    await order.remove()
    res.json({ message: 'Order removed' })
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})
