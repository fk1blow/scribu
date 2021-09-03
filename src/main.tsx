import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

import './assets/styles/fonts.scss'
import './assets/styles/index.scss'
import App from "./App"
import { store } from "./store"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)
