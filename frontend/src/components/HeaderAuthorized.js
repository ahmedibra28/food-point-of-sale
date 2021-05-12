import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  FaCloudMeatball,
  FaCog,
  FaFileContract,
  FaShoppingBasket,
  FaTruckLoading,
  FaUser,
  FaUserCircle,
  FaUsers,
  FaUtensils,
} from 'react-icons/fa'

const HeaderAuthorized = () => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  return (
    <>
      <nav className='sticky-top' id='sidebar'>
        <div className='container-fluid pt-3'>
          <Link to='/' className='navbar-brand fw-bold fs-6'>
            FOOD - Point of Sale
          </Link>
          <ul
            className='navbar-nav text-light d-flex justify-content-between'
            style={{ height: 'calc(100vh - 100px)' }}
          >
            <div>
              <li className='nav-item dropdown'>
                <span
                  className='nav-link dropdown-toggle'
                  id='navbarDropdown'
                  role='button'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                >
                  <FaUserCircle className='mb-1' /> {userInfo && userInfo.name}
                </span>
                <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
                  <li>
                    <Link to='/profile' className='dropdown-item'>
                      <FaUser className='mb-1' /> Profile
                    </Link>
                  </li>
                </ul>
              </li>
              <li className='nav-item'>
                <Link to='/products' className='nav-link'>
                  <FaUtensils className='mb-1' /> Products
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/orders' className='nav-link'>
                  <FaTruckLoading className='mb-1' /> Orders
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/kitchen' className='nav-link'>
                  <FaCloudMeatball className='mb-1' /> Kitchen
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/checkout' className='nav-link'>
                  <FaShoppingBasket className='mb-1' /> Checkout
                </Link>
              </li>
            </div>

            {userInfo && userInfo.roles.includes('Admin') && (
              <>
                <li className='nav-item dropdown '>
                  <span
                    className='nav-link dropdown-toggle'
                    id='navbarDropdown'
                    role='button'
                    data-bs-toggle='dropdown'
                    aria-expanded='false'
                  >
                    <FaCog className='mb-1' /> Admin
                  </span>
                  <ul
                    className='dropdown-menu '
                    aria-labelledby='navbarDropdown'
                  >
                    <li>
                      <Link to='/admin/users' className='dropdown-item'>
                        <FaUsers className='mb-1' /> Users
                      </Link>
                    </li>
                    <li>
                      <Link to='/admin/users/logs' className='dropdown-item'>
                        <FaFileContract className='mb-1' /> Users Log
                      </Link>
                    </li>
                  </ul>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  )
}

export default HeaderAuthorized
