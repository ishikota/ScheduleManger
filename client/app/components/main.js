var React = require('react');
var Calendar          = require("./calendar");
var SchedulePanel     = require("./schedule_panel");

var Main = React.createClass({
  render : function () {
    var 
      cd = this.props.data.cal_data,
      pd = this.props.data.panel_data;
   
    // yet loaded calendar data
    if ( !cd ) {
      return <div className='app' />
    }

    y   = cd.date.year;
    m   = cd.date.month;
    st  = cd.status;
    return (
      <div>
        <div className="col-xs-12 col-sm-7">
          <Calendar year={y} month={m} status={st}/>
        </div>
        <div className="col-xs-12 col-sm-5">
          <SchedulePanel data={pd} />
        </div>
      </div>
    );
  }
});

module.exports = Main;
