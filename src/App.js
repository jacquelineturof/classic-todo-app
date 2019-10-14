import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import './App.css'

import Home from './components/pages/Home/Home'
import Nav from './components/UI/Nav/Nav'
import Menu from './components/UI/Menu/Menu'
import Backdrop from './components/UI/Backdrop/Backdrop'
import Auth from './containers/Forms/Auth/Auth'

import * as actions from './store/actions'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSeedling, faCaretCircleDown } from '@fortawesome/pro-duotone-svg-icons'
import { faFacebookSquare, faGooglePlusSquare } from '@fortawesome/free-brands-svg-icons'
import { faTimes } from '@fortawesome/pro-light-svg-icons'

library.add( 
  faSeedling, 
  faCaretCircleDown, 
  faTimes, 
  faFacebookSquare, 
  faGooglePlusSquare 
)

class App extends Component {
  state = {
    displayMenu: false
  }

  showMenu = () => { this.setState({ displayMenu: true }) }
  hideMenu = () => { this.setState({ displayMenu: false }) }

  render () {
    let menu = null

    if (this.state.displayMenu) {
      menu = <Menu 
        close = { this.hideMenu }
        auth = { this.props.auth } />
    }

    return (
      <div className="App">
        <Nav 
          auth = { this.props.auth }
          showMenu = { this.showMenu } />
        { menu }
        <Backdrop show = { this.state.displayMenu } />
        <Switch>
          <Route path = "/signin" component = { Auth } />
          <Route path = "/signup" component = { Auth } />
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
