import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';

import './data/firebase'
import 'bootswatch/dist/darkly/bootstrap.min.css'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
