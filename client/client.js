var React = require('react');
var ReactDOM = require('react-dom');
var App   = require('./app/components/app');

//alow react dev tols work
window.React = React;

ReactDOM.render(
    <App/>,
    document.getElementById('container')
);
