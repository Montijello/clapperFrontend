import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      search: '',
      posts: [],
      submittedSearch: false
    }
  }

  SignInSignOutButton = () => {
    if (this.props.user) {
      localStorage.removeItem('token')
      this.props.setAuthentication(null)
    }
  }

  render() {
    return (
      <header>
        <nav className="navbar navbar-expand-lg bg-dark">
          <div className="container mr-auto">
            <a className="navbar-brand" href={!this.props.user ? `/` : `/profile/${this.props.user.username}`}>Clapper</a>
            <div className="navbar-right">

              {
                this.props.user ?
                <span className="ml-2 text-white username"> Hi {this.props.user.username}! </span>
                :
                <Link className="btn text-white ml-2" to="/">Sign In </Link>
              }

            </div>
          </div>
        </nav>
      </header>
    )
  }
}
