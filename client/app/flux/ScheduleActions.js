var Dispatcher        = require("./Dispatcher");
var ScheduleStore     = require('./ScheduleStore');
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
    $.post(
        "http://localhost:3000/events",
        {},
        function (event_data, status, jqXHR) {
          console.log("created event : "+JSON.stringify(event_data));
          $.post(
            "http://localhost:3000/events/"+event_data.obj._id+"/users",
            { name : leader_name,
              leader : true,
              schedule : leader_schedule },
            function( user_data, status, jqXHR ) {
              console.log("created leader : ",user_data.obj._id);
              _createEventHelper(
                status, event_data.obj, user_data.obj, callback
              );
            });
        }
    );
  },
  _createEventHelper : function ( status, event, user, callback ) {
    ScheduleStore.setAccount( user._id, user.name );
    callback({
      status : status,
      event_id : event._id,
      user_id  : user._id
    });
  }
}

module.exports = ScheduleActions;
