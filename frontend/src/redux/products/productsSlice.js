import { getProducts } from './productsThunk'
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
    [getProducts.pending]: (state) => {
      state.loadingListProducts = true
    },
    [getProducts.fulfilled]: (state, { payload }) => {
      console.log(payload)
      state.loadingListProducts = false
      state.successListProducts = true
      state.products = payload.data
      state.count = payload.count
      state.page = payload.page
      state.pages = payload.pages
      state.total = payload.total
    },
    [getProducts.rejected]: (state, { error }) => {
      state.loadingListProducts = false
      state.errorListProducts = error.message
    },
  },
})

export const listProductSliceReducer = listProductSlice.reducer
export const { resetListProducts } = listProductSlice.actions
