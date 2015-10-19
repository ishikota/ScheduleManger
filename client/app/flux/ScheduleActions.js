var Dispatcher        = require("./Dispatcher");
var ScheduleConstants = require("./ScheduleConstants");

var ScheduleActions = {
  fetchDateInfo : function ( room_id, date, filter ) {
    Dispatcher.dispatch({
      actionType : ScheduleConstants.FETCH_DATE,
      data       : { room_id : room_id, date : date, filter : filter }
    });
  },
  fetchMonthInfo : function ( room_id, month, filter ) {
    Dispatcher.dispatch({
      actionType : ScheduleConstants.FETCH_MONTH,
      data       : { room_id : room_id, month : month, filter : filter }
    });
  },
  update : function ( room_id, person_id, date, data ) {
    Dispatcher.dispatch({
      actionType : ScheduleConstants.UPDATE,
      data       : {
        room_id   : room_id,
        person_id : person_id,
        date      : date,
        data      : data 
      }
    });
  }
}

module.exports = ScheduleActions;
