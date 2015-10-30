
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

MemDB.prototype.validateUser = function ( event_id, name ) {
  var res = true;
  for ( var id in this.data[event_id].member ) {
    res &= ( name != this.data[event_id].member[id].name );
  }
  return res;
}

MemDB.prototype.createUser = function( event_id, name, schedule, is_leader ) {
  // user name in event must be unique
  if ( !this.validateUser( event_id, name ) ) {
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


MemDB.prototype.insert = function ( id, data ) {
  this.data.id = data;
}

MemDB.prototype.find = function ( id ) {
  return this.data.id;
}

module.exports = new MemDB();
