import React, { Component } from 'react'
import Feed from './Feed'
import axios from 'axios'
const url = process.env.REACT_APP_API_URL

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      account: []
    }
  }

  componentDidMount() {
    this.getAccount()
  }

  getAccount = async () => {
    try {
      const response = await axios.get(`${url}/accounts`)
      const account = await response.data.filter(account => account.username === this.props.match.params.username)
      this.setState({ account: [...account] })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div className="profile row">
        {
          this.state.account.map(person =>
            <Feed
            key={person.id}
            id={person.id}
            username={person.username}
            user={this.props.user}
          />)
        }
      </div>
    )
  }
}
