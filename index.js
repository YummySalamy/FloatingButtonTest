import React from 'react';
import ReactDOM from 'react-dom';
import FloatingButton from './FloatingButton';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FloatingButton />
  </React.StrictMode>,
  document.getElementById('floating-button-root') 
);
