var React = require('react');

var WelcomeHint = React.createClass({
  render : function () {
    return (
      <div className="panel panel-default welcome-hint">
        <div className="panel-body">
          <p>First, choose possible date for your event</p>
        </div>
      </div>
      );
  }
});

module.exports = WelcomeHint;
