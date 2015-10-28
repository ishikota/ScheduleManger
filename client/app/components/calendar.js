var React     = require('react');
var CalHeader = require('./cal_head');
var CalTable  = require('./cal_table');
var ScheduleActions = require('../flux/ScheduleActions');

var Calendar = React.createClass({
  propTypes : function () {
    return {
      year      : React.PropTypes.number.isRequired,
      month     : React.PropTypes.number.isRequired,
      status    : React.PropTypes.array.isRequired,
      statelist : React.PropTypes.array.isRequired,
      onClick   : React.PropTypes.func
    };
  },
  getDefaultProps : function () {
    return {
      onClick : function ( ev ) { /* do nothing */}
    };
  },
  getInitialState : function () {
    return {
      year   : this.props.year,
      month  : this.props.month,
      status : this.props.status
    };
  },
  componentWillReceiveProps : function (nextProps) {
    this.setState( {
      year   : nextProps.year,
      month  : nextProps.month,
      status : nextProps.status
    });
  },
  render : function () {
    var
      year  = this.state.year,
      month = this.state.month;

    return (
        <div className="cal-container">
          <CalHeader year={year} month={month} />
          <CalTable  year={year} month={month} status={this.state.status[month]}
                     statelist={this.props.statelist}
                     onClick={this.props.onClick} />
        </div>
        );
  }
});

module.exports = Calendar;
