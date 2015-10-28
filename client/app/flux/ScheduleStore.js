var _ = require('underscore');
var events = require("events");
var CHANGE_EVENT = "changeEvent";
var FakeData = require("../fake_data");
var MemDB = require("../mem_db");

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
    account  : {
      id : -1,
      name : null
    },
    calendar : { 
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

ScheduleStore.prototype.switchCalendar = function ( id ) {
  var new_schedule;
  switch ( id ) {
    case -1 : new_schedule = FakeData.getEventData(); break;
    default : new_schedule = MemDB.find("0").member[id].schedule;
  }
  this.event_data.calendar.schedule = new_schedule;
  this.emitChange();
}

ScheduleStore.prototype.changeCalendar = function ( data ) {
  console.log("chca "+JSON.stringify(data));
  _.extend(this.event_data.calendar, data);
  console.log("data: "+JSON.stringify(this.event_data));
  this.emitChange();
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



// API methods
ScheduleStore.prototype.receiveCalendarData = function(callback) {
  var cal  = this.event_data.calendar,
      data = {
        date : { year : cal.year, month : cal.month },
        schedule : this.event_data.calendar.schedule,
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

// business logic method

ScheduleStore.prototype.calcStatus = function ( room_id ) {
  /* TODO : calculate room schedule status */
  throw { message : "do not use this method yet", name : "UnImplementedError" }
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
