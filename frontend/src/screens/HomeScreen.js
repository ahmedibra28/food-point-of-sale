import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { FaSearch } from 'react-icons/fa'
import CartScreen from './CartScreen'
import CategoryScreen from './CategoryScreen'
import ProductListScreen from './ProductListScreen'

import { getProducts } from '../redux/products/productsThunk'

const HomeScreen = () => {
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

  useEffect(() => {
    dispatch(getProducts({ page, limit }))

    // eslint-disable-next-line
  }, [dispatch, page, limit])

  const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  return (
    <div className='row'>
      <div className='col-md-8 col-12 mt-2'>
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
            />
          )}
        </div>
      </div>
      <div className='col-md-4 col-12 mt-2 '>
        {' '}
        <div className='product-home p-3 mt-3'>
          <CartScreen />
        </div>
      </div>
    </div>
  )
}

export default HomeScreen
