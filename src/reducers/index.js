import { combineReducers } from 'redux';
import ColumnsReducer from './columnsReducer';
import undoable from 'redux-undo'

const rootReducer = combineReducers({
  columns: ColumnsReducer
})

export default rootReducer;