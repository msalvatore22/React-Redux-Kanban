import { combineReducers } from 'redux';
import ColumnsReducer from './columnsReducer';
import undoable from 'redux-undo'

const rootReducer = combineReducers({
  columns: undoable(ColumnsReducer)
})

export default rootReducer;