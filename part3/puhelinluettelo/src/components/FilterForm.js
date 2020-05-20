import React from 'react'

const FilterForm = (props) => {
  return (
    <p>filter shown with: <input
      value = {props.value}
      onChange = {props.onChange}
    /></p>
  )
}

export default FilterForm
