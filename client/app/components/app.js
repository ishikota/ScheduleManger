var React             = require("react");
var MainHeader        = require("./main_header");
var Calendar          = require("./calendar");
var SchedulePanel     = require("./schedule_panel");
var ScheduleStore      = require("../flux/ScheduleStore");
var Dispatcher        = require("../flux/Dispatcher");
var ScheduleConstants = require("../flux/ScheduleConstants");

Dispatcher.register( function ( payload ) {
  switch ( payload.actionType ) {
    case ScheduleConstants.FETCH_DATE:
      ScheduleStore.fetchDateInfo(payload.data);
      break;
    case ScheduleConstants.FETCH_MONTH:
      ScheduleStore.fetchMonthInfo(payload.data);
      break;
    case ScheduleConstants.UPDATE:
      SchduleStore.updateSchedule(payload.data);
      break;
  }
});

var App = React.createClass({
  handleChange : function () {
    ScheduleStore.getCalendarInfo();
    ScheduleStore.getPanelInfo();
  },
  componentDidMount : function () {
    ScheduleStore.addChangeListener(this.handleChange);
  },
  componentWillUnmount : function () {
    ScheduleStore.removeChangeListener(this.handleChange);
  },
  render : function () {
    return (
      <div className='app'>
        <MainHeader/>
        <div className="main-content container">
          <div className="col-xs-12 col-sm-7">
            <Calendar/>
          </div>
          <div className="col-xs-12 col-sm-5">
            <SchedulePanel/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = App;
