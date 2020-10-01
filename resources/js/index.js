import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import Main from './components/Main';//se la Route yo ye

 ReactDOM.render(<Provider store={store}> <Main /> </Provider>, document.getElementById('root'));

