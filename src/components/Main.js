import React, {Component} from 'react'
import { Route } from 'react-router-dom'

import { AuthAdapter } from '../adapters'

import NavBar from './NavBar'
import LoginForm from './LoginForm'
import StudentsPageContainer from '../containers/StudentsPageContainer'

class Main extends Component {

  constructor(){
    super()
    this.state = {
      auth: {
        isLoggedIn: false,
        user: {}
      }
    }
    this.logIn = this.logIn.bind(this)
  }

  componentDidMount(){
    if (localStorage.getItem('jwt')) {
      AuthAdapter.currentUser()
        .then(user => {
          if (!user.error) {
            this.setState({
              auth: {
                isLoggedIn: true,
                user: user
              }
            })
          }
        })
    }
  }

  logIn(loginParams){
    AuthAdapter.login(loginParams)
      .then( user => {
        if (!user.error) {
          debugger
          this.setState({
            auth: { isLoggedIn: true, user: user}
          })
          localStorage.setItem('jwt', user.jwt )
        }
      })
  }

  render(){
    let title
    if (this.state.auth.isLoggedIn) {
      title = this.state.auth.user.username
    } else {
      title = 'Welcome to the app'
    }

    return (
      <div>
        <NavBar title={title} style='inverse'/>
        <Route path="/students" render={() => <StudentsPageContainer />} />
        <Route path="/about" render={() => {
          return <p>This is an app all about students</p>
        }} />
        <Route path='/login' render={() => <LoginForm onSubmit={this.logIn}/>} />
      </div>
    )
  }
}

export default Main
