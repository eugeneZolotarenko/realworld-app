import React from "react"
import { Route, Switch } from "react-router-dom"

import { Helmet } from "react-helmet"

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
      <Helmet>
        <meta charset='utf-8' />
        <title>Conduit</title>
        <link
          href='//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css'
          rel='stylesheet'
          type='text/css'
        />
        <link
          href='//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic'
          rel='stylesheet'
          type='text/css'
        />
        <link rel='stylesheet' href='//demo.productionready.io/main.css' />
      </Helmet>
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
