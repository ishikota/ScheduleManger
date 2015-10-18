var React     = require('react');
var CalHeader = require('./cal_head');
var CalTable  = require('./cal_table');

var Calendar= React.createClass({
  propTypes : function () {
    return {
      year  : React.PropTypes.number,
      month : React.PropTypes.number
    };
  },
  getDefaultProps : function () {
    var now = new Date();
    return {
      year  : now.getFullYear(),
      month : now.getMonth()
    };
  },
  getInitialState : function () {
    return {
      date : new Date(this.props.year, this.props.month)
    };
  },
  render : function () {
    var
      month = this.state.date.getMonth(),
      year  = this.state.date.getFullYear();

    return (
        <div className="cal-container">
          <CalHeader year={year} month={month} onChange={this.handleChange} />
          <CalTable  year={year} month={month} />
        </div>
        );
  },
  handleChange : function ( is_forward ) {
    var 
      alpha,
      new_date = new Date(this.state.date),

    alpha = is_forward ? 1 : -1;
    new_date.setMonth( new_date.getMonth() + alpha );
    this.setState( { date : new_date } );
  },
});

module.exports = Calendar;
