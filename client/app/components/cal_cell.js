var React = require('react');
var ScheduleActions = require('../flux/ScheduleActions');

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
    var valid, content, clazz;
    valid = this.validate( this.props.val );
    content = valid ? this.props.val : '';
    clazz = "cal-cell"
    clazz += this.state.selected ? " selected" : "";
    return <td className={clazz} onClick={this.handleClick}>{content}</td>;
  },
  validate : function ( val ) {
    return val != -1;
  },
  handleClick : function (ev) {
    this.setState( { selected : !this.state.selected } );
    ScheduleActions.fetchDateInfo(0,0,0);
  }
});

module.exports = CalCell;
