import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/App';
import todoApp from './reducers';

let fuck = 'all girls';

render(
  <Provider store={createStore(todoApp)}>
    <App />
  </Provider>,
  document.getElementById('root')
);