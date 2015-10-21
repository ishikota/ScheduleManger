jest.dontMock('../client/app/flux/ScheduleStore')
jest.dontMock('../client/app/fake_data');

describe( 'ScheduleStore', function () {
  var React     = require('react/addons');
  var TestUtils = React.addons.TestUtils;
  var ScheduleStore = require('../client/app/flux/ScheduleStore');
  var FakeData  = require('../client/app/fake_data');

  var calendar = { year:2015, month:9, day:31, filter:0, status:[] };

  describe ( 'basic function', function () {
    var before;
    beforeEach( function () {
      before = JSON.parse(JSON.stringify(ScheduleStore.room_data[0].calendar));
      ScheduleStore.room_data[0].calendar = JSON.parse(JSON.stringify(calendar));
    });
    afterEach( function () {
      ScheduleStore.room_data[0].calendar = before;
    });

    it( 'should update calendar state', function () {
      // change only day
      ScheduleStore.changeCalendar( { day : 7 } );
      expect(ScheduleStore.room_data[0].calendar).toEqual(
        { year:2015, month:9, day:7, filter:0, status:[] }
      );
      // change multiple property
      ScheduleStore.changeCalendar( { year:1192, month:7, status:[1,2,3] } );
      expect(ScheduleStore.room_data[0].calendar).toEqual(
        { year:1192, month:7, day:7, filter:0, status:[1,2,3] }
      );
      // change filter
      ScheduleStore.changeCalendar( { filter : 2 } );
      expect(ScheduleStore.room_data[0].calendar).toEqual(
        { year:1192, month:7, day:7, filter:2, status:[1,2,3] }
      );

    });

  });

  describe( 'emit change when Action received', function () {
    var before, mockFunc;

    beforeEach( function () {
      mockFunc = jest.genMockFunction();
      before = JSON.parse(JSON.stringify(ScheduleStore.room_data[0].calendar));
      ScheduleStore.room_data[0].calendar = JSON.parse(JSON.stringify(calendar));
      ScheduleStore.addChangeListener(mockFunc);
    });

    afterEach( function () {
      ScheduleStore.removeChangeListener(mockFunc);
      ScheduleStore.room_data[0].calendar = before;
    });

    it( "shold call mockFunc as callback", function () {
      ScheduleStore.changeCalendar({filter:0});
      expect(mockFunc).toBeCalled();
    });

    it ( "should provide current store state", function () {
      var cal  = ScheduleStore.room_data[0].calendar,
          clbk = jest.genMockFunction(),
          expected = { 
            date   : { year : 2015 , month : 9},
            status : [1,2,3]
          };
      spyOn(ScheduleStore, "calcStatus").andReturn(expected.status);
      ScheduleStore.receiveCalendarData(clbk);
      expect(clbk).lastCalledWith(expected);
      ScheduleStore.receivePanelData(clbk);
      //expect(clbk).lastCalledWith(FakeData.PANEL1);
    });

  });

});
