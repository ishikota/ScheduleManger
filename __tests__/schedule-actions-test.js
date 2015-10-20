jest.dontMock('../client/app/flux/ScheduleActions')
jest.dontMock('../client/app/flux/ScheduleConstants')

describe( 'flux architecture for schedule data flow', function () {
  var React     = require('react/addons');
  var TestUtils = React.addons.TestUtils;
  var Dispatcher = require('../client/app/flux/Dispatcher');
  var ScheduleActions = require('../client/app/flux/ScheduleActions');
  var ScheduleConstants = require('../client/app/flux/ScheduleConstants');

  describe( 'send collect data to dispatcher', function () {
    var dummyDate = new Date(2015,9,31);

    it ( "should dispatch orderCalendar request", function () {
      ScheduleActions.orderCalendar( 1, 2015, 9, 31, 0 );
      expect(Dispatcher.dispatch).toBeCalledWith({
        actionType : ScheduleConstants.ORDER_CALENDAR,
        data       : 
          { room_id : 1,
            date    : { year  : 2015,
                        month : 9,
                        day   : 31   },
            filter : 0 }
      });
    });

    it ( "should dispatch FetchMonthInfo request", function () {
      ScheduleActions.fetchMonthInfo(0, 11, 1);
      expect(Dispatcher.dispatch).toBeCalledWith({
        actionType : ScheduleConstants.FETCH_MONTH,
        data       : { room_id : 0, month : 11, filter : 1 }
      });
    });

    it ( "should dispatch Update request", function () {
      var fakeData = { fake : "data" };
      ScheduleActions.update( 1, 2, dummyDate, fakeData );
      expect(Dispatcher.dispatch).toBeCalledWith({
        actionType : ScheduleConstants.UPDATE,
        data       : { room_id : 1, person_id : 2, date : dummyDate, data : fakeData }
      });
    });
  });

});


