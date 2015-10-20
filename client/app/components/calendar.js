var React     = require('react');
var CalHeader = require('./cal_head');
var CalTable  = require('./cal_table');
var ScheduleActions = require('../flux/ScheduleActions');

var Calendar = React.createClass({
  propTypes : function () {
    return {
      year   : React.PropTypes.number.isRequired,
      month  : React.PropTypes.number.isRequired,
      status : React.PropTypes.array.isRequired
    };
  },
  getInitialState : function () {
    return {
      date   : new Date(this.props.year, this.props.month),
      status : this.props.status
    };
  },
  componentWillReceiveProps : function (nextProps) {
    this.setState( {
      date   : new Date(nextProps.year, nextProps.month),
      status : nextProps.status
    });
  },
  render : function () {
    var
      month = this.state.date.getMonth(),
      year  = this.state.date.getFullYear();

    return (
        <div className="cal-container">
          <CalHeader year={year} month={month} onChange={this.handleChange} />
          <CalTable  year={year} month={month} status={this.state.status}/>
        </div>
        );
  },
  handleChange : function ( is_forward ) {
    var alpha, new_month,
        new_date = new Date(this.state.date),
    alpha     = is_forward ? 1 : -1;
    new_date.setMonth(new_date.getMonth() + alpha);
    ScheduleActions.orderCalendar(
        -1,new_date.getFullYear(), new_date.getMonth(), -1,-1);
  },
});

module.exports = Calendar;
