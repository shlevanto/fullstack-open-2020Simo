import React from 'react'

const CreateBlogForm = (props) => {
  return (
  <div>
    <h2>create new</h2>
   
  <form onSubmit = {props.handleSubmit}>
      <div>
        title:
        <input
        type = "text"
        value = {props.title}
        name = "title:"
        onChange = {props.handleTitleChange}
        />
      </div>
      <div>
        author:
        <input
        type = "text"
        value = {props.author}
        name = "author:"
        onChange = {props.handleAuthorChange}
        />
      </div>
      <div>
        url:
        <input
        type = "text"
        value = {props.url}
        name = "title:"
        onChange = {props.handleUrlChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
    </div>
  )}
export default CreateBlogForm