import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import {
  logoutUser,
  setImage,
  setEmail,
  setUsername,
  setBio,
} from "redux/slices/userSlice"
import { RootState } from "redux/rootReducer"

import userAPI from "lib/api/user"

function Settings() {
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state)

  const { email, username, image, bio, token } = user
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await userAPI.updateUser({
      email,
      username,
      password,
      image,
      bio,
      token,
    })
  }

  return (
    <div className='settings-page'>
      <div className='container page'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 col-xs-12'>
            <h1 className='text-xs-center'>Your Settings</h1>
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className='form-group'>
                  <input
                    className='form-control'
                    type='text'
                    value={image}
                    onChange={(e) => dispatch(setImage(e.target.value))}
                    placeholder='URL of profile picture'
                  />
                </fieldset>
                <fieldset className='form-group'>
                  <input
                    className='form-control form-control-lg'
                    type='text'
                    value={username}
                    onChange={(e) => dispatch(setUsername(e.target.value))}
                    placeholder='Your Name'
                  />
                </fieldset>
                <fieldset className='form-group'>
                  <textarea
                    className='form-control form-control-lg'
                    rows={8}
                    value={bio}
                    onChange={(e) => dispatch(setBio(e.target.value))}
                    placeholder='Short bio about you'></textarea>
                </fieldset>
                <fieldset className='form-group'>
                  <input
                    className='form-control form-control-lg'
                    type='text'
                    value={email}
                    onChange={(e) => dispatch(setEmail(e.target.value))}
                    placeholder='Email'
                  />
                </fieldset>
                <fieldset className='form-group'>
                  <input
                    className='form-control form-control-lg'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                  />
                </fieldset>
                <button
                  className='btn btn-lg btn-primary pull-xs-right'
                  type='submit'>
                  Update Settings
                </button>
              </fieldset>
            </form>
            <hr />
            <button
              className='btn btn-outline-danger'
              onClick={() => dispatch(logoutUser())}>
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
