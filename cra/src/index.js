import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css'
import App from './App';
import Cookies from 'js-cookie'
import reportWebVitals from './reportWebVitals';
import configureStore from './redux/store'
import {Provider} from 'react-redux'
import {setSession} from './redux/action'

window.axios = require('axios');

window.axios.defaults.withCredentials = true;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers.common['Accept'] = 'application/json';
window.axios.defaults.headers.common['Content-Type'] = 'application/json';
window.axios.defaults.baseURL = 'http://localhost:8000/api';

const store     = configureStore()
const session   = Cookies.getJSON(`${process.env.REACT_APP_APP_NAME}_session`)

if(session){
  store.dispatch(setSession(session))
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
