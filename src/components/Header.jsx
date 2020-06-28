import React from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { setArticlesAuthor } from "redux/slices/articlesSlice"

function Header() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state)

  return (
    <nav className='navbar navbar-light'>
      <div className='container'>
        <Link className='navbar-brand' to='/'>
          conduit
        </Link>
        <ul className='nav navbar-nav pull-xs-right'>
          <li className='nav-item'>
            <Link className='nav-link active' to='/'>
              Home
            </Link>
          </li>
          {user.token && (
            <>
              <li className='nav-item'>
                <Link className='nav-link' to='/editor'>
                  <i className='ion-compose'></i>&nbsp;New Article
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/settings'>
                  <i className='ion-gear-a'></i>&nbsp;Settings
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className='nav-link'
                  to={`/profile/${user.username}`}
                  onClick={() => {
                    dispatch(setArticlesAuthor(user.username))
                  }}>
                  {user.username}
                </Link>
              </li>
            </>
          )}
          {!user.token && (
            <>
              <li className='nav-item'>
                <Link className='nav-link' to='/login'>
                  Sign in
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/register'>
                  Sign up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Header
