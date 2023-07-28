import React from 'react';
import ReactDOM from 'react-dom';
import FloatingButton from './FloatingButton';

ReactDOM.render(
  <React.StrictMode>
    <FloatingButton />
  </React.StrictMode>,
  document.getElementById('floating-button-root') // Cambiar el ID del elemento donde se renderiza el componente
);
