import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import { loginUser, setError } from "redux/slices/userSlice"
import { RootState } from "redux/rootReducer"

function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state)

  return (
    <div className='auth-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 col-xs-12'>
            <h1 className='text-xs-center'>Sign in</h1>

            {user.isError && (
              <p className='error-messages'>Email or password are invalid</p>
            )}

            <form
              onSubmit={async (e) => {
                e.preventDefault()
                dispatch(loginUser(email, password))
              }}>
              <fieldset className='form-group'>
                <input
                  className='form-control form-control-lg'
                  type='text'
                  placeholder='Email'
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
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
