import React, { Component } from 'react';

class Card extends Component {
  state = {
    newName: ""
  }

  handleChange = ({target: {name, value}}) => this.setState({ [name]: value })
  
  handleSubmit = (e) => {
    e.preventDefault()
    let { newName } = this.state
    const {onEditCard} = this.props
    const name = {name: newName}
    onEditCard(name)
    this.clearInput()
  }

  clearInput = () => this.setState({newName: ''})


  render(){
    const { card, 
      canMoveLeft, 
      canMoveRight, 
      onMoveLeft, 
      onMoveRight, 
      onDelete
    } = this.props
    return (
      <div className="card-container">
        <div className="card">
          {canMoveLeft && <button onClick={onMoveLeft}>{'<'}</button>}
            <span>{card.name}</span>
            <form onSubmit={this.handleSubmit}>
              <input 
                type="text"
                name="newName"
                value={this.state.newName}
                placeholder={card.name}
                onChange={this.handleChange}
              />
            </form>
          {canMoveRight && <button onClick={onMoveRight}>{'>'}</button>}
        </div>
        <div>
          <button onClick={onDelete}>delete</button>
        </div>
      </div>
  )}
}

export default Card;
