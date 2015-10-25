var React = require('react');

/**
 * When val is set to -1 then this cell displays nothing.
 * So you should pass -1 when this cell should be empty.
 * */
var CalCell = React.createClass({
  propTypes : {
    val       : React.PropTypes.number.isRequired,
    statelist : React.PropTypes.array.isRequired,
    onClick   : React.PropTypes.func.isRequired
  },
  getInitialState: function () {
    return {
      click_count : 0
    };
  },
  render: function () {
    var valid, content, clazz;
    valid = this.validate( this.props.val );
    content = valid ? this.props.val : '';
    clazz = this.getClass(this.state.click_count, this.props.statelist);
    return <td className={clazz} onClick={this.handleClick}>{content}</td>;
  },
  validate : function ( val ) {
    return val != -1;
  },
  handleClick : function (ev) {
    var next_state = (this.state.click_count+1) % this.props.statelist.length;
    this.setState( { click_count : this.state.click_count + 1} );
    this.props.onClick( 
      { day : this.props.val, next_state : next_state }
    );
  },
  getClass : function ( click_count, state_list ) {
    var
      clazz  = 'cal-cell',
      len    = state_list.length,
      append = state_list[click_count%len];
    if( append ) { clazz += ' '+append } // if not append is empty string
    return clazz;
  }
});

module.exports = CalCell;
