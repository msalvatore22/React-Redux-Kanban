import { combineReducers } from 'redux';
import ColumnsReducer from './columnsReducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  boards: ColumnsReducer,
  form: formReducer
})

export default rootReducer;