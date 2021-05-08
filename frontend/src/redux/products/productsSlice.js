import {
  listProducts,
  updateProduct,
  deleteProduct,
  createProduct,
} from './productsThunk'
import { createSlice } from '@reduxjs/toolkit'

// get all products
const listProductSlice = createSlice({
  name: 'listProduct',
  initialState: {},
  reducers: {
    resetListProducts: (state) => {
      state.errorListProducts = null
    },
  },
  extraReducers: {
    [listProducts.pending]: (state) => {
      state.loadingListProducts = true
    },
    [listProducts.fulfilled]: (state, { payload }) => {
      state.loadingListProducts = false
      state.successListProducts = true
      state.products = payload.data
      state.count = payload.count
      state.page = payload.page
      state.pages = payload.pages
      state.total = payload.total
    },
    [listProducts.rejected]: (state, { error }) => {
      state.loadingListProducts = false
      state.errorListProducts = error.message
    },
  },
})

// register new user
const createProductSlice = createSlice({
  name: 'createProduct',
  initialState: {},
  reducers: {
    resetCreateProduct: (state) => {
      state.successCreateProduct = false
      state.errorCreateProduct = null
    },
  },
  extraReducers: {
    [createProduct.pending]: (state) => {
      state.loadingCreateProduct = true
    },
    [createProduct.fulfilled]: (state) => {
      state.loadingCreateProduct = false
      state.successCreateProduct = true
    },
    [createProduct.rejected]: (state, { error }) => {
      state.loadingCreateProduct = false
      state.errorCreateProduct = error.message
    },
  },
})

// delete product
const deleteProductSlice = createSlice({
  name: 'deleteProduct',
  initialState: {},
  reducers: {
    resetDeleteProduct: (state) => {
      state.successDeleteProduct = false
      state.errorDeleteProduct = null
    },
  },
  extraReducers: {
    [deleteProduct.pending]: (state) => {
      state.loadingDeleteProduct = true
    },
    [deleteProduct.fulfilled]: (state) => {
      state.loadingDeleteProduct = false
      state.successDeleteProduct = true
    },
    [deleteProduct.rejected]: (state, { error }) => {
      state.loadingDeleteProduct = false
      state.errorDeleteProduct = error.message
    },
  },
})

// update product
const updateProductSlice = createSlice({
  name: 'updateProduct',
  initialState: {},
  reducers: {
    resetUpdateProduct: (state) => {
      state.successUpdateProduct = false
      state.errorUpdateProduct = null
    },
  },

  extraReducers: {
    [updateProduct.pending]: (state) => {
      state.loadingUpdateProduct = true
    },
    [updateProduct.fulfilled]: (state, { payload }) => {
      state.loadingUpdateProduct = false
      state.userInfo = payload
      state.successUpdateProduct = true
    },
    [updateProduct.rejected]: (state, { error }) => {
      state.loadingUpdateProduct = false
      state.errorUpdateProduct = error.message
    },
  },
})

export const listProductSliceReducer = listProductSlice.reducer
export const createProductSliceReducer = createProductSlice.reducer
export const deleteProductSliceReducer = deleteProductSlice.reducer
export const updateProductSliceReducer = updateProductSlice.reducer

export const { resetListProducts } = listProductSlice.actions
export const { resetCreateProduct } = createProductSlice.actions
export const { resetDeleteProduct } = deleteProductSlice.actions
export const { resetUpdateProduct } = updateProductSlice.actions
