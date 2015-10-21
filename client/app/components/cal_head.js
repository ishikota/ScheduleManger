var React   = require('react');
var ScheduleActions = require('../flux/ScheduleActions');

var CalHeader = React.createClass({
  propTypes : function () {
    return {
      year  : React.PropTypes.number.isRequired,
      month : React.PropTypes.number.isRequired
    };
  },
  render : function () {
    return (
        <div className="cal-head">
          <i className="material-icons md-dark cal-head-ctrl back"
             onClick={this.handleClick}>keyboard_arrow_left</i>
          <i className="material-icons md-dark cal-head-ctrl next"
             onClick={this.handleClick}>keyboard_arrow_right</i>
          <p className="cal-head-title">
            {this.parseMonth(this.props.month)} {this.props.year}
          </p>
        </div>
        );
  },
  handleClick : function (ev) {
    var 
      date = new Date(this.props.year, this.props.month),
      forward_month = ev.target.className.indexOf('next') > -1,
      alpha         = forward_month ? 1 : -1;
    date.setMonth( date.getMonth() + alpha );
    ScheduleActions.update( { year : date.getFullYear(), month : date.getMonth() } );
  },
  parseMonth : function ( month ) {
    var names = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
        ];
    return names[month];
  }

});

module.exports = CalHeader;

