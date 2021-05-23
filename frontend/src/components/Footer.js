import React from 'react'

const Footer = () => {
  return (
    <footer>
      <div className='container mt-5 pt-5'>
        <div className='row'>
          <div className='col text-center py-3 d-flex justify-content-between'>
            <span>
              Copyright &copy;{' '}
              <a href=' https://farshaxan.media' target='blank'>
                Farshaxan Media
              </a>
            </span>
            <span>
              Powered By{' '}
              <a href=' https://geeltech.com' target='blank'>
                Geel Tech
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
