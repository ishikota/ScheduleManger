var mongoose = require('mongoose');

var User = mongoose.Schema({
  name     : String,
  schedule : [],
  leader   : Boolean
});

module.exports = User;
