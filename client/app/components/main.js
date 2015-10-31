var _     = require('underscore');
var React = require('react');
var MemDB = require('../mem_db');
var Calendar          = require("./calendar");
var SchedulePanel     = require("./schedule_panel");
var ScheduleActions   = require("../flux/ScheduleActions");

var Main = React.createClass({
  componentDidMount : function () {
    const id = this.props.params.id;
    MemDB.loadEventData(id);
  },
  render : function () {
    var y, m, st,
      cd = this.props.data.cal_data,
      pd = this.props.data.panel_data;

    // yet loaded event data from server
    if ( _.isEmpty(MemDB.data) ) {
      return (
        <div className='loading'>
          Loading...
        </div>
      );
    }

    y   = cd.date.year;
    m   = cd.date.month;
    st  = cd.schedule;
    return (
      <div>
        <div className="col-xs-12 col-sm-7">
          <Calendar year={y} month={m} status={st}
                    statelist={this.colors} onClick={this.callback}/>
        </div>
        <div className="col-xs-12 col-sm-5">
          <SchedulePanel data={pd} />
        </div>
      </div>
    );
  },
  colors : ["", "blue", "red", "red"],
  callback : function (data) {
    ScheduleActions.updateSchedule(data);
  }
});

module.exports = Main;
