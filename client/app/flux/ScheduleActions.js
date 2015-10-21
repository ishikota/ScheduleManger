var Dispatcher        = require("./Dispatcher");
var ScheduleConstants = require("./ScheduleConstants");

var ScheduleActions = {
  update : function ( data_map ) {
    Dispatcher.dispatch({
      actionType : ScheduleConstants.UPDATE_CALENDAR,
      data       : data_map
    });
  }
}

module.exports = ScheduleActions;
