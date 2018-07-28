import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import configureStore from './common/functions/configureStore';

import './common/globals';

import './styles/index.sass';
import './styles/css/font-awesome.css';

import favicon from '../icons/crypto_signer.png';

const dev = process.env.NODE_ENV === 'development';

const preloadState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const store = configureStore(preloadState);

if(window) {
    const link = document.createElement('link');
    link.setAttribute('rel', "shortcut icon");
    link.setAttribute('href', favicon);
    link.setAttribute('type', "image/png");
    document.head.appendChild(link);
}

ReactDOM.hydrate (
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
    document.getElementById('app')
);