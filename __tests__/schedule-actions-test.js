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
      ScheduleActions.updateCalendar( { year:2015, month:9, day:31, filter:0 } );
      expect(Dispatcher.dispatch).toBeCalledWith({
        actionType : ScheduleConstants.UPDATE_CALENDAR,
        data       : { year:2015, month:9, day:31, filter:0 }
      });
    });

    it ( 'should dispatch update schedule request', function () {
      ScheduleActions.updateSchedule( { day:2, next_state:1 } );
      expect(Dispatcher.dispatch).toBeCalledWith({
        actionType : ScheduleConstants.UPDATE_SCHEDULE,
        data       : { day:2, next_state:1 }
      });
    });

    it ( 'should dispatch update event request', function () {
      var event_id = "abcdefgh";
      ScheduleActions.updateEvent(event_id);
      expect(Dispatcher.dispatch).toBeCalledWith({
        actionType : ScheduleConstants.UPDATE_EVENT,
        data       : event_id
      });
    });

  });

});


