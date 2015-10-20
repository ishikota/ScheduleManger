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
                 date : { year : now.getFullYear() , month : now.getMonth(), day : now.getDay()},
                 filter : 0 ,
                 status: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
    panel    : null
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

// business logic method
ScheduleStore.prototype.calcStatus = function ( room_id,y,m,d,f ) {
  var i, status = [];
  for( i=0; i<31; i++ ) {
    status.push(Math.round(Math.random()));
  }
  //return status;
  return FakeData.CALENDAR.status;
}

// API methods
ScheduleStore.prototype.fetchDateInfo = function(data) {
  console.log("TODO: fire XHR to persist survey, then invoke this.emitChange() after the XHR has completed.");

  this.emitChange();
}

ScheduleStore.prototype.fetchMonthInfo = function(id) {
  console.log("TODO: delete survey", id);

  this.emitChange();
}

ScheduleStore.prototype.updateSchedule = function(results) {
  console.log("TODO: record the survey results", results);

  this.emitChange();
}

ScheduleStore.prototype.changeCalendar = function ( data ) {
  var
    room_id  = data.room_id > 0 ? data.room_id : 0,
    calendar = this.room_data[room_id].calendar,
    y = data.date.year   >  0 ? data.date.year   : calendar.date.year,
    m = data.date.month  >= 0 ? data.date.month  : calendar.date.month,
    d = data.date.day    >  0 ? data.date.day    : calendar.date.day,
    f = data.filter > 0 ? data.filter      : calendar.filter,
    status = this.calcStatus(room_id,y,m,d,f);

  this.room_data[room_id].calendar = 
  {
    date   : { year : y, month : m, day : d },
    filter : f,
    status : status
  };

  this.emitChange();
}

ScheduleStore.prototype.receiveCalendarData = function(callback) {
  var fake_room = 0;
  var cal = this.room_data[fake_room].calendar,
      y  = cal.date.year,
      m  = cal.date.month,
      d  = cal.date.d,
      f  = cal.filter,
      st = this.calcStatus(fake_room,y,m,d,f),
      data = {
        date : { year : y, month : m },
        status : st 
      };
  callback(data);
}

ScheduleStore.prototype.receivePanelData = function(callback) {
  console.log("TODO: fetch panel data");

  callback(FakeData.PANEL);
}

// The ScheduleStore is a singleton, so export only the one instance.
module.exports = new ScheduleStore();
