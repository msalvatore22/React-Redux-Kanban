import React, { Component } from 'react';;

class AddColumnForm extends Component {
  constructor(props){
    super(props)

    this.state = {
      newName: ''
    }
  }

  handleChange = ({target: {name, value}}) => this.setState({ [name]: value })
  
  handleSubmit = (e) => {
    e.preventDefault()
    let { newName } = this.state
    if(newName.length === 0) return
    const {onAddColumn, toggleInput} = this.props
    onAddColumn(newName)
    this.clearInput()
    toggleInput()
  }

  clearInput = () => this.setState({newName: ''})

  render(){
    const {toggleInput} = this.props
    const {newName} = this.state
    return (
      <form className="add-column-form" onSubmit={this.handleSubmit}>
          <input 
            type="text"
            name="newName"
            value={newName}
            placeholder="Enter Column Title"
            onChange={this.handleChange}
          />
          <button className="submit-btn form-btn" type="submit">Add Column</button>
          <button className="cancel-btn form-btn" onClick={toggleInput}>Cancel</button>
        </form>
    )
  }
}

export default AddColumnForm;