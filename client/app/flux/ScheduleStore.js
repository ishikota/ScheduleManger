var _ = require('underscore');
var events = require("events");
var CHANGE_EVENT = "changeEvent";
var FakeData = require("../fake_data");

var ScheduleStore = function() {
  this.emitter = new events.EventEmitter();
  this.room_data = {};
  // make default dev room
  var now = new Date();
  this.room_data[0] = {
    calendar : { 
                 year   : now.getFullYear(),
                 month  : now.getMonth(),
                 day    : now.getDay(),
                 filter : 0 ,
                 status : [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ] }
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
ScheduleStore.prototype.changeCalendar = function ( data ) {
  console.log("chca "+JSON.stringify(data));
  _.extend(this.room_data[0].calendar, data);
  console.log("data: "+JSON.stringify(this.room_data[0]));
  this.emitChange();
}

// API methods
ScheduleStore.prototype.receiveCalendarData = function(callback) {
  var fake_room = 0;
  var cal = this.room_data[fake_room].calendar,
      st = this.calcStatus(fake_room, cal.year, cal.month, cal.day, cal.filter),
      data = {
        date : { year : cal.year, month : cal.month },
        status : st 
      };
  callback(data);
}

ScheduleStore.prototype.receivePanelData = function(callback) {
  callback(this.calcSchedule());
}

// business logic method
ScheduleStore.prototype.calcStatus = function ( room_id,y,m,d,f ) {
  var i, status = [];
  for( i=0; i<31; i++ ) {
    status.push(Math.round(Math.random()));
  }
  //return status;
  return FakeData.CALENDAR.status;
}

ScheduleStore.prototype.calcSchedule = function ( people_id ) {
  var panel = Math.round(Math.random()) == 1 ? FakeData.PANEL1() : FakeData.PANEL2();
  panel.filter = this.room_data[0].calendar.filter;
  return panel;
}


// The ScheduleStore is a singleton, so export only the one instance.
module.exports = new ScheduleStore();
