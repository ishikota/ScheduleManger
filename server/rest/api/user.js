var _ = require('underscore');
var Util  = require('../util');
var mongoose = require('mongoose');
var eventSchema = require('../schema/event');
var userSchema  = require('../schema/user');
var Event = mongoose.model('Event', eventSchema);
var User  = mongoose.model('User', userSchema);

var makeMongoId = function( id ) {
  return new mongoose.Types.ObjectId(id);
};

module.exports = {

  index: function(req, res) {
    res.send(req.event.member);
    console.log("member in event %s : "+JSON.stringify(req.event.member),
        req.event._id);
  },

  create: function(req, res) {
    // validate passed schedule
    var schedule = Util.formatSchedule(req.body.schedule);
    if ( schedule === -1 ) {
      res.send(
          { status:false,
            msg:"Passed schedule contains NaN : "+req.body.schedule
          });
      return;
    }

    req.event.member.push({
      name     : req.body.name,
      schedule : schedule,
      leader   : req.body.leader
    });
    req.event.save(function(err, event) {
      if(err) {
        res.send( { status:false, msg:err } );
        console.error(err);
      } else {
        var user = _.last(event.member);
        res.send( { status:true, obj:user } );
        console.log('User created :'+JSON.stringify(user));
      }
    });
  },

  show: function(req, res) {
    var user = req.event.member.id(req.params.user);
    res.send(user);
    console.log('show user '+JSON.stringify(user));
  },

  update: function(req, res) {
    res.send( { status:false, msg:"Not Implmented yet" } );
    console.log('update user '+JSON.stringify(req.user));
  },

  destroy: function(req, res) {
    var user = req.event.member.id(req.params.user).remove();
    req.event.save(function(err) {
      if(err) {
        res.send( { status:false, msg:err } );
        console.error(err);
      } else {
        res.send( { status:true, obj:user } );
        console.log('destroyed user '+JSON.stringify(user));
      }
    });
  },

  validateSchedule : function( schedule ) {
    return false;
  }

};

