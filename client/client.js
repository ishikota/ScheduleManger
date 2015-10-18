var React         = require('react');
var Calendar      = require('./app/components/calendar');
var SchedulePanel = require('./app/components/schedule_panel');

window.React = React;

React.render(
    //<Calendar year={2015} month={1}/>,
    <SchedulePanel />,
    document.getElementById('tb-container')
);
