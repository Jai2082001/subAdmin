import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import {Provider} from 'react-redux'
import store from './components/store/index';

ReactDOM.render(
    <CookiesProvider><BrowserRouter><Provider store={store}><App/></Provider></BrowserRouter></CookiesProvider> ,
    document.getElementById('root')
);