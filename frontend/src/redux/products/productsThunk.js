import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

// header configuration
const configHeader = (getState) => {
  const {
    userLogin: { userInfo },
  } = getState()

  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  }
}

const configHeaderNormal = () => {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
  }
}

// get all products
export const listProducts = createAsyncThunk(
  'listProducts',
  async (options) => {
    const config = configHeaderNormal()
    try {
      const { data } = await axios.get(
        `/api/products?page=${options.page}&&limit=${options.limit}`,
        config
      )
      return data
    } catch (error) {
      throw error.response.data
    }
  }
)

// delete product
export const deleteProduct = createAsyncThunk(
  'deleteProduct',
  async (id, { getState }) => {
    const config = configHeader(getState)
    try {
      const { data } = await axios.delete(`/api/products/${id}`, config)
      return data
    } catch (error) {
      throw error.response.data
    }
  }
)

// update product
export const updateProduct = createAsyncThunk(
  'updateProduct',
  async (product, { getState }) => {
    const config = configHeader(getState)
    try {
      const { data } = await axios.put(
        `/api/products/${product._id}`,
        product.formData,
        config
      )
      return data
    } catch (error) {
      throw error.response.data
    }
  }
)

// add new product
export const createProduct = createAsyncThunk(
  'createProduct',
  async (product, { getState }) => {
    const config = configHeader(getState)
    try {
      const { data } = await axios.post(`/api/products`, product, config)
      return data
    } catch (error) {
      throw error.response.data
    }
  }
)
