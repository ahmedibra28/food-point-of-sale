import React from 'react'
import burger from '../images/burger.png'
import drinks from '../images/drinks.png'
import lunch from '../images/lunch.png'
import pizza from '../images/pizza.png'
import snack from '../images/snack.png'

const CategoryScreen = ({ setCategory, category }) => {
  return (
    <div className='row category'>
      <div className='col-2 mx-auto'>
        <div
          className={`card ${
            category !== 'pizza' ? 'bg-transparent' : ''
          } border-0 rounded-0`}
        >
          <div
            className='bg-light shadow rounded-pill mx-auto text-center'
            style={{ cursor: 'pointer ' }}
            onClick={() => setCategory('pizza')}
          >
            <img
              src={pizza}
              alt='pizza'
              className='img-cart-top img-fluid'
              style={{ width: '4rem' }}
            />
          </div>
          <div className='card-body'>
            <div className='card-title text-center fw-bold fs-6 text-uppercase text-primary d-none d-sm-block'>
              Pizza
            </div>
          </div>
        </div>
      </div>

      <div className='col-2 mx-auto'>
        <div
          className={`card ${
            category !== 'snacks' ? 'bg-transparent' : ''
          } border-0 rounded-0`}
        >
          <div
            className='bg-light shadow rounded-pill mx-auto text-center'
            style={{ cursor: 'pointer ' }}
            onClick={() => setCategory('snacks')}
          >
            <img
              src={snack}
              alt='snack'
              className='img-cart-top img-fluid'
              style={{ width: '4rem' }}
            />
          </div>
          <div className='card-body'>
            <div className='card-title text-center fw-bold fs-6 text-uppercase text-primary d-none d-sm-block'>
              Snacks
            </div>
          </div>
        </div>
      </div>

      <div className='col-2 mx-auto'>
        <div
          className={`card ${
            category !== 'lunch' ? 'bg-transparent' : ''
          } border-0 rounded-0`}
        >
          <div
            className='bg-light shadow rounded-pill mx-auto text-center'
            style={{ cursor: 'pointer ' }}
            onClick={() => setCategory('lunch')}
          >
            <img
              src={lunch}
              alt='lunch'
              className='img-cart-top img-fluid'
              style={{ width: '4rem' }}
            />
          </div>
          <div className='card-body'>
            <div className='card-title text-center fw-bold fs-6 text-uppercase text-primary d-none d-sm-block'>
              Lunch
            </div>
          </div>
        </div>
      </div>

      <div className='col-2 mx-auto'>
        <div
          className={`card ${
            category !== 'burger' ? 'bg-transparent' : ''
          } border-0 rounded-0`}
        >
          <div
            className='bg-light shadow rounded-pill mx-auto text-center'
            style={{ cursor: 'pointer ' }}
            onClick={() => setCategory('burger')}
          >
            <img
              src={burger}
              alt='burger'
              className='img-cart-top img-fluid'
              style={{ width: '4rem' }}
            />
          </div>
          <div className='card-body'>
            <div className='card-title text-center fw-bold fs-6 text-uppercase text-primary d-none d-sm-block'>
              Burger
            </div>
          </div>
        </div>
      </div>
      <div className='col-2 mx-auto'>
        <div
          className={`card ${
            category !== 'drinks' ? 'bg-transparent' : ''
          } border-0 rounded-0`}
        >
          <div
            className='bg-light shadow rounded-pill mx-auto text-center'
            style={{ cursor: 'pointer ' }}
            onClick={() => setCategory('drinks')}
          >
            <img
              src={drinks}
              alt='drinks'
              className='img-cart-top img-fluid'
              style={{ width: '4rem' }}
            />
          </div>
          <div className='card-body'>
            <div className='card-title text-center fw-bold fs-6 text-uppercase text-primary d-none d-sm-block'>
              Drinks
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryScreen
