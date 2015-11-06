var _ = require('underscore');
var FakeData = require('./fake_data');
var ScheduleActions = require('./flux/ScheduleActions');

var MemDB = function () {
  this.data = {};
}

MemDB.prototype.genId = function ( length ) {
  var charset = "abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

MemDB.prototype.loadEventData = function ( event_id, callback ) {
  setTimeout( function () {
    var event_data = FakeData.getFakeEventData();
    this.data[event_id] = {
      id     : event_id,
      leader : event_data.member["1"].id,
      member : event_data.member
    };
    callback();
  }.bind(this), 500);
}

MemDB.prototype.createEvent = function () {
  var event_id = this.genId(24);
  this.data[event_id] = {
    id: event_id,
    leader : null,
    member : {}
  };
  return event_id;
}

MemDB.prototype.readEvent = function ( event_id ) {
  return this.data[event_id];
}

MemDB.prototype.isNewone= function ( event_id, name ) {
  var res = true;
  for ( var id in this.data[event_id].member ) {
    res &= ( name != this.data[event_id].member[id].name );
  }
  return res;
}

MemDB.prototype.createUser = function( event_id, name, schedule, is_leader ) {
  // user name in event must be unique
  if ( !this.isNewone( event_id, name ) ) {
    return "-1";
  }
  var user_id = this.genId(8);
  this.data[event_id].member[user_id] = {
    id       : user_id,
    name     : name,
    schedule : schedule,
    leader   : is_leader
  };
  return user_id;
}

MemDB.prototype.readUser = function ( event_id, user_id ) {
  return this.data[event_id].member[user_id];
}

MemDB.prototype.readUserByName = function ( event_id, user_name ) {
  for ( var id in this.data[event_id].member ) {
    if ( this.data[event_id].member[id].name == user_name ) {
      return this.data[event_id].member[id];
    }
  }
};


MemDB.prototype.insert = function ( id, data ) {
  this.data.id = data;
}

MemDB.prototype.find = function ( id ) {
  return this.data.id;
}

module.exports = new MemDB();
