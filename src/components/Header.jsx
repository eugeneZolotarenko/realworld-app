import React from "react"
import { Link } from "react-router-dom"

function Header() {
  return (
    <nav className='navbar navbar-light'>
      <div className='container'>
        <Link className='navbar-brand' to='/'>
          conduit
        </Link>
        <ul className='nav navbar-nav pull-xs-right'>
          <li className='nav-item'>
            <Link className='nav-link active' to=''>
              Home
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to=''>
              <i className='ion-compose'></i>&nbsp;New Post
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to=''>
              <i className='ion-gear-a'></i>&nbsp;Settings
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to=''>
              Sign up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header
