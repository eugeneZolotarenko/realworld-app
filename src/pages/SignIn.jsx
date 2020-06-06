import React, { useState } from "react"
import { connect } from "react-redux"

import history from "../lib/utils/history"
import userAPI from "../lib/api/user"
import { setCurrentUser } from "../redux/slices/userSlice"

const mapDispatch = { setCurrentUser }

function SignIn({ setCurrentUser }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLoginUser = async (e) => {
    e.preventDefault()
    try {
      const { user, status } = await userAPI.login(email, password)
      if (status !== 200) {
        console.log("errror")
      } else {
        setCurrentUser(user)
        history.push("/")
      }
    } catch (error) {
      console.error(error)
    }
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

            <form onSubmit={handleLoginUser}>
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
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(null, mapDispatch)(SignIn)
