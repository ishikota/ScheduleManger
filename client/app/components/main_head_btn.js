var React = require('react');
var API   = require('../api');
var TEXT  = require('../text_content');
var ScheduleStore = require('../flux/ScheduleStore');

var MainHeadBtn = React.createClass({
  propTypes: {
    data : React.PropTypes.object.isRequired
  },
  render : function () { 
    var clazz = "btn btn-primary";
    var txt = this.props.data.owner_id === "-1" ?
        TEXT.EDIT_MY_SCHEDULE:
        TEXT.FINISH_EDIT;
    return (
      <btn className={clazz} onClick={this.handleClick}>{txt}</btn>
    );
  },
  handleClick : function (ev) {
    var data = this.props.data;
    var next_id = data.owner_id == "-1" ? "0" : "-1";
    if( data.owner_id != "-1" ) {
      API.updateUser(data.event_id, data.owner_id, null, data.schedule,
        function ( data, status ) {
          console.log("Updated user : ", status);
          ScheduleStore.switchCalendar(next_id);
        }
      );
    } else {
      ScheduleStore.switchCalendar(next_id);
    }
  }
});

module.exports = MainHeadBtn;
