import React from 'react'

const Loader = () => {
  return (
    <div className='d-flex justify-content-center align-items-center vh-100 text-primary text-center mx-auto'>
      <div>
        <span
          className='spinner-border'
          style={{
            width: '100px',
            height: '100px',
            margin: 'auto',
            display: 'block',
          }}
        ></span>
        <span className='sr-only'>Loading...</span>
      </div>
    </div>
  )
}

export default Loader
