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

// get all users
export const getProducts = createAsyncThunk('getProducts', async (options) => {
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
})
