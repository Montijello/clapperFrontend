import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Film from './Film'
import Search from './Search'
import FoundProfile from './FoundProfile'
import axios from 'axios'
import Spinner from 'reactjs-simple-spinner'
const url = process.env.REACT_APP_API_URL
export default class Feed extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: '',
      films:[],
      searchedFilms:[],
      urlparams: '',
      loggedin: '',
      isLoading: true,
      search:'',
      data:[],
      submittedSearch: false,
      loggedinId: ''
    }
  }

  getAccount = async () => {
    try {
      const response = await axios.get(`${url}/accounts`)
      const account = await response.data.find(user => user.username === this.props.username)

      this.setState({
        id: account.id,
        loggedin: this.props.user.username,
        loggedinId: this.props.user.id
      })
      return account
    } catch(err) {
      console.log(err)
    }
  }

  getFilms = async () => {
    try {
      const films = await axios.get(`${url}/films`)

      this.setState({
        films: [...films.data.reverse()],
        isLoading: false
      })
    } catch (err) {
      console.log(err)
    }
  }

  deleteFilm = async (id) => {
    try {
      await axios.delete(`${url}/films/${id}`)

      this.getFilms()
    } catch (err) {
      console.log(err)
    }
  }

  handleSearchSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.get(`${url}/accounts`)
      const data = await response.data.filter(film =>
        Object.values(film).reduce((i, b) => i || (typeof b === 'string' ?
          b.toLowerCase().includes(this.state.search.toLowerCase()) : false), false)
      )
      this.setState({
        searchedFilms: data,
        submittedSearch: true
      })

      if(this.state.search.length <2) {
        this.setState({
          submittedSearch:false
        })
      }
      return data
    } catch (err) {
      console.log(err)
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  render() {
    if (this.state.loggedin && this.state.isLoading) {
      return (
      <div className="main col-sm-8 mt-4">
       <Spinner size="massive" lineSize={12} className="center" />
      </div>
      )
    }

    if (!this.state.loggedin && this.state.isLoading) {
      return (
        <div className="main col-sm-8 mt-4 text-center">
          <p className="lead">
            Please <Link to="/">login</Link> to see <span className="username">{this.props.username}'s</span> full profile.
          </p>
        </div>
      )
    }

    return (
      <div className="main col-sm-12 col-md-8 mt-4">
        <Search handleSearchSubmit={this.handleSearchSubmit} handleChange={this.handleChange} />
        <div className={this.state.submittedSearch ? "card-group justify-content-left border rounded position-absolute shadow-sm" : undefined}>
          {
            this.state.submittedSearch && this.state.searchedFilms.map(film =>
              <FoundProfile
                profilepic={film.profilepic}
                username={film.username}
                type={film.type}
                age={film.age}
                bio={film.bio} />)
          }
        </div>
        {
          this.state.loggedin && !this.state.loading && this.state.films.length > 0 ?
            this.state.films.map(film =>
              <Film
                getFilms={this.getFilms}
                key={film.id}
                id={film.id}
                username={this.props.username}
                loggedInPerson={this.state.loggedin}
                loggedinId={this.state.loggedinId}
                created_at={film.created_at}
                content={film.content}
                deleteFilm={this.deleteFilm}
                reactions={this.state.reactions}
              />
            )
            :
            <p className="lead text-center">
              {
                this.state.loggedin === this.props.username ?
                  <span className="text-muted">you don't have any films yet</span>
                  :
                  <span className="text-muted">{this.props.username} doesn't have any films yet</span>
              }
            </p>
        }
      </div>
    )
  }
}
