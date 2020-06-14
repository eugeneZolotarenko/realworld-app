import React from "react"
import ReactDOM from "react-dom"

import { Provider } from "react-redux"
import * as serviceWorker from "./serviceWorker"
import { Router } from "react-router-dom"

import App from "./App"
import history from "./lib/utils/history"
import store from "./redux/store"
import { saveState } from "./redux/localStorage"

store.subscribe(() => {
  saveState({
    user: store.getState().user,
  })
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)

serviceWorker.unregister()
