import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import './common/globals';

import rootReducer from './reducers/rootReducer';
import './styles/index.sass';

import favicon from '../icons/crypto_signer.png';

let store;
const dev = process.env.NODE_ENV === 'development';
if(dev) {
    store = createStore(
        rootReducer,
        composeWithDevTools(
            applyMiddleware(thunk)
        )
    );
} else {
    store = createStore(
        rootReducer,
        applyMiddleware(thunk)
    );
};

const link = document.createElement('link');
link.setAttribute('rel', "shortcut icon");
link.setAttribute('href', favicon);
link.setAttribute('type', "image/png");
document.head.appendChild(link);

ReactDOM.render (
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
    document.getElementById('app')
);
