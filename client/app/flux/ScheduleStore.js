var _            = require('underscore');
var MemDB        = require("../mem_db");
var events       = require("events");
var CHANGE_EVENT = "changeEvent";
var FakeData     = require("../fake_data");

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
      id = this.event_data.account.id
      new_schedule = MemDB.readEvent(event_id).member[id].schedule;
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
  var month = this.event_data.calendar.month;
  this.event_data.calendar.schedule[month][data.day] = data.next_state;
  this.emitChange();
}

ScheduleStore.prototype.createEvent = function ( id, leader_name, leader_schedule ) {
  var event_data = {
    id : id,
    member : {
      "0" : { id : "0", name:leader_name, schedule:leader_schedule }
    }
  };
  MemDB.insert(0,event_data);
}

ScheduleStore.prototype.login = function ( id, name ) {
  this.event_data.account.id   = id;
  this.event_data.account.name = name;
}

ScheduleStore.prototype.registerAccount
        = function ( event_id, user_name, callback ) {
  var user_id,
    empty_schedule = _.map(_.range(12), function () {
      return _.map(_.range(32), function () {
        return 0;
      })
    });
  user_id = MemDB.createUser(
      event_id, user_name, empty_schedule, false );
  this.event_data.account.id   = user_id;
  this.event_data.account.name = user_name;
  callback( { status:true, user_id:user_id } );
}

ScheduleStore.prototype.loginAccount
        = function ( event_id, user_name, callback ) {
  var user = MemDB.readUserByName(event_id, user_name);
  if ( !user ) {
    callback( { status : false, user_id : null } );
  } else {
    callback( { status : true, user_id : user.id });
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
  callback(this.calcSchedule());
}

ScheduleStore.prototype.receiveInputState = function(callback) {
  var info = this.calcEditInfo();
  _.extend(info, {schedule:this.event_data.calendar.schedule});
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
  var i,
    data      = MemDB.readEvent(event_id),
    members   = data.member,
    schedule  = _.map(_.range(12), function () {
      return _.map(_.range(32), function () { return 1; })
    });

  for( var i=0; i<members.length; i++) {
    var member = members[i];
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
  var month, day, 
      denom = 0, 
      numer = 0,
      sd = this.event_data.calendar.schedule;

  for ( month in sd ) {
    for ( day in sd[month] ) {
      denom += 1;
      if ( sd[month][day] == 1 ) { numer += 1; }
    }
  }

  return { numer : numer, denom : denom };
}

// db method ?


// The ScheduleStore is a singleton, so export only the one instance.
module.exports = new ScheduleStore();
