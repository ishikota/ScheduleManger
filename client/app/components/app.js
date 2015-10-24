var React             = require("react");
var MainHeader        = require("./main_header");
var HintPanel         = require("./hint_panel");
var ScheduleStore     = require("../flux/ScheduleStore");
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
      console.log("receive new hint: "+JSON.stringify(data));
      this.setState( { hint_data : data } );
    }.bind(this));
  },
  getInitialState : function () {
    return {
      cal_data   : null,
      panel_data : null,
      hint_data  : { editing : false, numer : 0, denom : 100 }
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
        y, m, st, mode;

    var mode = this.props.children.type.displayName == 'Main' ? 0 : 1;
    return (
      <div className='app'>
        <MainHeader/>
        <HintPanel mode={mode} data={this.state.hint_data} />
        <div className="main-content container">
          { React.cloneElement(this.props.children, { data : this.state }) }
        </div>
      </div>
    );
  }
});

module.exports = App;
