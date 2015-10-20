var Dispatcher        = require("./Dispatcher");
var ScheduleConstants = require("./ScheduleConstants");

var ScheduleActions = {
  orderCalendar : function ( room_id, year, month, day, filter ) {
    Dispatcher.dispatch({
      actionType : ScheduleConstants.ORDER_CALENDAR,
      data       : { room_id : room_id,
                     date : {
                       year  : year,
                       month : month,
                       day   : day
                     },
                     filter : filter 
      }
    });
  },
  changeFilter : function ( room_id, filter ) {
    Dispatcher.dispatch({
      actionType : ScheduleConstants.FILTER,
      data       : { room_id : room_id, filter : filter }
    });
  },
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
