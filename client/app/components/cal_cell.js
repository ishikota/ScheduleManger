var React = require('react');

/**
 * When val is set to -1 then this cell displays nothing.
 * So you should pass -1 when this cell should be empty.
 * */
var CalCell = React.createClass({
  propTypes : {
    val       : React.PropTypes.number.isRequired,
    status    : React.PropTypes.number.isRequired,
    statelist : React.PropTypes.array.isRequired,
    onClick   : React.PropTypes.func.isRequired,
  },
  render: function () {
    var valid, content, clazz;
    valid = this.validate( this.props.val );
    content = valid ? this.props.val : '';
    clazz = this.getClass(this.props.status, this.props.statelist);
    return <td className={clazz} onClick={this.handleClick}>{content}</td>;
  },
  validate : function ( val ) {
    return val != -1;
  },
  handleClick : function (ev) {
    var next_state = (this.props.status+1) % this.props.statelist.length;
    this.props.onClick( 
      { day : this.props.val, next_state : next_state }
    );
  },
  getClass : function ( status, state_list ) {
    var
      clazz  = 'cal-cell',
      append = state_list[status];
    if( append ) { clazz += ' '+append } // if not append is empty string
    return clazz;
  }
});

module.exports = CalCell;
