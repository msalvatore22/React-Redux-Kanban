import React, { Component } from 'react';;

class AddCardForm extends Component {
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
    const {onAddCard, toggleCardInput} = this.props
    const name = {name: newName}
    onAddCard(name)
    this.clearInput()
    toggleCardInput()
  }

  clearInput = () => this.setState({newName: ''})

  render(){
    const {toggleCardInput} = this.props
    const {newName} = this.state
    return (
      <div>
        <form className="add-card-form" onSubmit={this.handleSubmit}>
          <input 
            type="text"
            name="newName"
            value={newName}
            placeholder="Enter Card Title"
            onChange={this.handleChange}
          />
          <button className="submit-btn form-btn" type="submit">Add Card</button>
          <button className="cancel-btn form-btn" onClick={toggleCardInput}>Cancel</button>
        </form>
      </div>
    )
  }
}

export default AddCardForm;