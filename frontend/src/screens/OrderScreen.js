import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { FaCheckCircle, FaInfoCircle, FaTimes, FaTrash } from 'react-icons/fa'
import {
  resetDeleteOrder,
  resetListOrders,
  resetUpdateOrder,
} from '../redux/orders/ordersSlice'
import {
  deleteOrder,
  listOrders,
  updateOrder,
} from '../redux/orders/ordersThunk'
import { confirmAlert } from 'react-confirm-alert'
import { Confirm } from '../components/Confirm'
import Pagination from '../components/Pagination'
import moment from 'moment'
import OrderDetailScreen from './OrderDetailScreen'

const OrderScreen = () => {
  const socket = io('http://localhost:4000/')

  const dispatch = useDispatch()

  const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(30)
  const [socketSuccess, setSocketSuccess] = useState(false)
  const [orderDetail, setOrderDetail] = useState({})

  const orderList = useSelector((state) => state.orderList)
  const { orders, loadingListOrders, errorListOrders, total, pages } = orderList

  const orderDelete = useSelector((state) => state.orderDelete)
  const { successDeleteOrder, errorDeleteOrder } = orderDelete

  const orderUpdate = useSelector((state) => state.orderUpdate)
  const { successUpdateOrder, errorUpdateOrder } = orderUpdate

  useEffect(() => {
    if (
      errorDeleteOrder ||
      successDeleteOrder ||
      successUpdateOrder ||
      errorUpdateOrder
    ) {
      setTimeout(() => {
        dispatch(resetDeleteOrder())
        dispatch(resetListOrders())
        dispatch(resetUpdateOrder())
      }, 5000)
    }
  }, [
    errorDeleteOrder,
    successDeleteOrder,
    successUpdateOrder,
    errorUpdateOrder,
    dispatch,
  ])

  useEffect(() => {
    socket.on('addOrderItems', (data) => setSocketSuccess(data.success))
    return () => {
      socket.off()
    }
  }, [socket])

  useEffect(() => {
    socketSuccess && setSocketSuccess(false)

    dispatch(listOrders({ page, limit }))
  }, [
    dispatch,
    successDeleteOrder,
    successUpdateOrder,
    page,
    limit,
    socketSuccess,
  ])

  const updateToPayHandler = (id) => {
    dispatch(updateOrder(id))
  }

  const deleteHandler = (id) => {
    confirmAlert(Confirm(() => dispatch(deleteOrder(id))))
  }

  return (
    <div>
      {successUpdateOrder && (
        <Message variant='success'>Payment success.</Message>
      )}
      {errorUpdateOrder && (
        <Message variant='danger'>{errorUpdateOrder}</Message>
      )}

      {successDeleteOrder && (
        <Message variant='success'>
          Order has been deleted successfully.
        </Message>
      )}
      {errorDeleteOrder && (
        <Message variant='danger'>{errorDeleteOrder}</Message>
      )}
      {loadingListOrders ? (
        <Loader />
      ) : errorListOrders ? (
        <Message variant='danger'>{errorListOrders}</Message>
      ) : (
        <>
          <h3 className=''>List of orders</h3>
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
                  <th>DATE & TIME</th>
                  <th>ORDER TYPE</th>
                  <th>MOBILE</th>
                  <th>TOTAL AMOUNT</th>
                  <th>STATUS</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders &&
                  orders.map((order) => (
                    <tr key={order._id}>
                      <td>{moment(order.createdAt).format('lll')}</td>
                      <td>{order.orderType}</td>
                      <td>{order.mobile}</td>

                      <td>${addDecimal(order.totalPrice)}</td>
                      <td>
                        {order.status === 'unpaid' && (
                          <FaTimes className='mb-1 text-danger' />
                        )}
                        {order.status === 'paid' && (
                          <FaCheckCircle className='mb-1 text-success' />
                        )}
                      </td>
                      <td className='btn-group'>
                        <button
                          data-bs-toggle='modal'
                          data-bs-target='#orderDetailModal'
                          onClick={() => setOrderDetail(order)}
                          className='btn btn-success btn-sm mx-1'
                        >
                          <FaInfoCircle className='mb-1' /> Detail
                        </button>
                        <button
                          className='btn btn-danger btn-sm'
                          onClick={() => deleteHandler(order._id)}
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

      <div
        className='modal fade'
        id='orderDetailModal'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabIndex='-1'
        aria-labelledby='orderDetailModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content modal-background'>
            <div className='modal-header'>
              <h3 className='modal-title ' id='orderDetailModalLabel'>
                Order Details
              </h3>

              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <OrderDetailScreen
                orderDetail={orderDetail && orderDetail}
                addDecimal={addDecimal}
                updateToPayHandler={updateToPayHandler}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderScreen
