jest.dontMock('../client/app/flux/ScheduleStore')
jest.dontMock('../client/app/fake_data');

describe( 'ScheduleStore', function () {
  var React     = require('react/addons');
  var TestUtils = React.addons.TestUtils;
  var ScheduleStore = require('../client/app/flux/ScheduleStore');
  var FakeData  = require('../client/app/fake_data');

  var calendar = { year:2015, month:9, day:31, filter:0, status:[] };
  var state = { editing : false };

  describe ( 'basic function', function () {
    var before = {};
    beforeEach( function () {
      before.cal = JSON.parse(JSON.stringify(ScheduleStore.room_data[0].calendar));
      before.st  = JSON.parse(JSON.stringify(ScheduleStore.room_data[0].state));
      ScheduleStore.room_data[0].calendar = JSON.parse(JSON.stringify(calendar));
      ScheduleStore.room_data[0].state    = JSON.parse(JSON.stringify(state));
    });
    afterEach( function () {
      ScheduleStore.room_data[0].calendar = before.cal;
      ScheduleStore.room_data[0].state    = before.st;
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

    describe ('state around', function () {
      it ( 'should update state', function () {
        ScheduleStore.changeState( { editing : true } );
        expect(ScheduleStore.room_data[0].state).toEqual(
          { editing : true }
        );
      });
      it ( 'should receive editInfo', function () {
        spyOn(ScheduleStore, "getFillDate").andReturn(
          { numer : 3, denom : 10 }
        );
        var mockFunc = jest.genMockFunction();
        ScheduleStore.receiveEditInfo(mockFunc);
        expect(mockFunc).toBeCalledWith({ editing : false, numer : 3, denom :10});
        ScheduleStore.changeState( { editing : true } );
        ScheduleStore.receiveEditInfo(mockFunc);
        expect(mockFunc).toBeCalledWith({ editing : true, numer :3, denom : 10});
      });
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

  describe( 'state property spec check', function () {
    var mockFunc, before={};
    beforeEach( function () {
      mockFunc = jest.genMockFunction();
      before.cal = JSON.parse(JSON.stringify(ScheduleStore.room_data[0].calendar));
      before.st  = JSON.parse(JSON.stringify(ScheduleStore.room_data[0].state));
      ScheduleStore.room_data[0].calendar = JSON.parse(JSON.stringify(calendar));
      ScheduleStore.room_data[0].state    = JSON.parse(JSON.stringify(state));
    });
    afterEach( function () {
      ScheduleStore.room_data[0].calendar = before.cal;
      ScheduleStore.room_data[0].state    = before.st;
    });

    it ( 'should get personal status', function () {
      ScheduleStore.changeState( { editing : true } );
      var expected = { 
            date   : { year : 2015 , month : 9},
            status : FakeData.PERSONAL_STATUS()
          };
      ScheduleStore.receiveCalendarData(mockFunc);
      expect(mockFunc).lastCalledWith(expected);
    });

    it ( 'should get whole room status', function () {
      ScheduleStore.changeState( { editing : false } );
      var expected = { 
            date   : { year : 2015 , month : 9},
            status : FakeData.ROOM_STATUS()
          };
      ScheduleStore.receiveCalendarData(mockFunc);
      expect(mockFunc).lastCalledWith(expected);
    });

  });

});
