var
  http = require( 'http' ),
  express = require( 'express' ),
  resource = require('express-resource'),
  // require rest resource and setup their dependency
  app = express(),
  events = app.resource('events', require('./rest/api/event')),
  users  = app.resource('users', require('./rest/api/user'));
events.add(users);

// db setup
var db,mongoose;
mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', function( callback ) {
  console.log("mongoDB connected!!");
});


app.configure( function () {
  app.use( express.bodyParser() );
  app.use( express.methodOverride() );
  app.use( express.static( __dirname + '/../public' ) );
  app.use( app.router );
});

app.configure( 'development', function () {
  app.use( express.logger() );
  app.use( express.errorHandler({
    dumpExceptions : true,
    showstack : true
  }) );
});

app.configure( 'production', function () {
  app.use( express.errorHandler() );
});


app.get('/', function ( request, response ) {
  response.redirect( '/app.html' );
});

app.listen(3000);
console.log('Express server Listening in %s mode',
    app.settings.env
);
