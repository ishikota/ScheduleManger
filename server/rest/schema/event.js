var mongoose = require('mongoose');
var User = require('./user');

var Event = mongoose.Schema({
  created : { type: Date, default: Date.now },
  member  : [ User ]
});

module.exports = Event;
