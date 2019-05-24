import React, { Component } from 'react'
import ReactHtmlParser from 'react-html-parser'
import axios from 'axios';
const url = process.env.REACT_APP_API_URL

export default class Post extends Component {
  constructor(props) {
    super(props)

    this.state = {
      expand: false,
      accountid: '',
      reactions: [],
      showErrorMessage: false
    }
  }

  componentDidMount() {
    this.getReactions()
  }

  handleExpand = () => {
    this.setState({
      expand: !this.state.expand
    })
  }

  getAccount = async () => {
    try {
      const response = await axios.get(`${url}/accounts`)
      const account = await response.data.find(account => account.username === this.props.username)
      this.setState({ accountid: account.id })
      return account
    } catch (err) {
      console.log(err)
    }
  }

  getReactions = async () => {
    try {
      const account = await this.getAccount()
      const reactions = await axios.get(`${url}/accounts/${account.id}/posts/${this.props.id}/reactions`)
      this.setState({ reactions: [...reactions.data] })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div className="film border rounded p-0 mb-4">
        <div className="pl-3 controls d-flex justify-content-between align-items-center">
          {this.props.username === this.props.loggedInPerson &&
            <div onClick={() => this.props.deleteFilm(this.props.id)}
              className="close text-muted m-0 text-right"></div>}
        </div>
        <p className="lead pl-3 pr-2 mb-0">{ReactHtmlParser(this.props.content)}</p>
      </div>
    )
  }
}