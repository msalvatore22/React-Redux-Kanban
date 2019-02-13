import React, { Component } from 'react';
import Card from './Card'

class Column extends Component {
  constructor(props){
    super(props)

    this.state = {
      newColumnName: "",
      newCardName: "",
      showInput: false,
      showCardInput: false
    }
  }

  handleChange = ({target: {name, value}}) => this.setState({ [name]: value })
  
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

  handleCardSubmit = (e) => {
    e.preventDefault()
    let { newCardName } = this.state
    if(newCardName.length === 0) return
    const {onAddCard} = this.props
    const name = { name: newCardName }
    onAddCard(name)
    this.clearInput()
    this.toggleCardInput()
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
  const {showInput, showCardInput, newColumnName, newCardName} = this.state
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
          onAddCard={(name) => onAddCard(name)}
        />
      ))}
      {showCardInput ?
      <form className="add-card-form" onSubmit={this.handleCardSubmit}>
          <input 
            type="text"
            name="newCardName"
            value={newCardName}
            placeholder="Enter Card Title"
            onChange={this.handleChange}
          />
          <button className="submit-btn form-btn" type="submit">add card</button>
          <button className="cancel-btn form-btn" onClick={this.toggleCardInput}>cancel</button>
        </form>
      :
      <button className="add-card-btn" onClick={this.toggleCardInput}>+ add card</button>
      }
    </div> 
  )}
}

export default Column;