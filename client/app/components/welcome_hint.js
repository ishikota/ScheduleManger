var React = require('react');
var TEXT  = require('../text_content');

var WelcomeHint = React.createClass({
  render : function () {
    return (
      <div className="panel panel-default welcome-hint">
        <div className="panel-body">
          <p>{TEXT.WELCOME_FIRST_MESSAGE}</p>
          <p>{TEXT.WELCOME_HOWTO_MESSAGE}</p>
        </div>
      </div>
      );
  }
});

module.exports = WelcomeHint;
