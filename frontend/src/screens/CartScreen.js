import React from 'react'
import { FaDollarSign, FaTimesCircle } from 'react-icons/fa'

const CartScreen = ({ cartItems, addDecimal, removeAllFromCart, dispatch }) => {
  const totalPrice =
    cartItems &&
    cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)

  return (
    <div className='row cart'>
      <h5 className='text-primary'>Orders #34662</h5>
      <hr />
      {cartItems && cartItems.length > 0 ? (
        <>
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
                    <tr key={item._id} className='text-primary'>
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
          </div>

          <div className='mb-2'>
            <input
              type='number'
              placeholder='Mobile Number'
              className='form-control'
            />
          </div>
          <div className='mb-2'>
            <select className='form-control'>
              <option value='Dine-in'>Dine-in</option>
              <option value='Takeaway'>Takeaway</option>
              <option value='Delivery'>Delivery</option>
            </select>
          </div>

          <div className='btn-group'>
            <button
              onClick={() => dispatch(removeAllFromCart())}
              className='btn btn-danger btn-sm mx-1'
            >
              <FaTimesCircle className='mb-1' /> Clear All
            </button>
            <button className='btn btn-primary btn-sm mx-1'>
              <FaDollarSign className='mb-1' /> Checkout
            </button>
          </div>
        </>
      ) : (
        'Order screen is empty'
      )}
    </div>
  )
}

export default CartScreen
