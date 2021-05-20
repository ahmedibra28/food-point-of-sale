import React, { useEffect } from 'react'
import { FaArrowCircleDown, FaArrowCircleUp } from 'react-icons/fa'
import BarChartScreen from './BarChartScreen'
import { useDispatch, useSelector } from 'react-redux'
import { listOrders } from '../redux/orders/ordersThunk'
import Loader from '../components/Loader'
import moment from 'moment'

const DashboardScreen = () => {
  const dispatch = useDispatch()

  const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }
  const orderList = useSelector((state) => state.orderList)
  const { orders, loadingListOrders } = orderList

  useEffect(() => {
    dispatch(listOrders({ page: '', limit: '' }))
  }, [dispatch])

  const totalTodaysSales = () => {
    let totalTodaysSales =
      orders &&
      orders.filter(
        (order) =>
          moment(order.createdAt).format('l') === moment(new Date()).format('l')
      )

    return (
      totalTodaysSales &&
      totalTodaysSales
        .reduce((acc, item) => acc + item.totalPrice, 0)
        .toFixed(2)
    )
  }

  const totalRunningSalesMonth = () => {
    let totalTodaysSales =
      orders &&
      orders.filter(
        (order) =>
          moment(order.createdAt).format('MMM') ===
            moment(new Date()).format('MMM') && order.status === 'paid'
      )

    return (
      totalTodaysSales &&
      totalTodaysSales
        .reduce((acc, item) => acc + item.totalPrice, 0)
        .toFixed(2)
    )
  }

  const totalLastSalesMonth = () => {
    let totalTodaysSales =
      orders &&
      orders.filter(
        (order) =>
          moment(order.createdAt).format('MMM') ===
            moment().subtract(1, 'months').format('MMM') &&
          order.status === 'paid'
      )

    return (
      totalTodaysSales &&
      totalTodaysSales
        .reduce((acc, item) => acc + item.totalPrice, 0)
        .toFixed(2)
    )
  }

  const totalLastThirdSalesMonth = () => {
    let totalTodaysSales =
      orders &&
      orders.filter(
        (order) =>
          moment(order.createdAt).format('MMM') ===
            moment().subtract(2, 'months').format('MMM') &&
          order.status === 'paid'
      )

    return (
      totalTodaysSales &&
      totalTodaysSales
        .reduce((acc, item) => acc + item.totalPrice, 0)
        .toFixed(2)
    )
  }

  const totalRunningPendingOrdersMonth = () => {
    let totalTodaysSales =
      orders &&
      orders.filter(
        (order) =>
          moment(order.createdAt).format('MMM') ===
            moment(new Date()).format('MMM') && order.status === 'unpaid'
      )

    return (
      totalTodaysSales &&
      totalTodaysSales
        .reduce((acc, item) => acc + item.totalPrice, 0)
        .toFixed(2)
    )
  }

  const growthPercentage = () => {
    const totalSub = addDecimal(
      Number(totalRunningSalesMonth()) - Number(totalLastSalesMonth())
    )
    return addDecimal(totalSub / totalLastSalesMonth())
  }

  return (
    <div>
      <h3>Dashboard</h3>
      {loadingListOrders ? (
        <Loader />
      ) : (
        <>
          <div className='row'>
            <div className='col-md-8 col-12'>
              <div className='row '>
                <div className='col-12 mt-3'>
                  <h5>Your Store Summary</h5>
                  <p className='text-muted'>Latest orders for today</p>

                  <div className='row'>
                    <div className='col-md-4 col-12'>
                      <div className='sales-box p-5 rounded shadow bg-success bg-gradient text-light'>
                        <span className=''>Total Sales</span> <br />
                        <span className='fs-3'>${totalTodaysSales()}</span>
                      </div>
                    </div>
                    <div className='col-md-4 col-12'>
                      <div className='sales-box p-5 rounded shadow bg-info bg-gradient text-light'>
                        <span className=''>Total Unconfirmed Sales</span> <br />
                        <span className='fs-3'>
                          ${totalRunningPendingOrdersMonth()}
                        </span>
                      </div>
                    </div>
                    <div className='col-md-4 col-12 border-start border-success'>
                      <div className='sales-box py-4 px-3 text-start rounded shadow-sm'>
                        <h5>Running Month Sales</h5>
                        <h2 className='fw-bold'>
                          ${totalRunningSalesMonth()}/=
                        </h2>
                        <p className='text-muted'>
                          <span
                            className={`${
                              growthPercentage() >= 0
                                ? 'text-success'
                                : 'text-danger'
                            }`}
                          >
                            {growthPercentage() >= 0 ? (
                              <FaArrowCircleUp className='mb-1' />
                            ) : (
                              <FaArrowCircleDown className='mb-1' />
                            )}{' '}
                            {growthPercentage()}%{' '}
                          </span>
                          than last month
                        </p>{' '}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='col-md-12 col-12 mt-3'>
                  <h5>Last Three Months</h5>
                  <BarChartScreen
                    totalLastThirdSalesMonth={totalLastThirdSalesMonth()}
                    totalLastSalesMonth={totalLastSalesMonth()}
                    totalRunningSalesMonth={totalRunningSalesMonth()}
                  />
                </div>
              </div>
            </div>
            <div className='col-md-4 col-12 border-start border-danger'>
              <h5>Recent Transactions</h5>
              <table className='table '>
                <tbody>
                  {orders &&
                    orders.slice(0, 10).map((order) => (
                      <tr key={order._id}>
                        <td>
                          {order._id}
                          <span className='text-muted fw-lighter'>
                            {' '}
                            <br />{' '}
                            {moment(order.createdAt)
                              .startOf('minutes')
                              .fromNow()}{' '}
                          </span>
                        </td>
                        <td>${addDecimal(order.totalPrice)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default DashboardScreen
