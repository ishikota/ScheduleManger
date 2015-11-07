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
  updateEvent    : function ( event_id ) {
    Dispatcher.dispatch({
      actionType : ScheduleConstants.UPDATE_EVENT,
      data       : event_id
    });
  },
  switchCalendar : function ( id ) {
    Dispatcher.dispatch({
      actionType : ScheduleConstants.EDIT_CALENDAR,
      data       : id
    });
  },
  registerAccount : function ( event_id, user_name, callback ) {
    Dispatcher.dispatch({
      actionType : ScheduleConstants.REGISTER_ACCOUNT,
      data       : {
        event_id  : event_id,
        user_name : user_name,
        callback  : callback
      }
    });
  },
  loginAccount : function ( event_id, user_name, callback ) {
    Dispatcher.dispatch({
      actionType : ScheduleConstants.LOGIN_ACCOUNT,
      data       : {
        event_id  : event_id,
        user_name : user_name,
        callback  : callback
      }
    });
  },
  createEvent : function( leader_name, leader_schedule, callback ) {
    Dispatcher.dispatch({
      actionType : ScheduleConstants.CREATE_EVENT,
      data       : {
        leader_name     : leader_name,
        leader_schedule : leader_schedule,
        callback        : callback
      }
    });
  }
}

module.exports = ScheduleActions;
