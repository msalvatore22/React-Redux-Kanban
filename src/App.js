import React, { Component } from 'react';
import { connect } from 'react-redux'
import { ADD_CARD, MOVE_CARD, LOAD} from './actions'
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
    this.setState(prevState => {
      const { columns } = prevState
      columns[columnIndex].cards.push(card)
      return { columns }
    })
  }
  
  handleMove = (columnIndex, cardIndex, direction) => {
    this.setState(prevState => {
      const { columns } = prevState
      const [card] = columns[columnIndex].cards.splice(cardIndex, 1)
      columns[columnIndex + direction].cards.push(card)
      return { columns }
    })
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
          onMoveLeft={cardIndex => this.handleMove(columnIndex, cardIndex, DIRECTION_LEFT)}
          onMoveRight={cardIndex => this.handleMove(columnIndex, cardIndex, DIRECTION_RIGHT)}
          onAddCard={() => this.handleAdd(columnIndex)}
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
  add_card: (columnIndex) => dispatch({type: ADD_CARD, columnIndex}),
  move_card: (columnIndex, cardIndex, direction) => dispatch({type: MOVE_CARD, columnIndex, cardIndex, direction}),
  load: () => dispatch({type: LOAD})
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
