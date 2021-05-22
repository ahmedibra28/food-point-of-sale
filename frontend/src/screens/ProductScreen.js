import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  FaCheckCircle,
  FaEdit,
  FaPlus,
  FaTimesCircle,
  FaTrash,
} from 'react-icons/fa'

import {
  resetDeleteProduct,
  resetListProducts,
  resetUpdateProduct,
  resetCreateProduct,
} from '../redux/products/productsSlice'
import {
  deleteProduct,
  listProducts,
  updateProduct,
  createProduct,
} from '../redux/products/productsThunk'

import { confirmAlert } from 'react-confirm-alert'
import { Confirm } from '../components/Confirm'
import Pagination from '../components/Pagination'
import { useForm } from 'react-hook-form'

const ProductScreen = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { active: false },
  })
  const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  const [id, setId] = useState(null)
  const [edit, setEdit] = useState(false)

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(30)

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { products, loadingListProducts, errorListProducts, total, pages } =
    productList

  const productUpdate = useSelector((state) => state.productUpdate)
  const { loadingUpdateProduct, errorUpdateProduct, successUpdateProduct } =
    productUpdate

  const productDelete = useSelector((state) => state.productDelete)
  const { successDeleteProduct, errorDeleteProduct } = productDelete

  const productCreate = useSelector((state) => state.productCreate)
  const { loadingCreateProduct, errorCreateProduct, successCreateProduct } =
    productCreate

  const formCleanHandler = () => {
    setEdit(false)
    reset()
  }

  useEffect(() => {
    if (
      errorDeleteProduct ||
      errorCreateProduct ||
      errorListProducts ||
      errorUpdateProduct ||
      successDeleteProduct ||
      successCreateProduct ||
      successUpdateProduct
    ) {
      setTimeout(() => {
        dispatch(resetDeleteProduct())
        dispatch(resetListProducts())
        dispatch(resetUpdateProduct())
        dispatch(resetCreateProduct())
      }, 5000)
    }
  }, [
    errorDeleteProduct,
    errorCreateProduct,
    errorListProducts,
    errorUpdateProduct,
    successDeleteProduct,
    successCreateProduct,
    successUpdateProduct,
    dispatch,
  ])

  useEffect(() => {
    dispatch(listProducts({ page, limit }))
    if (successUpdateProduct || successCreateProduct) {
      formCleanHandler()
    }
    // eslint-disable-next-line
  }, [
    dispatch,
    successDeleteProduct,
    successUpdateProduct,
    successCreateProduct,
    page,
    limit,
  ])

  const deleteHandler = (id) => {
    confirmAlert(Confirm(() => dispatch(deleteProduct(id))))
  }

  const submitHandler = (data) => {
    const formData = new FormData()
    formData.append('active', data.active)
    formData.append('category', data.category)
    formData.append('name', data.name)
    formData.append('price', data.price)
    formData.append('image', data.image[0])

    edit
      ? dispatch(updateProduct({ formData, _id: id }))
      : dispatch(createProduct(formData))
  }

  const editHandler = (product) => {
    setId(product._id)
    setEdit(true)
    setValue('name', product.name)
    setValue('category', product.category)
    setValue('price', product.price)
    setValue('active', product.active)
  }

  return (
    <div className='container'>
      <div
        className='modal fade'
        id='editProductModal'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabIndex='-1'
        aria-labelledby='editProductModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content modal-background'>
            <div className='modal-header'>
              <h3 className='modal-title ' id='editProductModalLabel'>
                {edit ? 'Edit Product' : 'Add Product'}
              </h3>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
                onClick={formCleanHandler}
              ></button>
            </div>
            <div className='modal-body'>
              {successUpdateProduct && (
                <Message variant='success'>
                  Product has been updated successfully.
                </Message>
              )}
              {errorUpdateProduct && (
                <Message variant='danger'>{errorUpdateProduct}</Message>
              )}
              {successCreateProduct && (
                <Message variant='success'>
                  Product has been Created successfully.
                </Message>
              )}
              {errorCreateProduct && (
                <Message variant='danger'>{errorCreateProduct}</Message>
              )}

              {loadingListProducts ? (
                <Loader />
              ) : errorListProducts ? (
                <Message variant='danger'>{errorListProducts}</Message>
              ) : (
                <form onSubmit={handleSubmit(submitHandler)}>
                  <div className='mb-3'>
                    <label htmlFor='name'>Name</label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      type='text'
                      placeholder='Enter name'
                      className='form-control'
                      autoFocus
                    />
                    {errors.name && (
                      <span className='text-danger'>{errors.name.message}</span>
                    )}
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='category'>Category</label>
                    <select
                      {...register('category', {
                        required: 'Category is required',
                      })}
                      className='form-control'
                    >
                      <option value=''>----------</option>
                      <option value='Lunch'>Lunch</option>
                      <option value='Pizza'>Pizza</option>
                      <option value='Snacks'>Snacks</option>
                      <option value='Burger'>Burger</option>
                      <option value='Drinks'>Drinks</option>
                    </select>
                    {errors.category && (
                      <span className='text-danger'>
                        {errors.category.message}
                      </span>
                    )}
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='price'>Price</label>
                    <input
                      {...register('price', {
                        required: 'Price is required',
                      })}
                      type='number'
                      min='0'
                      placeholder='Enter price'
                      className='form-control'
                      step='.01'
                    />
                    {errors.price && (
                      <span className='text-danger'>
                        {errors.price.message}
                      </span>
                    )}
                  </div>

                  <div className='mb-3'>
                    <label htmlFor='image'>Image</label>
                    <input
                      {...register('image', {})}
                      type='file'
                      placeholder='Enter image'
                      className='form-control'
                      name='image'
                    />
                    {errors.image && (
                      <span className='text-danger'>
                        {errors.image.message}
                      </span>
                    )}
                  </div>

                  <div className='row'>
                    <div className='col'>
                      <div className='form-check'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          id='active'
                          {...register('active')}
                          checked={watch().active}
                        />
                        <label className='form-check-label' htmlFor='active'>
                          Active
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className='modal-footer'>
                    <button
                      type='button'
                      className='btn btn-secondary '
                      data-bs-dismiss='modal'
                      onClick={formCleanHandler}
                    >
                      Close
                    </button>
                    <button
                      type='submit'
                      className='btn btn-primary '
                      disabled={
                        loadingCreateProduct || (loadingUpdateProduct && true)
                      }
                    >
                      {loadingCreateProduct || loadingUpdateProduct ? (
                        <span className='spinner-border spinner-border-sm' />
                      ) : (
                        'Submit'
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='d-flex justify-content-between align-items-center'>
        <h3 className=''>Products</h3>
        <button
          className='btn btn-primary '
          data-bs-toggle='modal'
          data-bs-target='#editProductModal'
        >
          <FaPlus className='mb-1' />
        </button>
      </div>

      {successDeleteProduct && (
        <Message variant='success'>
          Product has been deleted successfully.
        </Message>
      )}
      {errorDeleteProduct && (
        <Message variant='danger'>{errorDeleteProduct}</Message>
      )}
      {loadingListProducts ? (
        <Loader />
      ) : errorListProducts ? (
        <Message variant='danger'>{errorListProducts}</Message>
      ) : (
        <>
          <div className='d-flex justify-content-center mt-2'>
            <Pagination
              setPage={setPage}
              page={page}
              pages={pages}
              limit={limit}
              setLimit={setLimit}
              total={total}
            />
          </div>
          <div className='table-responsive '>
            <table className='table table-sm hover bordered striped caption-top '>
              <caption>{total} records were found</caption>
              <thead>
                <tr>
                  <th>IMAGE</th>
                  <th>NAME</th>
                  <th>CATEGORY</th>
                  <th>PRICE</th>
                  <th>STATUS</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.map((product) => (
                    <tr key={product._id}>
                      <td>
                        <img
                          src={product.image.imagePath}
                          alt={product.image.imageName}
                          className='img-fluid rounded-pill'
                          style={{ width: '2rem' }}
                        />
                      </td>
                      <td>{product.name}</td>

                      <td>{product.category}</td>
                      <td>${addDecimal(product.price)}</td>

                      <td>
                        {product.active ? (
                          <FaCheckCircle className='text-success mb-1' />
                        ) : (
                          <FaTimesCircle className='text-danger mb-1' />
                        )}
                      </td>
                      <td className='btn-group'>
                        <button
                          className='btn btn-success btn-sm me-1'
                          onClick={() => editHandler(product)}
                          data-bs-toggle='modal'
                          data-bs-target='#editProductModal'
                        >
                          <FaEdit className='mb-1' /> Edit
                        </button>

                        <button
                          className='btn btn-danger btn-sm'
                          onClick={() => deleteHandler(product._id)}
                        >
                          <FaTrash className='mb-1' /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className='d-flex justify-content-center'>
            <Pagination
              setPage={setPage}
              page={page}
              pages={pages}
              limit={limit}
              setLimit={setLimit}
              total={total}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default ProductScreen
