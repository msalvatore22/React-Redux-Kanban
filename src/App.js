import React, { Component } from 'react';
import { connect } from 'react-redux'
import { ADD_CARD, MOVE_CARD, LOAD, DELETE_CARD} from './actions'
import Column from './Column'
import './App.css';

const DIRECTION_LEFT = -1
const DIRECTION_RIGHT = 1

class App extends Component {
  componentDidMount = () => this.props.load()

  handleAdd = columnIndex => {
    const name = window.prompt('Name?')
    if(!name) return
    const card = { name }
    this.props.addCard(columnIndex, card)
  }

  render() {
    if(!this.props.columns) return null
    return (
      <div className="App">
       {this.props.columns.map((column, columnIndex) => (
         <Column 
          column={column} 
          columnIndex={columnIndex} 
          key={columnIndex}
          onMoveLeft={cardIndex => this.props.moveCard(columnIndex, cardIndex, DIRECTION_LEFT)}
          onMoveRight={cardIndex => this.props.moveCard(columnIndex, cardIndex, DIRECTION_RIGHT)}
          onAddCard={() => this.handleAdd(columnIndex)}
          onDelete={cardIndex => this.props.deleteCard(cardIndex,columnIndex)}
         />
       ))}
      </div>
    );
  }
}

const mapStateToProps = ({columns}) => ({
  columns
})

const mapDispatchToProps = (dispatch) => ({
  addCard: (columnIndex, card) => dispatch({type: ADD_CARD, columnIndex, card}),
  moveCard: (columnIndex, cardIndex, direction) => dispatch({type: MOVE_CARD, columnIndex, cardIndex, direction}),
  load: () => dispatch({type: LOAD}),
  deleteCard: (cardIndex, columnIndex) => dispatch({type: DELETE_CARD, cardIndex, columnIndex})
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
