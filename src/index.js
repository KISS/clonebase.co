import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import DataContainer from './data_container';
import store from './store';
import './index.css';


const main = (
  <Provider store={store}>
    <DataContainer />
  </Provider>
);

ReactDOM.render(main, document.getElementById('root'));
