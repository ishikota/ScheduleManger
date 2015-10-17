var React = require('react');

var Hello = React.createClass({
  render: function() {
            return <div>Hello {this.props.world}</div>;
          }
});

module.exports = Hello;
