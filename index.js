const React = require('react');
const ReactDOM = require('react-dom');
const FloatingButton = require('./FloatingButton');

ReactDOM.render(
  React.createElement(React.StrictMode, null, React.createElement(FloatingButton, null)),
  document.getElementById('floating-button-root')
);

