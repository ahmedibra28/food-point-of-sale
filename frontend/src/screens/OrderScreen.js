import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { FaTrash } from 'react-icons/fa'
import { resetDeleteOrder, resetListOrders } from '../redux/orders/ordersSlice'
import { deleteOrder, listOrders } from '../redux/orders/ordersThunk'
import { confirmAlert } from 'react-confirm-alert'
import { Confirm } from '../components/Confirm'
import Pagination from '../components/Pagination'
import moment from 'moment'

const OrderScreen = () => {
  const socket = io('http://localhost:4000/')

  const dispatch = useDispatch()

  const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(30)
  const [socketSuccess, setSocketSuccess] = useState(30)

  const orderList = useSelector((state) => state.orderList)
  const { orders, loadingListOrders, errorListOrders, total, pages } = orderList

  const orderDelete = useSelector((state) => state.orderDelete)
  const { successDeleteOrder, errorDeleteOrder } = orderDelete

  useEffect(() => {
    if (errorDeleteOrder || successDeleteOrder) {
      setTimeout(() => {
        dispatch(resetDeleteOrder())
        dispatch(resetListOrders())
      }, 5000)
    }
  }, [errorDeleteOrder, successDeleteOrder, dispatch])

  useState(() => {
    socket.open()
    socket.on('addOrderItems', (data) => {
      setSocketSuccess(data.success)
    })
    return () => {
      socket.close()
    }
  }, [socket])

  useEffect(() => {
    socketSuccess && setSocketSuccess(false)

    dispatch(listOrders({ page, limit }))
  }, [dispatch, successDeleteOrder, page, limit, socketSuccess])

  const deleteHandler = (id) => {
    confirmAlert(Confirm(() => dispatch(deleteOrder(id))))
  }

  return (
    <div>
      {successDeleteOrder && (
        <Message variant='success'>
          Product has been deleted successfully.
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
                          <button className='btn btn-danger btn-sm rounded-0'>
                            un-paid
                          </button>
                        )}
                        {order.status === 'paid' && (
                          <button className='btn btn-warning btn-sm rounded-0'>
                            paid
                          </button>
                        )}
                        {order.status === 'delivered' && (
                          <button className='btn btn-success btn-sm rounded-0'>
                            delivered
                          </button>
                        )}
                      </td>
                      <td className='btn-group'>
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
    </div>
  )
}

export default OrderScreen
