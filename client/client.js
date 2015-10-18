var React = require('react');
var Calendar  = require('./app/components/calendar');

React.render(
    <Calendar year={2015} month={1}/>,
    document.getElementById('tb-container')
);
