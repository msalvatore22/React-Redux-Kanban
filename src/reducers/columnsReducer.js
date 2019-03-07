import * as actions from '../actions'
import deepFreeze from 'deep-freeze'

const initialState = {
  columns: {
    byId: {
      "column1" : {
        id: "column1",
        name: "Todo",
        cards: ["card1"]
      },
      "column2": {
        id: "column2",
        name: "Doing",
        cards: ["card2"]
      },
      "column3": {
        id: "column3",
        name: "Done",
        cards: ['card3']
      }
    },
    allIds: ["column1", "column2", "column3"]
  },
  cards: {
    byId: {
      "card1": {
        id: "card1",
        name: "Task 1"
      },
      "card2": {
        id: "card2",
        name: "Task 2"
      },
      "card3": {
        id: "card3",
        name: "Task 3"
      }
    }
  },
  allIds: ["card1", "card2", 'card3']
};

export default (state = initialState, action) => {
  switch(action.type) {
    case actions.CLEAR:
    return {
      columns: []
    }
    case actions.LOAD:
    return initialState
    case actions.ADD_COLUMN: {
      const { column } = action
      const columns = [...state.columns]
      columns.push(column)
      return {...state, columns}
    }
    case actions.REMOVE_COLUMN: {
      const { columnIndex } = action
      const columns = [...state.columns]
      columns.splice(columnIndex, 1)
      return {...state, columns}
    }
    case actions.EDIT_COLUMN: {
      const { columnIndex, name } = action
      const columns = [...state.columns]
      columns[columnIndex] = {
        ...columns[columnIndex],
        cards: [
          ...columns[columnIndex].cards
        ]
      }
      Object.assign(columns[columnIndex], name)
      return {...state, columns}
    }
    case actions.ADD_CARD: {
      const { columnIndex, card } = action
      const columns = [...state.columns]
      columns[columnIndex] = {
        ...columns[columnIndex],
        cards: [
          ...columns[columnIndex].cards,
          card
        ]
      }
      return { ...state, columns}
    }
    case actions.MOVE_CARD: {
      const { columnIndex, cardIndex, direction } = action
      // clone columns parent array
      const columns = [...state.columns]
      // clone source and destination sub arrarys
      columns[columnIndex] = {
        ...columns[columnIndex],
        cards: [...columns[columnIndex].cards]
      }
      columns[columnIndex + direction] = {
        ...columns[columnIndex + direction],
        cards: [...columns[columnIndex + direction].cards]
      }
      // splice out of the sub array
      const [card] = columns[columnIndex].cards.splice(cardIndex, 1)
      // push into destination sub array
      columns[columnIndex + direction].cards.push(card)
      return { ...state, columns }
    }
    case actions.DELETE_CARD: {
      const { cardIndex, columnIndex } = action
      // clone columns parent array
      const columns = [...state.columns]
      // clone source
      columns[columnIndex] = {
        ...columns[columnIndex],
        cards: [...columns[columnIndex].cards]
      }
      // splice card from column at the index
      columns[columnIndex].cards.splice(cardIndex, 1)
      return {...state, columns}
    }
    case actions.EDIT_CARD: {
      const {cardIndex, columnIndex, name} = action
      const columns = [...state.columns]
      columns[columnIndex] = {
        ...columns[columnIndex],
        cards: [...columns[columnIndex].cards]
      }
      columns[columnIndex].cards.splice(cardIndex, 1)
      columns[columnIndex].cards.splice(cardIndex, 0, name)
      return {...state, columns}
    }
    default:
      return state
  }
}

