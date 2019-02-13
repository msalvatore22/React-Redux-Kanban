import React, { Component } from 'react';
import { connect } from 'react-redux'
import { ADD_CARD, MOVE_CARD, LOAD, DELETE_CARD, ADD_COLUMN, EDIT_CARD, REMOVE_COLUMN, EDIT_COLUMN} from '../actions'
import Column from './Column'
import Header from './Header'
import '../App.css';

const DIRECTION_LEFT = -1
const DIRECTION_RIGHT = 1

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      newName: "",
      showInput: false
    }
  }

  componentDidMount = () => this.props.load()

  handleChange = ({target: {name, value}}) => this.setState({ [name]: value })

  handleSubmit = (e) => {
    e.preventDefault()
    let { newName } = this.state
    if(newName.length === 0) return
    const name = newName
    this.handleAddColumn(name)
    this.clearInput()
    this.toggleInput()
  }

  clearInput = () => this.setState({newName: ''})

  handleAdd = (columnIndex, name) => {
    this.props.addCard(columnIndex, name)
  }

  handleAddColumn = (name) => {
    const column = { name, cards: [] }
    this.props.addColumn(column)
  }

  toggleInput = () => {
    this.setState(prevState => ({
      showInput: !prevState.showInput})
    )
  }

  render() {
    const { newName, showInput } = this.state
    if(!this.props.columns) return null
    return (
      <div>
        <Header />
        <div className="App">
          {this.props.columns.map((column, columnIndex) => (
            <Column
              length={this.props.columns.length} 
              column={column} 
              columnIndex={columnIndex} 
              key={columnIndex}
              onMoveLeft={cardIndex => this.props.moveCard(columnIndex, cardIndex, DIRECTION_LEFT)}
              onMoveRight={cardIndex => this.props.moveCard(columnIndex, cardIndex, DIRECTION_RIGHT)}
              onAddCard={(name) => this.handleAdd(columnIndex, name)}
              onDelete={cardIndex => this.props.deleteCard(cardIndex,columnIndex)}
              onEditCard={(cardIndex, name) => this.props.editCard(cardIndex, columnIndex, name)}
              onRemove={() => this.props.removeColumn(columnIndex)}
              onEditColumn={(name) => this.props.editColumn(columnIndex, name)}
            />
          ))}
          {showInput ?
          <form className="add-column-form" onSubmit={this.handleSubmit}>
            <input 
              type="text"
              name="newName"
              value={newName}
              placeholder="Enter Column Title"
              onChange={this.handleChange}
            />
            <button className="submit-btn form-btn" type="submit">submit</button>
            <button className="cancel-btn form-btn" onClick={this.toggleInput}>cancel</button>
          </form>
          : <button className="add-column-btn" onClick={this.toggleInput}>add column</button>
          }
        </div>
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
