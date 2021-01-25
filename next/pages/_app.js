import '../styles/globals.css'
import 'antd/dist/antd.css'

const axios = require('axios');

axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.baseURL = 'http://localhost:8000/api';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
