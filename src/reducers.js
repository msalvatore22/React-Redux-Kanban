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
  }
  return state
}