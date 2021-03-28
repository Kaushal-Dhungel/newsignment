import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import thunk from 'redux-thunk';

// Redux part
import { createStore,applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import AuthReducer from './store/reducers/auth';

const store = createStore(AuthReducer,applyMiddleware(thunk));

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>

,document.getElementById('app')
);