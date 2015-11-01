var React = require('react');
var TEXT  = require('../text_content');
var ScheduleStore = require('../flux/ScheduleStore');

var MainHeadBtn = React.createClass({
  propTypes: {
    data : React.PropTypes.object.isRequired
  },
  render : function () { 
    var clazz = "btn btn-primary";
    var txt = this.props.data.owner_id === "-1" ?
        TEXT.MAIN_HEADER_MY_CALENDAR:
        TEXT.MAIN_HEADER_EVENT_CALENDAR;
    return (
      <btn className={clazz} onClick={this.handleClick}>{txt}</btn>
    );
  },
  handleClick : function (ev) {
    var next_id = this.props.data.owner_id == "-1" ? "0" : "-1";
    ScheduleStore.switchCalendar(next_id);
  }
});

module.exports = MainHeadBtn;
