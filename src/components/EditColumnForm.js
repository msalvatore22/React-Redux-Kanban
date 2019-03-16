import React, { Component } from 'react';;

class EditColumnForm extends Component {
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
    const {onEditColumn, toggleInput} = this.props
    const name = {name: newName}
    onEditColumn(name)
    this.clearInput()
    toggleInput()
  }

  clearInput = () => this.setState({newName: ''})

  render(){
    const {column} = this.props
    const {newName} = this.state
    return (
        <form onSubmit={this.handleSubmit} ref={node => {this.node = node}}>
          <input 
            type="text"
            name="newName"
            value={newName}
            placeholder={column.name}
            onChange={this.handleChange}
          />
        </form>
      
    )
  }
}

export default EditColumnForm;