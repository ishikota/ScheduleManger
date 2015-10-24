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
    state    : {
      editing : false
    },
    account  : {
      id : -1,
      name : null
    },
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

ScheduleStore.prototype.changeState = function ( data ) {
  console.log("chst "+JSON.stringify(data));
  _.extend(this.room_data[0].state, data);
  console.log("data: "+JSON.stringify(this.room_data[0]));
  this.emitChange();
}


// API methods
ScheduleStore.prototype.receiveCalendarData = function(callback) {
  var fake_room = 0,
      id   = this.room_data[fake_room].state.editing ? 1 : 0,
      cal  = this.room_data[fake_room].calendar,
      st   = this.calcStatus(id, cal.year, cal.month, cal.day, cal.filter),
      data = {
        date : { year : cal.year, month : cal.month },
        status : st 
      };
  callback(data);
}

ScheduleStore.prototype.receivePanelData = function(callback) {
  callback(this.calcSchedule());
}

ScheduleStore.prototype.receiveEditInfo = function(callback) {
  callback(this.calcEditInfo());
}

// business logic method

/*
 * room_id is 0           -> get room schedule status
 * room_id is :id (not 0) -> get personal schedule status
 * */
ScheduleStore.prototype.calcStatus = function ( room_id,y,m,d,f ) {
  if ( room_id === 0 ) {
    return FakeData.ROOM_STATUS();
  } else {
    return FakeData.PERSONAL_STATUS();
  }
}

ScheduleStore.prototype.calcSchedule = function ( people_id ) {
  var panel = Math.round(Math.random()) == 1 ? FakeData.PANEL1() : FakeData.PANEL2();
  panel.filter = this.room_data[0].calendar.filter;
  return panel;
}

ScheduleStore.prototype.calcEditInfo = function() {
  var fill_dt = this.getFillDate();
  return {
    editing : this.room_data[0].state.editing,
    numer   : fill_dt.numer,
    denom   : fill_dt.denom
  };
}

ScheduleStore.prototype.getFillDate = function () {
  return { 
    numer : Math.floor(Math.random()*11),
    denom : Math.floor(Math.random()*11+11)
  };
}

// db method ?


// The ScheduleStore is a singleton, so export only the one instance.
module.exports = new ScheduleStore();
