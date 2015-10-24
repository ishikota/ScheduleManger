var React             = require("react");
var MainHeader        = require("./main_header");
var EditHint          = require("./edit_hint");
var Calendar          = require("./calendar");
var SchedulePanel     = require("./schedule_panel");
var ScheduleStore      = require("../flux/ScheduleStore");
var Dispatcher        = require("../flux/Dispatcher");
var ScheduleConstants = require("../flux/ScheduleConstants");

Dispatcher.register( function ( payload ) {
  switch ( payload.actionType ) {
    case ScheduleConstants.UPDATE_CALENDAR:
      ScheduleStore.changeCalendar( payload.data );
      break;
    case ScheduleConstants.EDIT_CALENDAR:
      ScheduleStore.changeState( payload.data );
      break;
  }
});

var App = React.createClass({
  handleChange : function () {
    ScheduleStore.receiveCalendarData( function( data ){
      console.log("receive new calendar : "+JSON.stringify(data));
      this.setState( { cal_data : data } );
    }.bind(this));
    ScheduleStore.receivePanelData( function( data ){
      console.log("receive new panel : "+JSON.stringify(data));
      this.setState( { panel_data : data } );
    }.bind(this));
    ScheduleStore.receiveEditInfo( function( data ){
      console.log("receive new edit: "+JSON.stringify(data));
      this.setState( { edit_data : data } );
    }.bind(this));
  },
  getInitialState : function () {
    return {
      cal_data   : null,
      panel_data : null,
      edit_data  : { editing : false, numer : 0, denom : 100 }
    };
  },
  componentWillMount : function () {
    this.handleChange();  // initialize child components
   },
  componentDidMount : function () {
    ScheduleStore.addChangeListener(this.handleChange);
  },
  componentWillUnmount : function () {
    ScheduleStore.removeChangeListener(this.handleChange);
  },
  render : function () {
    var cd = this.state.cal_data,
        pd = this.state.panel_data,
        ed = this.state.edit_data,
        y, m, st;

    // yet loaded calendar data
    if ( !cd ) {
      return <div className='app' />
    }

    y   = cd.date.year;
    m   = cd.date.month;
    st  = cd.status;

    return (
      <div className='app'>
        <MainHeader/>
        <EditHint numer={ed.numer} denom={ed.denom} visible={ed.editing} />
        <div className="main-content container">
          <div className="col-xs-12 col-sm-7">
            <Calendar year={y} month={m} status={st}/>
          </div>
          <div className="col-xs-12 col-sm-5">
            <SchedulePanel data={pd} />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = App;
