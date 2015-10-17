var React = require('react');
var CalTable = require('./cal_table');
var CalHeader = require('./cal_head');
var Calendar  = require('./calendar');

React.render(
    <Calendar year={2015} month={1}/>,
    document.getElementById('tb-container')
);
