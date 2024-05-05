import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import PostContextProvider from './Context/PostContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <PostContextProvider>
    <App />
  </PostContextProvider>
);

