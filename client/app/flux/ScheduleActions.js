var Dispatcher        = require("./Dispatcher");
var ScheduleConstants = require("./ScheduleConstants");

var ScheduleActions = {
  updateCalendar : function ( data_map ) {
    Dispatcher.dispatch({
      actionType : ScheduleConstants.UPDATE_CALENDAR,
      data       : data_map
    });
  },
  updateSchedule : function ( data_map ) {
    Dispatcher.dispatch({
      actionType : ScheduleConstants.UPDATE_SCHEDULE,
      data       : data_map
    });
  },
  switchCalendar : function ( id ) {
    Dispatcher.dispatch({
      actionType : ScheduleConstants.EDIT_CALENDAR,
      data       : id
    });
  }
}

module.exports = ScheduleActions;
