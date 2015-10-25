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
    case ScheduleConstants.UPDATE_SCHEDULE:
      ScheduleStore.updateSchedule( payload.data );
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
    ScheduleStore.receiveInputState( function( data ){
      console.log("receive input state : "+JSON.stringify(data));
      this.setState( { input_state : data } );
    }.bind(this));
  },
  getInitialState : function () {
    return {
      cal_data    : null,
      panel_data  : null,
      input_state : { numer : 0, denom : 100 }
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
    var mode = this.props.children.type.displayName == 'Main' ? 0 : 1;
    return (
      <div className='app'>
        <MainHeader mode={mode} />
        <HintPanel mode={mode} data={this.state.input_state} />
        <div className="main-content container">
          { React.cloneElement(this.props.children, { data : this.state }) }
        </div>
      </div>
    );
  }
});

module.exports = App;
