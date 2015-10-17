var React = require('react');

/**
 * When val is set to -1 then this cell displays nothing.
 * So you should pass -1 when this cell should be empty.
 * */
var CalCell = React.createClass({
  propTypes: function () {
    val   : React.PropTypes.number.isRequired
  },
  getInitialState: function () {
    return {
      selected : false
    };
  },
  render: function () {
    var valid, content;
    valid = this.validate( this.props.val );
    content = valid ? this.props.val : '';
    return <td>{content}</td>;
  },
  validate : function ( val ) {
    return val != -1;
  }
});

module.exports = CalCell;
