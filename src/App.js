import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'
import Login from './Login'
import Signup from './Signup'
import Profile from './Profile'

class App extends Component {

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <div>
            <Header />
            <div className="container">
              <Switch>
                <Route exact path="/profile/:username" component={Profile} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/" component={Login} />
              </Switch>
            </div>
            <footer className="text-center mt-5">&copy; 2019. Clapper</footer>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
