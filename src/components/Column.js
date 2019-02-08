import React, { Component } from 'react';
import Card from './Card'

class Column extends Component {
  state = {
    newName: ""
  }

  handleChange = ({target: {name, value}}) => this.setState({ [name]: value })
  
  handleSubmit = (e) => {
    e.preventDefault()
    let { newName } = this.state
    const {onEditColumn} = this.props
    const name = {name: newName}
    onEditColumn(name)
    this.clearInput()
  }

  clearInput = () => this.setState({newName: ''})
  


render(){
  const { column, 
    columnIndex, 
    onMoveLeft, 
    onMoveRight, 
    onAddCard, 
    onDelete,
    onEditCard, 
    length,
    onRemove } = this.props
  return (
    <div className="column">
      <h1>{column.name}</h1>
      <form onSubmit={this.handleSubmit}>
        <input 
          type="text"
          name="newName"
          value={this.state.newName}
          placeholder={column.name}
          onChange={this.handleChange}
        />
      </form>
      <button onClick={onRemove}>delete</button>
      {column.cards.map((card, cardIndex) => (
        <Card 
          key={cardIndex}
          card={card} 
          cardIndex={cardIndex}
          canMoveLeft={columnIndex !== 0}
          canMoveRight={columnIndex < length-1}
          onMoveLeft={() => onMoveLeft(cardIndex)}
          onMoveRight={() => onMoveRight(cardIndex)}
          onDelete={()=> onDelete(cardIndex)}
          onEditCard={(name) => onEditCard(cardIndex, name)}
        />
      ))}
      <button onClick={onAddCard}>+</button>
    </div> 
  )}
}

export default Column;