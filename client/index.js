import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers/rootReducer';
import './styles/index.sass';

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

ReactDOM.render (
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
    document.getElementById('app')
);
