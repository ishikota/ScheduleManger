var React   = require('react');
var CalCell = require('./cal_cell');

var CalRow = React.createClass({
  propTypes : function () {
    return {
      start  : React.PropTypes.number.isRequired,
      end    : React.PropTypes.number,
      status : React.PropTypes.array.isRequired,
      statelist : React.PropTypes.array.isRequired,
      onClick   : React.PropTypes.func.isRequired
    };
  },
  getDefaultProps : function () {
    return { end : 31 };
  },
  render: function () {
    var i,
        children = [];

    for ( i=0; i<7; i++ ) {
      var day, status,
          val = this.props.start + i;

      day = this.validate(val) ? val : -1;
      status = this.props.status[i];
      children.push(
          <CalCell val={day} key={val} status={status}
                   statelist={this.props.statelist}
                   onClick={this.props.onClick}/>
          );
    }

    return <tr>{children}</tr>;
  },
  validate : function ( day ) {
    return 0 < day && day <= this.props.end;
  }
});

module.exports = CalRow;
