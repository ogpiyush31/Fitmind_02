import React from 'react';
import ReactDOM from 'react-dom/client'; // updated import
import App from './App';
import './style.css';


const root = ReactDOM.createRoot(document.getElementById('root')); // createRoot instead of render
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
