import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import './App.css'

import Home from './components/pages/Home/Home'
import Nav from './components/UI/Nav/Nav'

import * as actions from './store/actions'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSeedling } from '@fortawesome/pro-duotone-svg-icons'

library.add( faSeedling )

class App extends Component {
  render () {
    return (
      <div className="App">
        <Nav auth = { true } />
        <Switch>
          <Route path = "/" component = { Home } />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAutoLogin: () => dispatch( actions.authCheckState() )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
