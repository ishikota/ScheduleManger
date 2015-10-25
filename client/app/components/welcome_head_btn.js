var React = require('react');
var TEXT = require('../text_content');
var ScheduleStore = require('../flux/ScheduleStore');

var WelcomeHeadBtn = React.createClass({
  render : function () { 
    return (
      <btn className="btn btn-primary" onClick={this.handleClick}>
        {TEXT.WELCOME_HEADER_BUTTON}
      </btn>
    );
  },
  handleClick : function () {
    console.log(ScheduleStore.event_data.calendar.schedule);
  }
});

module.exports = WelcomeHeadBtn;
