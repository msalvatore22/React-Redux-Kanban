import React, { Component } from 'react';
import Card from './Card'
import AddCardForm from './AddCardForm'

class Column extends Component {
  constructor(props){
    super(props)

    this.state = {
      newColumnName: "",
      showInput: false,
      showCardInput: false
    }
  }
  
  handleSubmit = (e) => {
    e.preventDefault()
    let { newColumnName } = this.state
    if(newColumnName.length === 0) return
    const {onEditColumn} = this.props
    const name = {name: newColumnName}
    onEditColumn(name)
    this.clearInput()
    this.toggleInput()
  }

  clearInput = () => this.setState({newColumnName: '', newCardName: ''})
  
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

  toggleCardInput = () => {
    this.setState(prevState => ({
      showCardInput: !prevState.showCardInput}))
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
  const {showInput, showCardInput, newColumnName} = this.state
  return (
    <div className="column">
      {showInput ? <button disabled="true" className="remove-column-btn">x</button> : <button className="remove-column-btn" onClick={onRemove}>x</button>}
      {showInput ?
        <form onSubmit={this.handleSubmit} ref={node => {this.node = node}}>
          <input 
            type="text"
            name="newColumnName"
            value={newColumnName}
            placeholder={column.name}
            onChange={this.handleChange}
          />
        </form>
      : <p onClick={this.toggleInput}>{column.name}</p>
      }
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
      {showCardInput ?
        <AddCardForm toggleCardInput={this.toggleCardInput} onAddCard={name => onAddCard(name)} />
      :
      <button className="add-card-btn" onClick={this.toggleCardInput}>+ Add Card</button>
      }
    </div> 
  )}
}

export default Column;