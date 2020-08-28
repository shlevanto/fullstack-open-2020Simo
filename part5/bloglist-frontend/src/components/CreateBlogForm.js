import React from 'react'
import PropTypes from 'prop-types'

const CreateBlogForm = (props) => {

  return (
    <div>
      <h2>create new blog</h2>
      <form onSubmit = {props.handleSubmit}>
        <div>
          title:
          <input
            id = "title"
            type = "text"
            value = {props.title}
            name = "title"
            onChange = {props.handleTitleChange}
          />
        </div>
        <div>
          author:
          <input
            id = "author"
            type = "text"
            value = {props.author}
            name = "author"
            onChange = {props.handleAuthorChange}
          />
        </div>
        <div>
          url:
          <input
            id = "url"
            type = "text"
            value = {props.url}
            name = "url"
            onChange = {props.handleUrlChange}
          />
        </div>
        <button id="submit-button" type="submit">create</button>
      </form>
    </div>
  )
}

CreateBlogForm.propTypes = {
  author: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default CreateBlogForm