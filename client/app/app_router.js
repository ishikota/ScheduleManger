var React = require('react');
var Router = require('react-router').Router;
var Route  = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var NotFound = Router.NotFound;
var Main = require('./components/main');
var Welcome = require('./components/welcome');

// Handlers
var App = require('./components/app');

var app_router= (
    <Router>
      <Route path="/" component={App}>
        <IndexRoute component={Welcome}/>
        <Route path="event/:id" component={Main}/>
      </Route>
    </Router>
    );

module.exports = app_router;
