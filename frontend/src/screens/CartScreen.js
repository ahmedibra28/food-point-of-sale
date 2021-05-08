import React from 'react'
import {
  FaDollarSign,
  FaMoneyBillAlt,
  FaTimes,
  FaTimesCircle,
} from 'react-icons/fa'

const CartScreen = () => {
  return (
    <div className='row cart'>
      <h5 className='text-primary'>Orders #34662</h5>
      <hr />
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>Item</th>
            <th scope='col'>QTY</th>
            <th scope='col'>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr className='text-primary'>
            <td className='text-primary'>Hot Coppuccino Latto</td>
            <td>2</td>
            <td>$4</td>
          </tr>
          <tr className='text-primary'>
            <td className='text-primary'>Crispy Chicken Burger</td>
            <td>1</td>
            <td>$6</td>
          </tr>
          <tr className='text-primary'>
            <td className='text-primary'>Mojito</td>
            <td>7</td>
            <td>$23</td>
          </tr>
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
            <td>$36.00</td>
          </tr>
        </tfoot>
      </table>

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
        <button className='btn btn-danger btn-sm mx-1'>
          <FaTimesCircle className='mb-1' /> Clear All
        </button>
        <button className='btn btn-primary btn-sm mx-1'>
          <FaDollarSign className='mb-1' /> Checkout
        </button>
      </div>
    </div>
  )
}

export default CartScreen
