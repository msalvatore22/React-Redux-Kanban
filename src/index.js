import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';
import { loadState, saveState } from './localStorage';
import throttle from 'lodash/throttle'


const persistedState = loadState()
const store = createStore(reducers, composeWithDevTools(

))

// store.subscribe(throttle(() => {
//   saveState({
//     columns: store.getState().columns
//   })
// }, 1000));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
