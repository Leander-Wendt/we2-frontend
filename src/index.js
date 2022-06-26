import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './react/reducer/RootReducer'
import thunk from 'redux-thunk'
import "./css/bootstrap.min.css"
import { composeWithDevTools } from "redux-devtools-extension"

const initialState = {}
const middlewares = [thunk]

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(...middlewares)
))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
		  <App />
  </Provider>
);
reportWebVitals();
