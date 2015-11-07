var mongoose = require('mongoose');
var eventSchema = require('../schema/event');
var Event = mongoose.model('Event', eventSchema);

var makeMongoId = function( id ) {
  return new mongoose.Types.ObjectId(id);
};

module.exports = {

  create: function(req, res) {
    var event = new Event();
    event.save(function(err, event) {
      if(err) {
        res.send( { status:false, msg:err } );
        console.error(err);
      } else {
        res.send( { status:true, obj:event } );
        console.log('Event created : '+JSON.stringify(event));
      }
    });
  },

  show: function(req, res) {
    res.send(req.event);
    console.log('show event '+JSON.stringify(event));
  },

  update: function(req, res) {
    res.send({ status:false, msg:"Not Implemented yet" });
    console.log('update event '+JSON.stringify(req.event));
  },

  destroy: function(req, res) {
    req.event.remove(function(err, event){
      if(err) {
        res.send( { status:false, msg:err } );
        console.error(err);
      } else {
        res.send( { status:true, obj:event } );
        console.log('destroy event '+JSON.stringify(res.event));
      }
    });
  },

  load: function(id, fn) {
    Event.findOne({ _id : makeMongoId(id)}, function (err, event){
      process.nextTick(function() {
        fn(null, event);
      });
    });
  }

};
