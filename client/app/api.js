var API = {
  createEvent : function ( callback ) {
    $.post(
        "http://localhost:3000/events",
        {},
        function ( data, status ) {
          console.log("createEvent : ", status);
          callback( data, status );
        });
  },
  readEvent : function ( event_id, callback ) {
    $.get(
        "http://localhost:3000/events/"+event_id,
        {},
        function ( data, status ) {
          console.log("readEvent: ", status);
          callback( data, status );
        });
  },
  createUser : function ( event_id, name, schedule, leader, callback ) {
    $.post(
        "http://localhost:3000/events/"+event_id+"/users",
        { name:name, schedule:schedule, leader:leader },
        function ( data, status ) {
          console.log("createUser:", status);
          callback( data, status );
        });
  }
};

module.exports = API;
