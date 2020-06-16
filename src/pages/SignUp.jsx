import React, { useState } from "react"
import { useDispatch } from "react-redux"

import { registerUser } from "redux/slices/userSlice"

function SignUp() {
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  async function handleRegisterUser(e) {
    e.preventDefault()
    dispatch(registerUser({ userName, email, password }))
  }

  function handleUserName(e) {
    setUserName(e.target.value)
  }

  function handleEmail(e) {
    setEmail(e.target.value)
  }

  function handlePassword(e) {
    setPassword(e.target.value)
  }

  return (
    <div className='auth-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 col-xs-12'>
            <h1 className='text-xs-center'>Sign up</h1>
            <p className='text-xs-center'>
              <a href=''>Have an account?</a>
            </p>

            <ul className='error-messages'>
              <li>That email is already taken</li>
            </ul>

            <form onSubmit={handleRegisterUser}>
              <fieldset className='form-group'>
                <input
                  className='form-control form-control-lg'
                  type='text'
                  placeholder='Your Name'
                  onChange={handleUserName}
                />
              </fieldset>
              <fieldset className='form-group'>
                <input
                  className='form-control form-control-lg'
                  type='text'
                  placeholder='Email'
                  onChange={handleEmail}
                />
              </fieldset>
              <fieldset className='form-group'>
                <input
                  className='form-control form-control-lg'
                  type='password'
                  placeholder='Password'
                  onChange={handlePassword}
                />
              </fieldset>
              <button
                type='submit'
                className='btn btn-lg btn-primary pull-xs-right'>
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
