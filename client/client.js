var React = require('react');
var ReactDOM = require('react-dom');
var App   = require('./app/components/app');
var app_router = require('./app/app_router');

//alow react dev tols work
window.React = React;

ReactDOM.render(
    app_router,
    document.getElementById('container')
);
