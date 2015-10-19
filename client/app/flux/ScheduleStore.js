//var EventEmitter = require("event-emitter");
var events = require("events");
var CHANGE_EVENT = "changeEvent";

var ScheduleStore = function() {
  this.emitter = new events.EventEmitter();
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

ScheduleStore.prototype.getPanelInfo = function(callback) {
  console.log("TODO: fetch surveys from server via XHR");

  callback([]);
}

ScheduleStore.prototype.getCalendarInfo = function(callback) {
  console.log("TODO: fetch survey by id from server via XHR");

  callback({});
}

// The ScheduleStore is a singleton, so export only the one instance.
module.exports = new ScheduleStore();
