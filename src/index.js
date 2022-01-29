import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// UI Libraries
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min'

// Styles
import './styles/custom.css'
import './styles/feed.css'
import './styles/profile.css'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('my-app')
);