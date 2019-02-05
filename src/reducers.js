import * as actions from './actions'

export default (state = {}, action) => {
  switch(action.type) {
    case actions.LOAD:
    return {
      columns: [
        {
          name: 'Need To Do',
          cards: [
            {name: 'Card A'}
          ]
        },
        {
          name: 'Doing',
          cards: [
            {name: 'Card B'}
          ]
        },
        {
          name: 'Done',
          cards: [
            {name: 'Card C'}
          ]
        }
      ]
    };
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
        ...columns[columnIndex],
        cards: [...columns[columnIndex + direction].cards]
      }
      // splice out of the sub array
      const [card] = columns[columnIndex].cards.splice(cardIndex, 1)
      // push into destination sub array
      columns[columnIndex + direction].cards.push(card)
      return { ...state, columns }
    }
  }
  return state
}