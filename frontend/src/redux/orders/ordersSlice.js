import { listOrders, deleteOrder, createOrder } from './ordersThunk'
import { createSlice } from '@reduxjs/toolkit'

// get all orders
const listOrderSlice = createSlice({
  name: 'listOrder',
  initialState: {},
  reducers: {
    resetListOrders: (state) => {
      state.errorListOrders = null
    },
  },
  extraReducers: {
    [listOrders.pending]: (state) => {
      state.loadingListOrders = true
    },
    [listOrders.fulfilled]: (state, { payload }) => {
      state.loadingListOrders = false
      state.successListOrders = true
      state.orders = payload.data
      state.count = payload.count
      state.page = payload.page
      state.pages = payload.pages
      state.total = payload.total
    },
    [listOrders.rejected]: (state, { error }) => {
      state.loadingListOrders = false
      state.errorListOrders = error.message
    },
  },
})

// create new order
const createOrderSlice = createSlice({
  name: 'createOrder',
  initialState: {},
  reducers: {
    resetCreateOrder: (state) => {
      state.successCreateOrder = false
      state.errorCreateOrder = null
    },
  },
  extraReducers: {
    [createOrder.pending]: (state) => {
      state.loadingCreateOrder = true
    },
    [createOrder.fulfilled]: (state) => {
      state.loadingCreateOrder = false
      state.successCreateOrder = true
    },
    [createOrder.rejected]: (state, { error }) => {
      state.loadingCreateOrder = false
      state.errorCreateOrder = error.message
    },
  },
})

// delete order
const deleteOrderSlice = createSlice({
  name: 'deleteOrder',
  initialState: {},
  reducers: {
    resetDeleteOrder: (state) => {
      state.successDeleteOrder = false
      state.errorDeleteOrder = null
    },
  },
  extraReducers: {
    [deleteOrder.pending]: (state) => {
      state.loadingDeleteOrder = true
    },
    [deleteOrder.fulfilled]: (state) => {
      state.loadingDeleteOrder = false
      state.successDeleteOrder = true
    },
    [deleteOrder.rejected]: (state, { error }) => {
      state.loadingDeleteOrder = false
      state.errorDeleteOrder = error.message
    },
  },
})

export const listOrderSliceReducer = listOrderSlice.reducer
export const createOrderSliceReducer = createOrderSlice.reducer
export const deleteOrderSliceReducer = deleteOrderSlice.reducer

export const { resetListOrders } = listOrderSlice.actions
export const { resetCreateOrder } = createOrderSlice.actions
export const { resetDeleteOrder } = deleteOrderSlice.actions
