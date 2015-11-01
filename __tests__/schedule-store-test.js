jest.dontMock('../client/app/flux/ScheduleStore')
jest.dontMock('../client/app/fake_data');

describe( 'ScheduleStore', function () {
  var React     = require('react/addons');
  var TestUtils = React.addons.TestUtils;
  var ScheduleStore = require('../client/app/flux/ScheduleStore');
  var FakeData  = require('../client/app/fake_data');
  var _ = require('underscore');
  var MemDB = require('../client/app/mem_db');

  var calendar = { owner_id:"-1", year:2015, month:9, day:31, filter:0, schedule:[1,0,0,1,1] };
  var answer =
        [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0],
        [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];

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
        { owner_id:"-1", year:2015, month:9, day:7, filter:0, schedule:[1,0,0,1,1] }
      );
      // change multiple property
      ScheduleStore.changeCalendar( { year:1192, month:7, schedule:[1,2,3] } );
      expect(ScheduleStore.event_data.calendar).toEqual(
        { owner_id:"-1", year:1192, month:7, day:7, filter:0, schedule:[1,2,3] }
      );
      // change filter
      ScheduleStore.changeCalendar( { filter : 2 } );
      expect(ScheduleStore.event_data.calendar).toEqual(
        { owner_id:"-1", year:1192, month:7, day:7, filter:2, schedule:[1,2,3] }
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
            owner_id : cal.owner_id,
            date     : { year : 2015 , month : 9},
            schedule : [1,0,0,1,1]
          };
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
    var before_cal, before_acc, mockFunc;
    beforeEach( function () {
      before_cal = JSON.parse(JSON.stringify(ScheduleStore.event_data.calendar));
      before_acc = JSON.parse(JSON.stringify(ScheduleStore.event_data.account));
      mockFunc = jest.genMockFunction();
      ScheduleStore.event_data.calendar = calendar;
      ScheduleStore.event_data.id = "abcdefgh";
      ScheduleStore.event_data.account = { id:"1", name:"Kota" };
    });

    afterEach( function () {
      ScheduleStore.event_data.calendar = before_cal;
      ScheduleStore.event_data.account  = before_acc;
    });

    it ( 'should switch calendar to event', function () {
      var data = FakeData.getFakeEventData();
      var ans  = JSON.parse(JSON.stringify(answer));
      ans[9][6] = 0;
      data.member[0].schedule[9][6] = 0;
      spyOn(MemDB, "readEvent").andReturn(data);
      ScheduleStore.switchCalendar("-1");
      ScheduleStore.receiveCalendarData(mockFunc);
      expect(mockFunc).toBeCalledWith({
        owner_id : "-1",
        date     : { year : 2015, month : 9 },
        schedule : ans
      });
    });

    it ( 'should switch calendar to mine', function () {
      var dummyObj = { member:{"1":{schedule:[1]},"2":{schedule:[2]} } };
      spyOn(MemDB, "readEvent").andReturn(dummyObj);
      ScheduleStore.switchCalendar("0");
      ScheduleStore.receiveCalendarData(mockFunc);
      expect(mockFunc).toBeCalledWith({
        owner_id : "1",
        date     : { year : 2015, month : 9 },
        schedule : [1]
      });
    });

    it ( 'should switch calendar to his', function () {
      var dummyObj = { member:{"1":{schedule:[1]},"2":{schedule:[2]} } };
      spyOn(MemDB, "readEvent").andReturn(dummyObj);
      ScheduleStore.switchCalendar("2");
      expect(ScheduleStore.event_data.calendar).toEqual(
        {
          owner_id : "2",
          year     : calendar.year,
          month    : calendar.month,
          day      : calendar.day,
          filter   : calendar.filter,
          schedule : [2]
        }
      );
    });
  });

  describe( 'login', function () {
    it ( 'should set accout id and name', function () {
      var before = JSON.parse(JSON.stringify(ScheduleStore.event_data.account));
      ScheduleStore.login("0", "Kota");
      expect(ScheduleStore.event_data.account.id).toEqual("0");
      expect(ScheduleStore.event_data.account.name).toEqual("Kota");
      ScheduleStore.event_data.account = before;
    });
  });

  describe( 'calcEventSchedule', function () {
    it ( 'should calc event schedule', function () {
      var
        eid = "abcdefgh",
        fake_event = {
          id     : eid,
          leader : "Anyone",
          member : FakeData.getFakeEventData().member
        };
      spyOn(MemDB, "readEvent").andReturn(fake_event);
      expect(ScheduleStore.calcEventSchedule(eid, 0)).toEqual(answer);
    });
  });

  describe( 'updateEvent', function () {
    it ( 'should set new event_id and switch calendar', function () {
      var
        mockFunc = jest.genMockFunction(),
        eid = "abcdefgh";
      ScheduleStore.switchCalendar = mockFunc;
      ScheduleStore.updateEvent(eid);
      expect(ScheduleStore.event_data.id).toEqual(eid);
      expect(mockFunc).toBeCalledWith("-1");
    });
  });

  describe( 'receiveEventData', function () {
    it ( 'should pass memdb event data to callback', function () {
      var
        before = ScheduleStore.event_data.id,
        mockFunc = jest.genMockFunction();
      ScheduleStore.event_data.id = "0";
      ScheduleStore.receiveEventData(mockFunc);
      expect(mockFunc).toBeCalled();
      expect(MemDB.readEvent.mock.calls[0][0]).toEqual("0");
    });
  });

});
