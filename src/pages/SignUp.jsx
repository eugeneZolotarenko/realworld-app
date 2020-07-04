import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"

import { registerUser, setError } from "redux/slices/userSlice"

function SignUp() {
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state)

  return (
    <div className='auth-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 col-xs-12'>
            <h1 className='text-xs-center'>Sign up</h1>
            <p className='text-xs-center'>
              <Link to='/login'>Have an account?</Link>
            </p>

            {!userName && !email && !password && (
              <p className='error-messages'>
                Email, Password and User Name are required
              </p>
            )}
            {user.isError && (
              <p className='error-messages'>Email or password are invalid</p>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault()
                dispatch(registerUser({ userName, email, password }))
              }}>
              <fieldset className='form-group'>
                <input
                  className='form-control form-control-lg'
                  type='text'
                  placeholder='Your Name'
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value)
                    dispatch(setError(false))
                  }}
                />
              </fieldset>
              <fieldset className='form-group'>
                <input
                  className='form-control form-control-lg'
                  type='text'
                  placeholder='Email'
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    dispatch(setError(false))
                  }}
                />
              </fieldset>
              <fieldset className='form-group'>
                <input
                  className='form-control form-control-lg'
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    dispatch(setError(false))
                  }}
                />
              </fieldset>
              <button
                type='submit'
                className='btn btn-lg btn-primary pull-xs-right'
                disabled={user.isLoading ? true : false}>
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
