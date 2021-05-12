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

// get all orders
export const listOrders = createAsyncThunk(
  'listOrders',
  async (options, { getState }) => {
    const config = configHeader(getState)
    try {
      const { data } = await axios.get(
        `/api/orders?page=${options.page}&&limit=${options.limit}`,
        config
      )
      return data
    } catch (error) {
      throw error.response.data
    }
  }
)

// delete order
export const deleteOrder = createAsyncThunk(
  'deleteOrder',
  async (id, { getState }) => {
    const config = configHeader(getState)
    try {
      const { data } = await axios.delete(`/api/orders/${id}`, config)
      return data
    } catch (error) {
      throw error.response.data
    }
  }
)

// add new order
export const createOrder = createAsyncThunk('createOrder', async (order) => {
  const config = configHeaderNormal()
  try {
    const { data } = await axios.post(`/api/orders`, order, config)
    return data
  } catch (error) {
    throw error.response.data
  }
})
