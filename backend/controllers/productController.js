import asyncHandler from 'express-async-handler'
import ProductModel from '../models/productModel.js'
import fs from 'fs'
import path from 'path'
const __dirname = path.resolve()

export const getProducts = asyncHandler(async (req, res) => {
  let query = ProductModel.find()

  const page = parseInt(req.query.page) || 1
  const pageSize = parseInt(req.query.limit) || 30
  const skip = (page - 1) * pageSize
  const total = await ProductModel.countDocuments()

  const pages = Math.ceil(total / pageSize)

  query = query.skip(skip).limit(pageSize).sort({ createdAt: -1 })

  if (page > pages && total > 0) {
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

export const getProductById = asyncHandler(async (req, res) => {
  const product = await ProductModel.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await ProductModel.findById(req.params.id)
  if (product) {
    fs.unlink(path.join(__dirname, product.image.imagePath), (err) => {
      if (err) {
        res.status(500)
        throw new Error(err)
      }
    })

    await product.remove()

    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export const createProduct = asyncHandler(async (req, res) => {
  const { name, category, price, active } = req.body

  const user = req.user.id
  const image = req.files && req.files.image

  const imageFullName = image && image.name.split('.').shift()
  const imageExtension = image && image.name.split('.').pop()
  const imageName = image && `${imageFullName}-${Date.now()}.${imageExtension}`
  const imagePath = `/uploads/${imageName}`

  const allowedExtensions = /(\.jpeg|\.jpg|\.png|\.gif|\.svg)$/i

  if (image) {
    if (!allowedExtensions.exec(image && imageName)) {
      res.status(400)
      throw new Error('Invalid image type')
    }
  }

  image &&
    image.mv(path.join(__dirname, imagePath), (err) => {
      if (err) {
        res.status(500)
        throw new Error(err)
      }
    })

  const imageData = image && {
    imageName,
    imagePath,
  }

  const product = new ProductModel({
    name,
    category,
    price,
    active,
    user,
    image: image && imageData,
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

export const updateProduct = asyncHandler(async (req, res) => {
  const { name, category, price, active } = req.body
  const user = req.user.id
  const image = req.files && req.files.image

  const imageFullName = image && image.name.split('.').shift()
  const imageExtension = image && image.name.split('.').pop()
  const imageName = image && `${imageFullName}-${Date.now()}.${imageExtension}`
  const imagePath = `/uploads/${imageName}`

  const allowedExtensions = /(\.jpeg|\.jpg|\.png|\.gif|\.svg)$/i

  if (image) {
    if (!allowedExtensions.exec(image && imageName)) {
      res.status(400)
      throw new Error('Invalid image type')
    }
  }

  const product = await ProductModel.findById(req.params.id)

  if (product) {
    product.image.imagePath &&
      req.files &&
      req.files.image &&
      fs.unlink(path.join(__dirname, product.image.imagePath), (err) => {
        if (err) {
          res.status(500)
          throw new Error(err)
        }
      })
  }

  image &&
    image.mv(path.join(__dirname, imagePath), (err) => {
      if (err) {
        res.status(500)
        throw new Error(err)
      }
    })

  const imageData = image && {
    imageName,
    imagePath,
  }

  if (product) {
    if (image) {
      product.name = name
      product.category = category
      product.price = price
      product.active = active
      product.user = user
      product.image = image && imageData
    }
    if (image === null) {
      product.name = name
      product.category = category
      product.price = price
      product.active = active
      product.user = user
    }

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})
