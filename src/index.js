import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Styles
import './styles/custom.css'
import './styles/feed.css'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('my-app')
);