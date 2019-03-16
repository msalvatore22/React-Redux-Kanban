import React, { Component } from 'react';;

class EditCardForm extends Component {
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
    const {onEditCard, toggleInput} = this.props
    const name = {name: newName}
    onEditCard(name)
    this.clearInput()
    toggleInput()
  }

  clearInput = () => this.setState({newName: ''})

  render(){
    const {card} = this.props
    const {newName} = this.state
    return (
        <form onSubmit={this.handleSubmit}>
          <input 
            type="text"
            name="newName"
            value={newName}
            placeholder={card.name}
            onChange={this.handleChange}
          />
        </form>
    )
  }
}

export default EditCardForm;