import React, { Component } from 'react';

class Card extends Component {
  state = {
    newName: "",
    showInput: false
  }

  handleChange = ({target: {name, value}}) => this.setState({ [name]: value })
  
  handleSubmit = (e) => {
    e.preventDefault()
    let { newName } = this.state
    const {onEditCard} = this.props
    const name = {name: newName}
    onEditCard(name)
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
    const { card, 
      canMoveLeft, 
      canMoveRight, 
      onMoveLeft, 
      onMoveRight, 
      onDelete
    } = this.props
    const {showInput, newName} = this.state
    return (
      <div className="card-container">
        <div className="card">
          {canMoveLeft && <button onClick={onMoveLeft}>{'<'}</button>}
            {showInput ?
            <form onSubmit={this.handleSubmit} ref={node => {this.node = node}}>
              <input 
                type="text"
                name="newName"
                value={newName}
                placeholder={card.name}
                onChange={this.handleChange}
              />
            </form>
            : <span onClick={this.toggleInput}>{card.name}</span>
            }
          {canMoveRight && <button onClick={onMoveRight}>{'>'}</button>}
        </div>
        <div>
          {showInput ? null : <button onClick={onDelete}>delete card</button>}
        </div>
      </div>
  )}
}

export default Card;
