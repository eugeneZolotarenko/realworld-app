import React from "react"
import { Route, Switch } from "react-router-dom"

import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Settings from "./pages/Settings"
import Editor from "./pages/Editor"
import Article from "./pages/Article"
import Profile from "./pages/Profile"
import ProfileFavorites from "./pages/ProfileFavorites"

import Header from "./components/Header"
import Footer from "./components/Footer"

function App() {
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
        <Route path='/profile/favorites' component={ProfileFavorites} />
      </Switch>
      <Footer />
    </div>
  )
}

export default App
