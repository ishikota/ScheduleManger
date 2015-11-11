jest.dontMock('../client/app/mem_db')
jest.dontMock('../client/app/fake_data');

describe( 'MemDb', function () {
  var _        = require('underscore');
  var MemDB    = require('../client/app/mem_db');
  var FakeData = require('../client/app/fake_data');
  var ScheduleActions = require('../client/app/flux/ScheduleActions');

  var before;
  beforeEach( function () {
    before = JSON.parse(JSON.stringify(MemDB.data));
  });

  afterEach( function () {
    MemDB.data = before;
  });

  describe( 'genEventID', function () {
    it ( 'should generate 24 char ID with alphabet[a-z]', function () {
      expect(MemDB.genId(24).length).toBe(24);
    });
  });

  describe ( 'Create and find event', function () {
    it ( 'should create event in memDB', function () {
      var id,
        dummyid  = "abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWX",
        expected = {
          id     : dummyid,
          leader : null,
          member : {}
        };
      spyOn(MemDB, "genId").andReturn(dummyid);
      id = MemDB.createEvent();
      expect(id).toEqual(dummyid);
      expect(MemDB.readEvent(id)).toEqual(expected);
    });
  });

  describe ( 'Create and find user', function () {

    var event_id;
    beforeEach( function () {
      event_id = MemDB.createEvent();
    });

    it ( 'should create user in memDB', function () {
      var
        schedule  = [1,2,3],
        leader_name = "Ishimoto",
        user_name   = "Kota",
        leader_id   = MemDB.createUser(event_id, leader_name, schedule, true),
        user_id     = MemDB.createUser(event_id, user_name, schedule, false);
      expect(MemDB.readUser(event_id, leader_id)).toEqual(
        { id:leader_id, name:leader_name, schedule:schedule,leader:true} );
      expect(MemDB.readUser(event_id, user_id)).toEqual(
        { id:user_id, name:user_name, schedule:schedule,leader:false } );
      expect(MemDB.getLeader(event_id)).toEqual(
        { id:leader_id, name:leader_name, schedule:schedule,leader:true} );
    });

    it ( 'should not create same name user', function () {
      var success_id, error_id,
        name     = "Ishimo",
        schedule = [1,2,3];
      success_id = MemDB.createUser(event_id, name, schedule);
      expect(success_id.length).toBe(8);
      error_id   = MemDB.createUser(event_id, name, schedule);
      expect(error_id).toEqual("-1");
    });
  });

  describe( 'read user by name', function () {
    it ( 'should get Kota data', function () {
      var kota = {
        "name"     : "Kota",
        "leader"   : true,
        "_id"      : "563eba4836b6e8aa5ef8da70",
        "schedule" : []
      };

      MemDB.data["dummy_id"] = {
        member:[
          { "name"     : "mochama",
            "leader"   : false,
            "_id"      : "563eba4836b6e8aa5ef8da70",
            "schedule" : [] },
          kota
        ]
      };
      expect(MemDB.readUserByName("dummy_id", "Kota")).toEqual(kota);
      MemDB.data = {};
    });
  });

  describe ( 'get event data from fake server', function () {

    var eid = "abcdefgh";
    beforeEach(function(done) {
      MemDB.loadEventData(eid);
      setTimeout( function () {
        done();
      }, 1000);
    });

    xit ( 'should fetch event data from server', function (done) {
      var calls,
        expected = FakeData.getFakeEventData();
      expected.id = eid;
      _.extend(expected, { leader : expected.member[0].id });
      calls = ScheduleActions.updateEvent.mock.calls;
      expect(MemDB.readEvent(eid)).toEqual(expected);
      expect(calls[calls.length-1]).toEqual([eid]);
    });
  });

});
