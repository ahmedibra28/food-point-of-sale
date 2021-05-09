import { FaCartPlus, FaTrash } from 'react-icons/fa'
import Pagination from '../components/Pagination'

const ProductListScreen = ({
  setPage,
  page,
  pages,
  limit,
  setLimit,
  total,
  products,
  addDecimal,
  category,
  addToCart,
  dispatch,
  removeFromCart,
  cartItems,
}) => {
  return (
    <>
      {products && products.length > 0 ? (
        <div className='row gy-4 product-list'>
          {products.map(
            (product) =>
              product.category.toLowerCase() === category &&
              product.active && (
                <div key={product._id} className='col-lg-3 col-md-6 col-12'>
                  <div className='card'>
                    <img src={product.image.imagePath} alt='product' />
                    <div className='card-body'>
                      <div className='card-title'>{product.name}</div>
                      <div className='d-flex justify-content-between'>
                        <span className='price text-primary fw-bold'>
                          ${addDecimal(product.price)}
                        </span>
                        <span>
                          {cartItems &&
                            cartItems.map(
                              (item) =>
                                item._id === product._id && (
                                  <FaTrash
                                    key={item._id}
                                    onClick={() =>
                                      dispatch(removeFromCart(product))
                                    }
                                    className='text-light bg-danger p-2 fs-3 rounded-pill mb-1'
                                  />
                                )
                            )}{' '}
                          <FaCartPlus
                            className='text-light bg-primary p-2 fs-3 rounded-pill mb-1'
                            onClick={() => dispatch(addToCart(product))}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      ) : (
        'There is no products in here'
      )}

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
    </>
  )
}

export default ProductListScreen
