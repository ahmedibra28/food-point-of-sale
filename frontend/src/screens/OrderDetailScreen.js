import { useRef } from 'react'
import { FaCheckCircle, FaPrint } from 'react-icons/fa'
import { useReactToPrint } from 'react-to-print'
import burger from '../images/burger.png'
import moment from 'moment'
const OrderDetailScreen = ({ orderDetail, addDecimal }) => {
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Geel Tech',
    pageStyle: `size: 302.36px 188.98px`,
  })

  return (
    <div className='row'>
      {orderDetail && orderDetail._id && (
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
              {orderDetail._id}
              <br />
              <span className='fw-bold'>Date:</span>{' '}
              {moment(orderDetail.createdAt).format('lll')}
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
                  {orderDetail &&
                    orderDetail.orderItems.map((item) => (
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
                    <td>$0.00</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>Sub total</td>
                    <td>
                      $
                      {orderDetail.orderItems
                        .reduce((acc, item) => acc + item.qty * item.price, 0)
                        .toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </>
      )}

      <div className='btn-group'>
        <button
          type='button'
          onClick={handlePrint}
          className='btn btn-success btn-sm mx-1 float-end d-block'
        >
          <FaCheckCircle className='mb-1' /> Confirm
        </button>
        <button
          type='button'
          onClick={handlePrint}
          className='btn btn-dark btn-sm mx-1 float-end d-block'
        >
          <FaPrint className='mb-1' /> Print
        </button>
      </div>
    </div>
  )
}

export default OrderDetailScreen
