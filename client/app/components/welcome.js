var React = require('react');
var Calendar = require('./calendar');
var ScheduleActions   = require("../flux/ScheduleActions");

var Welcome = React.createClass({
  render : function () {
    var 
      cd = this.props.data.cal_data,
      pd = this.props.data.panel_data;

    // yet loaded calendar data
    if ( !cd ) {
      return <div className='app' />
    }
    console.log("tes"+JSON.stringify(cd));
   
    y   = cd.date.year;
    m   = cd.date.month;
    st  = cd.schedule;
    return (
      <div className="col-xs-12 col-sm-12">
        <Calendar year={y} month={m} status={st}
                  statelist={this.colors} onClick={this.callback}/>
      </div>
    );
  },
  colors : [ "", "blue" ],
  callback : function (data) {
    ScheduleActions.updateSchedule(data);
  }
});

module.exports = Welcome;
