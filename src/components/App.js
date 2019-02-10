import React, { Component } from 'react';
import { connect } from 'react-redux'
import { ADD_CARD, MOVE_CARD, LOAD, DELETE_CARD, ADD_COLUMN, EDIT_CARD, REMOVE_COLUMN, EDIT_COLUMN} from '../actions'
import Column from './Column'
import '../App.css';

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

  handleAddColumn = () => {
    const name = window.prompt('Name?')
    if(!name) return
    const column = { name, cards: [] }
    this.props.addColumn(column)
  }

  render() {
    if(!this.props.columns) return null
    return (
      <div className="App">
        {this.props.columns.map((column, columnIndex) => (
          <Column
            length={this.props.columns.length} 
            column={column} 
            columnIndex={columnIndex} 
            key={columnIndex}
            onMoveLeft={cardIndex => this.props.moveCard(columnIndex, cardIndex, DIRECTION_LEFT)}
            onMoveRight={cardIndex => this.props.moveCard(columnIndex, cardIndex, DIRECTION_RIGHT)}
            onAddCard={() => this.handleAdd(columnIndex)}
            onDelete={cardIndex => this.props.deleteCard(cardIndex,columnIndex)}
            onEditCard={(cardIndex, name) => this.props.editCard(cardIndex, columnIndex, name)}
            onRemove={() => this.props.removeColumn(columnIndex)}
            onEditColumn={(name) => this.props.editColumn(columnIndex, name)}
          />
        ))}
        <button className="add-column-btn" onClick={()=> this.handleAddColumn()}>add column</button>
      </div>
    );
  }
}

function mapStateToProps(state){
  return state.columns
}

const mapDispatchToProps = (dispatch) => ({
  addCard: (columnIndex, card) => dispatch({type: ADD_CARD, columnIndex, card}),
  moveCard: (columnIndex, cardIndex, direction) => dispatch({type: MOVE_CARD, columnIndex, cardIndex, direction}),
  load: () => dispatch({type: LOAD}),
  deleteCard: (cardIndex, columnIndex) => dispatch({type: DELETE_CARD, cardIndex, columnIndex}),
  addColumn: (column) => dispatch({type: ADD_COLUMN, column}),
  editCard: (cardIndex, columnIndex, name) => dispatch({type: EDIT_CARD, cardIndex, columnIndex, name}),
  removeColumn: (columnIndex) => dispatch({type: REMOVE_COLUMN, columnIndex }),
  editColumn: (columnIndex, name) => dispatch({type: EDIT_COLUMN, columnIndex, name})
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
