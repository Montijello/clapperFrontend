import React from 'react'

const FoundProfile = ({ profilepic, username, type, age }) => {
  return (
    <div className="media p-3">
      <a href={`/profile/${username}`}>
        <img className="img-thumbnail align-self-start mr-2 mb-1" src={profilepic} alt={username} />
        <div className="media-body">
          <div className="username">{username}</div>
          <small className="text-muted">{type}, {age} years old</small>
        </div>
      </a>
    </div>
  )
}

export default FoundProfile
