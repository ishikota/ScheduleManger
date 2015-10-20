jest.dontMock('../client/app/flux/ScheduleStore')
jest.dontMock('../client/app/fake_data');

describe( 'ScheduleStore', function () {
  var React     = require('react/addons');
  var TestUtils = React.addons.TestUtils;
  var ScheduleStore = require('../client/app/flux/ScheduleStore');
  var FakeData  = require('../client/app/fake_data');

  describe ( 'basic function', function () {
    it( 'should change calendar state', function () {
      ScheduleStore.changeCalendar( 
        { room_id : 0,
          date : {
           year  : 2015,
           month : 7,
           day   : 31
          },
          filter : 1     });
      expect(ScheduleStore.room_data[0].calendar).toEqual(
        {  date : {
             year  : 2015,
             month : 7,
             day   : 31 },
           filter : 1,
           status : FakeData.CALENDAR.status } );
    });

    it( 'should change filter', function () {
      ScheduleStore.changeFilter( { room_id : 0, filter : 2 } );
      expect(ScheduleStore.room_data[0].calendar).toEqual(
        {  date : {
             year  : 2015,
             month : 7,
             day   : 31 },
           filter : 2,
           status : FakeData.CALENDAR.status  });
    });

  });

  describe( 'emit change when Action received', function () {
    var mockFunc;

    beforeEach( function () {
      mockFunc = jest.genMockFunction();
      ScheduleStore.addChangeListener(mockFunc);
    });

    it( "shold call mockFunc as callback", function () {
      ScheduleStore.changeCalendar(FakeData.CALENDAR);
      expect(mockFunc).toBeCalled();
    });

    it( "shold call mockFunc as callback", function () {
      ScheduleStore.changeFilter( { room_id : 0, filter : 0 } );
      expect(mockFunc).toBeCalled();
    });

    it ( "provide current store state", function () {
      var cal  = ScheduleStore.room_data[0].calendar,
          clbk = jest.genMockFunction(),
          expected = { 
            date   : { year : cal.date.year, month : cal.date.month},
            status : cal.status
          };
      ScheduleStore.receiveCalendarData(clbk);
      expect(clbk).lastCalledWith(expected);
      ScheduleStore.receivePanelData(clbk);
      //expect(clbk).lastCalledWith(FakeData.PANEL1);
    });

  });

});
