import React, { Component } from 'react';
import Card from './Card'

class Column extends Component {
  state = {
    newName: "",
    showInput: false
  }

  handleChange = ({target: {name, value}}) => this.setState({ [name]: value })
  
  handleSubmit = (e) => {
    e.preventDefault()
    let { newName } = this.state
    const {onEditColumn} = this.props
    const name = {name: newName}
    onEditColumn(name)
    this.clearInput()
    this.toggleInput()
  }

  clearInput = () => this.setState({newName: ''})
  
  toggleInput = () => {
    if(!this.state.showInput){
      document.addEventListener('click', this.handleOutsideClick, false)
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false)
    }
    this.setState(prevState => ({
      showInput: !prevState.showInput}))
  }

  handleOutsideClick = (e) => {
    if (this.node.contains(e.target)) {
      return;
    }
    
    this.toggleInput();
  }


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
  const {showInput, newName} = this.state
  return (
    <div className="column">
      {showInput ?
        <form onSubmit={this.handleSubmit} ref={node => {this.node = node}}>
          <input 
            type="text"
            name="newName"
            value={newName}
            placeholder={column.name}
            onChange={this.handleChange}
          />
        </form>
      : <h1 onClick={this.toggleInput}>{column.name}</h1>
      }
      {showInput ? null : <button onClick={onRemove}>delete column</button>}
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
      <button onClick={onAddCard}>+ add card</button>
    </div> 
  )}
}

export default Column;