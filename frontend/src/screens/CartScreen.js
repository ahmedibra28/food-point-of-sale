import { useRef } from 'react'
import plate from '../images/plate.png'
import burger from '../images/burger.png'
import moment from 'moment'
import { useReactToPrint } from 'react-to-print'

import {
  FaDollarSign,
  FaPrint,
  FaShoppingCart,
  FaTimesCircle,
} from 'react-icons/fa'

const CartScreen = ({
  cartItems,
  addDecimal,
  removeAllFromCart,
  dispatch,
  submitHandler,
  handleSubmit,
  errors,
  register,
  loadingCreateOrder,
}) => {
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Geel Tech',
    pageStyle: `size: 302.36px 188.98px`,
  })

  const totalPrice =
    cartItems &&
    cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)

  const qty = cartItems && cartItems.reduce((acc, item) => acc + item.qty, 0)

  const evcFormat = () => {
    const evcPrice = cartItems.reduce(
      (acc, item) => acc + item.qty * item.price,
      0
    )
    if (evcPrice < 1) {
      const removedPoint = evcPrice.toString().replace(/[.]/g, '')
      return (
        <a
          href={`*712*611242199*${removedPoint}#`}
        >{`*712*611242199*${removedPoint}#`}</a>
      )
    }
    if (evcPrice % 1 === 0) {
      return (
        <a
          href={`tel:*712*611242199*${evcPrice}#`}
        >{`*712*611242199*${evcPrice}#`}</a>
      )
    }
    if (evcPrice % 1 !== 0) {
      const removedPointGtOne = evcPrice.toString().split('.')
      return (
        <a
          href={`tel:*712*611242199*${removedPointGtOne[0]}*${removedPointGtOne[1]}#`}
        >{`*712*611242199*${removedPointGtOne[0]}*${removedPointGtOne[1]}#`}</a>
      )
    }
  }

  return (
    <div className='row cart' id='cart'>
      <div className='d-flex justify-content-between'>
        <h5 className='text-primary'>
          Order <span className='fw-light fs-6'>Summary</span>
        </h5>
        <span>
          <FaShoppingCart className='mb-1 text-primary' />{' '}
          <sup className='text-primary'>{cartItems && qty}</sup>
        </span>
      </div>
      <hr />

      {cartItems && cartItems.length > 0 ? (
        <>
          <div ref={componentRef}>
            <div className='brand text-center '>
              <img
                src={burger}
                alt='logo'
                className='img-fluid'
                style={{ width: '35px' }}
              />
              <p>
                <span
                  className='fw-bold text-center'
                  style={{ letterSpacing: '3px' }}
                >
                  FOOD - POINT-OF-SALE
                </span>
                <br />
                <span>Makkah Almukarramah Ave</span> <br />
                <span>EVC - 61 530 1507</span>
              </p>
            </div>
            <p className='text-center '>
              <span className='fw-bold'>Invoice#: </span>
              {Date.now()}
              <br />
              <span className='fw-bold'>Date:</span>{' '}
              {moment(Date.now()).format('lll')}
              <br />
            </p>
            <div className='table-responsive'>
              <table className='table'>
                <thead>
                  <tr>
                    <th scope='col'>Item</th>
                    <th scope='col'>QTY</th>
                    <th scope='col'>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems &&
                    cartItems.map((item) => (
                      <tr key={item.product} className='text-primary'>
                        <td className='text-primary'>{item.name}</td>
                        <td>{item.qty}</td>
                        <td>${addDecimal(item.price * item.qty)}</td>
                      </tr>
                    ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td></td>
                    <td>Discount</td>
                    <td>$0</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>Sub total</td>
                    <td>${totalPrice}</td>
                  </tr>
                </tfoot>
              </table>
              <p className='text-center'>
                <span> Ku bixi EVC, {evcFormat()}</span>
                <br />
                <span>Mahadsnaid, soo dhawoow markale</span>
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className='mb-2'>
              <input
                {...register('mobile', { required: 'Mobile is required' })}
                type='number'
                placeholder='Mobile Number'
                className='form-control'
              />
              {errors.mobile && (
                <span className='text-danger'>{errors.mobile.message}</span>
              )}
            </div>
            <div className='mb-2'>
              <select
                className='form-control'
                {...register('orderType', {
                  required: 'Order type is required',
                })}
              >
                <option value='Dine-in'>Dine-in</option>
                <option value='Takeaway'>Takeaway</option>
                <option value='Delivery'>Delivery</option>
              </select>
              {errors.orderType && (
                <span className='text-danger'>{errors.orderType.message}</span>
              )}
            </div>

            <div className='btn-group'>
              <button
                type='button'
                onClick={() => dispatch(removeAllFromCart())}
                className='btn btn-danger btn-sm mx-1'
              >
                <FaTimesCircle className='mb-1' /> Clear All
              </button>

              <button
                type='submit'
                className='btn btn-primary btn-sm mx-1'
                disabled={loadingCreateOrder && true}
              >
                {loadingCreateOrder ? (
                  <span className='spinner-border spinner-border-sm' />
                ) : (
                  <>
                    <FaDollarSign className='mb-1' /> Checkout{' '}
                  </>
                )}
              </button>
            </div>
            <button
              type='button'
              onClick={handlePrint}
              className='btn btn-dark btn-sm mx-1 float-end'
            >
              <FaPrint className='mb-1' /> Print
            </button>
          </form>
        </>
      ) : (
        <img src={plate} alt='empty plate' className='img-fluid' />
      )}
    </div>
  )
}

export default CartScreen
