import React from 'react'
import { Route, Switch } from 'react-router-dom'

import HomeScreen from '../../screens/HomeScreen'
import LoginScreen from '../../screens/LoginScreen'
import ProfileScreen from '../../screens/ProfileScreen'
import RegisterScreen from '../../screens/RegisterScreen'
import UserListScreen from '../../screens/UserListScreen'
import NotFound from '../NotFound'

import PrivateRoute from './PrivateRoute'
import UserLogHistoryScreen from '../../screens/LogHistoryScreen'
import ForgotPasswordScreen from '../../screens/ForgotPasswordScreen'
import ResetPasswordScreen from '../../screens/ResetPasswordScreen'
import ProductScreen from '../../screens/ProductScreen'
import OrderScreen from '../../screens/OrderScreen'
import ReportScreen from '../../screens/ReportScreen'
import DashboardScreen from '../../screens/DashboardScreen'

const Routes = () => {
  return (
    <section className='mx-auto container mt-2'>
      <Switch>
        <Route exact path='/' component={HomeScreen} />
        <Route path='/forgotpassword' component={ForgotPasswordScreen} />
        <Route path='/login' component={LoginScreen} />
        <Route path='/register' r component={RegisterScreen} />

        <PrivateRoute
          role={['Admin', 'User']}
          path='/profile'
          component={ProfileScreen}
        />
        <PrivateRoute
          role={['Admin']}
          path='/products'
          component={ProductScreen}
        />
        <PrivateRoute role={['Admin']} path='/orders' component={OrderScreen} />
        <PrivateRoute
          role={['Admin']}
          path='/report'
          component={ReportScreen}
        />
        <PrivateRoute
          role={['Admin']}
          path='/dashboard'
          component={DashboardScreen}
        />
        <Route
          path='/resetpassword/:resetToken'
          component={ResetPasswordScreen}
        />
        <PrivateRoute
          path='/admin/users/logs'
          role={['Admin']}
          component={UserLogHistoryScreen}
        />
        <PrivateRoute
          exact
          path='/admin/users'
          role={['Admin']}
          component={UserListScreen}
        />
        <PrivateRoute
          path='/admin/users/page/:pageNumber'
          role={['Admin']}
          component={UserListScreen}
        />

        <Route component={NotFound} />
      </Switch>
    </section>
  )
}

export default Routes
