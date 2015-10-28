jest.dontMock('../client/app/flux/ScheduleStore')
jest.dontMock('../client/app/fake_data');

describe( 'ScheduleStore', function () {
  var React     = require('react/addons');
  var TestUtils = React.addons.TestUtils;
  var ScheduleStore = require('../client/app/flux/ScheduleStore');
  var FakeData  = require('../client/app/fake_data');
  var _ = require('underscore');
  var MemDB = require('../client/app/mem_db');

  var calendar = { year:2015, month:9, day:31, filter:0, schedule:[1,0,0,1,1] };

  describe ( 'basic function', function () {
    var before;
    beforeEach( function () {
      before = JSON.parse(JSON.stringify(ScheduleStore.event_data.calendar));
      ScheduleStore.event_data.calendar = JSON.parse(JSON.stringify(calendar));
    });
    afterEach( function () {
      ScheduleStore.event_data.calendar = before;
    });

    it( 'should update calendar state', function () {
      // change only day
      ScheduleStore.changeCalendar( { day : 7 } );
      expect(ScheduleStore.event_data.calendar).toEqual(
        { year:2015, month:9, day:7, filter:0, schedule:[1,0,0,1,1] }
      );
      // change multiple property
      ScheduleStore.changeCalendar( { year:1192, month:7, schedule:[1,2,3] } );
      expect(ScheduleStore.event_data.calendar).toEqual(
        { year:1192, month:7, day:7, filter:0, schedule:[1,2,3] }
      );
      // change filter
      ScheduleStore.changeCalendar( { filter : 2 } );
      expect(ScheduleStore.event_data.calendar).toEqual(
        { year:1192, month:7, day:7, filter:2, schedule:[1,2,3] }
      );
    });

  });

  describe( 'schedule around', function () {
    var before,
        dummy_cal = _.extend( { month:9}, FakeData.getEventData());
    beforeEach( function () {
      before = JSON.parse(JSON.stringify(ScheduleStore.event_data.calendar));
      ScheduleStore.event_data.calendar = JSON.parse(JSON.stringify(dummy_cal));
    });
    afterEach( function () {
      ScheduleStore.event_data.calendar = before;
    });

    it ( 'should update schedule', function () {
      expect(ScheduleStore.event_data.calendar.schedule[9][3]).toBe(0);
      ScheduleStore.updateSchedule( { day:3, next_state:1 } );
      expect(ScheduleStore.event_data.calendar.schedule[9][3]).toBe(1);
    });

    it ( 'should calculate the number of date which activated', function () {
      var res = ScheduleStore.calcEditInfo();
      expect(res.numer).toBe(5);
      expect(res.denom).toBe(32);
    });


  });

  describe( 'emit change when Action received', function () {
    var before, mockFunc;

    beforeEach( function () {
      mockFunc = jest.genMockFunction();
      before = JSON.parse(JSON.stringify(ScheduleStore.event_data.calendar));
      ScheduleStore.event_data.calendar = JSON.parse(JSON.stringify(calendar));
      ScheduleStore.addChangeListener(mockFunc);
    });

    afterEach( function () {
      ScheduleStore.removeChangeListener(mockFunc);
      ScheduleStore.event_data.calendar = before;
    });

    it( "shold call mockFunc as callback", function () {
      ScheduleStore.changeCalendar({filter:0});
      expect(mockFunc).toBeCalled();
    });

    it ( "should provide current store state", function () {
      var cal  = ScheduleStore.event_data.calendar,
          clbk = jest.genMockFunction(),
          expected = { 
            date   : { year : 2015 , month : 9},
            schedule : [1,0,0,1,1]
          };
      spyOn(ScheduleStore, "calcStatus").andReturn(expected.schedule);
      ScheduleStore.receiveCalendarData(clbk);
      expect(clbk).lastCalledWith(expected);
      ScheduleStore.receivePanelData(clbk);
      //expect(clbk).lastCalledWith(FakeData.PANEL1);
    });

  });

  describe( 'use fake calendar', function () {
    var before, mockFunc;

    beforeEach( function () {
      mockFunc = jest.genMockFunction();
      before = JSON.parse(JSON.stringify(ScheduleStore.event_data.calendar));
      ScheduleStore.event_data.calendar = FakeData.getFakeCalendar();
      ScheduleStore.addChangeListener(mockFunc);
    });

    afterEach( function () {
      ScheduleStore.removeChangeListener(mockFunc);
      ScheduleStore.event_data.calendar = before;
    });

    it ( 'should receive current input state and ratio', function () {
      var expected = FakeData.getFakeCalendar().schedule;
      ScheduleStore.receiveInputState(mockFunc);
      expect(mockFunc).lastCalledWith({schedule:expected,numer:2,denom:32});
    });
  });

  describe( 'createEvent', function () {
    it ( 'should save event in MemDB', function () {
      var target,
        schedule = FakeData.getFakeEventData().member[0].schedule,
        expected = { id:"0", member:[{ id:"0",name:"Kota",schedule:schedule}] };
      ScheduleStore.createEvent( "0", "Kota", schedule );
      target = MemDB.insert.mock.calls;
      expect(target[target.length-1][0]).toBe(0);
      expect(target[target.length-1][1]).toEqual(expected);
    });
  });

  describe( 'switchCalendar', function () {
    var before;
    beforeEach( function () {
      before = JSON.parse(JSON.stringify(ScheduleStore.event_data.calendar));
    });

    afterEach( function () {
      ScheduleStore.event_data.calendar = before;
    });

    it ( 'should switch Calendar which id is 0', function () {
      var dummyObj = { member:{"0":{schedule:[0]} } };
      spyOn(MemDB, "find").andReturn(dummyObj);
      ScheduleStore.switchCalendar("0");
      expect(ScheduleStore.event_data.calendar).toEqual(
        {
          year     : before.year,
          month    : before.month,
          day      : before.day,
          filter   : before.filter,
          schedule : [0]
        }
      );
    });

    // TODO:implements logic to calculate event data and replace below schedule
    xit ( 'should switch with event calendar', function () {
      ScheduleStore.switchCalendar("-1");
      expect(ScheduleStore.event_data.calendar).toEqual(
        {
          year     : before.year,
          month    : before.month,
          day      : before.day,
          filter   : before.filter,
          schedule : FakeData.getFakeEventData().member[0].schedule // FIXME
        }
      );
    });
  });

});
