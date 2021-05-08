import { configureStore } from '@reduxjs/toolkit'
import {
  userLoginSliceReducer,
  listUserSliceReducer,
  updateUserProfileSliceReducer,
  registerUserSliceReducer,
  deleteUserSliceReducer,
  getUserLogHistorySliceReducer,
  getUserDetailsSliceReducer,
  updateUserSliceReducer,
  forgotPasswordSliceReducer,
  resetPasswordSliceReducer,
} from './users/usersSlice'

import {
  listProductSliceReducer,
  updateProductSliceReducer,
  deleteProductSliceReducer,
  createProductSliceReducer,
} from './products/productsSlice'

export default configureStore({
  reducer: {
    userLogin: userLoginSliceReducer,
    userLogHistory: getUserLogHistorySliceReducer,
    userDetails: getUserDetailsSliceReducer,
    userUpdateProfile: updateUserProfileSliceReducer,
    userRegister: registerUserSliceReducer,
    userList: listUserSliceReducer,
    userDelete: deleteUserSliceReducer,
    userUpdate: updateUserSliceReducer,
    userForgotPassword: forgotPasswordSliceReducer,
    userResetPassword: resetPasswordSliceReducer,

    productList: listProductSliceReducer,
    productUpdate: updateProductSliceReducer,
    productDelete: deleteProductSliceReducer,
    productCreate: createProductSliceReducer,
  },
})
