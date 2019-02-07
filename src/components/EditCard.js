import React from 'react'
import { Field, reduxForm } from 'redux-form'

let EditCardForm = props => {
  const {handleSubmit} = props
  return (
    <form onSubmit={handleSubmit}>
      <Field name="name" component="input" type="text" />
    </form>
  )
}

EditCardForm = reduxForm({
  form: 'editCard'
})(EditCardForm)

export default EditCardForm;