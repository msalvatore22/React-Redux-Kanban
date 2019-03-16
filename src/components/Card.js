import React, { Component } from 'react';
import EditCardForm from './EditCardForm'

class Card extends Component {
  constructor(props){
    super(props)

    this.state = {
      showInput: false
    }
  }

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
      onDelete,
      onEditCard
    } = this.props
    const {showInput} = this.state
    return (
      <div>
      <div className="delete-btn-container">
        {showInput ? <button className="delete-card-btn" disabled={true}>x</button> : <button className="delete-card-btn" onClick={onDelete}>x</button>}
      </div>
        <div className="card">
          {showInput ? canMoveLeft && <button disabled={true}>{'<'}</button> : canMoveLeft && <button onClick={onMoveLeft}>{'<'}</button>}
            {showInput ?
            <div ref={node => {this.node = node}}>
              <EditCardForm card={card} toggleInput={this.toggleInput} onEditCard={name => onEditCard(name)}/>
            </div>
            : <p onClick={this.toggleInput}>{card.name}</p>
            }
          {showInput ? canMoveRight && <button disabled={true}>{'>'}</button> : canMoveRight && <button onClick={onMoveRight}>{'>'}</button>}
        </div>
       </div>
  )}
}

export default Card;
