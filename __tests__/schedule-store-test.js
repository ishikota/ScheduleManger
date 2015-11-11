jest.dontMock('../client/app/flux/ScheduleStore')
jest.dontMock('../client/app/fake_data');

describe( 'ScheduleStore', function () {
  var _ = require('underscore');
  var React     = require('react/addons');
  var TestUtils = React.addons.TestUtils;
  var MemDB     = require('../client/app/mem_db');
  var FakeData  = require('../client/app/fake_data');
  var ScheduleStore = require('../client/app/flux/ScheduleStore');
  var ScheduleCalculator = require('../client/app/schedule_calculator');

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

  var getEmptySchedule = function () {
    return _.map(_.range(12), function () {
      return _.map(_.range(32), function () {
        return 0;
      })
    });
  };

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
    var before_cal, before_acc,
        dummy_cal = _.extend( { owner_id:"abc", month:9 }, FakeData.getEventData());
    beforeEach( function () {
      before_cal = JSON.parse(JSON.stringify(ScheduleStore.event_data.calendar));
      before_acc = JSON.parse(JSON.stringify(ScheduleStore.event_data.account));
      ScheduleStore.event_data.calendar = JSON.parse(JSON.stringify(dummy_cal));
    });
    afterEach( function () {
      ScheduleStore.event_data.calendar = before_cal;
      ScheduleStore.event_data.account = before_acc;
    });

    it ( 'should update schedule', function () {
      ScheduleStore.event_data.account.id = "abc";
      expect(ScheduleStore.event_data.calendar.schedule[9][3]).toBe(0);
      ScheduleStore.updateSchedule( { day:3, next_state:1 } );
      expect(ScheduleStore.event_data.calendar.schedule[9][3]).toBe(1);
    });

    it ( "should not update other's calendar", function () {
      ScheduleStore.event_data.account.id = "def";
      expect(ScheduleStore.event_data.calendar.schedule[9][3]).toBe(0);
      ScheduleStore.updateSchedule( { day:3, next_state:1 } );
      expect(ScheduleStore.event_data.calendar.schedule[9][3]).toBe(0);
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
    });

    it ( 'should receive panel data', function () {
      var callback = jest.genMockFunction();
      var before = ScheduleStore.event_data.id;
      ScheduleStore.event_data.id = "abc";
      spyOn(MemDB, "readEvent").andReturn(FakeData.getDummyEventData());
      spyOn(ScheduleCalculator, "calcEventPanelData");
      ScheduleStore.receivePanelData(callback);
      expect(MemDB.readEvent).toHaveBeenCalledWith("abc");
      expect(ScheduleCalculator.calcEventPanelData).toHaveBeenCalledWith(FakeData.getDummyEventData());
      expect(callback).toBeCalled();
      ScheduleStore.event_data.id = before;
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
      expect(mockFunc).lastCalledWith(
        {schedule:expected,numer:2,denom:1,editing:false}
        );
    });
  });

  describe( 'createEvent', function () {
    it ( 'should save event in MemDB and set account info', function () {
      var
        event = { _id:"abc", member:[] },
        user  = { _id:"def", name:"Kota", schedule:[] },
        mockFunc = jest.genMockFunction();
      ScheduleStore.createEvent(event, user, mockFunc);
      expect(mockFunc).toBeCalledWith({
        status:true,
        event_id:event._id,
        user_id:user._id
      });
      expect(ScheduleStore.event_data.account.id).toEqual("def");
      expect(ScheduleStore.event_data.account.name).toEqual("Kota");
    });
  });

  describe( 'registerAccount', function () {
    it ( 'should insert account data into memDB and set account', function () {
      var
        eid = "abc",
        user_data = { _id:"def", name:"Kota", schedule:[1], leader:false },
        callback = jest.genMockFunction(),
        schedule = getEmptySchedule();

      spyOn(MemDB, "createUser").andReturn("def")
      ScheduleStore.registerAccount(eid, user_data, callback);
      expect(ScheduleStore.event_data.account.id).toEqual(user_data._id);
      expect(ScheduleStore.event_data.account.name).toEqual(user_data.name);
      expect(MemDB.createUser)
              .toHaveBeenCalledWith( eid, user_data.name, user_data.schedule, user_data.leader);
      expect(callback).toBeCalledWith({ status:true, user_id:user_data._id } );
      // reset ScheduleStore.account
      ScheduleStore.event_data.account.id = null;
      ScheduleStore.event_data.account.name = null;
    });
  });

  describe( 'loginAccount', function () {
    it ('should read account data from memDB and set account', function () {
      var
        eid = "abc",
        name = "kota",
        callback = jest.genMockFunction(),
        schedule = getEmptySchedule();
      spyOn(MemDB, "readUserByName").andReturn(
        {_id:"def", name:"kota", schedule:schedule, leader:false}
      );
      ScheduleStore.loginAccount(eid, name, callback);
      expect(MemDB.readUserByName).toHaveBeenCalledWith(eid, name);
      expect(callback).toBeCalledWith({status:true, user_id:"def"});
      expect(ScheduleStore.event_data.account.id).toEqual("def");
      expect(ScheduleStore.event_data.account.name).toEqual(name);
    });
  });

  describe( 'switchCalendar', function () {
    var before_cal, before_acc, mockFunc;
    beforeEach( function () {
      before_cal = JSON.parse(JSON.stringify(ScheduleStore.event_data.calendar));
      before_acc = JSON.parse(JSON.stringify(ScheduleStore.event_data.account));
      mockFunc = jest.genMockFunction();
      ScheduleStore.event_data.calendar = JSON.parse(JSON.stringify(calendar));
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
      data.member["1"].schedule[9][6] = 0;
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
      var dummyObj = { id:"1",name:"Kota",schedule:[1],leader:true };
      spyOn(MemDB, "readUserByName").andReturn(dummyObj);
      ScheduleStore.switchCalendar("0");
      expect(MemDB.readUserByName).toHaveBeenCalledWith("abcdefgh", "Kota");
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

  describe(' use calendar', function () {
    var before;
    beforeEach(function() {
      before = JSON.parse(JSON.stringify(ScheduleStore.event_data));
      ScheduleStore.event_data.calendar.schedule = getEmptySchedule();
    });
    afterEach(function() {
      ScheduleStore.event_data = before;
    });
    it ( 'should calculate edit info', function () {
      var leader = FakeData.getDummyEventData().member[0];
      spyOn(MemDB, "getLeader").andReturn(leader);
      expect(ScheduleStore.calcEditInfo()).toEqual({numer:0,denom:6});
      ScheduleStore.event_data.calendar.schedule[9][6] = 1;
      expect(ScheduleStore.calcEditInfo()).toEqual({numer:1,denom:6});
    });
  });

});
