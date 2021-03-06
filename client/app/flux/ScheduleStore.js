var _            = require('underscore');
var MemDB        = require("../mem_db");
var events       = require("events");
var CHANGE_EVENT = "changeEvent";
var FakeData     = require("../fake_data");
var ScheduleCalculator = require('../schedule_calculator');

var ScheduleStore = function() {
  this.emitter = new events.EventEmitter();
  this.room_data = {};
  // make default dev room
  var now = new Date(),
      sched = _.map(_.range(12), function () {
                     return _.map(_.range(32), function () {
                       return 0;
                     })
      });

  this.event_data = {
    id : null,
    account  : {
      id   : null,
      name : null
    },
    calendar : {
      owner_id : null,
      year     : now.getFullYear(),
      month    : now.getMonth(),
      day      : now.getDay(),
      filter   : 0 ,
      schedule : sched
    }
  };
};

// Basic event handling functions

ScheduleStore.prototype.emitChange = function() {
  this.emitter.emit(CHANGE_EVENT);
};

ScheduleStore.prototype.addChangeListener = function(callback) {
    this.emitter.on(CHANGE_EVENT, callback);
};

ScheduleStore.prototype.removeChangeListener = function(callback) {
  this.emitter.removeListener(CHANGE_EVENT, callback);
};

// Schedule-specific methods
// emit change methods

/*
 * -1 and 0 is used as special id.
 *  id = -1   returns Event Calendar
 *  id = 0    returns my Calendar
 *  id = else returns calendar of whose id is passed one
 */
ScheduleStore.prototype.switchCalendar = function ( id ) {
  var new_schedule,
    event_id = this.event_data.id;
  switch ( id ) {
    case "-1":
      var filter   = this.event_data.calendar.filter;
      new_schedule = this.calcEventSchedule(event_id, filter);
      break;
    case "0":
      id = this.event_data.account.id;
      new_schedule = MemDB.readUserByName(
          this.event_data.id, this.event_data.account.name).schedule;
      break;
    default:
      new_schedule = MemDB.readEvent(event_id).member[id].schedule;
  }
  this.event_data.calendar.owner_id = id;
  this.event_data.calendar.schedule = new_schedule;
  console.log("switch cal:"+new_schedule);
  this.emitChange();
}

ScheduleStore.prototype.changeCalendar = function ( data ) {
  console.log("chca "+JSON.stringify(data));
  _.extend(this.event_data.calendar, data);
  console.log("data: "+JSON.stringify(this.event_data));
  this.emitChange();
}

ScheduleStore.prototype.updateEvent = function ( event_id ) {
  this.event_data.id = event_id;
  this.switchCalendar("-1");
}

ScheduleStore.prototype.updateSchedule = function ( data ) {
  console.log("chsc "+JSON.stringify(data));
  // do not update if this calendar is not mine
  if (this.event_data.calendar.owner_id != this.event_data.account.id) return;
  var month = this.event_data.calendar.month;
  this.event_data.calendar.schedule[month][data.day] = data.next_state;
  this.emitChange();
}

ScheduleStore.prototype.createEvent = function ( event, leader, callback) {
  // set leader data as current account
  this.event_data.account.id   = leader._id;
  this.event_data.account.name = leader.name;
  // send callback to ShareModal
  callback({
    status    : true, // TODO : should check error handling
    event_id  : event._id,
    user_id : leader._id
  });
}

ScheduleStore.prototype.registerAccount
        = function ( event_id, user_data, callback ) {
  var user_id,
    empty_schedule = _.map(_.range(12), function () {
      return _.map(_.range(32), function () {
        return 0;
      })
    });
  user_id = MemDB.createUser(
      event_id, user_data.name, user_data.schedule, user_data.leader );
  this.event_data.account.id   = user_data._id;
  this.event_data.account.name = user_data.name;
  callback( { status:true, user_id:user_data._id } );
}

ScheduleStore.prototype.loginAccount
        = function ( event_id, user_name, callback ) {
  var user = MemDB.readUserByName(event_id, user_name);
  if ( !user ) {
    callback( { status : false, user_id : null } );
  } else {
    this.event_data.account.id   = user._id;
    this.event_data.account.name = user.name;
    callback( { status : true, user_id : user._id });
  }
}

// API methods
ScheduleStore.prototype.receiveCalendarData = function(callback) {
  var cal  = this.event_data.calendar,
      data = {
        owner_id : cal.owner_id,
        date     : { year : cal.year, month : cal.month },
        schedule : cal.schedule
      };
  callback(data);
}

ScheduleStore.prototype.receivePanelData = function(callback) {
  var panel_data;
  var data = MemDB.readEvent(this.event_data.id);
  if ( data ) {
    panel_data = ScheduleCalculator.calcEventPanelData(data);
  } else { // before loading event data from server
    panel_data = FakeData.PANEL1();
    panel_data.summary = "loading ...";
    panel_data.data = [];
  }
  callback(panel_data);
}

ScheduleStore.prototype.receiveInputState = function(callback) {
  var info = this.calcEditInfo();
  _.extend(info, {schedule:this.event_data.calendar.schedule});
  _.extend(info, {editing:this.event_data.calendar.owner_id!="-1"});
  callback(info);
}

ScheduleStore.prototype.receiveEventData  = function(callback) {
  if ( this.event_data.id != null ) {
    var data = MemDB.readEvent(this.event_data.id);
    callback(data);
  }
}

// business logic method

ScheduleStore.prototype.calcEventSchedule = function ( event_id, filter ) {
  var id,
    data      = MemDB.readEvent(event_id),
    members   = data.member,
    schedule  = _.map(_.range(12), function () {
      return _.map(_.range(32), function () { return 1; })
    });

  for( id in members ) {
    var member = members[id];
    for ( var m=0; m<schedule.length; m++ ) {
      for ( var d=0; d<schedule[m].length; d++ ) {
        schedule[m][d] &= member.schedule[m][d];
      }
    }
  }
  return schedule;
}

ScheduleStore.prototype.calcSchedule = function ( people_id ) {
  var panel = Math.round(Math.random()) == 1 ? FakeData.PANEL1() : FakeData.PANEL2();
  panel.filter = this.event_data.calendar.filter;
  return panel;
}

ScheduleStore.prototype.calcEditInfo = function() {
  var count = function(schedule) {
    return _.reduce(schedule, function(memo, num) {
      return memo + _.reduce(num, function(memo2, num2) {
        var append = num2 != 0 ? 1 : 0;
        return memo2 + append;
      }, 0);
    }, 0);
  };
  var leader = !this.event_data.id ? false : MemDB.getLeader(this.event_data.id);
  var numer = count(this.event_data.calendar.schedule);
  var denom = leader ? count(leader.schedule) : 1;
  return { numer : numer, denom : denom };
}

// db method ?


// The ScheduleStore is a singleton, so export only the one instance.
module.exports = new ScheduleStore();
