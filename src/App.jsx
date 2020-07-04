import React, { useEffect } from "react"
import { Route, Switch } from "react-router-dom"
import { useSelector } from "react-redux"

import Home from "pages/Home"
import SignIn from "pages/SignIn"
import SignUp from "pages/SignUp"
import Settings from "pages/Settings"
import Editor from "pages/Editor"
import Article from "pages/Article"
import Profile from "pages/Profile"

import Header from "components/Header"
import Footer from "components/Footer"

import userAPI from "lib/api/user"

function App() {
  const { user } = useSelector((state) => state)

  useEffect(() => {
    if (user.token) {
      async function Auth() {
        try {
          await userAPI.currentUser(user.token)
        } catch (error) {
          console.error(error)
        }
      }
      Auth()
    }
  }, [user])

  return (
    <div className='App'>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={SignIn} />
        <Route path='/register' component={SignUp} />
        <Route path='/settings' component={Settings} />
        <Route path='/editor' component={Editor} />
        <Route path='/article' component={Article} />
        <Route path='/profile' component={Profile} />
      </Switch>
      <Footer />
    </div>
  )
}

export default App
