import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { FaSearch } from 'react-icons/fa'
import CartScreen from './CartScreen'
import CategoryScreen from './CategoryScreen'
import ProductListScreen from './ProductListScreen'
import { useForm } from 'react-hook-form'

import {
  listProducts,
  addToCart,
  removeAllFromCart,
  removeFromCart,
} from '../redux/products/productsThunk'
import { resetCart } from '../redux/products/productsSlice'

const HomeScreen = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(30)
  const [category, setCategory] = useState('lunch')

  useEffect(() => {}, [])

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const {
    products,
    loadingListProducts,
    errorListProducts,
    total,
    pages,
  } = productList

  const cart = useSelector((state) => state.cart)
  const {
    cartItems,
    successAddToCart,
    successRemoveAllFromCart,
    successRemoveFromCart,
  } = cart

  useEffect(() => {
    dispatch(listProducts({ page, limit }))

    // eslint-disable-next-line
  }, [dispatch, page, limit])

  const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  const totalPrice =
    cartItems &&
    cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)

  const submitHandler = (data) => {
    // dispatch(updateUserProfile(data))
    console.log({
      order: { orderType: data.orderType, mobile: data.mobile, totalPrice },
      orderItems: cartItems,
    })
  }

  useEffect(() => {
    if (successAddToCart || successRemoveAllFromCart || successRemoveFromCart) {
      setTimeout(() => {
        dispatch(resetCart())
      }, 5000)
    }
  }, [
    successAddToCart,
    successRemoveAllFromCart,
    successRemoveFromCart,
    dispatch,
  ])

  return (
    <div className='row'>
      <div className='col-md-8 col-12 '>
        <div className='product-home p-3 mt-3'>
          <CategoryScreen category={category} setCategory={setCategory} />

          <div className='input-group mb-3'>
            <input
              type='text'
              className='form-control'
              placeholder='Search'
              aria-label='Search'
              aria-describedby='basic-addon2'
            />
            <span className='input-group-text bg-primary ' id='basic-addon2'>
              <FaSearch className='text-light' />
            </span>
          </div>
          {loadingListProducts ? (
            <Loader />
          ) : errorListProducts ? (
            <Message variant='danger'>{errorListProducts}</Message>
          ) : (
            <ProductListScreen
              setPage={setPage}
              page={page}
              pages={pages}
              limit={limit}
              setLimit={setLimit}
              total={total}
              products={products}
              addDecimal={addDecimal}
              category={category}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              dispatch={dispatch}
              cartItems={cartItems}
            />
          )}
        </div>
      </div>
      <div className='col-md-4 col-12'>
        {' '}
        <div className='product-home p-3 mt-3'>
          {successAddToCart && (
            <Message variant='success'>Item has added to the order</Message>
          )}
          {successRemoveAllFromCart && (
            <Message variant='success'>
              Items has been removed from the order
            </Message>
          )}
          {successRemoveFromCart && (
            <Message variant='success'>
              Item has been removed from the order
            </Message>
          )}

          <CartScreen
            submitHandler={submitHandler}
            handleSubmit={handleSubmit}
            errors={errors}
            register={register}
            cartItems={cartItems}
            addDecimal={addDecimal}
            removeAllFromCart={removeAllFromCart}
            dispatch={dispatch}
            watch={watch}
          />
        </div>
      </div>
    </div>
  )
}

export default HomeScreen
