import { combineReducers } from 'redux';
import ColumnsReducer from './columnsReducer';

const rootReducer = combineReducers({
  columns: ColumnsReducer
})

export default rootReducer;