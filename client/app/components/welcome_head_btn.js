var React = require('react');
var TEXT = require('../text_content');
var ScheduleStore = require('../flux/ScheduleStore');

var WelcomeHeadBtn = React.createClass({
  propTypes : {
    data : React.PropTypes.object.isRequired
  },
  render : function () { 
    return (
      <btn className={this.getClass(this.props.data.numer)} onClick={this.handleClick}>
        {TEXT.WELCOME_HEADER_BUTTON}
      </btn>
    );
  },
  getClass : function ( input_num ) {
    var clazz = "btn btn-primary";
    if ( input_num === 0 ) { clazz += " disabled" }
    return clazz;
  },
  handleClick : function () {
    console.log(ScheduleStore.event_data.calendar.schedule);
    $('#modal').modal();
  }
});

module.exports = WelcomeHeadBtn;
